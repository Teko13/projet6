import React, { useContext, useEffect, useState } from 'react';
import Header from '../header/Header';
import { ThemeContext } from '../ThemeContext';
import { FaUserAlt } from 'react-icons/fa';
import axios from 'axios'
import Footer from '../footer/Footer';

const ProfilComponent = () => {
    const [postsData, setPostsData] = useState([]);
    const [totalLikes, setTotalLikes] = useState(0);
    const [refetch, setRefetch] = useState('')
    const [totalDislikes, setTotalDislikes] = useState(0)
    useEffect(() => {
        const fetchData = async () => {
            const results = await axios(`http://localhost:4200/api/posts/${userData[1]}/`);
            setPostsData(results.data);
            if (results.data.lenght > 1) {
                setTotalLikes(results.data.reduce((acc, x) => (acc.likes + x.likes)))
                setTotalDislikes(results.data.reduce((acc, x) => (acc.dislikes + x.dislikes)))
            }
            else if (results.data.lenght === 1) {
                setTotalDislikes(results.data[0].dislikes)
                setTotalLikes(results.data[0].likes)
            }

        }
        fetchData();
    }, [refetch]);

    const userData = JSON.parse(sessionStorage.getItem('userData'));
    const { theme } = useContext(ThemeContext)
    return (
        <div className={theme === "dark" ? 'dark container' : "container"
        }>
            <Header currentPage='profil' />
            <div className="user-profil-content">
                <div className="user-info">
                    <div className="user-image"><FaUserAlt /></div>
                    <h2>{userData[1]}</h2>
                    <small>Derniere connexion: {userData[3]} </small>
                </div>
                <div className="user-posts-info">
                    <div className="total-likes">
                        Likes total: {totalLikes}
                    </div>
                    <div className="total-dislikes">
                        Dislikes total: {totalDislikes}
                    </div>
                    <div className="user-msgs">
                        <h3>Mes posts</h3>
                        {postsData.map((post, index) => (
                            <div key={index} className="user-msg">
                                <p>{post.postMsg}</p>
                                <button onClick={() => {
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
                                            setRefetch(Date.now())
                                        })
                                }}>Supprimer</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div >
    );
};

export default ProfilComponent;