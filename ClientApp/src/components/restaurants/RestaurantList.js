import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import RestaurantSummary from './RestaurantSummary'

class RestaurantList extends React.Component {
  
  render() {
    const listStyle = {
      listStyleType: 'none',
      columns: 2
    }
    return (
      <div>
        <h1>Restaurant List</h1>
        <ul style={listStyle}>
        { this.props.restaurants.map(r => 
            (<li key={r.id}>
              <RestaurantSummary restaurant={r} owner={r.owner} />
              <p><Link to={`/restaurant/${r.id}`}>Reviews</Link></p>
            </li>)
        )}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => ({
    restaurants: state.restaurants.restaurants
  })

export default connect(
  mapStateToProps)(RestaurantList)