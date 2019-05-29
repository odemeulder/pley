import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'reactstrap'
import StarRatingComponent from 'react-star-rating-component'

class RestaurantTable extends React.Component {
    render() {
    if (!this.props.restaurants || this.props.restaurants.length === 0) return null
    return (
      <div>
        <h1>Restaurant Admin</h1>
        <Table>
          <thead>
            <tr>
              <td>id</td>
              <td>Name</td>
              <td>Address</td>
              <td>Average Rating</td>
              <td>Unreplied Reviews</td>
            </tr>
          </thead>
          <tbody>
            { this.props.restaurants.map(r => (
              <tr key={r.id}>
                <th>{r.id}</th>
                <td><Link to={`/restaurant-form/${r.id}`}>{r.restaurantName}</Link></td>
                <td>{r.street}, {r.city}, {r.state} {r.zip}</td>
                <td>
                  <StarRatingComponent
                    name='rating' 
                    value={r.averageRating} 
                    starCount={5} 
                    editing={false} 
                  />
                </td>
                <td>
                  { r.unReplied === 0 
                  ? <span>-</span> 
                  : <Link to={`/restaurant/${r.id}`}>{r.unReplied}</Link>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    )
  }
}

const restaurantComparer = (r1, r2) => {
  let n1 = r1.restaurantName.toLowerCase()
  let n2 = r2.restaurantName.toLowerCase()
  if (n1 < n2) return -1
  if (n2 < n1) return 1
  return 0
}

const mapStateToProps = state => {
  let user = state.authentication.user
  let restaurants = state.restaurants.restaurants.filter(r => r.owner.id === user.id)
  restaurants = restaurants.sort(restaurantComparer)
  const reviews = state.reviews.reviews.filter(r => r.restaurantId)
  // state.reviews.reviews.filter(review => review.restaurantId === restaurant.id
  restaurants = restaurants.map(restaurant => 
    ({ ...restaurant, 
      unReplied: state.reviews.reviews.filter(review => 
        review.restaurantId === restaurant.id && !review.ownerReply
        ).length
    }))
  console.log({restaurants})
  return {
    restaurants,
    user
  }
}
export default connect(mapStateToProps)(RestaurantTable)