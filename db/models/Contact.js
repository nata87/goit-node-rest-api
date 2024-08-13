import sequelize from "../sequelize.js";
import { DataTypes } from "sequelize";

const Contact = sequelize.define("contacts", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [3, 100],
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
      len: [3, 100],
    },
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { min: 7 },
  },
  favorite: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

//Contact.sync();

export default Contact;
