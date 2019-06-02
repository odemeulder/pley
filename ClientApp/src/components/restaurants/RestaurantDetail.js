import React from 'react'
import { connect } from 'react-redux'
import RestaurantSummary from './RestaurantSummary'
import { Link } from 'react-router-dom'
import ReviewList from '../reviews/ReviewList'

class RestaurantDetail extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      filter: ''
    }

    this.handleFilterChange = this.handleFilterChange.bind(this)
  }

  handleFilterChange(e) {
    this.setState({ ...this.state, filter: e.target.value})
  }

  render() {
    if (!this.props.restaurant) return null
    return (
      <div>
        <h1>Restaurant View</h1>
        <RestaurantSummary restaurant={this.props.restaurant} />
        <Link className="btn btn-info btn-sm" to={`/leave-review/${this.props.restaurant.id}`}>Leave Review</Link>
        <h3>Customer Reviews</h3>
        <p>Filter by: &nbsp;
          <select name="filter" onChange={this.handleFilterChange}>
            <option value="all">All ratings</option>
            <option value="0">0 stars</option>
            <option value="1">1 star</option>
            <option value="2">2 stars</option>
            <option value="3">3 stars</option>
            <option value="4">4 stars</option>
            <option value="5">5 stars</option>
          </select>
        </p>
        <ReviewList reviews={this.props.reviews} filter={this.state.filter} />
        <Link className="btn btn-info btn-sm" to="/restaurants">Back to restaurant list</Link>
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