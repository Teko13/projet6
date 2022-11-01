import React, { useContext, useEffect, useState } from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import { ThemeContext } from '../ThemeContext';
import axios from 'axios'
import Post from '../post/Post';

const HomeTemplate = () => {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    const author = userData[1]
    const [msg, setMsg] = useState("")
    const [file, setFile] = useState(null)
    const [postData, setPostData] = useState([])
    const [updatePst, setUpdatePst] = useState('no')
    const { theme } = useContext(ThemeContext)
    useEffect(() => {
        axios('http://localhost:4200/api/posts/')
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
            author: author,
            postMsg: msg,
            userId: userData[0]
        }))
        axios({
            method: `${updatePst === 'no' ? 'post' : 'put'}`,
            url: `http://localhost:4200/api/posts/${updatePst === 'no' ? '' : updatePst}`,
            data: post
        })
            .then(res => {
                setMsg('')
                setFile(null)
                setUpdatePst('no')
            })
            .then(() => {
                axios('http://localhost:4200/api/posts/')
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
        <div className={theme === "dark" ? "dark container" : "container"}>
            <Header currentPage='online' />
            <div className="form-content">
                <form onSubmit={postSender} className={theme === "dark" ? "post-creation-form dark" : "post-creation-form"}>
                    <div className="msg -input">
                        <label htmlFor="author">Auteur:</label>
                        <input className='' name="" id="author"
                            placeholder="Votre nom" value={author} readOnly />
                    </div>
                    <div className="msg">
                        <label htmlFor="post-text">Votre message:</label>
                        <textarea name="post-text" id="post-text" value={msg} onChange={(e) => { setMsg(e.target.value) }}
                            placeholder="Votre messaege" cols="80" rows="10"></textarea>
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
                            <Post key={index} setPostData={setPostData} post={post} setUpdatePst={setUpdatePst} setMsg={setMsg} />
                        ))

                    }
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default HomeTemplate;