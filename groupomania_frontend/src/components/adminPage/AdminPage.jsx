import React, { useContext, useEffect, useState } from 'react';
import Header from '../header/Header';
import { ThemeContext } from '../ThemeContext';
import { FaUserAlt } from 'react-icons/fa';
import axios from 'axios'
import Footer from '../footer/Footer';
import Post from '../post/Post';

const AdminPage = () => {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    const author = userData[1]
    const [postAuthor, setPostAuthor] = useState(author)
    const [msg, setMsg] = useState("")
    const [file, setFile] = useState(null)
    const [postData, setPostData] = useState([])
    const [updatePst, setUpdatePst] = useState('no')
    const { theme } = useContext(ThemeContext)
    useEffect(() => {
        axios({
            headers: {
                authorization: userData[2],
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
    }, [])
    function postSender(e) {
        e.preventDefault();

        const post = new FormData();
        post.append("image", file)
        post.append("post", JSON.stringify({
            author: postAuthor,
            postMsg: msg,
        }))
        axios({
            method: `${updatePst === 'no' ? 'post' : 'put'}`,
            headers: {
                authorization: userData[2],
            },
            url: `http://localhost:4200/api/admin/${updatePst === 'no' ? '' : updatePst}`,
            data: post
        })
            .then(res => {
                setMsg('')
                setFile(null)
                setUpdatePst('no');
                setPostAuthor(author)
            })
            .then(() => {
                axios({
                    method: 'get',
                    headers: {
                        authorization: userData[2],
                    },
                    url: 'http://localhost:4200/api/admin/',
                })
                    .then(res =>
                        setPostData(res.data.posts)
                    )
            })
            .catch(error => {
                alert('un probleme est survenu!')
                console.log(error)
            })
    }
    return (
        <div className={theme === "dark" ? 'dark container' : "container"
        }>
            <Header currentPage='online' />
            <div className="user-profil-content">
                <div className="user-info">
                    <div className="user-img"><FaUserAlt /></div>
                    <h2>{userData[1]}</h2>
                    <small>Derniere connexion: {userData[3]} </small>
                </div>
                <div className="form-content" id='form'>
                    <form onSubmit={postSender} className={theme === "dark" ? "post-creation-form dark" : "post-creation-form"}>
                        <div className={theme === "dark" ? "author dark" : "author"}>
                            <h4>Auteur</h4>
                            <h5>{author}</h5>
                        </div>
                        <div className="msg">
                            <label htmlFor="post-text">Votre message:</label>
                            <textarea name="post-text" id="post-text" value={msg} onChange={(e) => { setMsg(e.target.value) }}
                                placeholder="Votre messaege" rows="10"></textarea>
                        </div>
                        <label htmlFor="img" className="img-downloder-label">Telecharger une image
                            <input className="img-downloder" type="file" files={file} onChange={(e) => { setFile(e.target.files[0]) }} accept="image/png,
                        image/jpg, image/jpeg" id="img" />
                        </label>

                        <button type='submit' className="send-btn">
                            Envoyer
                        </button>

                    </form>
                </div>
                <div className="posts-container">
                    <div className={theme === "dark" ? "posts-list dark" : "posts-list"}>
                        {
                            postData.map((post, index) => (
                                <Post key={index} setPostData={setPostData} setPostAuthor={setPostAuthor} post={post} setUpdatePst={setUpdatePst} setMsg={setMsg} />
                            ))

                        }
                    </div>
                </div>
            </div>
            <Footer />
        </div >
    );
};

export default AdminPage;