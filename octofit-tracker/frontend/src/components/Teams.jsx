import { useEffect, useState } from 'react'

const getTeamsEndpoint = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME

  return codespaceName
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
    : 'http://localhost:8000/api/teams/'
}

const normalizeItems = (payload) => {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.results)) return payload.results
  if (Array.isArray(payload?.items)) return payload.items
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.docs)) return payload.docs
  return []
}

function Teams() {
  const [teams, setTeams] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    const loadTeams = async () => {
      try {
        const response = await fetch(getTeamsEndpoint())

        if (!response.ok) {
          throw new Error(`Request failed with ${response.status}`)
        }

        const payload = await response.json()
        setTeams(normalizeItems(payload))
        setStatus('ready')
      } catch (requestError) {
        setError(requestError.message)
        setStatus('error')
      }
    }

    void loadTeams()
  }, [])

  if (status === 'loading') return <p className="text-muted">Loading teams...</p>
  if (status === 'error') return <p className="alert alert-warning">Teams unavailable: {error}</p>

  return (
    <div className="entity-grid">
      {teams.map((team) => (
        <article className="entity-card" key={team._id ?? team.name}>
          <span className="team-swatch" style={{ backgroundColor: team.color }} aria-hidden="true" />
          <h2>{team.name}</h2>
          <p>{team.mascot}</p>
          <dl>
            <div>
              <dt>Members</dt>
              <dd>{team.memberCount}</dd>
            </div>
            <div>
              <dt>Points</dt>
              <dd>{team.totalPoints}</dd>
            </div>
          </dl>
        </article>
      ))}
    </div>
  )
}

export default Teams