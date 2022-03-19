const express = require("express")
const routes = require("./routes/routes")

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Routes
app.use(routes)

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});

