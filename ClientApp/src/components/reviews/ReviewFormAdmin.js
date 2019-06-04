import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import RestaurantSummary from '../restaurants/RestaurantSummary'
import TextArea from '../common/textArea'
import StarRatingComponent from 'react-star-rating-component'
import { reviewActions } from '../../store/Reviews'
import history from '../../helpers/history'
import PleyDatePicker from '../common/datePicker'
import { Link } from 'react-router-dom'

class ReviewForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      review: props.review,
      errors: {}
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleStarChange = this.handleStarChange.bind(this)
    this.handleDateChange = this.handleDateChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    console.log({nextProps})
    if (this.props.review.id !== nextProps.review.id) {
      this.setState({review: nextProps.review});
    }
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
    this.setState({
      review: {
        ...this.state.review,
        rating: e
      }
    })
  }

  handleDateChange(e) {
    this.setState({
      review: {
        ...this.state.review,
        visitDate: e
      }
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.updateReview(this.state.review)
  }

  render() {
    if (!this.state.review) return null
    return (
      <div>
        <h1>Review Admin</h1>
        { this.state.review && this.state.review.restaurant &&
          <RestaurantSummary restaurant={this.state.review.restaurant} />
        }
        <h3>Edit review</h3>
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
            value={this.state.review.customerReview}
            onChange={this.handleChange}
            error={this.state.errors.customerReview}
          />
          <TextArea
            name='ownerReply'
            label='Owner reply'
            value={this.state.review.ownerReply}
            onChange={this.handleChange}
            error={this.state.errors.ownerReply}
          />
          <PleyDatePicker
            name='visitDate'
            label='Date of visit'
            value={Date.parse(this.state.review.visitDate)}
            onChange={this.handleDateChange}
            error={this.state.errors.visitDate}
          />
          <input 
            type="submit" 
            value="Save Review" 
            className="btn btn-success"
          />
        </form>
        <span>
            <br />
            <h1>Danger zone</h1>
            <input 
              type="button"
              value="Delete Review"
              className="btn btn-danger"
              onClick={this.handleDelete}
            />
        </span>
        <br /><br />
        <Link className="btn btn-info btn-sm" to="/admin/reviews">Back to review admin</Link>

      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const reviewId = +ownProps.match.params.id
  let reviewToEdit = { 
    reviewId: '', reviewer: {}, customerReview: '', ownerReply: '', rating: 0, visitDate: ''
  }
  if (state.reviews && state.reviews.reviews.length > 0) {
    reviewToEdit = state.reviews.reviews.find(r => r.id === +reviewId)
  }
  console.log(reviewToEdit)
  return {
    review: reviewToEdit,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(reviewActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ReviewForm)