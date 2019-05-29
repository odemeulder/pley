import React from 'react'
import StarRatingComponent from 'react-star-rating-component'
import { Link } from 'react-router-dom'

const formatDate = d => {
  var date = new Date(d)
  return date.getTime() !== (new Date('0001-01-01T00:00:00')).getTime()
  ? (date.getMonth()+1) + '/' + date.getDate() + '/' +  date.getFullYear()
  : null
}

class Review extends React.Component {

  render() {
    if (!this.props.review) return null
    const displayDate = formatDate(this.props.review.visitDate)
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
          {displayDate && <span><br />Visit date: {displayDate}</span>}
          {this.props.review.reviewer && (<i><br /> ({this.props.review.reviewer.firstName} {this.props.review.reviewer.lastName})</i>)}
        </p>
        { this.props.review.ownerReply ?
         <p><b>Owner reply:</b><i>{this.props.review.ownerReply}</i></p> :
         this.props.allowReply && <Link to={`/review-reply/${this.props.review.id}`}>Reply to review</Link>
        }
      </div>
    )
  }
}

export default Review