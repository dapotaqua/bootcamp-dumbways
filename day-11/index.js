import pool from "./src/config/db.js";
import express from "express";
const app = express()
const port = 3000

app.set('view engine', 'hbs');
app.set("views", "src/views");
app.use("/assets", express.static("src/assets"));

app.get('/home', home);
app.get(`/contact`, contact);
app.get(`/projects`, projects);
app.get(`/detail`, detail);

app.get("/testdb", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.send(`Database connected! Server time: ${result.rows[0].now}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Database connection failed");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

function home(req, res) {
  res.render("index");
}

function contact(req, res) {
  res.render("contact");
}

function projects(req, res) {
  res.render("projects");
}

function detail(req, res) {
  res.render("detail");
}





