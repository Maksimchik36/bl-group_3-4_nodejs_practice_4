const { model, Schema } = require("mongoose");

const SchemaUser = Schema(
  {
    userName: {
      type: String,
      default: "John Doe",
    },
    userEmail: {
      type: String,
      required: [true, "DB: Email is required."],
    },
    userPassword: {
      type: String,
      required: [true, "DB: Password is required."],
    },
    token: {
      type: String,
      default: null,
    },
    roles: [
      {
        type: String,
        ref: "Role",
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = model("user", SchemaUser);

//"USER"
//"ADMIN"
//"MODERATOR""
//"EDITOR"
//["USER", "EDITOR", "MODERATOR"]
//["USER", "ADMIN"]
