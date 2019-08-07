import React from 'react'
import { Route } from 'react-router'
import Layout from './components/Layout'
import Home from './components/Home'
import LoginForm from './components/users/Login'
import RegisterForm from './components/users/Register'
import RestaurantList from './components/restaurants/RestaurantList'
import RestaurantDetail from './components/restaurants/RestaurantDetail'
import RestaurantTable from './components/restaurants/RestaurantAdmin'
import RestaurantForm from './components/restaurants/RestaurantForm'
import Restaurants from './components/restaurants/Restaurants'
import ReviewForm from './components/reviews/ReviewForm'
import ReviewFormAdmin from './components/reviews/ReviewFormAdmin'
import ReplyForm from './components/reviews/ReplyForm'
import UserTable from './components/users/UserAdmin'
import ReviewAdmin from './components/reviews/ReviewAdmin'
import UserForm from './components/users/UserForm'
import { UserType } from './helpers/userTypes'
import Authorize from './helpers/Authorize'

const allLoggedInUsers = [UserType.User, UserType.Admin, UserType.Owner]

export default () => (
  <Layout>
    <Route exact path='/' component={Home} />
    <Route path='/login' component={LoginForm} />
    <Route path='/register' component={RegisterForm} />
    <Route 
      path='/leave-review/:id' 
      component={Authorize(ReviewForm, allLoggedInUsers)} />
    <Route 
      path='/edit-review/:id' 
      component={Authorize(ReviewFormAdmin, [UserType.Admin])} />
    <Route 
      path='/review-reply/:reviewId' 
      component={Authorize(ReplyForm, [UserType.Admin, UserType.Owner ])} />
    <Route 
      path='/restaurant/:id?' 
      component={Authorize(RestaurantDetail, allLoggedInUsers)} />
    <Route 
      path='/restaurants' 
      component={Authorize(RestaurantList, allLoggedInUsers)} />
    <Route 
      path='/restaurants2' 
      component={Authorize(Restaurants, allLoggedInUsers)} />
    <Route 
      path='/restaurant-form/:id?' 
      component={Authorize(RestaurantForm, [ UserType.Admin, UserType.Owner ])} />
    <Route 
      path='/admin/users' 
      component={Authorize(UserTable, [ UserType.Admin ]) } />
    <Route 
      path='/admin/reviews' 
      component={Authorize(ReviewAdmin, [ UserType.Admin ]) } />
    <Route 
      path='/admin/restaurants' 
      component={Authorize(RestaurantTable, [ UserType.Owner, UserType.Admin ])} />
    <Route 
      path='/user-form/:id' 
      component={Authorize(UserForm, [ UserType.Admin ])} />
  </Layout>
)
