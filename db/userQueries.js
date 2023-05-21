//* Import required modules
const { PrismaClient } = require("@prisma/client");
const hashPassword = require("../src/helpers/hashPassword");

//* Create a new instance of PrismaClient
const prisma = new PrismaClient();

//* Function to define the selected properties of the user object
const accessingToUserObject = () => {
  return {
    id: true,
    email: true,
    last_name: true,
    first_name: true,
    password: true,
  };
};

//* Function to retrieve a user by their email
const getUserByEmail = async ({ email }) => {
  return await prisma.users.findUnique({
    where: {
      email: email,
    },
  });
};

//* Function to retrieve a user by their ID with selected properties
const getUserById = async ({ userId }) => {
  return await prisma.users.findUnique({
    where: {
      id: userId,
    },
    select: accessingToUserObject(),
  });
};

//* Function to update the full name of a user
const updateFullname = async ({ firstName, lastName, userId }) => {
  return await prisma.users.update({
    where: {
      id: userId,
    },
    data: {
      first_name: firstName,
      last_name: lastName,
    },
    select: accessingToUserObject(),
  });
};

//* Function to update the email of a user
const updateEmail = async ({ newEmail, userId }) => {
  return await prisma.users.update({
    where: {
      id: userId,
    },
    data: {
      email: newEmail,
    },
    select: accessingToUserObject(),
  });
};

//* Function to update the password of a user
const updatePassword = async ({ newPassword, userId }) => {
  const hashedPassword = await hashPassword({ password: newPassword });

  return await prisma.users.update({
    where: {
      id: userId,
    },
    data: {
      password: hashedPassword,
    },
    select: accessingToUserObject(),
  });
};

//* Function to create a new user
const createUser = async ({ userData }) => {
  const { email, password, lastName, firstName } = userData;

  //* Hash the password
  const passwordHashed = await hashPassword({ password });

  //* Create a new user in the database
  return await prisma.users.create({
    data: {
      email,
      first_name: firstName,
      last_name: lastName,
      password: passwordHashed,
    },
    select: accessingToUserObject(),
  });
};

//* Export the functions for external use
module.exports = {
  getUserByEmail,
  createUser,
  getUserById,
  updatePassword,
  updateEmail,
  updateFullname,
};
