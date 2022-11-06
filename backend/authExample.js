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

// обеспечивает доступ к переменным в .dotenv
loadEnv();
const { PORT } = process.env;

// при запросе на '/api/v1/devices' его обработчик нужно искать в devicesRoutes
app.use(devicesRoutesPrefix, require("./routes/devicesRoutes"));

//коннектится к базе данных
connectDb();
//registarition - добавлення юзера в базу даних
//authentication - перевірка логіна і пароля які ввів користувач з тим що є в базі даних.
//authorization - перевірка прав користувача виконувати певні діі на сайті (видаляти, редагувати, заходити в адмінку...)
//logout - вихід з сайта, зняття всіх прав коримтувача.
const AuthController = require("./controllers/AuthController");
const AuthMiddleware = require("./middlewares/authMiddleware");
const RolesMiddleware = require("./middlewares/rolesMiddleware");
const validateTokenMiddleware = require("./middlewares/validateTokenMiddleware");

app.post(
  "/register",
  (req, res, next) => {
    console.log("Joi validation");
    next();
  },
  AuthController.register
);
app.post("/login", AuthController.login);
app.get(
  "/logout",
  validateTokenMiddleware,
  AuthMiddleware,
  AuthController.logout
);
app.get(
  "/users/info",
  validateTokenMiddleware,
  RolesMiddleware(["ADMIN"]),
  AuthController.info
);

// обработчик ошибок(ErrorHandler - функция с четырьмя параметрами)
app.use(ErrorHandler);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`.bold.cyan.italic);
});
