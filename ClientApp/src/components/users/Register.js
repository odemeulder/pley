import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Alert from '../common/Alert'
import TextInput from '../common/textInput'
import { userActions } from '../../store/Users'

class RegisterForm extends React.Component {
  
  constructor(props) {
    super(props)

    this.state = {
      user: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordVerify: '',
        type: 2  
      },
      submitted: false,
      errors: {}
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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
    const { firstName, lastName, email, password, type } = this.state.user
    if (this.isValid()) {
      this.props.register({ firstName, lastName, email, password, type })
    }
  }

  isValid() {
    let errors = {}
    if (!this.state.user.firstName) {
      errors.firstName = 'First name required'
    }
    if (!this.state.user.lastName) {
      errors.lastName = 'Last name required'
    }
    if (!this.state.user.email) {
      errors.email = 'Email required'
    }
    if (!this.state.user.password) {
      errors.password = 'Password required'
    }
    if (this.state.user.password !== this.state.user.passwordVerify) {
      errors.passwordVerify = 'Password does not match'
    }
    if (Object.keys(errors).length) {
      this.setState({ errors })
      return false
    }
    return true
  }
  
  render() {
    return (
      <div>
        <h1>Register</h1>
        <Alert />
        <form onSubmit={this.handleSubmit} >
          <TextInput 
            type="text" 
            label="First Name" 
            name="firstName"
            onChange={this.handleChange}
            placeholder="name"
            error={this.state.errors.firstName} />
          <TextInput 
            type="text" 
            label="Last Name" 
            name="lastName"
            onChange={this.handleChange}
            placeholder="name"
            error={this.state.errors.lastName}  />
          <TextInput 
            type="email" 
            label="Email" 
            name="email"
            onChange={this.handleChange}
            placeholder="someone@gmail.com"
            error={this.state.errors.email}  />
          <TextInput 
            type="password" 
            label="Password" 
            onChange={this.handleChange}
            name="password"
            error={this.state.errors.password}  />
          <TextInput 
            type="password" 
            label="Verify Password" 
            onChange={this.handleChange}
            name="passwordVerify"
            error={this.state.errors.passwordVerify}  />
          <input 
            type="submit" 
            value="Register" 
            className="btn btn-primary"
            />
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { registering } = state.users
  return {
    registering
  }
}

export default connect(
  mapStateToProps, 
  dispatch => bindActionCreators(userActions, dispatch)
)(RegisterForm)
