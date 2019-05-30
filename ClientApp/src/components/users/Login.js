import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import TextInput from '../common/textInput'
import Alert from '../common/Alert'
import { userActions } from '../../store/Users'

class LoginForm extends React.Component {
  
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleSubmit(e) {
    e.preventDefault()
    const { email, password } = this.state
    if (email && password) {
      this.props.login(email, password)
    }
  }
  
  render() {
    return (
      <div>
        <h1>Login</h1>
        <Alert />
        <form onSubmit={this.handleSubmit} >
          <TextInput 
            type="email" 
            label="Email" 
            name="email"
            onChange={this.handleChange}
            placeholder="someone@gmail.com" />
          <TextInput 
            type="password" 
            label="Password" 
            onChange={this.handleChange}
            name="password" />
          <input 
            type="submit" 
            value="Login" 
            className="btn btn-primary"
            />
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {}
}

export default connect(
  mapStateToProps, 
  dispatch => bindActionCreators(userActions, dispatch)
)(LoginForm)
