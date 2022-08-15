import React, { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';
import { FaUserAlt } from 'react-icons/fa';
import { AiFillLike } from 'react-icons/ai';
import { BiDislike } from 'react-icons/bi';
import { AiOutlineLike } from 'react-icons/ai';
import axios from 'axios'

const Post = ({ post, activeForm, setMsg, setAuthor, setUpdatePst }) => {
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
                post.userId === userData[0] || userData[0] === "62dfb359ca6a00771ad4639d" ?
                    <div className="edit-post">
                        <button className='post-btn edit-btn' onClick={() => {
                            if (userData[0] === '62dfb359ca6a00771ad4639d') {
                                setAuthor(post.author)
                            }
                            setUpdatePst(post._id)
                            setMsg(post.postMsg)
                            activeForm('enable')
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
                                        activeForm(`touch${post._id}`)
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
                                .then(() => { activeForm(Date.now()) })
                                .catch((error) => { console.log(error); })
                        } else {
                            setLikes(post._id, 1)
                                .then(() => { activeForm(Date.now()) })
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
                                .then(() => { activeForm(Date.now()) })
                                .catch((error) => { console.log(error); })
                        } else {
                            setLikes(post._id, -1)
                                .then(() => { activeForm(Date.now()) })
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