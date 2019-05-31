import React from 'react';
import { connect } from 'react-redux';
import './common/theme.css'
import { Link } from 'react-router-dom'

const Home = props => (
  <div>
    <h1>Welcome to PLEY</h1>
    <p>The new website for restaurant reviews.</p>
    <p><Link className="btn btn-info" to="/restaurant-admin">Manage Restaurants</Link></p>
    <p><Link className="btn btn-info" to="/user-admin">Manage Users</Link></p>
  </div>
);

export default connect()(Home);
