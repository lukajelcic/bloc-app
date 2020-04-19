import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../util/MyButton';

//MUI Stuff
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import { Button } from '@material-ui/core';

//REDUX
import { connect } from 'react-redux';
import { postBlog } from '../redux/actions/dataActions';

const styles = {
    textField: {
        margin: '10px auto 10px auto'
    },
    closeButton: {
        position: 'absolute',
        left: '90%',
        top: '10%'
    },
    submitButton: {
        position: 'relative',
    },
    progressSpinner: {
        position: 'absolute'
    }
}

class PostBlog extends Component {
    state = {
        open: false,
        title: '',
        body: '',
        blogImageUrl: '',
        errors: {}
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.UI.errors) {
            this.setState({ errors: nextProps.UI.errors });
        }
        if (!nextProps.UI.errors && !nextProps.UI.loading) {
            this.setState({
                title: '',
                body: '',
                blogImageUrl: ''
            });
            this.handleClose();
        }
    }

    handleOpen = () => {
        this.setState({ open: true })
    }
    handleClose = () => {
        this.setState({
            open: false,
            title: '',
            body: '',
            blogImageUrl: '',
            errors: {}
        })
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handleSubmit = (event) => {
        event.preventDefault();
        const newPost = {
            title: this.state.title,
            body: this.state.body,
            blogImageUrl: this.state.blogImageUrl
        }
        this.props.postBlog(newPost);
    }
    render() {
        const { errors } = this.state
        const { classes, UI: { loading } } = this.props
        return (
            <Fragment>
                <MyButton tip="Post a Bloc" onClick={this.handleOpen}>
                    <AddIcon />
                </MyButton>

                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm"
                >
                    <MyButton tip="Close" onClick={this.handleClose} tipClassName={classes.closeButton}>
                        <CloseIcon />
                    </MyButton>
                    <DialogTitle>Post a new Bloc</DialogTitle>

                    <DialogContent>
                        <form onSubmit={this.handleSubmit}>
                            <TextField
                                id="title"
                                name="title"
                                type="text"
                                label="Title"
                                placeholder="Bloc title"
                                error={errors.title ? true : false}
                                helperText={errors.title}
                                className={classes.textField}
                                value={this.state.title}
                                onChange={this.handleChange}
                                fullWidth />

                            <TextField
                                id="body"
                                name="body"
                                type="text"
                                label="Body"
                                multiline
                                rows="3"
                                placeholder="Bloc content"
                                error={errors.body ? true : false}
                                helperText={errors.body}
                                className={classes.textField}
                                value={this.state.body}
                                onChange={this.handleChange}
                                fullWidth />

                            <TextField
                                id="blogImageUrl"
                                name="blogImageUrl"
                                type="text"
                                label="Image URL"
                                placeholder="Bloc image"
                                error={errors.blogImageUrl ? true : false}
                                helperText={errors.blogImageUrl}
                                className={classes.textField}
                                value={this.state.blogImageUrl}
                                onChange={this.handleChange}
                                fullWidth />

                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                className={classes.submitButton}
                                disabled={loading}
                            >
                                Add a Bloc
                            {loading && (
                                    <CircularProgress size={30} className={classes.progressSpinner} />
                                )}
                            </Button>

                        </form>
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}

PostBlog.propTypes = {
    postBlog: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    UI: state.UI
})

export default connect(mapStateToProps, { postBlog })(withStyles(styles)(PostBlog))
