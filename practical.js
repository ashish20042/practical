const express = require("express");
const app = express();

app.use(express.json());

let users = [];
let id = 1;


app.use((req, res, next) => {
    console.log("Time:", new Date());
    console.log(req.method, req.url);
    next();
});

app.get("/", (req, res) => {
    res.json({
        message: "Server Running",
        time: new Date()
    });
});


app.get("/users", (req, res) => {
    res.json({
        message: "All Users",
        time: new Date(),
        data: users
    });
});


app.post("/users", (req, res) => {
    let name = req.body.name;
    let email = req.body.email;

    if (!name || !email) {
        return res.json({
            message: "Name and Email required",
            time: new Date()
        });
    }

    for (let i = 0; i < users.length; i++) {
        if (users[i].email === email) {
            return res.json({
                message: "Email already exists",
                time: new Date()
            });
        }
    }

    let newUser = {
        id: id++,
        name: name,
        email: email
    };

    users.push(newUser);

    res.json({
        message: "User Added",
        time: new Date(),
        data: newUser
    });
});


app.delete("/users/:id", (req, res) => {
    let userId = parseInt(req.params.id);
    let found = false;

    for (let i = 0; i < users.length; i++) {
        if (users[i].id === userId) {
            users.splice(i, 1);
            found = true;
            break;
        }
    }

    if (!found) {
        return res.json({
            message: "User not found",
            time: new Date()
        });
    }

    res.json({
        message: "User Deleted",
        time: new Date()
    });
});


app.get("/users/:id", (req, res) => {
    let userId = parseInt(req.params.id);
    let user = null;

    for (let i = 0; i < users.length; i++) {
        if (users[i].id === userId) {
            user = users[i];
            break;
        }
    }

    if (!user) {
        return res.json({
            message: "User not found",
            time: new Date()
        });
    }

    res.json({
        message: "User Found",
        time: new Date(),
        data: user
    });
});


app.post("/login", (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        return res.json({
            message: "All fields required",
            time: new Date()
        });
    }

    if (email === "admin@gmail.com" && password === "1234") {
        res.json({
            message: "Login Success",
            time: new Date()
        });
    } else {
        res.json({
            message: "Invalid Credentials",
            time: new Date()
        });
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});