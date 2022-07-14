const express = require("express");
const mongoose = require("mongoose");
const app = express();
const postRouter = require('./routes/posts-routes')
const userRoutes = require("./routes/users-routes")

// ==============DB connexion==================

mongoose.connect('mongodb+srv://teko_13:12126060@cluster0.xxi2c.mongodb.net/?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => { console.log("connexion mongodb reussi"); })
    .catch(() => { console.log("connexion mongodb echouer"); })

// ==============================================

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
app.use(express.json());
app.use('/api/auth', userRoutes)
app.use('/api/posts', postRouter)

module.exports = app;