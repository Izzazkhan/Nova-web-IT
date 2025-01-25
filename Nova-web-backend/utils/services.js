const bcrypt = require("bcrypt");
const { User } = require("../Models/user");

const signUp = async (name, email, password, role) => {
  console.log("name, Email, password, role", name, email, password, role);
  const newUser = new User({
    name: name,
    email: email,
    password: password,
    role: role,
    refreshtoken: "",
  });

  const salt = await bcrypt.genSalt(10);
  newUser.password = await bcrypt.hash(newUser.password, salt);

  const tokens = newUser.generateAuthToken();
  newUser.refreshtoken = tokens.refreshtoken;
  await newUser.save();
  const data = {
    token: tokens,
    id: newUser.id,
  };

  return data;
};

const signIn = async (user, newRefreshTokenArray) => {
  const token = user.generateAuthToken();

  user.refreshtoken = [...newRefreshTokenArray, token.refreshtoken];

  await user.save();
  const data = {
    token: token,
    userId: user.id,
  };

  return data;
};

module.exports = {
  signUp,
  signIn,
};
