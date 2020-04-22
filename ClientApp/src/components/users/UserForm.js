import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Alert from '../common/Alert'
import TextInput from '../common/textInput'
import Select from '../common/select'
import { userActions } from '../../store/Users'
import { alertActions } from '../../store/Alerts'
import { UserType } from '../../helpers/userTypes'
import { Link } from 'react-router-dom'

class UserForm extends React.Component {
  
  constructor(props) {
    super(props)

    const emptyUser = { 
      id: 0, 
      firstName: '', 
      lastName: '', 
      email: '', 
      type: UserType.User
    }

    this.state = {
      user: { ...emptyUser, ...this.props.user },
      errors: {}
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.user || this.props.user.id !== nextProps.user.id) {
        this.setState({user: {...nextProps.user}})
    }
  }

  handleChange(e) {
    const { name, value } = e.target
    this.setState({
      user: { 
        ...this.state.user,
        [name]: value 
      }
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    this.setState({
      submitted: true,
      errors: {}
    })
    const { id, firstName, lastName, email, type } = this.state.user
    if (this.isValid()) {
      this.props.updateUser({ id, firstName, lastName, email, type: +type })
    }
  }

  handleDelete(e) {
    e.preventDefault()
    if (this.state.user.id === this.state.currentUser) {
      alertActions.alertError('Cannot delete current user')
      return
    }
    let r = window.confirm('Are you sure you want to delete this?')
    r && this.props.deleteUser(this.state.user.id)
  }

  isValid() {
    let errors = {}
    if (!this.state.user.firstName) {
      errors.firstName = 'First name required'
    }
    if (!this.state.user.lastName) {
      errors.lastName = 'Last name required'
    }
    if (Object.keys(errors).length) {
      this.setState({ errors })
      return false
    }
    return true
  }
  
  render() {
    if (!this.props.user) return null
    const options = [
      { value: UserType.User, label: UserType.Display(UserType.User) },
      { value: UserType.Owner, label: UserType.Display(UserType.Owner) },
      { value: UserType.Admin, label: UserType.Display(UserType.Admin) },
    ]
    return (
      <div>
        <h1>Update User</h1>
        <Alert />
        <form onSubmit={this.handleSubmit} >
          <TextInput 
            type="text" 
            label="First Name" 
            name="firstName"
            value={this.state.user.firstName}
            onChange={this.handleChange}
            placeholder="name"
            error={this.state.errors.firstName} />
          <TextInput 
            type="text" 
            label="Last Name" 
            name="lastName"
            value={this.state.user.lastName}
            onChange={this.handleChange}
            placeholder="name"
            error={this.state.errors.lastName}  
          />
          <Select 
            label="User Type"
            name="type"
            value={this.state.user.type}
            onChange={this.handleChange}
            options={options}
            error={this.state.errors.type}
          />
          <input 
            type="submit" 
            value="Update User" 
            className="btn btn-success"
          />
        </form>
        <br ></br>
        <h2>Danger zone</h2>
          <input
            type="button"
            value="Delete User"
            className="btn btn-danger"
            onClick={this.handleDelete}
          />
          <br /><br />
          <Link className="btn btn-info btn-sm" to="/admin/users">Back to user admin</Link>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const userId = +ownProps.match.params.id
  return {
    user: (state.users.users && state.users.users.find(u => u.id === userId)) || {},
    currentUser: state.users.currentUser
  }
}

export default connect(
  mapStateToProps, 
  dispatch => bindActionCreators(userActions, dispatch)
)(UserForm)
