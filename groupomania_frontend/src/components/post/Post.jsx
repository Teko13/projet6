import React, { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';
import { FaUserAlt } from 'react-icons/fa';
import { AiFillLike } from 'react-icons/ai';
import { BiDislike } from 'react-icons/bi';
import { AiOutlineLike } from 'react-icons/ai';
import axios from 'axios'

const Post = ({ post, actform, setMsg, setUpdatePst }) => {
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
                post.userId === userData[0] ?
                    <div className="edit-post">
                        <button className='post-btn edit-btn' onClick={() => {
                            setUpdatePst(post._id)
                            setMsg(post.postMsg)
                            actform('enable')
                        }} >Modifier</button>
                        <button className='post-btn del-btn' onClick={
                            () => {
                                axios({
                                    method: 'delete',
                                    headers: {
                                        authorization: userData[2]
                                    },
                                    url: `http://localhost:4200/api/posts/${post._id}`
                                })
                                    .then((res) => {
                                        console.log(res.data.message);
                                        actform(`touch${post._id}`)
                                    })
                                    .catch(error => console.log(error))
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
                                .then(() => { actform(Date.now()) })
                                .catch((error) => { console.log(error); })
                        } else {
                            setLikes(post._id, 1)
                                .then(() => { actform(Date.now()) })
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
                                .then(() => { actform(Date.now()) })
                                .catch((error) => { console.log(error); })
                        } else {
                            setLikes(post._id, -1)
                                .then(() => { actform(Date.now()) })
                                .catch((error) => { console.log(error); })
                        }
                    }} className="dislike-icon fill" >{
                            post.userDisliked.find(userId => userId === userData[0]) ? <AiFillLike />
                                :
                                <BiDislike />} </span>
                    <span className="nbr">{post.dislikes}</span>
                </div>
            </div>
        </div >
    );
};

export default Post;