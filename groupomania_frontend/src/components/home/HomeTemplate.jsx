import React, { useContext, useState } from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import { AiFillLike } from "react-icons/ai"
import { BiDislike } from "react-icons/bi"
import { AiOutlineLike } from "react-icons/ai"
import { FaUserAlt } from "react-icons/fa"
import GROUPEFOTO from "../../assets/groupe-foto.jpeg"
import { ThemeContext } from '../ThemeContext';

const HomeTemplate = () => {
    const [activeForm, setActiveForm] = useState("disable")
    const { theme } = useContext(ThemeContext)

    return (
        <div className={theme === "dark" ? "dark container" : "container"}>
            <Header currentPage='online' />
            <div className="posts-container">
                <button className="create-post-btn" onClick={
                    () => { setActiveForm("enable") }
                }>Creer post</button>
                <div className={theme === "dark" ? "posts-list dark" : "posts-list"}>
                    <div className={theme === "dark" ? "post dark" : "post"}>
                        <div className="user">
                            <div className="user-image"><FaUserAlt /></div>
                            <h3 className="user-name">Jean Dupond</h3>
                        </div>
                        <p className="post-content">
                            Lorem ipsum dolor
                            sit amet consectetur
                            adipisicing elit. Magni fugiat incidunt
                            amet quas doloremque qui aut
                            dolores fuga quasi quae.
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, sunt cum? Error, aperiam porro fugit deserunt beatae hic culpa, dolores est ratione sed repellendus quos corrupti, tempore sit vel. Doloribus harum, dolor neque, sit velit suscipit, tenetur consequuntur repellat sunt voluptatem assumenda. Adipisci, natus voluptatibus nesciunt soluta voluptatum odit illum.
                        </p>
                        <div className="edit-post">
                            <a>Modifier</a>
                            <a>Supprimer</a>
                        </div>
                        <div className="likes-dislikes">
                            <div className="likes">
                                <span className="nbr">7</span>
                                <span className="like-icon"><AiFillLike /></span>
                            </div>
                            <div className="dislikes">
                                <span className="dislike-icon"><BiDislike /></span>
                                <span className="nbr">2</span>
                            </div>
                        </div>
                    </div>

                    <div className={theme === "dark" ? "post dark" : "post"}>
                        <div className="user">
                            <div className="user-image"><FaUserAlt /></div>
                            <h3 className="user-name">Jean Dupond</h3>
                        </div>
                        <p className="post-content">
                            <div className="published-img">
                                <img src={GROUPEFOTO} alt="image de la publication" />
                            </div>
                            Lorem ipsum dolor
                            sit amet consectetur
                            adipisicing elit. Magni fugiat incidunt
                            amet quas doloremque qui aut
                            dolores fuga quasi quae.
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, sunt cum? Error, aperiam porro fugit deserunt beatae hic culpa, dolores est ratione sed repellendus quos corrupti, tempore sit vel. Doloribus harum, dolor neque, sit velit suscipit, tenetur consequuntur repellat sunt voluptatem assumenda. Adipisci, natus voluptatibus nesciunt soluta voluptatum odit illum.
                        </p>
                        <div className="likes-dislikes">
                            <div className="likes">
                                <span className="nbr">7</span>
                                <span className="like-icon"><AiOutlineLike /></span>
                            </div>
                            <div className="dislikes">
                                <span className="dislike-icon fill"><AiFillLike /></span>
                                <span className="nbr">2</span>
                            </div>
                        </div>
                    </div>

                    <div className={theme === "dark" ? "post dark" : "post"}>
                        <div className="user">
                            <div className="user-image"><FaUserAlt /></div>
                            <h3 className="user-name">Jean Dupond</h3>
                        </div>
                        <p className="post-content">
                            Lorem ipsum dolor
                            sit amet consectetur
                            adipisicing elit. Magni fugiat incidunt
                            amet quas doloremque qui aut
                            dolores fuga quasi quae.
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, sunt cum? Error, aperiam porro fugit deserunt beatae hic culpa, dolores est ratione sed repellendus quos corrupti, tempore sit vel. Doloribus harum, dolor neque, sit velit suscipit, tenetur consequuntur repellat sunt voluptatem assumenda. Adipisci, natus voluptatibus nesciunt soluta voluptatum odit illum.
                        </p>
                        <div className="likes-dislikes">
                            <div className="likes">
                                <span className="nbr">7</span>
                                <span className="like-icon"><AiOutlineLike /></span>
                            </div>
                            <div className="dislikes">
                                <span className="dislike-icon"><BiDislike /></span>
                                <span className="nbr">2</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={activeForm === "enable" ? "form-content visible" :
                "form-content"}>
                <form action="" className="post-creation-form">
                    <div className="cancel-form" onClick={() => setActiveForm("disable")}>X</div>
                    <div className="msg">
                        <label htmlFor="post-text">Votre message:</label>
                        <textarea name="post-text" id="post-text"
                            placeholder="Votre messaege" cols="80" rows="15"></textarea>
                    </div>
                    <label htmlFor="img" className="img-downloder-label">Telecharger une image
                        <input className="img-downloder" type="file" id="img" />
                    </label>

                    <button className="send-btn" onClick={(e) => { e.preventDefault(); setActiveForm("disable") }}>Envoyer</button>

                </form>
            </div>
            <Footer />
        </div>
    );
};

export default HomeTemplate;