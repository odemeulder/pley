import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap'
import { Link } from 'react-router-dom'
import './NavMenu.css'
import { userActions } from '../../store/Users'

class NavMenu extends React.Component {
  
  constructor (props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };

    this.handleLogout = this.handleLogout.bind(this)
  }

  toggle () {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  handleLogout() {
    this.props.logout()
  }

  render () {
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3" light >
          <Container>
            <NavbarBrand tag={Link} className="text-logo" to="/">PLEY</NavbarBrand>
            <NavbarToggler onClick={this.toggle} className="mr-2" />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={this.state.isOpen} navbar>
              <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/restaurants">Restaurants</NavLink>
                </NavItem>
                { this.props.isLoggedIn 
                ?
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/" onClick={this.handleLogout}>Logout</NavLink>
                </NavItem>
                :
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/login">Login</NavLink>
                </NavItem>
                }
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}
const mapStateToProps = state => ({
  isLoggedIn: state.users && state.users.loggedIn,
})
export default connect(
  mapStateToProps,
  dispatch => bindActionCreators(userActions, dispatch)
)(NavMenu)
