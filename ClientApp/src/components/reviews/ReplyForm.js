import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import RestaurantSummary from '../restaurants/RestaurantSummary'
import Review from './Review'
import TextArea from '../common/textArea'
import { reviewActions } from '../../store/Reviews'
import Alert from '../common/Alert'

class ReplyForm extends React.Component {
  constructor(props) {
    super(props)

    const restaurantId = +props.match.params.id

    this.state = {
      review: {
        id: props.review && props.review.id,
        customerReview: '',
        rating: 0,
        restaurant: props.restaurant || {},
        visitDate: new Date(),
        reviewer: {
          id: props.owner && props.owner.id
        },
        ownerReply: ''
      },
      restaurantId,
      errors: {}
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    const { name, value } = e.target
    this.setState({
      review: { 
        ...this.state.review,
        [name]: value 
      }
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.replyReview(this.state.review)
  }

  render() {
    return (
      <div>
        <h1>Leave review</h1>
        <Alert />
        <RestaurantSummary restaurant={this.props.restaurant} />
        <h3>Customer review</h3>
        <Review review={this.props.review} allowReply={false} />
        <h3>Enter your reply to the review</h3>
        <form onSubmit={this.handleSubmit}>
          <TextArea
            name='ownerReply'
            placeholder='This is your chance to reply.'
            onChange={this.handleChange}
            error={this.state.errors.ownerReply}
          />
          <input 
            type="submit" 
            value="Submit Reply" 
            className="btn btn-primary"
          />
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const reviewId = +ownProps.match.params.reviewId
  const review = state.reviews.reviews.filter(r => r.id === reviewId)[0]
  const restaurant = review && review.restaurant && state.restaurants.restaurants.filter(r => r.id === review.restaurant.id)[0]
  return {
    restaurant,
    review,
    owner: state.users.currentUser,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(reviewActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ReplyForm)