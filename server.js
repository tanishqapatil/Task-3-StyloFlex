const express = require("express");
const path = require("path");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

var users = [];

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/api/users", function(req, res) {
    res.json(users);
});

app.post("/submit", function(req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var age = parseInt(req.body.age);
    var password = req.body.password;
    
    if (!name || !email || !age || !password) {
        res.json({success: false, error: "All fields required"});
        return;
    }
    
    if (password.length < 6) {
        res.json({success: false, error: "Password too short"});
        return;
    }
    
    var user = { id: Date.now(), name: name, email: email, age: age };
    users.push(user);
    
    res.json({success: true});
});

app.post("/delete/:id", function(req, res) {
    var id = parseInt(req.params.id);
    users = users.filter(function(u) { return u.id !== id; });
    res.json({success: true});
});

app.listen(3000, function() {
    console.log("Server on http://localhost:3000");
});
