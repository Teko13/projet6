import React, { useContext, useEffect, useState } from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import { ThemeContext } from '../ThemeContext';
import axios from 'axios'
import Post from '../post/Post';
// home page component
const HomeTemplate = () => {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    const author = userData[1]
    const [postAuthor, setPostAuthor] = useState(author)
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

    // function called when post form submiting
    function postSender(e) {
        e.preventDefault();

        const post = new FormData();
        post.append("image", file)
        post.append("post", JSON.stringify({
            author: author,
            postMsg: msg,
        }))
        axios({
            method: `${updatePst === 'no' ? 'post' : 'put'}`,
            headers: {
                authorization: userData[2],
            },
            url: `http://localhost:4200/api/posts/${updatePst === 'no' ? '' : updatePst}`,
            data: post
        })
            .then(res => {
                setMsg('')
                setFile(null)
                setUpdatePst('no');
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
            <Footer />
        </div>
    );
};

export default HomeTemplate;