import { UserModel } from "../../models/user-model.js";
import { GenerateToken } from "../../utils/helper.js";

// create an account
export const CreateAccount = async (req, res) => {
  try {
    console.log("i am body", req.body);
    // get the values
    const { username, email, password } = req.body;
    // username and email is empty
    if (!username || !email || !password) {
      return res.status(409).json({
        success: false,
        message: "Username or email or password is required",
      });
    }

    // Check for the duplicates
    const isUserExists = await UserModel.findOne({
      email: email,
      username: username,
    });

    // if the user already exists
    if (isUserExists) {
      return res.status(409).json({
        success: false,
        message: "Username or email already exists",
      });
    }

    // store it in the db
    const newUser = await UserModel.create({
      username,
      email,
      password,
    });

    // return the response
    return res.status(201).json({
      success: true,
      message: "Account created successfully",
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// Login Account
export const Login = async (req, res) => {
  try {
    console.log("i am body", req.body);
    // get the values
    const { email, password } = req.body;
    // username and email is empty
    if (!username || !email) {
      return res.status(409).json({
        success: false,
        message: "Username or email is required",
      });
    }

    const randomID = Math.random(17498327443211, 2394874398432);

    // generate a token
    const token = await GenerateToken(randomID);

    // Check for the duplicates
    const isUserExists = await UserModel.findOne({
      email: email,
      username: username,
    });

    // if the user already exists
    if (isUserExists) {
      return res.status(409).json({
        success: false,
        message: "Username or email already exists",
      });
    }

    // store it in the db
    const newUser = await UserModel.create({
      username,
      email,
      token,
    });

    // return the response
    return res.status(201).json({
      success: true,
      message: "Account created successfully",
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
