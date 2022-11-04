import React, { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';
import { FaUserAlt } from 'react-icons/fa';
import { AiFillLike } from 'react-icons/ai';
import { BiDislike } from 'react-icons/bi';
import { AiOutlineLike } from 'react-icons/ai';
import axios from 'axios'

const Post = ({ post, setMsg, setUpdatePst, setPostData, setPostAuthor }) => {
    const userData = JSON.parse(sessionStorage.getItem('userData'))
    const { theme } = useContext(ThemeContext)
    function setLikes(postId, like) {
        return axios({
            method: 'put',
            headers: {
                authorization: userData[2]
            },
            url: "http://localhost:4200/api/posts/",
            data: {
                postId,
                like
            }

        })
    }
    return (
        <div className={theme === "dark" ? "post dark" : "post"}>
            <div className="user">
                <div className="user-image"><FaUserAlt /></div>
                <h3 className="user-name">{post.author}</h3>
            </div>
            <article className="post-content">
                {
                    post.imgUrl !== "" ?
                        <div className="published-img">
                            <img src={post.imgUrl} alt="image de la publication" />
                        </div>
                        : ""
                }
                {post.postMsg}
            </article>
            {
                // display edit and deelete buttons if current user id is admin id or post auhor id
                post.userId === userData[0] || userData[4] ?
                    <div className="edit-post">
                        <button className='post-btn update-post' onClick={() => {
                            setUpdatePst(post._id)
                            setMsg(post.postMsg)
                            setPostAuthor(post.author)
                        }} >Modifier</button>
                        <button className='post-btn delete' onClick={
                            () => {
                                if (userData[4]) {
                                    axios({
                                        method: 'delete',
                                        headers: {
                                            authorization: userData[2]
                                        },
                                        url: `http://localhost:4200/api/admin/${post._id}`
                                    })
                                        .then((res) => {
                                            axios({
                                                method: 'get',
                                                headers: {
                                                    authorization: userData[2],
                                                    isAdmin: userData[4]
                                                },
                                                url: 'http://localhost:4200/api/admin/',
                                            })
                                                .then(res =>
                                                    setPostData(res.data.posts)
                                                )
                                                .catch((error) => {
                                                    console.log(error);
                                                    alert('un proble est survenu')
                                                })
                                        })
                                        .catch(error => console.log(error))
                                }
                                else {
                                    axios({
                                        method: 'delete',
                                        headers: {
                                            authorization: userData[2]
                                        },
                                        url: `http://localhost:4200/api/posts/${post._id}`
                                    })
                                        .then((res) => {
                                            axios('http://localhost:4200/api/posts/')
                                                .then(res =>
                                                    setPostData(res.data.posts)
                                                )
                                        })
                                        .catch((error) => { console.log(error) })
                                }
                            }
                        }>Supprimer</button>
                    </div>
                    : ""
            }
            <div className="likes-dislikes">
                <div className="likes">
                    <span className="nbr">{post.likes}</span>
                    <span onClick={() => {
                        if (post.userLiked.find((userId) => (userId === userData[0]))) {
                            setLikes(post._id, 0)
                                .then(() => {
                                    axios('http://localhost:4200/api/posts/')
                                        .then(res =>
                                            setPostData(res.data.posts)
                                        )
                                })
                                .catch((error) => { console.log(error); })
                        } else {
                            setLikes(post._id, 1)
                                .then(() => {
                                    axios('http://localhost:4200/api/posts/')
                                        .then(res =>
                                            setPostData(res.data.posts)
                                        )
                                })
                                .catch((error) => { console.log(error); })
                        }
                    }} className="like-icon">{
                            post.userLiked.find((userId) => userId === userData[0]) ? <AiFillLike />
                                :
                                <AiOutlineLike />
                        }</span>
                </div>
                <div className="dislikes">
                    <span onClick={() => {
                        if (post.userDisliked.find((userId) => (userId === userData[0]))) {
                            setLikes(post._id, 0)
                                .then(() => {
                                    axios('http://localhost:4200/api/posts/')
                                        .then(res =>
                                            setPostData(res.data.posts)
                                        )
                                })
                                .catch((error) => { console.log(error); })
                        } else {
                            setLikes(post._id, -1)
                                .then(() => {
                                    axios('http://localhost:4200/api/posts/')
                                        .then(res =>
                                            setPostData(res.data.posts)
                                        )
                                })
                                .catch((error) => { console.log(error); })
                        }
                    }} >{
                            post.userDisliked.find(userId => userId === userData[0]) ? <AiFillLike className='dislike-icon fill' />
                                :
                                <BiDislike className='dislike-icon' />} </span>
                    <span className="nbr">{post.dislikes}</span>
                </div>
            </div>
        </div >
    );
};

export default Post;