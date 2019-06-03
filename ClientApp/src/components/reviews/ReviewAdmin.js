import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'reactstrap'

class ReviewAdmin extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      ratingsFilter: '',
      restaurantsFilter: '',
      restaurants: [ ...props.restaurants],
      reviews: [ ...props.reviews],
    }

    this.handleFilterChange = this.handleFilterChange.bind(this)
  }

  filterPredicate = (valueToEvalueate, target) => 
    !target || target === 'all' || valueToEvalueate === target

  handleFilterChange(e) {
    const restaurantFilter = 
      e.target.name === 'restaurantsFilter' 
      ? +e.target.value 
      : +this.state.restaurantsFilter
    const ratingsFilter = 
      e.target.name === 'ratingsFilter' 
      ? +e.target.value 
      : +this.state.ratingsFilter
    this.setState({ ...this.state, 
      [e.target.name]: e.target.value,
      reviews: [ ...this.props.reviews.filter(r => {
        let f1 = this.filterPredicate(r.restaurantId, restaurantFilter)
        let f2 = this.filterPredicate(r.rating, ratingsFilter)
        return f1 && f2
        })],
    })
  }

  render() {
    if (!this.props.reviews || !this.props.reviews.length) return null
    const styleFlex = {
      display: 'flex'
    }
    return (
      <div>
        <h1>Review Admin</h1>
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
          <div className="ml-2">
            <select name="restaurantsFilter" onChange={this.handleFilterChange}>
              <option value="all">All restaurants</option>
              { this.state.restaurants.map(r => 
                <option value={r.id} key={r.id}>{r.restaurantName}</option>
              )}
            </select>
          </div>
        </div>
        <Table>
        <thead>
            <tr>
              <th>id</th>
              <th>Restaurant Name</th>
              <th>Rating</th>
              <th>Customer Name</th>
              <th>Customer Review</th>
              <th>Owner Reply</th>
            </tr>
          </thead>
          <tbody>
            { this.state.reviews.map(r => 
              <tr key={r.id}>
                <th><Link to={`/edit-review/${r.id}`}>{r.id}</Link></th>
                <td>{r.restaurant && r.restaurant.restaurantName}</td>
                <td>{r.rating}</td>
                <td>{r.reviewer && `${r.reviewer.firstName} ${r.reviewer.lastName}`}</td>
                <td>{truncateString(r.customerReview)}</td>
                <td>{truncateString(r.ownerReply)}</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    )
  }
}

const truncateString = (s, len = 255) => {
  if (!s) return ''
  if (s.length < 255) return s
  return s.substring(0, len) + ' ...'
} 

const mapStateToProps = (state) => {
  return {
    restaurants: state.restaurants.restaurants,
    reviews: state.reviews.reviews
  }
}

export default connect(mapStateToProps)(ReviewAdmin)