import React, { Component } from 'react'
import withstyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

//MUI Stuff
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = {
    card: {
        display: 'flex',
        marginBottom: 20,
    },
    userImage: {
        minWidth: 200,
    },
    content: {
        padding: 20,
        objectFit: 'cover',
    },
    blogTitle: {
        textTransform: 'uppercase'
    }
}

class Blog extends Component {
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
        return (
            <Card className={classes.card}>
                <CardMedia
                    image={userImage}
                    title='Profile picture'
                    className={classes.userImage}>
                </CardMedia>

                <CardContent className={classes.content}>

                    <Typography variant='h5'
                        component={Link}
                        to={`/users/${userHandle}`}
                        color='secondary'
                    >{userHandle}
                    </Typography>

                    <Typography variant='body2'
                        color='textSecondary'>
                        {dayjs(createdAt).fromNow()}
                    </Typography>

                    <Typography variant='h4' color='textPrimary' className={classes.blogTitle}>{title}</Typography>

                    <Typography variant='body1'>{body}</Typography>

                </CardContent>
            </Card>
        )
    }
}

export default withstyles(styles)(Blog)
