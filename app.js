const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    try{
        res.render("pages/index.ejs");
    } catch(err) {
        res.send(err);
    }
});

app.get("/about", (req, res) => {
    try{
        res.render("pages/about.ejs");
    } catch(err) {
        res.send(err);
    }
});

app.get("/services", (req, res) => {
    try{
        res.render("pages/services.ejs");
    } catch(err) {
        res.send(err);
    }
});

app.get("/contact", (req, res) => {
    try{
        res.render("pages/contact.ejs");
    } catch(err) {
        res.send(err);
    }
});

app.get("/login", (req, res) => {
    try{
        res.render("pages/users/login.ejs");
    } catch(err) {
        res.send(err);
    }
});

app.get("/register", (req, res) => {
    try{
        res.render("pages/users/register.ejs");
    } catch(err) {
        res.send(err);
    }
});

app.get("/privacy", (req, res) => {
    try{
        res.render("pages/privacy.ejs");
    } catch(err) {
        res.send(err);
    }
});

app.get("/terms", (req, res) => {
    try{
        res.render("pages/terms.ejs");
    } catch(err) {
        res.send(err);
    }
});

app.listen(8080, () => {
    console.log("Server is listening on port 8080");
});