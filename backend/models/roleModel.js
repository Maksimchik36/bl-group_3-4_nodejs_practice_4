const { model, Schema } = require("mongoose");

const SchemaRole = Schema(
  {
    value: {
      type: String,
      unique: true,
      default: "USER",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = model("role", SchemaRole);
