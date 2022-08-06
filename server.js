const express = require("express");
const path = require("path");
const fileupload = require("express-fileupload");

let initial_path = path.join(__dirname, "public");

const app = express();
app.use(express.static(initial_path));
app.use(fileupload());

app.get("/", (req, res) => {
    res.sendFile(path.join(initial_path, "home.html"));
});

app.get("/editor", (req, res) => {
    res.sendFile(path.join(initial_path, "editor.html"));
});

//Upload Links
app.post("/upload", (req, res) => {
    let file = req.files.image;
    let date = new Date();
    //Image name
    let imagename = date.getDate() + date.getTime() + file.name;
    //Image Upload Path
    let path = "public/uploads/" + imagename;

    //Create Upload
    file.mv(path, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            //Our image upload path
            res.json("uploads/${imagename}")
        }
    })
})

app.listen("3000", () => {
    console.log("Listening to port 3000");
});
