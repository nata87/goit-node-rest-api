import sequelize from "../sequelize.js";
import { DataTypes } from "sequelize";
import User from "./User.js";

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
  owner: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

User.hasMany(Contact, { foreignKey: "owner" });
Contact.belongsTo(User, { foreignKey: "owner" });

//Contact.sync();

export default Contact;
