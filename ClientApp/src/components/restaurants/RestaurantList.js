import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { restaurantActions } from '../../store/Restaurants'

class Restaurant extends React.Component {
  render() {
    if (!this.props.restaurant) return null
    return (
      <div>
        <h4>{this.props.restaurant.restaurantName}</h4>
        <p>{this.props.restaurant.averageRating}</p>
        <p>{this.props.restaurant.street}<br />{this.props.restaurant.city}, {this.props.restaurant.state} {this.props.restaurant.zip}</p>
        {this.props.restaurant.owner && <p>Owner: {this.props.restaurant.owner.firstName} {this.props.restaurant.owner.lastName}</p>}
      </div>
    )
  }
}

class RestaurantList extends React.Component {
  
  componentDidMount() {
    this.props.fetchAllRestaurants()
  }

  render() {
    return (
      <div>
        <h1>Restaurant List</h1>
        { this.props.restaurants.map(r => 
            (<Restaurant restaurant={r} owner={r.owner} key={r.id} />)
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
    restaurants: state.restaurants.restaurants
  })

export default connect(
  mapStateToProps, 
  dispatch =>  bindActionCreators(restaurantActions, dispatch)
)(RestaurantList)