import { useEffect, useState } from 'react'

const getWorkoutsEndpoint = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME

  return codespaceName
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
    : 'http://localhost:8000/api/workouts/'
}

const normalizeItems = (payload) => {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.results)) return payload.results
  if (Array.isArray(payload?.items)) return payload.items
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.docs)) return payload.docs
  return []
}

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        const response = await fetch(getWorkoutsEndpoint())

        if (!response.ok) {
          throw new Error(`Request failed with ${response.status}`)
        }

        const payload = await response.json()
        setWorkouts(normalizeItems(payload))
        setStatus('ready')
      } catch (requestError) {
        setError(requestError.message)
        setStatus('error')
      }
    }

    void loadWorkouts()
  }, [])

  if (status === 'loading') return <p className="text-muted">Loading workouts...</p>
  if (status === 'error') return <p className="alert alert-warning">Workouts unavailable: {error}</p>

  return (
    <div className="entity-grid">
      {workouts.map((workout) => (
        <article className="entity-card" key={workout._id ?? workout.title}>
          <span className="badge text-bg-success">{workout.difficulty}</span>
          <h2>{workout.title}</h2>
          <p>{workout.category} - {workout.durationMinutes} minutes</p>
          <p>{workout.instructions}</p>
          <small>Grades {(workout.targetGrades ?? []).join(', ')}</small>
        </article>
      ))}
    </div>
  )
}

export default Workouts