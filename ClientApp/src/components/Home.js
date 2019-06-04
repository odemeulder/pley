import React from 'react';
import { connect } from 'react-redux';
import './common/theme.css'
import { Link } from 'react-router-dom'
import { UserType } from '../helpers/userTypes'
import RestaurantList from './restaurants/RestaurantList'

const Home = props => {
  const isAdmin = props.isLoggedIn && props.userRole === UserType.Admin
  return (
  <div>
    <h1>Welcome to PLEY</h1>
    <p>The new website for restaurant reviews.</p>
    { isAdmin &&
    <div>
      <h2>Admin</h2>
      <div className="row">
        <div className="col-md-4">
          <p><Link className="btn btn-info btn-block" to="/admin/restaurants">Manage Restaurants</Link></p>
          <p><Link className="btn btn-info btn-block" to="/admin/users">Manage Users</Link></p>
          <p><Link className="btn btn-info btn-block" to="/admin/reviews">Manage Reviews</Link></p>    
        </div>
      </div>
    </div>
    }
    { !props.isLoggedIn &&
    <div className="row">
      <div className="col-md-4">
        <p><Link className="btn btn-info btn-block" to="/login">Login</Link></p>
        <p><Link className="btn btn-info btn-block" to="/register">Register</Link></p>
      </div>
    </div>
    }
    { props.isLoggedIn && <RestaurantList /> }
  </div>
)}


const mapStateToProps = state => ({
  isLoggedIn: state.users && state.users.loggedIn,
  userRole: state.users && state.users.currentUser && state.users.currentUser.type
})

export default connect(mapStateToProps)(Home);
