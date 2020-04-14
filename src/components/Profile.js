import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import EditDetails from './EditDetails';

//REDUX
import { connect } from 'react-redux';
import { logoutUser, uploadImage } from '../redux/actions/userActions';

//MUI Stuff
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';


//ICONS
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
import EditIcon from '@material-ui/icons/Edit';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MyButton from '../util/MyButton';

//Styles
const styles = {
    profile: {
        '& .image-wrapper': {
            textAlign: 'center',
            position: 'relative',
            '& button': {
                position: 'absolute',
                top: '80%',
                left: '70%'
            }
        },
        '& .profile-image': {
            width: 200,
            height: 200,
            objectFit: 'cover',
            maxWidth: '100%',
            borderRadius: '50%'
        },
        '& .profile-details': {
            textAlign: 'center',
            '& span, svg': {
                verticalAlign: 'middle'
            },
            '& a': {
                color: '#00bcd4'
            }
        },
        '& hr': {
            border: 'none',
            margin: '0 0 10px 0'
        },
        '& svg.button': {
            '&:hover': {
                cursor: 'pointer'
            }
        },
        paper: {},
    },
    buttons: {
        textAlign: 'center',
        '& a': {
            margin: '20px 10px'
        }
    },
    jobTitle: {
        textWeight: 'bold',
        color: 'primary'
    }

}

class Profile extends Component {
    constructor() {
        super();
        this.wrapper = React.createRef();
    }
    handleImageChange = (event) => {
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append('image', image, image.name);

        //Call method
        this.props.uploadImage(formData);
    }
    handleEditPicture = () => {
        const fileInput = document.getElementById('imageInput')
        fileInput.click();
    }

    handleLogout = () => {
        this.props.logoutUser();
    }
    render() {
        const {
            classes,
            user: {
                credentials: {
                    handle, createdAt, imageUrl, bio, job, website, location
                },
                loading,
                authenticated
            }
        } = this.props

        let profileMarkup = !loading ? (authenticated ? (
            <Paper
                className={classes.paper}
                ref={this.wrapper}
            >
                <div className={classes.profile}>
                    <div className="image-wrapper">
                        <img src={imageUrl} alt="profile" className="profile-image"></img>
                        <input
                            type='file'
                            id='imageInput'
                            hidden='hidden'
                            onChange={this.handleImageChange}
                        />
                        <MyButton tip='Edit profile picture' onClick={this.handleEditPicture} btnClassName='buttons'>
                            <EditIcon />
                        </MyButton>
                    </div>
                    <hr />
                    <div className="profile-details">
                        <MuiLink component={Link}
                            to={`users/${handle}`}
                            color="secondary"
                            variant="h5"
                        >
                            @{handle}
                        </MuiLink>
                        <hr />
                        {job && <Typography variant='body1' className={classes.jobTitle}>{job}</Typography>}
                        {bio && <Typography variant='body2'>{bio}</Typography>}
                        <hr />
                        {location && (
                            <Fragment>
                                <LocationOn color='primary' /><span>{location}</span>
                                <hr />
                            </Fragment>
                        )}
                        <hr />
                        {website && (
                            <Fragment>
                                <LinkIcon color='primary' />
                                <a href={website} target='_blank' rel='noopener noreferrer'>
                                    {' '}{website}
                                </a>
                                <hr />
                            </Fragment>
                        )}
                        <MyButton tip='Logout' onClick={this.handleLogout}>
                            <ExitToAppIcon color='primary' />
                        </MyButton>

                        <EditDetails />
                        <CalendarToday color='primary' />{' '}
                        <span>
                            Joined: {dayjs(createdAt).format('MM YYYY')}
                        </span>
                    </div>
                </div>
            </Paper>
        ) : (
                <Paper className={classes.paper}>
                    <Typography variant='body2' align='center'>
                        No profile found,please login again</Typography>
                    <div className={classes.buttons}>
                        <Button variant='contained' color='primary' component={Link} to='/login'>Login</Button>
                        <Button variant='contained' color='secondary' component={Link} to='/signup'>Signup</Button>
                    </div>

                </Paper>
            )) : (<p>Loading...</p>)

        return profileMarkup;
    }
}

Profile.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user
});

const mapActionsToProps = {
    uploadImage,
    logoutUser
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile));
