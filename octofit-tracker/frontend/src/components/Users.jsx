import { useEffect, useState } from 'react'

const getUsersEndpoint = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME

  return codespaceName
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
    : 'http://localhost:8000/api/users/'
}

const normalizeItems = (payload) => {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.results)) return payload.results
  if (Array.isArray(payload?.items)) return payload.items
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.docs)) return payload.docs
  return []
}

function Users() {
  const [users, setUsers] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await fetch(getUsersEndpoint())

        if (!response.ok) {
          throw new Error(`Request failed with ${response.status}`)
        }

        const payload = await response.json()
        setUsers(normalizeItems(payload))
        setStatus('ready')
      } catch (requestError) {
        setError(requestError.message)
        setStatus('error')
      }
    }

    void loadUsers()
  }, [])

  if (status === 'loading') return <p className="text-muted">Loading users...</p>
  if (status === 'error') return <p className="alert alert-warning">Users unavailable: {error}</p>

  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle data-table">
        <thead>
          <tr>
            <th scope="col">Student</th>
            <th scope="col">Username</th>
            <th scope="col">Team</th>
            <th scope="col">Grade</th>
            <th scope="col">Points</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id ?? user.username}>
              <td>{user.firstName} {user.lastName}</td>
              <td>{user.username}</td>
              <td>{user.team?.name ?? 'Open roster'}</td>
              <td>{user.grade}</td>
              <td>{user.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users