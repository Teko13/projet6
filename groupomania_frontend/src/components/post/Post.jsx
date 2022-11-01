import React, { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';
import { FaUserAlt } from 'react-icons/fa';
import { AiFillLike } from 'react-icons/ai';
import { AiOutlineLike } from 'react-icons/ai';
import axios from 'axios'

const Post = ({ post, setMsg, setUpdatePst, setPostData }) => {
    const userData = JSON.parse(sessionStorage.getItem('userData'))
    const { theme } = useContext(ThemeContext)
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
                        <button className='post-btn update-post' onClick={() => {
                            setUpdatePst(post._id)
                            setMsg(post.postMsg)
                        }} >Modifier</button>
                        <button className='post-btn delete' onClick={
                            () => {
                                axios({
                                    method: 'delete',
                                    url: `http://localhost:4200/api/posts/${post._id}`
                                })
                                    .then((res) => {
                                        axios('http://localhost:4200/api/posts/')
                                            .then(res =>
                                                setPostData(res.data.posts)
                                            )
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
                    <span className="like-icon"><AiOutlineLike /></span>
                </div>
                <div className="dislikes">
                    <span className="dislike-icon fill"><AiFillLike /></span>
                    <span className="nbr">{post.dislikes}</span>
                </div>
            </div>
        </div>
    );
};

export default Post;