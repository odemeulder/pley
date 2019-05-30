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
        <blockquote className="blockquote">
          <p className="mb-0">{this.props.review.customerReview}</p>
          <footer className="blockquote-footer">
            <cite title="Customer Review">
              {this.props.review.reviewer.firstName} {this.props.review.reviewer.lastName}
              {displayDate && <span> (Visit date: {displayDate})</span>}
            </cite>
          </footer>
        </blockquote>
        { this.props.review.ownerReply ?
          <blockquote className="blockquote">
            <p><b>Owner reply: </b><i>{this.props.review.ownerReply}</i></p>
          </blockquote> :
         this.props.allowReply && <Link to={`/review-reply/${this.props.review.id}`}>Reply to review</Link>
        }
      </div>
    )
  }
}

export default Review