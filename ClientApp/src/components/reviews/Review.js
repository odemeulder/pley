import React from 'react'
import StarRatingComponent from 'react-star-rating-component'

class Review extends React.Component {

  render() {
    if (!this.props.review) return null
    return (
      <div>
        <StarRatingComponent
            name='rating' 
            value={this.props.review.rating} 
            starCount={5} 
            editing={false} 
        />
        <p>
          {this.props.review.customerReview}
    {this.props.review.reviewer && (<i><br /> ({this.props.review.reviewer.firstName} {this.props.review.reviewer.lastName})</i>)}
        </p>
        { this.props.review.ownerReply && <p><b>Owner reply:</b><i>{this.props.review.ownerReply}</i></p>}
      </div>
    )
  }
}

export default Review