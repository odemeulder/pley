import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'reactstrap'

class UserTable extends React.Component {
    render() {
    if (!this.props.users || this.props.users.length === 0) return null
    return (
      <div>
        <h1>User Admin</h1>
        <Table>
          <thead>
            <tr>
              <td>id</td>
              <td>Name</td>
              <td>Email</td>
              <td>Type</td>
            </tr>
          </thead>
          <tbody>
            { this.props.users.map(u => (
              <tr key={u.id}>
                <th>{u.id}</th>
                <td><Link to={`/user-form/${u.id}`}>{u.firstName} {u.lastName}</Link></td>
                <td>{u.email}</td>
                <td>{u.type}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    )
  }
}

const userComparer = (r1, r2) => {
  let n1 = r1.lastName.toLowerCase()
  let n2 = r2.lastName.toLowerCase()
  if (n1 < n2) return -1
  if (n2 < n1) return 1
  return 0
}

const mapStateToProps = state => {
  let users = state.users.users ? [ ...state.users.users ] : []
  users = users.sort(userComparer)
  return {
    users,
    user: state.users.currentUsers
  }
}
export default connect(mapStateToProps)(UserTable)