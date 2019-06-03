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
    const styleFlex = {
      display: 'flex'
    }
    return (
      <div>
        <h1>Restaurant View</h1>
        <RestaurantSummary restaurant={this.props.restaurant} />
        <hr />
        <h4>Customer Reviews</h4>
        <div style={styleFlex}>
          <div className="mt-1">
            Filter by: &nbsp;
          </div>
          <div>
            <select name="filter" onChange={this.handleFilterChange}>
              <option value="all">All ratings</option>
              <option value="0">0 stars</option>
              <option value="1">1 star</option>
              <option value="2">2 stars</option>
              <option value="3">3 stars</option>
              <option value="4">4 stars</option>
              <option value="5">5 stars</option>
            </select>
          </div>
          <div>
            <Link className="btn btn-info btn-sm ml-5" to={`/leave-review/${this.props.restaurant.id}`}>Leave Review</Link>
          </div>
        </div>
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