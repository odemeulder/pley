import React from 'react'
import { connect } from 'react-redux'
import RestaurantSummary from './RestaurantSummary'
import { Link } from 'react-router-dom'
import ReviewList from '../reviews/ReviewList'

class RestaurantDetail extends React.Component {

  render() {
    if (!this.props.restaurant) return null
    return (
      <div>
        <h1>Restaurant View</h1>
        <RestaurantSummary restaurant={this.props.restaurant} />
        <Link className="btn btn-info btn-sm" to={`/leave-review/${this.props.restaurant.id}`}>Leave Review</Link>
        <ReviewList reviews={this.props.reviews} />
        <Link className="btn btn-info btn-sm" to="/restaurants">Back to list</Link>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const restaurantId = +ownProps.match.params.id
  let reviews = state.reviews.reviews.filter(r => r.restaurantId === restaurantId)
  return {
    restaurant: state.restaurants.restaurants.filter(r => r.id === restaurantId)[0],
    reviews
  }
}

export default connect(mapStateToProps)(RestaurantDetail)