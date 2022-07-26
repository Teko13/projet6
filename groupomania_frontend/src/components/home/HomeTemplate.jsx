import React, { useContext, useEffect, useState } from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import { ThemeContext } from '../ThemeContext';
import axios from 'axios'
import Post from '../post/Post';

const HomeTemplate = () => {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    const [author, setAuthor] = useState(userData[1]);
    const [msg, setMsg] = useState("")
    const [file, setFile] = useState(null)
    const [postData, setPostData] = useState([])
    const [activeForm, setActiveForm] = useState("disable")
    const [updatePst, setUpdatePst] = useState('no')
    const { theme } = useContext(ThemeContext)
    useEffect(() => {
        const fetchData = async () => {
            const results = await axios('http://localhost:4200/api/posts/');
            setPostData(results.data.posts);
        }
        fetchData();
    }, [activeForm])

    function postSender(e) {
        e.preventDefault();
        let post = null;
        const formDatas = new FormData();
        formDatas.append("image", file)
        formDatas.append("post", JSON.stringify({
            author: author,
            postMsg: msg,
            userId: userData[0],
            postId: updatePst !== 'no' && updatePst || null
        }));
        if (file === null) {
            post = {
                author: author,
                postMsg: msg,
                userId: userData[0],
                postId: updatePst !== 'no' && updatePst || null
            }
        } else {
            post = formDatas;
        }
        axios({
            method: `${updatePst === 'no' ? 'post' : 'put'}`,
            url: `http://localhost:4200/api/posts/${userData[0]}`,
            headers: {
                authorization: userData[2]
            },
            data: post
        })
            .then(res => {
                setActiveForm("disable");
                setAuthor(userData[1])
                setMsg('')
                setFile(null)
                setUpdatePst('no')
            })
            .catch(error => {
                alert('un probleme est survenu!')
                console.log(error)
            })
    }


    return (
        <div className={theme === "dark" ? "dark container" : "container"}>
            <Header currentPage='online' />
            <div className="posts-container">
                <button className="create-post-btn" onClick={
                    () => { setActiveForm("enable") }
                }>Creer post</button>
                <div className={theme === "dark" ? "posts-list dark" : "posts-list"}>
                    {
                        postData.map((post, index) => (
                            <Post key={index} post={post} setAuthor={setAuthor} setUpdatePst={setUpdatePst} actform={setActiveForm} setMsg={setMsg} />
                        ))

                    }
                </div>
            </div>
            <div className={activeForm === "enable" ? "form-content visible" :
                "form-content"}>
                <form onSubmit={postSender} className={theme === "dark" ? "post-creation-form dark" : "post-creation-form"}>
                    <div className="cancel-form" onClick={() => setActiveForm("disable")}>X</div>
                    <div className="msg -input">
                        <label htmlFor="author">Auteur:</label>
                        <input className='' name="" id="author"
                            placeholder="Votre nom" value={author} readOnly />
                    </div>
                    <div className="msg">
                        <label htmlFor="post-text">Votre message:</label>
                        <textarea name="post-text" id="post-text" value={msg} onChange={(e) => { setMsg(e.target.value) }}
                            placeholder="Votre messaege" cols="80" rows="15"></textarea>
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
            <Footer />
        </div>
    );
};

export default HomeTemplate;