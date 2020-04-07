import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import Blog from '../components/Blog';

class home extends Component {
    state = {
        blogs: null
    }
    componentDidMount() {
        axios.get('/blogs')
            .then(res => {
                this.setState({
                    blogs: res.data
                })
            })
            .catch(err => {
                console.log(err);
            })
    }
    render() {
        let recentBlogs = this.state.blogs ? (
            this.state.blogs.map(blog => <Blog key={blog.blogId} blog={blog} />)
        ) : <p>Loading ...</p>
        return (
            <Grid container>
                <Grid item sm={8} xs={12}>
                    {recentBlogs}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <p>Profile...</p>
                </Grid>
            </Grid>
        )
    }
}

export default home
