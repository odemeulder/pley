import React from 'react'
import StarRatingComponent from 'react-star-rating-component'
import { Badge } from 'reactstrap'

class RestaurantSummary extends React.Component {
  render() {
    if (!this.props.restaurant) return null
    const badgeStyle = {
      fontSize: '50%',
      marginLeft: '4px',
    }
    return (
      <div>
        <h2>
          {this.props.restaurant.restaurantName}
          { this.props.restaurant.isTopRated && <Badge style={badgeStyle} color="success">Top Rated</Badge>}
          { this.props.restaurant.isBottomRated && <Badge style={badgeStyle} color="danger">Not too hot</Badge>}
        </h2>
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
