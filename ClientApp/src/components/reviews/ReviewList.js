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
    return (
      <ul style={listStyle}>
        {
          this.props.reviews.map(r => (
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