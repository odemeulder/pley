import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { restaurantActions } from '../../store/Restaurants'
import RestaurantSummary from './RestaurantSummary'

class RestaurantList extends React.Component {
  
  componentDidMount() {
    this.props.fetchAllRestaurants()
  }

  render() {
    return (
      <div>
        <h1>Restaurant List</h1>
        { this.props.restaurants.map(r => 
            (<RestaurantSummary restaurant={r} owner={r.owner} key={r.id} />)
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