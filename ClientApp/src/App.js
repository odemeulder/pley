import React from 'react'
import { Route } from 'react-router'
import Layout from './components/Layout'
import Home from './components/Home'
import LoginForm from './components/users/Login'
import RegisterForm from './components/users/Register'
import RestaurantList from './components/restaurants/RestaurantList'
import RestaurantDetail from './components/restaurants/RestaurantDetail'
import RestaurantTable from './components/restaurants/RestaurantTable'
import RestaurantForm from './components/restaurants/RestaurantForm'
import ReviewForm from './components/reviews/ReviewForm'
import ReplyForm from './components/reviews/ReplyForm'
import UserTable from './components/users/UserTable'
import UserForm from './components/users/UserForm'
import { UserType } from './helpers/userTypes'
import Authorize from './helpers/Authorize'

export default () => (
  <Layout>
    <Route exact path='/' component={Home} />
    <Route path='/login' component={LoginForm} />
    <Route path='/register' component={RegisterForm} />
    <Route path='/leave-review/:id' component={ReviewForm} />
    <Route path='/review-reply/:reviewId' component={ReplyForm} />
    <Route path='/restaurant/:id?' component={RestaurantDetail} />
    <Route path='/restaurants' component={RestaurantList} />
    <Route path='/restaurant-admin' component={Authorize(RestaurantTable, [ UserType.Owner, UserType.Admin ])} />
    <Route path='/restaurant-form/:id?' component={Authorize(RestaurantForm, [ UserType.Admin, UserType.Owner ])} />
    <Route path='/user-admin' component={Authorize(UserTable, [ UserType.Admin ]) } />
    <Route path='/user-form/:id' component={Authorize(UserForm, [ UserType.Admin ])} />
  </Layout>
)
