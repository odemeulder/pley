import React from 'react'
import Review from './Review'

class ReviewList extends React.Component {
  render() {
    const listStyle = {
      listStyleType: 'none',
      padding: 0,
    }
    const listItemStyle = {
      border: '1px solid #eee',
      marginTop: '4px',
      padding: '3px'
    }
    const allowReply = r => !r.ownerReply
    const reviewComparerDesc = (r1, r2) => {
      if (r1.rating < r2.rating) return 1
      else if (r1.rating > r2.rating) return -1
      return 0
    }
    const orderedReviews = this.props.reviews.sort(reviewComparerDesc)
    const filterValue = this.props.filter
    const shouldInclude = review => !filterValue || filterValue === 'all' || review.rating === +filterValue
    const filteredReviews = orderedReviews.filter(shouldInclude)
    if (filteredReviews.length === 0) {
      return (<p>No reviews.</p>)
    }
    return (
      <ul style={listStyle}>
        {
          filteredReviews.map(r => (
            <li key={r.id} style={listItemStyle}>
              <Review review={r} allowReply={allowReply(r)} />
            </li>
          ))
        }
      </ul>
    )
  }
}

export default ReviewList