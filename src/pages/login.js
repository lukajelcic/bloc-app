import React, { Component } from 'react'
import PropTypes from 'prop-types';
import appImg from '../images/fav32.png';
import { Link } from 'react-router-dom';

//MUI Stuff
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import withStyles from '@material-ui/core/styles/withStyles';

//Redux stuff
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userActions'

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

class login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.UI.errors) {
            this.setState({ errors: nextProps.UI.errors })
        }
    }

    handleSumbit = (event) => {
        event.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        }

        //Call Method
        this.props.loginUser(userData, this.props.history);

    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    render() {
        const { errors } = this.state
        const { classes, UI: { loading } } = this.props
        return (
            <Grid container className={classes.form}>
                <Grid item sm />
                <Grid item sm >
                    <img src={appImg} alt="bloc" className={classes.image}></img>
                    <Typography variant='h2' className={classes.pageTitle}>
                        Login
                    </Typography>

                    <form noValidate onSubmit={this.handleSumbit}>
                        <TextField
                            id='email'
                            name='email'
                            type='email'
                            label='Email'
                            fullWidth
                            helperText={errors.email}
                            error={errors.email ? true : false}
                            value={this.state.email}
                            className={classes.textField}
                            onChange={this.handleChange}>
                        </TextField>

                        <TextField
                            id='password'
                            name='password'
                            type='password'
                            label='Password'
                            fullWidth
                            helperText={errors.password}
                            error={errors.password ? true : false}
                            value={this.state.password}
                            className={classes.textField}
                            onChange={this.handleChange}>
                        </TextField>

                        {errors.general && (
                            <Typography variant='body2' className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )}

                        <Button
                            type='submit'
                            variant='contained'
                            color='primary'
                            className={classes.button}
                            disabled={loading}
                        >
                            {loading && (
                                <CircularProgress size={25} className={classes.progress} />
                            )}
                            Login
                        </Button>
                        <br />
                        <br />
                        <small>Dont have an account? signup <Link to='/signup'>here</Link></small>
                    </form>
                </Grid>
                <Grid item sm />
            </Grid>
        )
    }
}

login.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
});

const mapActionsToProps = {
    loginUser
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(login));
