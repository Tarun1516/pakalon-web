'use client'

import { useState, useEffect } from 'react'

// Types matching backend schemas
export interface User {
  id: string
  github_login: string
  email: string
  display_name: string
  plan: string
  privacy_mode: boolean
  trial_days_used: number
  trial_days_remaining: number
  created_at: string
}

export interface Session {
  id: string
  title: string | null
  mode: string
  model_id: string | null
  created_at: string
  messages_count: number
  tokens_used: number
  lines_written: number
}

export interface Model {
  id: string
  name: string
  provider: string
  context_length: number
  remaining_pct: number
  tier: string
}

export interface UsageData {
  total_tokens: number
  tokens_by_model: Record<string, number>
  daily_tokens: { date: string; tokens: number }[]
  daily_lines_written: { date: string; lines: number }[]
  lines_written: number
  sessions_count: number
}

export interface ContributionDay {
  date: string
  lines_added: number
  lines_deleted: number
  commits: number
  tokens_used: number
  sessions_count: number
  level: number
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

class ApiClient {
  private token: string | null = null

  setToken(token: string) {
    this.token = token
    if (typeof window !== 'undefined') {
      localStorage.setItem('pakalon_token', token)
    }
  }

  getToken(): string | null {
    if (this.token) return this.token
    if (typeof window !== 'undefined') {
      return localStorage.getItem('pakalon_token')
    }
    return null
  }

  clearToken() {
    this.token = null
    if (typeof window !== 'undefined') {
      localStorage.removeItem('pakalon_token')
    }
  }

  private async fetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = this.getToken()
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    }

    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers,
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: 'Request failed' }))
      throw new Error(error.detail || `HTTP ${response.status}`)
    }

    return response.json()
  }

  // Auth
  async getMe(): Promise<User> {
    return this.fetch<User>('/auth/me')
  }

  async getDeviceCode(): Promise<{ device_code: string; verification_uri: string; user_code: string; interval: number }> {
    return this.fetch('/auth/devices', { method: 'POST' })
  }

  async pollForToken(device_code: string): Promise<{ access_token: string }> {
    return this.fetch(`/auth/devices/${device_code}/token`, { method: 'POST' })
  }

  // Sessions
  async listSessions(limit = 50, offset = 0): Promise<{ sessions: Session[]; total: number }> {
    return this.fetch(`/sessions?limit=${limit}&offset=${offset}`)
  }

  async getSession(id: string): Promise<Session> {
    return this.fetch(`/sessions/${id}`)
  }

  async createSession(title?: string, model_id?: string, mode?: string): Promise<Session> {
    return this.fetch('/sessions', {
      method: 'POST',
      body: JSON.stringify({ title, model_id, mode }),
    })
  }

  // Models
  async listModels(): Promise<{ models: Model[]; plan: string; count: number }> {
    return this.fetch('/models')
  }

  async getModelContext(model_id: string): Promise<{ remaining_pct: number; context_window_size: number }> {
    return this.fetch(`/models/${model_id}/context`)
  }

  // Usage
  async getUsage(): Promise<UsageData & { user_id: string; plan: string }> {
    return this.fetch('/usage')
  }

  async getHeatmap(year?: number): Promise<{
    year: number
    contributions: ContributionDay[]
    total_lines_added: number
    total_lines_deleted: number
  }> {
    const params = year ? `?year=${year}` : ''
    return this.fetch(`/usage/heatmap${params}`)
  }

  // User
  async updateProfile(data: { display_name?: string; privacy_mode?: boolean }): Promise<User> {
    const userId = await this.getMe().then(u => u.id).catch(() => 'me')
    return this.fetch(`/users/${userId}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    })
  }

  // Billing
  async createCheckout(priceId: string): Promise<{ url: string }> {
    return this.fetch('/billing/checkout', {
      method: 'POST',
      body: JSON.stringify({ price_id: priceId }),
    })
  }

  async getSubscription(): Promise<{ subscription_id: string; status: string; current_period_end: string } | null> {
    return this.fetch<{ subscription_id: string; status: string; current_period_end: string }>('/billing/subscription').catch(() => null)
  }

  async cancelSubscription(): Promise<void> {
    return this.fetch('/billing/cancel', { method: 'DELETE' })
  }
}

export const api = new ApiClient()

// React hooks for data fetching
export function useUser() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    api.getMe()
      .then(setUser)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return { user, loading, error, refetch: () => setLoading(true) }
}

export function useSessions(limit = 50) {
  const [sessions, setSessions] = useState<Session[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    api.listSessions(limit)
      .then(data => setSessions(data.sessions))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [limit])

  return { sessions, loading, error, refetch: () => setLoading(true) }
}

export function useUsage() {
  const [usage, setUsage] = useState<UsageData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    api.getUsage()
      .then(setUsage)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return { usage, loading, error, refetch: () => setLoading(true) }
}

export function useHeatmap(year?: number) {
  const [data, setData] = useState<ContributionDay[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    api.getHeatmap(year)
      .then(res => setData(res.contributions))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [year])

  return { data, loading, error, refetch: () => setLoading(true) }
}

export function useModels() {
  const [models, setModels] = useState<Model[]>([])
  const [plan, setPlan] = useState<string>('free')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    api.listModels()
      .then(data => {
        setModels(data.models)
        setPlan(data.plan)
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return { models, plan, loading, error, refetch: () => setLoading(true) }
}
