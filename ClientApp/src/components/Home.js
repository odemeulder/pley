import React from 'react';
import { connect } from 'react-redux';
import './common/theme.css'
import { Link } from 'react-router-dom'
import { UserType } from '../helpers/userTypes'
import RestaurantList from './restaurants/RestaurantList'
import { Card, CardHeader, CardBody } from 'reactstrap';

const Home = props => {
  const isAdmin = props.isLoggedIn && props.userRole === UserType.Admin
  const isOwner = props.isLoggedIn && props.userRole === UserType.Owner
  return (
  <div>
    <h1>Welcome to PLEY</h1>
    <p>The new website for restaurant reviews.</p>
    { isAdmin &&
    <Card>
      <CardHeader>Admin</CardHeader>
      <CardBody>
        <p><Link className="btn btn-info" to="/admin/restaurants">Manage Restaurants</Link></p>
        <p><Link className="btn btn-info" to="/admin/users">Manage Users</Link></p>
        <p><Link className="btn btn-info" to="/admin/reviews">Manage Reviews</Link></p>    
      </CardBody>
    </Card>
    }
    { isOwner &&
    <Card>
      <CardHeader>Owner Admin</CardHeader>
      <CardBody>
        <p><Link className="btn btn-info" to="/admin/restaurants">Manage Restaurants</Link></p>
      </CardBody>
    </Card>
    }
    { !props.isLoggedIn &&
    <Card>
      <CardHeader>Owner Admin</CardHeader>
      <CardBody>
        <p><Link className="btn btn-info" to="/login">Login</Link></p>
        <p><Link className="btn btn-info" to="/register">Register</Link></p>
      </CardBody>
    </Card>
    }
    <br />
    { props.isLoggedIn && <RestaurantList /> }
  </div>
)}


const mapStateToProps = state => ({
  isLoggedIn: state.users && state.users.loggedIn,
  userRole: state.users && state.users.currentUser && state.users.currentUser.type
})

export default connect(mapStateToProps)(Home);
