import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import TextInput from '../common/textInput'
import { restaurantActions } from '../../store/Restaurants'
import Alert from '../common/Alert'

class RestaurantForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      restaurant: {...this.props.restaurant},
      errors: {}
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.restaurant.id !== nextProps.restaurant.id) {
        this.setState({restaurant: Object.assign({}, nextProps.restaurant)})
    }
  }

  handleChange(e) {
    const { name, value } = e.target
    this.setState({
      restaurant: { 
        ...this.state.restaurant,
        [name]: value 
      }
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    if (this.isValid) {
      this.state.restaurant.id 
        ? this.props.updateRestaurant(this.state.restaurant)
        : this.props.createRestaurant(this.state.restaurant)
    }
  }

  handleDelete(e) {
    e.preventDefault()
    let r = window.confirm('Are you sure you want to delete this?')
    r && this.props.deleteRestaurant(this.state.restaurant.id)
  }

  isValid() {
    let errors = {}
    if (!this.state.restaurant.restaurantName) {
      errors.restaurantName = 'Restaurant name required'
    }
    if (Object.keys(errors).length) {
      this.setState({ errors })
      return false
    }
    return true
  }

  render() {
    console.log('restaurant form')
    return (
      <div>
        <Alert />
        <h1>Create / edit restaurant</h1>
        <form onSubmit={this.handleSubmit}>
        <TextInput 
            type="text" 
            value={this.state.restaurant.restaurantName}
            label="Restaurant Name" 
            name="restaurantName"
            onChange={this.handleChange}
            placeholder="Restaurant Name"
            error={this.state.errors.restaurantName} />
        <TextInput 
            type="text" 
            value={this.state.restaurant.street}
            label="Street" 
            name="street"
            onChange={this.handleChange}
            placeholder="Street Name"
            error={this.state.errors.street} />
        <TextInput 
            type="text" 
            value={this.state.restaurant.city}
            label="City" 
            name="city"
            onChange={this.handleChange}
            placeholder="City"
            error={this.state.errors.city} />
        <TextInput 
            type="text" 
            value={this.state.restaurant.state}
            label="State" 
            name="state"
            onChange={this.handleChange}
            placeholder="State"
            error={this.state.errors.state} />
        <TextInput 
            type="text" 
            value={this.state.restaurant.zip}
            label="Zip Code" 
            name="zip"
            onChange={this.handleChange}
            placeholder="Zip Code"
            error={this.state.errors.zip} />
          <input 
            type="submit" 
            value="Save Restaurant" 
            className="btn btn-success"
          />
          <br />
          <br />
          <input 
            type="button"
            value="Delete Restaurant"
            className="btn btn-danger"
            onClick={this.handleDelete}
          />
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const restaurantId = +ownProps.match.params.id
  let emptyRestaurant = {
    restaurantName: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    owner: state.users.currentUser
  }
  return { 
    restaurant: state.restaurants.restaurants.find(r => r.id === restaurantId) || emptyRestaurant, 
    owner: state.users.currentUser
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(restaurantActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantForm)