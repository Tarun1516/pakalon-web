'use client'

import { AutomationsShell, statusPill } from '@/components/automations/AutomationsShell'
import { useAutomationConnectors, useAutomationCronJobs, useAutomationLogs, useAutomations } from '@/lib/api'

export default function AutomationCronJobsPage() {
  const { automations } = useAutomations()
  const { catalog } = useAutomationConnectors()
  const { cronJobs, loading, error } = useAutomationCronJobs()
  const { logs } = useAutomationLogs()

  return (
    <AutomationsShell
      title="Cron jobs"
      description="Every scheduled automation shows up here with its next run and latest status, now as its own page instead of a tab crammed into the main automations screen."
      stats={{
        automations: automations.length,
        connectedApps: catalog?.connected.length ?? 0,
        cronJobs: cronJobs.length,
        logs: logs.length,
      }}
    >
      <div className="space-y-4 rounded-2xl border border-border-dark bg-surface-dark p-6">
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-white">Scheduled jobs</h2>
          <p className="text-sm text-[#b1b4a2]">Keep an eye on the automations that are running on a schedule and when they will fire next.</p>
        </div>

        {loading && <p className="text-[#b1b4a2]">Loading cron jobs…</p>}
        {error && <p className="text-red-300">{error}</p>}
        {!loading && !cronJobs.length && (
          <div className="rounded-xl border border-dashed border-border-dark px-4 py-5 text-sm text-[#b1b4a2]">
            No cron jobs yet. Add a schedule when creating an automation.
          </div>
        )}

        {cronJobs.map((job) => (
          <div key={job.automation_id} className="flex flex-col gap-3 rounded-xl border border-border-dark bg-background-dark p-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-semibold text-white">{job.automation_name}</p>
              <p className="text-sm text-[#b1b4a2]">{job.schedule_cron} • {job.schedule_timezone}</p>
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className={`rounded-full border px-2 py-1 ${statusPill(job.last_status ?? (job.enabled ? 'enabled' : 'paused'))}`}>
                {job.enabled ? 'ENABLED' : 'PAUSED'}
              </span>
              {job.next_run_at && (
                <span className="rounded-full border border-white/10 px-2 py-1 text-[#d7dac8]">Next: {new Date(job.next_run_at).toLocaleString()}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </AutomationsShell>
  )
}
