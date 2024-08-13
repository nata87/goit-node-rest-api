import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";
import { subscriptionTypes } from "../../constants/constants.js";

const User = sequelize.define("user", {
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      length: 6,
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { is: emailRegex },
  },
  subscription: {
    type: DataTypes.ENUM,
    values: subscriptionTypes,
    defaultValue: "starter",
    validate: {
      isIn: [...subscriptionTypes],
    },
  },
  token: {
    type: DataTypes.STRING,
    defaultValue: null,
  },
});

User.sync({ alter: true });

export default User;