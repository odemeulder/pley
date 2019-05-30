import React from 'react'
import { Route } from 'react-router'
import Layout from './components/Layout'
import Home from './components/Home'
import Counter from './components/Counter'
import FetchData from './components/FetchData'
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

export default () => (
  <Layout>
    <Route exact path='/' component={Home} />
    <Route path='/counter' component={Counter} />
    <Route path='/fetch-data/:startDateIndex?' component={FetchData} />
    <Route path='/login' component={LoginForm} />
    <Route path='/register' component={RegisterForm} />
    <Route path='/leave-review/:id' component={ReviewForm} />
    <Route path='/review-reply/:reviewId' component={ReplyForm} />
    <Route path='/restaurant/:id?' component={RestaurantDetail} />
    <Route path='/restaurants' component={RestaurantList} />
    <Route path='/restaurant-admin' component={RestaurantTable} />
    <Route path='/restaurant-form/:id' component={RestaurantForm} />
    <Route path='/user-admin' component={UserTable} />
    <Route path='/user-form/:id' component={UserForm} />
  </Layout>
)
