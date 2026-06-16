import { useEffect, useState } from 'react'

const getLeaderboardEndpoint = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME

  return codespaceName
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
    : 'http://localhost:8000/api/leaderboard/'
}

const normalizeItems = (payload) => {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.results)) return payload.results
  if (Array.isArray(payload?.items)) return payload.items
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.docs)) return payload.docs
  return []
}

function Leaderboard() {
  const [leaders, setLeaders] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        const response = await fetch(getLeaderboardEndpoint())

        if (!response.ok) {
          throw new Error(`Request failed with ${response.status}`)
        }

        const payload = await response.json()
        setLeaders(normalizeItems(payload))
        setStatus('ready')
      } catch (requestError) {
        setError(requestError.message)
        setStatus('error')
      }
    }

    void loadLeaderboard()
  }, [])

  if (status === 'loading') return <p className="text-muted">Loading leaderboard...</p>
  if (status === 'error') return <p className="alert alert-warning">Leaderboard unavailable: {error}</p>

  return (
    <div className="leaderboard-list">
      {leaders.map((leader) => (
        <article className="leader-row" key={leader._id ?? leader.rank}>
          <span className="rank">#{leader.rank}</span>
          <div>
            <h2>{leader.user?.firstName ?? leader.user?.username ?? 'Student'}</h2>
            <p>{leader.badge}</p>
          </div>
          <strong>{leader.points} pts</strong>
          <span>{leader.weeklyMinutes} min</span>
        </article>
      ))}
    </div>
  )
}

export default Leaderboard