import React from 'react'
import StarRatingComponent from 'react-star-rating-component'

class RestaurantSummary extends React.Component {
  render() {
    if (!this.props.restaurant) return null
    return (
      <div>
        <h4>{this.props.restaurant.restaurantName}</h4>
        <StarRatingComponent
            name='rating' 
            value={this.props.restaurant.averageRating} 
            starCount={5} 
            editing={false} 
        />
        <p>{this.props.restaurant.street}<br />{this.props.restaurant.city}, {this.props.restaurant.state} {this.props.restaurant.zip}</p>
        {this.props.restaurant.owner && <p>Owner: {this.props.restaurant.owner.firstName} {this.props.restaurant.owner.lastName}</p>}
      </div>
    )
  }
}

export default RestaurantSummary
