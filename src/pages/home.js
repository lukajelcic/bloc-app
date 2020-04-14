import React, { Component } from 'react';
import axios from 'axios';
import Blog from '../components/Blog';
import Profile from '../components/Profile';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPost } from '../redux/actions/dataActions';

//MUI Stuff
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = {
    progress: {
        color: 'orange',
        positin: 'absolute'
    }
}

class home extends Component {
    constructor() {
        super();
        this.state = {
            blogs: null
        }
    }
    componentDidMount() {
        this.props.getPost()
    }
    render() {
        const { loading, blogs } = this.props.data
        const { classes } = this.props

        let recentBlogs = !loading ? (
            blogs.map(blog => <Blog key={blog.blogId} blog={blog} />)
        ) : <CircularProgress size={60} className={classes.progress} />

        return (
            <Grid container>
                <Grid item sm={8} xs={12} >
                    {recentBlogs}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <Profile />
                </Grid>
            </Grid>
        )
    }
}

home.propTypes = {
    getPost: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    data: state.data
})
export default connect(mapStateToProps, { getPost })(withStyles(styles)(home));
