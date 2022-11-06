const express = require("express");
const { loadEnv, connectDb } = require("../config");
const { devicesRoutesPrefix } = require("../config/routes");
const { ErrorHandler } = require("./middlewares");
// изменяет цвета консольных сообщений
require("colors");

// создает приложение
const app = express();
// делает читаемыми json-файлы
app.use(express.json());
// делает читаемыми формы
app.use(express.urlencoded({ extended: false }));
app.use(express.static("frontend"));

// обеспечивает доступ к переменным в .dotenv
loadEnv();
const { PORT } = process.env;

// Setup tamplate engine:
const sendEmail = require("./services/sendEmail");
const { engine } = require("express-handlebars");

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./backend/views");

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.post("/send", (req, res) => {
  sendEmail(req.body);

  res.render("send", { sender: "Hello from Vasyl" });
});
//===============================================

// при запросе на '/api/v1/devices' его обработчик нужно искать в devicesRoutes
app.use(devicesRoutesPrefix, require("./routes/devicesRoutes"));

//коннектится к базе данных
connectDb();

// обработчик ошибок(ErrorHandler - функция с четырьмя параметрами)
app.use(ErrorHandler);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`.bold.cyan.italic);
});

// https://www.youtube.com/watch?v=mZBujYXdQ9c&list=RDmZBujYXdQ9c&start_radio=1
// URI(Uniform Resource Identifier) === https://www.youtube.com/watch?v=mZBujYXdQ9c&list=RDmZBujYXdQ9c&start_radio=1
// URN(Uniform Resource Name) === https://www.youtube.com/
// URL(Uniform Resource Locator) === watch?v=mZBujYXdQ9c&list=RDmZBujYXdQ9c&start_radio=1
