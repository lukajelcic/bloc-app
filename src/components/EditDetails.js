import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../util/MyButton';

//MUI Stuff
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

//Icons
import EditIcon from '@material-ui/icons/Edit';

//REDUX
import { connect } from 'react-redux';
import { editUserDetails } from '../redux/actions/userActions';
import { Button } from '@material-ui/core';

const styles = {
    textField: {
        margin: '10px auto 10px auto'
    },
    button: {
        float: 'right'
    }
}
class EditDetails extends Component {
    constructor() {
        super();
        this.state = {
            job: '',
            bio: '',
            location: '',
            website: '',
            open: false
        }
    }
    mapUserDetailsToState = (credentials) => {
        this.setState({
            job: credentials.job ? credentials.job : '',
            location: credentials.location ? credentials.location : '',
            bio: credentials.bio ? credentials.bio : '',
            website: credentials.website ? credentials.website : '',
        });
    };

    componentDidMount() {
        const { credentials } = this.props;
        this.mapUserDetailsToState(credentials);
    }

    handleOpen = () => {
        this.setState({ open: true })
        this.mapUserDetailsToState(this.props.credentials);
    }

    handleClose = () => {
        this.setState({ open: false })
    }

    handleChange = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = () => {
        const userDetails = {
            job: this.state.job,
            bio: this.state.bio,
            location: this.state.location,
            website: this.state.website
        }

        this.props.editUserDetails(userDetails);
        this.handleClose();
    }
    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                <MyButton tip='Edit Details' btnClassName={classes.button} onClick={this.handleOpen}>
                    <EditIcon color='primary' />
                </MyButton>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidt='sm'
                >
                    <DialogTitle>Edit your details</DialogTitle>
                    <DialogContent>
                        <form>
                            <TextField
                                id="job"
                                name="job"
                                type="text"
                                label="Job"
                                className={classes.textField}
                                value={this.state.job}
                                onChange={this.handleChange}
                                fullWidth />

                            <TextField
                                id="bio"
                                name="bio"
                                type="text"
                                label="Bio"
                                multiline
                                rows="3"
                                placeholder="A short info about yourself"
                                className={classes.textField}
                                value={this.state.bio}
                                onChange={this.handleChange}
                                fullWidth />

                            <TextField
                                id="location"
                                name="location"
                                type="text"
                                label="Location"
                                placeholder="Where are you live ?"
                                className={classes.textField}
                                value={this.state.location}
                                onChange={this.handleChange}
                                fullWidth />

                            <TextField
                                id="website"
                                name="website"
                                type="text"
                                label="Website"
                                placeholder="Your website"
                                className={classes.textField}
                                value={this.state.website}
                                onChange={this.handleChange}
                                fullWidth />
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">Cancel</Button>
                    </DialogActions>
                    <DialogActions>
                        <Button onClick={this.handleSubmit} color="primary">Save</Button>
                    </DialogActions>
                </Dialog>
            </Fragment >
        )
    }
}
EditDetails.propTypes = {
    editUserDetails: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    credentials: state.user.credentials
});


export default connect(mapStateToProps, { editUserDetails })(withStyles(styles)(EditDetails));
