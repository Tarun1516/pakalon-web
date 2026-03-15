'use client'

import { FormEvent, useMemo, useState } from 'react'

import { api, useAutomationConnectors, useAutomationCronJobs, useAutomationLogs, useAutomations, type AutomationRecord } from '@/lib/api'
import { AutomationsShell, statusPill } from '@/components/automations/AutomationsShell'

export default function AutomationsPage() {
  const { automations, loading: automationsLoading, error: automationsError, refetch: refetchAutomations } = useAutomations()
  const { catalog, refetch: refetchConnectors } = useAutomationConnectors()
  const { cronJobs, refetch: refetchCron } = useAutomationCronJobs()
  const { logs, refetch: refetchLogs } = useAutomationLogs()

  const [name, setName] = useState('')
  const [prompt, setPrompt] = useState('')
  const [selectedConnectors, setSelectedConnectors] = useState<string[]>([])
  const [scheduleType, setScheduleType] = useState('*/15 * * * *')
  const [customCron, setCustomCron] = useState('*/15 * * * *')
  const [submitting, setSubmitting] = useState(false)
  const [banner, setBanner] = useState<string | null>(null)
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  const connectedProviders = useMemo(
    () => new Set((catalog?.connected ?? []).filter((item) => item.enabled).map((item) => item.provider)),
    [catalog?.connected],
  )

  const handleCreateAutomation = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitting(true)
    setBanner(null)
    try {
      const finalCron = scheduleType === 'custom' ? customCron : scheduleType
      const created = await api.createAutomation({
        name,
        prompt,
        required_connectors: selectedConnectors,
        schedule_cron: finalCron,
      })

      setName('')
      setPrompt('')
      setSelectedConnectors([])
      setScheduleType('*/15 * * * *')
      setBanner(
        created.missing_connectors.length
          ? `Automation created. Connect ${created.missing_connectors.join(', ')} on the connectors page to fully activate it.`
          : 'Automation created and ready to run.',
      )
      refetchAutomations()
      refetchCron()
      refetchLogs()
      refetchConnectors()
    } catch (error) {
      setBanner(error instanceof Error ? error.message : 'Could not create automation')
    } finally {
      setSubmitting(false)
    }
  }

  const handleRunAutomation = async (automation: AutomationRecord) => {
    setActionLoading(automation.id)
    try {
      await api.runAutomation(automation.id)
      setBanner(`Ran ${automation.name}. Logs refreshed with fresh gossip.`)
      refetchAutomations()
      refetchLogs()
    } catch (error) {
      setBanner(error instanceof Error ? error.message : 'Could not run automation')
    } finally {
      setActionLoading(null)
    }
  }

  const handleToggleAutomation = async (automation: AutomationRecord) => {
    setActionLoading(automation.id)
    try {
      await api.updateAutomation(automation.id, { enabled: !automation.enabled })
      setBanner(`${automation.name} is now ${automation.enabled ? 'paused' : 'enabled'}.`)
      refetchAutomations()
      refetchCron()
    } catch (error) {
      setBanner(error instanceof Error ? error.message : 'Could not update automation')
    } finally {
      setActionLoading(null)
    }
  }

  const handleDeleteAutomation = async (automation: AutomationRecord) => {
    setActionLoading(automation.id)
    try {
      await api.deleteAutomation(automation.id)
      setBanner(`${automation.name} deleted.`)
      refetchAutomations()
      refetchCron()
      refetchLogs()
    } catch (error) {
      setBanner(error instanceof Error ? error.message : 'Could not delete automation')
    } finally {
      setActionLoading(null)
    }
  }

  return (
    <AutomationsShell
      title="Automations"
      description="Create scheduled workflows here, then manage connectors, cron jobs, and execution history from the dedicated subpages."
      stats={{
        automations: automations.length,
        connectedApps: catalog?.connected.length ?? 0,
        cronJobs: cronJobs.length,
        logs: logs.length,
      }}
      banner={banner}
    >
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.1fr,0.9fr]">
        <form onSubmit={handleCreateAutomation} className="space-y-5 rounded-2xl border border-border-dark bg-surface-dark p-6">
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-white">Create automation</h2>
            <p className="text-sm text-[#b1b4a2]">Name it, describe the job, choose connectors, and set the schedule.</p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm text-[#d7dac8]">Automation name</span>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Repo monitor"
                className="w-full rounded-xl border border-border-dark bg-background-dark px-4 py-3 text-white outline-none focus:border-primary"
                required
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm text-[#d7dac8]">Schedule / cron</span>
              <select
                value={scheduleType}
                onChange={(event) => setScheduleType(event.target.value)}
                className="w-full rounded-xl border border-border-dark bg-background-dark px-4 py-3 text-white outline-none focus:border-primary appearance-none"
              >
                <option value="*/15 * * * *">Every 15 minutes</option>
                <option value="0 * * * *">Hourly</option>
                <option value="0 0 * * *">Daily at midnight</option>
                <option value="custom">Custom</option>
              </select>
              {scheduleType === 'custom' && (
                <input
                  value={customCron}
                  onChange={(event) => setCustomCron(event.target.value)}
                  placeholder="e.g. */15 * * * *"
                  className="mt-2 w-full rounded-xl border border-border-dark bg-background-dark px-4 py-3 text-white outline-none focus:border-primary font-mono text-sm"
                  required
                />
              )}
            </label>
          </div>

          <label className="block space-y-2">
            <span className="text-sm text-[#d7dac8]">Automation prompt</span>
            <textarea
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              rows={5}
              placeholder="Check owner/repo for open issues and PRs, then send a Slack update to #dev-alerts."
              className="w-full rounded-xl border border-border-dark bg-background-dark px-4 py-3 text-white outline-none focus:border-primary"
              required
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm text-[#d7dac8]">Needed app connections</span>
            {catalog?.connected && catalog.connected.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {catalog.connected.map((connector) => {
                  const isSelected = selectedConnectors.includes(connector.provider)
                  return (
                    <button
                      key={connector.provider}
                      type="button"
                      onClick={() => {
                        setSelectedConnectors(prev => 
                          isSelected ? prev.filter(p => p !== connector.provider) : [...prev, connector.provider]
                        )
                      }}
                      className={`px-4 py-2 rounded-xl border text-sm transition-colors ${
                        isSelected 
                        ? 'border-primary bg-primary/10 text-primary font-medium' 
                        : 'border-border-dark bg-background-dark text-[#b1b4a2] hover:border-[#8f937c]'
                      }`}
                    >
                      {connector.display_name}
                    </button>
                  )
                })}
              </div>
            ) : (
              <div className="text-sm text-[#8f937c] bg-background-dark border border-border-dark rounded-xl px-4 py-3">
                No apps connected yet. Go to Connectors to link an app.
              </div>
            )}
          </label>
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-background-dark transition-colors hover:bg-primary-hover disabled:opacity-60"
          >
            <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
            {submitting ? 'Creating…' : 'Create automation'}
          </button>
        </form>

        <div className="space-y-4 rounded-2xl border border-border-dark bg-surface-dark p-6">
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-white">Automation list</h2>
            <p className="text-sm text-[#b1b4a2]">Every automation you create appears here with its status, schedule, and quick actions.</p>
          </div>

          {automationsLoading && <p className="text-[#b1b4a2]">Loading automations…</p>}
          {automationsError && <p className="text-red-300">{automationsError}</p>}
          {!automationsLoading && !automations.length && (
            <div className="rounded-xl border border-dashed border-border-dark px-4 py-6 text-sm text-[#b1b4a2]">
              No automations yet. Create one on the left and it will show up here.
            </div>
          )}

          {automations.map((automation) => (
            <div key={automation.id} className="space-y-4 rounded-xl border border-border-dark bg-background-dark p-4">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-semibold text-white">{automation.name}</h3>
                    <span className={`rounded-full border px-2.5 py-0.5 text-xs ${statusPill(automation.last_status ?? (automation.enabled ? 'enabled' : 'paused'))}`}>
                      {(automation.last_status ?? (automation.enabled ? 'enabled' : 'paused')).toUpperCase()}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-[#b1b4a2]">{automation.description || automation.prompt}</p>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs text-[#8f937c]">
                    <span className="rounded-full border border-white/10 px-2 py-1">{automation.schedule_cron || 'manual'}</span>
                    {automation.required_connectors.map((connector) => (
                      <span key={connector} className={`rounded-full border px-2 py-1 ${connectedProviders.has(connector) ? 'border-emerald-500/20 text-emerald-300' : 'border-yellow-500/20 text-yellow-300'}`}>
                        {connector}
                      </span>
                    ))}
                  </div>
                  {!!automation.missing_connectors.length && (
                    <p className="mt-3 text-xs text-yellow-300">Missing connectors: {automation.missing_connectors.join(', ')}</p>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => handleRunAutomation(automation)}
                    disabled={actionLoading === automation.id}
                    className="rounded-lg border border-primary/30 px-3 py-2 text-sm text-primary hover:bg-primary/10 disabled:opacity-60"
                  >
                    Run now
                  </button>
                  <button
                    type="button"
                    onClick={() => handleToggleAutomation(automation)}
                    disabled={actionLoading === automation.id}
                    className="rounded-lg border border-border-dark px-3 py-2 text-sm text-white hover:bg-white/5 disabled:opacity-60"
                  >
                    {automation.enabled ? 'Pause' : 'Enable'}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteAutomation(automation)}
                    disabled={actionLoading === automation.id}
                    className="rounded-lg border border-red-500/20 px-3 py-2 text-sm text-red-300 hover:bg-red-500/10 disabled:opacity-60"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AutomationsShell>
  )
}
