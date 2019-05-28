import React from 'react'
import RestaurantSummary from './RestaurantSummary'

class RestaurantDetail extends React.Component {
  render() {
    return (
      <div>
        <h1>Restaurant View</h1>
        <RestaurantSummary restaurant={this.props.restaurant} />
      </div>
    )
  }
}

export default RestaurantDetail