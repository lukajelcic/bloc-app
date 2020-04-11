import React, { Component } from 'react'
import withstyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

//MUI Stuff
import Card from '@material-ui/core/Card';
// import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { Button } from '@material-ui/core';

const styles = {
    card: {
        display: 'flex',
        height: 150,
        marginRight: 50,
        marginBottom: 20,
        alignItems: 'center'
    },
    userImage: {
        minWidth: 200,
    },
    content: {
        padding: 20,
        objectFit: 'cover',
        width: '60%',
        position: 'relative'
    },
    blogTitle: {
        textTransform: 'uppercase'
    },
    avatar: {
        width: 80,
        height: 80,
        objectivFit: 'cover',
        margin: '0 0 0 15px'
    },
    btnWrapper: {
        display: 'flex',
        justifyContent: 'right',
        alignItems: 'center',
    },
    moreBtn: {
        top: 25
    },
    postContent: {
        position: 'absolute'
    },
    handleName: {
        fontWeight: 'bold'
    }
}

class Blog extends Component {
    constructor() {
        super();
        this.state = {
            isOpened: false,
            isClicked: false,
        }
    }

    toggleHandle = () => {
        this.setState({ isClicked: !this.state.isClicked })
    }



    render() {
        dayjs.extend(relativeTime)
        const {
            classes,
            blog: {
                blogId,
                body,
                title,
                userHandle,
                createdAt,
                commentCount,
                likeCount,
                userImage,
                blogImageUrl
            }
        } = this.props;

        const { isClicked } = this.state
        return (
            <Card className={classes.card}>

                <Avatar
                    src={userImage}
                    alt='profile'
                    className={classes.avatar}
                />

                <CardContent className={classes.content}>

                    <Typography variant='h5'
                        component={Link}
                        to={`/users/${userHandle}`}
                        color='primary'
                        className={classes.handleName}
                    >@{userHandle}
                    </Typography>

                    <Typography variant='body2'
                        color='textSecondary'>
                        {dayjs(createdAt).fromNow()}
                    </Typography>

                    <Typography variant='h6' color='textPrimary' className={classes.blogTitle}>{title}</Typography>
                    <div className={classes.postContent}>
                        {isClicked ?
                            <Typography variant='body1'>{body}</Typography>
                            : null}
                    </div>

                </CardContent>
                <div className={classes.btnWrapper}>
                    {!isClicked ?
                        <Button onClick={this.toggleHandle}
                            variant='contained'
                            size='small'
                            className={classes.moreBtn}
                        >More
                      </Button>
                        :
                        <Button onClick={this.toggleHandle} variant='contained' color='secondary' size='small' className={classes.moreBtn}>Close</Button>}
                </div >
            </Card >
        )
    }
}

export default withstyles(styles)(Blog)
