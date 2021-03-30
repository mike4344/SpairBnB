'use strict';
const { Validator } = require('sequelize');
const bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error('Cannot be an email.');
          }
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 256]
      },
    },
    imageUrl: {
      type: DataTypes.STRING,

    },
    firstName: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      },
    },
  },
  {
    defaultScope: {
      attributes: {
        exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt'],
      },
    },
    scopes: {
      currentUser: {
        attributes: { exclude: ['hashedPassword'] },
      },
      loginUser: {
        attributes: {},
      },
    },
  });
  User.associate = function(models) {
    // associations can be defined here
  };
  // alloows the conversion of the user object to a safe one that can be used with JWTs without sharing passwords
  User.prototype.toSafeObject = function() { // remember, this cannot be an arrow function
    const { id, username, email, imageUrl, firstName, lastName} = this; // context will be the User instance
    return { id, username, email, imageUrl, firstName, lastName};
  };
  // method on the individual user objects checking the password against the hashed password on the user its call on
  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
   };
   //grabs everything besides the hashed password from the database based on the user id
   User.getCurrentUserById = async function (id) {
    return await User.scope('currentUser').findByPk(id);
   };
   // deconstructs crendentials and password from arguments, checks to see if the user exists and where the credential matches either the username or email and then validates the password and returns the info for the JWT
   User.login = async function ({ credential, password }) {
    const { Op } = require('sequelize');
    const user = await User.scope('loginUser').findOne({
      where: {
        [Op.or]: {
          username: credential,
          email: credential,
        },
      },
    });
    if (user && user.validatePassword(password)) {
      return await User.scope('currentUser').findByPk(user.id);
    }
  };
  // deconstructs the data from the argument creating a user returning the result of finding that user in the database to be used for the JWT
  User.signup = async function ({ username, email, password, imageUrl, firstName, lastName }) {
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({
      username,
      email,
      hashedPassword,
      imageUrl,
      firstName,
      lastName,
    });
    return await User.scope('currentUser').findByPk(user.id);
  };
  return User;
};
