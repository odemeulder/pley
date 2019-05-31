import React from 'react'

// Higher order component to enable Role base authorization
// e.g. usage:
// authorize(RestaurantTable, [ UserType.Owner, UserType.Admin ])

const Authorize = (WrappedComponent, roles) => props => {
  let user = JSON.parse(localStorage.getItem('user'))
  if (!user || roles.indexOf(user.type) === -1) return (<h1>Oops! Not Authorized</h1>)
  return (<div><WrappedComponent {...props}/></div>)
}

export default Authorize