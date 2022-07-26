import React, { useContext, useState } from 'react';
import { ThemeContext } from '../ThemeContext';
import { FaUserAlt } from 'react-icons/fa';
import { AiFillLike } from 'react-icons/ai';
import { AiOutlineLike } from 'react-icons/ai';
import { BiDislike } from 'react-icons/bi'
import axios from 'axios'

const Post = ({ post, actform, setMsg, setUpdatePst, setAuthor }) => {
    const userData = JSON.parse(sessionStorage.getItem('userData'))
    const { theme } = useContext(ThemeContext)

    const setLike = async (postId, userId, like) => {
        return await axios({
            method: 'put',
            url: 'http://localhost:4200/api/posts/',
            headers: {
                authorization: userData[2]
            },
            data: {
                userId,
                postId,
                like
            }
        });
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
                post.userId === userData[0] || userData[0] === '62dfb359ca6a00771ad4639d' ?
                    <div className="edit-post">
                        <button className={theme === "dark" ? 'btn dark change-post' : 'btn change-post'} onClick={() => {
                            if (post.userId !== userData[0]) {
                                setAuthor(post.author)
                            }
                            setUpdatePst(post._id)
                            setMsg(post.postMsg)
                            actform('enable')
                        }} >Modifier</button>
                        <button className={theme === "dark" ? 'btn dark delete-post' : 'btn delete-post'} onClick={
                            () => {
                                axios({
                                    method: 'delete',
                                    url: `http://localhost:4200/api/posts/`,
                                    headers: {
                                        authorization: userData[2]
                                    },
                                    data: {
                                        userId: userData[0],
                                        post: post._id
                                    }
                                })
                                    .then((res) => {
                                        console.log(res.data.message);
                                        actform(Date.now())
                                    })
                                    .catch(error => console.log(error))
                            }
                        }>Supprimer</button>
                    </div>
                    : ""
            }
            <div className="likes-dislikes">
                <div className="likes" onClick={() => {
                    if (post.userLiked.find(userId => userId === userData[0])) {

                        setLike(post._id, userData[0], 0).then((res) => {
                            if (res.status === 200) {
                                actform(`${Date.now()}`);
                            }
                        })
                    } else {
                        setLike(post._id, userData[0], 1).then((res) => {
                            if (res.status === 200) {
                                actform(`${Date.now()}`);
                            }
                        })
                    }

                }}>
                    <span className="nbr">{post.likes}</span>
                    {
                        post.userLiked.find(userId => userId === userData[0]) ?
                            <span className="like-icon fil"><AiFillLike /></span> :
                            <span className="like-icon"><AiOutlineLike /></span>
                    }
                </div>
                <div className="dislikes" onClick={() => {
                    if (post.userDisliked.find(userId => userId === userData[0])) {
                        setLike(post._id, userData[0], 0).then((res) => {
                            if (res.status === 200) {
                                actform(`${Date.now()}`)
                            }
                        })

                    }
                    else {
                        setLike(post._id, userData[0], -1).then((res) => {
                            if (res.status) {
                                actform(`${Date.now()}`)
                            }
                        })
                    }

                }}>
                    {
                        post.userDisliked.find(userId => userId === userData[0]) ?
                            <span className="dislike-icon fill"><AiFillLike /></span> :
                            <span className="dislike-icon"><BiDislike /></span>
                    }
                    <span className="nbr">{post.dislikes}</span>
                </div>
            </div>
        </div>
    );
};

export default Post;