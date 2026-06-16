import { useEffect, useState } from 'react'

const getActivitiesEndpoint = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME

  return codespaceName
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
    : 'http://localhost:8000/api/activities/'
}

const normalizeItems = (payload) => {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.results)) return payload.results
  if (Array.isArray(payload?.items)) return payload.items
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.docs)) return payload.docs
  return []
}

function Activities() {
  const [activities, setActivities] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const response = await fetch(getActivitiesEndpoint())

        if (!response.ok) {
          throw new Error(`Request failed with ${response.status}`)
        }

        const payload = await response.json()
        setActivities(normalizeItems(payload))
        setStatus('ready')
      } catch (requestError) {
        setError(requestError.message)
        setStatus('error')
      }
    }

    void loadActivities()
  }, [])

  if (status === 'loading') return <p className="text-muted">Loading activities...</p>
  if (status === 'error') return <p className="alert alert-warning">Activities unavailable: {error}</p>

  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle data-table">
        <thead>
          <tr>
            <th scope="col">Activity</th>
            <th scope="col">Student</th>
            <th scope="col">Minutes</th>
            <th scope="col">Calories</th>
            <th scope="col">Points</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity) => (
            <tr key={activity._id ?? `${activity.type}-${activity.loggedAt}`}>
              <td>{activity.type}</td>
              <td>{activity.user?.username ?? 'Unassigned'}</td>
              <td>{activity.durationMinutes}</td>
              <td>{activity.caloriesBurned}</td>
              <td>{activity.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Activities