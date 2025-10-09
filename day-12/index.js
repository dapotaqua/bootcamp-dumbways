import pool from "./src/config/db.js";
import express from "express";
import hbs from "hbs";
const app = express()
const port = 3000

app.set('view engine', 'hbs');
app.set("views", "src/views");
hbs.registerHelper('formatDate', (date) => {
  return new Date(date).toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
});
app.use("/assets", express.static("src/assets"));
app.use(express.urlencoded({ extended: true }));

app.post('/projects', async (req, res) => {
  const { name, startDate, endDate, description } = req.body;
  const projects = {
    name,
    startDate,
    endDate,
    description
  }

  try {
    const query = `INSERT INTO projects(name, datestart, dateend, description) VALUES ('${projects.name}', '${projects.startDate}', '${projects.endDate}', '${projects.description}')`;
    await pool.query(query);
    res.redirect('/projects');
  } catch (err) {
    console.error(err);
    res.status(500).send('Gagal menambah data');
  }
});

app.post('/projects/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const query = `DELETE FROM projects where id = ${id}`;
    await pool.query(query);
    res.redirect('/projects');
  } catch (err) {
    console.error(err);
    res.status(500).send('Gagal menghapus data')
  }

});

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

async function projects(req, res) {
  try {
    const query = `SELECT * FROM projects`;
    const result = await pool.query(query);
    console.log(result)
    res.render("projects", { projects: result.rows });
  } catch (error) {
    console.error(error);
    res.status(500).send('Gagal membaca data');
  }
}

function detail(req, res) {
  res.render("detail");
}





