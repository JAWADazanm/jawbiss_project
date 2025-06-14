// 🔁 Trigger redeploy

app/logs/page.tsx
'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

// Supabase client setup
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function LogsPage() {
  const [logs, setLogs] = useState<any[]>([])

  useEffect(() => {
    async function fetchLogs() {
      const { data, error } = await supabase
        .from('pronunciation_logs')
        .select('*')
        .order('timestamp', { ascending: false })
      if (error) {
        console.error('Supabase Error:', error.message)
      } else if (data) {
        setLogs(data)
      }
    }
    fetchLogs()
  }, [])

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '2rem' }}>📘 ILM Foundation - Learner Logs</h1>
      <table style={{ width: '100%', marginTop: '1rem', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Learner</th>
            <th>Spoken</th>
            <th>Score</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, i) => (
            <tr key={i}>
              <td>{log.learner}</td>
              <td>{log.spoken}</td>
              <td>{log.score}%</td>
              <td>{new Date(log.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}
