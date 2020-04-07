import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import appImg from '../images/fav32.png';
import axios from 'axios';

//MUI Stuff
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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
        marginTop: 20
    },
    customError: {
        color: 'red',
        fontSize: '0.8rem'
    }
}
class login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            loading: false,
            errors: {}
        }
    }
    handleSumbit = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        });
        const userData = {
            email: this.state.email,
            password: this.state.password
        }
        axios.post('/login', userData)
            .then(res => {
                console.log(res.data)
                this.setState({
                    loading: false
                });
                this.props.history.push('/')
            })
            .catch(err => {
                this.setState({
                    errors: err.response.data,
                    loading: false
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
                        >Login
                        </Button>
                    </form>
                </Grid>
                <Grid item sm />
            </Grid>
        )
    }
}

login.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(login)
