import React, { Component } from 'react'
import withstyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import DeleteBlog from './DeleteBlog';

//Redux
import { connect } from 'react-redux';
import { likePost, unlikePost } from '../redux/actions/dataActions';

//MUI Stuff
import Card from '@material-ui/core/Card';

//Icons 
import ChatIcon from '@material-ui/icons/Chat';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

// import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { Button } from '@material-ui/core';
import MyButton from '../util/MyButton';

const styles = {
    card: {
        position: 'relative',
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
            isClicked: false
        }
        this.isLikedPost = this.isLikedPost.bind(this);
        this.likePost = this.likePost.bind(this);
        this.unlikePost = this.unlikePost.bind(this);
    }
    likePost = () => {
        this.props.likePost(this.props.blog.blogId)
    }

    unlikePost = () => {
        this.props.unlikePost(this.props.blog.blogId)
    }

    isLikedPost = () => {
        if (
            this.props.user.likes &&
            this.props.user.likes.find(
                (like) => like.blogId === this.props.blog.blogId
            )
        )
            return true;
        else {
            return false;
        }
    }

    toggleHandle = () => {
        this.setState({ isClicked: !this.state.isClicked })
    }

    render() {
        const { isClicked } = this.state;

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
            },
            user: {
                authenticated,
                credentials: { handle }
            }
        } = this.props;

        const deleteButton = authenticated && userHandle === handle ? (
            <DeleteBlog blogId={blogId} />
        ) : null

        const likeButton = !authenticated ? (
            <MyButton tip='Like'>
                <Link to='/login'>
                    <FavoriteBorder color='primary' />
                </Link>
            </MyButton>
        )
            : (
                this.isLikedPost() ? (
                    <MyButton tip='Undo like' onClick={this.unlikePost}>
                        <FavoriteIcon color='primary' />
                    </MyButton>
                ) : (
                        <MyButton tip='Like' onClick={this.likePost}>
                            <FavoriteBorder color='secondary' />
                        </MyButton>
                    )
            )
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
                    >
                        @{userHandle}

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
                    {likeButton}
                    <span>{likeCount} Likes</span>
                    <MyButton tip='Comments'>
                        <ChatIcon color='primary' />
                    </MyButton>
                    <span>{commentCount} Comments</span>
                    {deleteButton}

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

Blog.propTypes = {
    user: PropTypes.object.isRequired,
    likePost: PropTypes.func.isRequired,
    unlikePost: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    blog: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    user: state.user
});

const mapActionsToProps = {
    likePost,
    unlikePost,
}

export default connect(mapStateToProps, mapActionsToProps)(withstyles(styles)(Blog));
