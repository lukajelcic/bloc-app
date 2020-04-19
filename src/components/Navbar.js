import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MyButton from '../util/MyButton';

//MUI Staff
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

//Icons
import AddIcon from '@material-ui/icons/Add';
import HomeIcon from '@material-ui/icons/Home';
import Notifications from '@material-ui/icons/Notifications';
import PostBlog from './PostBlog';

class Navbar extends Component {

    render() {
        const { authenticated } = this.props
        return (
            <AppBar>
                <Toolbar className='nav-container'>
                    {authenticated ? (
                        <Fragment>
                            <PostBlog />

                            <Link to='/'>
                                <MyButton tip='Home page'>
                                    <HomeIcon />
                                </MyButton>
                            </Link>
                            <Link to='/notifications'>
                                <MyButton tip='Notifications'>
                                    <Notifications />
                                </MyButton>
                            </Link>
                        </Fragment>
                    ) : (
                            <Fragment>
                                <Button color='inherit' component={Link} to='/login'>Login</Button>
                                <Button color='inherit' component={Link} to='/'>Home</Button>
                                <Button color='inherit' component={Link} to='/signup'>Signup</Button>
                            </Fragment>
                        )}
                </Toolbar>
            </AppBar>
        )
    }
}
Navbar.propTypes = {
    authenticated: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
    authenticated: state.user.authenticated
})

export default connect(mapStateToProps)(Navbar);
