import React, { useState, useEffect } from 'react'
import RestaurantSummary from './RestaurantSummary'
import { RestaurantsApi } from '../../api/RestaurantsApi'

function Restaurants(props) {
  const [restaurants, setRestaurants] = useState([])
  const [filter, setFilter] = useState(['all'])
  useEffect(() => {
    RestaurantsApi.getAll().then(results => {
      const filterPredicate = restaurant => !filter || filter === 'all' || restaurant.averageRating === filter
      const filteredRestaurants = results.filter(filterPredicate)
      setRestaurants(filteredRestaurants)
    })
  }, [filter])
  
  const styleFlex = { display: 'flex' }

  return (
    <div>
      <h1>Restaurant List</h1>
      <div style={styleFlex} className="mb-3">
        <div>Filter by:</div>
        <div className="ml-2">
          <select name="ratingsFilter" onChange={e => setFilter(e.target.value)}>
            <option value="all">All ratings</option>
            { [0,1,2,3,4,5].map(i => (<option value={i}>{i} star{i===1 ? '' : 's'}</option>)) }
          </select>
        </div>
      </div>
      <ul className="list-unstyled">
        { restaurants.map(r => 
            (<li key={r.id}>
              <RestaurantSummary restaurant={r} owner={r.owner} />
            </li>)
        )}
      </ul>
      {props.children}
    </div>
  );
}

export default Restaurants;