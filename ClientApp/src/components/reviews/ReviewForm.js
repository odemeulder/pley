import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import RestaurantSummary from '../restaurants/RestaurantSummary'
import TextArea from '../common/textArea'
import StarRatingComponent from 'react-star-rating-component'
import { reviewActions } from '../../store/Reviews'
import history from '../../helpers/history'

class ReviewForm extends React.Component {
  constructor(props) {
    super(props)

    const restaurantId = +props.match.params.id

    this.state = {
      review: {
        customerReview: '',
        rating: 0,
        restaurant: {
          id: restaurantId
        },
        reviewer: {
          id: props.reviewer.id
        }
      },
      restaurantId,
      errors: {}
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleStarChange = this.handleStarChange.bind(this)
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

  handleStarChange(e) {
    console.log(e)
    this.setState({
      review: {
        ...this.state.review,
        rating: e
      }
    })
  }


  handleSubmit(e) {
    e.preventDefault()
    this.props.createReview(this.state.review)
    history.push(`/restaurants/${this.state.restaurantId}`)
  }

  render() {
    return (
      <div>
        <h1>Leave review</h1>
        <RestaurantSummary restaurant={this.props.restaurant} />
        <h3>Enter your review</h3>
        <form onSubmit={this.handleSubmit}>
          <StarRatingComponent
              name='rating' 
              value={this.state.review.rating}
              starCount={5} 
              onStarClick={this.handleStarChange}
              starColor='#339933'
              editing={true}
          />
          <TextArea
            name='customerReview'
            label='Your review'
            placeHoder='In a few words, tell us how you liked it.'
            onChange={this.handleChange}
          />
          <input 
            type="submit" 
            value="Submit Review" 
            className="btn btn-primary"
          />
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const restaurantId = +ownProps.match.params.id
  return {
    restaurant: state.restaurants.restaurants.filter(r => r.id === restaurantId)[0],
    reviewer: state.authentication.user
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(reviewActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ReviewForm)