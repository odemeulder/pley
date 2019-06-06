import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import RestaurantSummary from './RestaurantSummary'

class RestaurantList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      ratingsFilter: null,
    }

    this.handleFilterChange = this.handleFilterChange.bind(this)
  }

  filterPredicate = (valueToEvalueate, target) => 
    !target || target === 'all' || valueToEvalueate === +target

  handleFilterChange(e) {
    this.setState({ ...this.state, 
      [e.target.name]: e.target.value
    })
  }

  render() {
    const styleFlex = { display: 'flex' }
    let restaurants = [...this.props.restaurants]
    let maxRating = 0
    let minRating = 5
    restaurants.forEach(r => {
      maxRating = Math.max(maxRating, r.averageRating)
      minRating = Math.min(minRating, r.averageRating)
    })
    restaurants = restaurants.map(r => {
      r.isTopRated = r.averageRating === maxRating
      r.isBottomRated =  r.averageRating === minRating
      return r
    })
    restaurants = restaurants.filter(r => this.filterPredicate(r.averageRating, this.state.ratingsFilter))
    return (
      <div>
        <h1>Restaurant List</h1>
        <div style={styleFlex} className="mb-3">
          <div>Filter by:</div>
          <div className="ml-2">
            <select name="ratingsFilter" onChange={this.handleFilterChange}>
              <option value="all">All ratings</option>
              <option value="0">0 stars</option>
              <option value="1">1 star</option>
              <option value="2">2 stars</option>
              <option value="3">3 stars</option>
              <option value="4">4 stars</option>
              <option value="5">5 stars</option>
            </select>
          </div>
        </div>
        <ul className="list-unstyled">
        { restaurants.map(r => 
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
  let n1 = r1.averageRating
  let n2 = r2.averageRating
  if (n1 < n2) return 1
  if (n2 < n1) return -1
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