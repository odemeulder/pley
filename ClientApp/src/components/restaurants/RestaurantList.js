import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import RestaurantSummary from './RestaurantSummary'

class RestaurantList extends React.Component {
  
  render() {
    const listStyle = {
      columns: 2
    }
    return (
      <div>
        <h1>Restaurant List</h1>
        <ul className="list-unstyled" style={listStyle}>
        { this.props.restaurants.map(r => 
            (<li key={r.id}>
              <RestaurantSummary restaurant={r} owner={r.owner} />
              <p><Link to={`/restaurant/${r.id}`}>Reviews</Link></p>
            </li>)
        )}
        </ul>
        {this.props.children}
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
  let restaurants = state.restaurants.restaurants
  restaurants = restaurants.sort(restaurantComparer)
  return {
    restaurants
  }
}
export default connect(mapStateToProps)(RestaurantList)