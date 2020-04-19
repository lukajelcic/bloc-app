import React, { Component, Fragment } from 'react'
import withstyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import MyButton from '../util/MyButton';

//MUI Stuff
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
//REDUX
import { connect } from 'react-redux';
import { deletePost } from '../redux/actions/dataActions';

const styles = {
    deleteButton: {
        left: '120%',
        top: '50%',
        position: 'absolute'
    }
}
class DeleteBlog extends Component {
    constructor() {
        super();
        this.state = {
            open: false
        }
    }
    handleOpen = () => {
        this.setState({ open: true })
    }

    handleClose = () => {
        this.setState({ open: false })
    }

    deletePost = () => {
        this.props.deletePost(this.props.blogId)
        this.setState({ open: false })
    }
    render() {
        const { classes } = this.props
        return (
            <Fragment>
                <MyButton tip='Delete post'
                    onClick={this.handleOpen}
                    btnClassName={classes.deleteButton}
                >
                    <DeleteOutline color='secondary' />
                </MyButton>

                <Dialog open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth='sm'
                >
                    <DialogTitle>
                        Are you sure you want to delete this post?
                    </DialogTitle>

                    <DialogActions>
                        <Button onClick={this.handleClose} color='primary'>Cancel</Button>
                        <Button onClick={this.deletePost} color='secondary'>Delete</Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}
DeleteBlog.propTypes = {
    classes: PropTypes.object.isRequired,
    deletePost: PropTypes.func.isRequired,
    blogId: PropTypes.string.isRequired
}

export default connect(null, { deletePost })(withstyles(styles)(DeleteBlog));

