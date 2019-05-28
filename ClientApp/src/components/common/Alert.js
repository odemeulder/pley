import React from 'react'
import { connect } from 'react-redux'

class Alert extends React.Component {
  
  render() {
    const classes = this.props.alert.type === 'error' ? 'alert alert-danger' : 'alert alert-success'
    return (
      <div>
        { this.props.alert.message &&
          (<div className={classes} role="alert">
            {this.props.alert.message}
          </div>)
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({ alert: state.alert })

export default connect(mapStateToProps)(Alert) 
