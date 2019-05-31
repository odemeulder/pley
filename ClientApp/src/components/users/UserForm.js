import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Alert from '../common/Alert'
import TextInput from '../common/textInput'
import { userActions } from '../../store/Users'
import { alertActions } from '../../store/Alerts'

class UserForm extends React.Component {
  
  constructor(props) {
    super(props)

    this.state = {
      user: { ...this.props.user },
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
      this.props.updateUser({ id, firstName, lastName, email, type })
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
            error={this.state.errors.lastName}  />
          <input 
            type="submit" 
            value="Update User" 
            className="btn btn-success"
          />
          <br />
          <br />
          <input
            type="button"
            value="Delete User"
            className="btn btn-danger"
            onClick={this.handleDelete}
          />
        </form>
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
