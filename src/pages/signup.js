import React, { Component } from 'react'
import PropTypes from 'prop-types';
import appImg from '../images/fav32.png';
import axios from 'axios';
import { Link } from 'react-router-dom';

//MUI Stuff
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import withStyles from '@material-ui/core/styles/withStyles';


const styles = {
    form: {
        textAlign: 'center'
    },
    image: {
        padding: '20px auto 20px auto'
    },
    pageTitle: {
        margin: '10px auto 10px auto'
    },
    textField: {
        margin: '10px auto 10px auto'
    },
    button: {
        marginTop: 20,
        position: 'relative'
    },
    progress: {
        position: 'absolute',
        color: 'orange'
    },
    customError: {
        color: 'red',
        fontSize: '0.8rem',
        margin: 10
    }
}

class signup extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            handle: '',
            loading: null,
            errors: {}
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            loading: false
        })
        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle: this.state.handle
        }
        axios.post('/signup', newUserData)
            .then(res => {
                console.log(res);
                localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`)
                this.setState({
                    loading: false
                })
                this.props.history.push('/')
            })
            .catch(err => {
                console.error(err);
                this.setState({
                    loading: false,
                    errors: err.response.data
                })
            })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        const { errors, loading } = this.state
        const { classes } = this.props
        return (
            <Grid className={classes.form} container>
                <Grid item sm />
                <Grid item sm>
                    <img src={appImg} className={classes.image} alt='media'></img>
                    <Typography variant='h2' className={classes.pageTitle}>Signup</Typography>
                    <form noValidate onSubmit={this.handleSubmit}>

                        <TextField
                            id='email'
                            name='email'
                            type='email'
                            label='Email'
                            fullWidth
                            value={this.state.email}
                            helperText={errors.email}
                            error={errors.email ? true : false}
                            onChange={this.handleChange}
                            className={classes.textField}
                        ></TextField>

                        <TextField
                            id='password'
                            name='password'
                            type='password'
                            label='Password'
                            fullWidth
                            value={this.state.password}
                            helperText={errors.password}
                            error={errors.password ? true : false}
                            onChange={this.handleChange}
                            className={classes.textField}
                        > </TextField>

                        <TextField
                            id='confirmPassword'
                            name='confirmPassword'
                            type='password'
                            label='Confirm password'
                            fullWidth
                            value={this.state.confirmPassword}
                            helperText={errors.confirmPassword}
                            error={errors.confirmPassword ? true : false}
                            onChange={this.handleChange}
                            className={classes.textField}
                        ></TextField>

                        <TextField
                            id='handle'
                            name='handle'
                            type='text'
                            label='User Handle'
                            fullWidth
                            value={this.state.handle}
                            helperText={errors.handle}
                            error={errors.handle ? true : false}
                            onChange={this.handleChange}
                            className={classes.textField}
                        ></TextField>

                        <Button
                            type='submit'
                            variant='contained'
                            color='primary'
                            className={classes.button}
                            disabled={loading}
                        >
                            Signup
                            {loading && (
                                <CircularProgress size={30} className={classes.progress} />
                            )}
                        </Button>
                        <br />
                        <br />
                        <small>Already have an account? login <Link to='/login'>here</Link></small>
                    </form>
                </Grid>
                <Grid item sm />
            </Grid>
        )
    }
}
signup.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(signup)
