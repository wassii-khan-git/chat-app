import { UserModel } from "../../models/user-model.js";
import { GenerateHash, GenerateToken } from "../../utils/helper.js";

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
    if (!email || !password) {
      return res.status(409).json({
        success: false,
        message: "Email or password is required",
      });
    }

    // Check if the account exists
    const isUserExists = await UserModel.findOne({
      email: email,
    });

    // if the user not exists
    if (!isUserExists) {
      return res.status(403).json({
        success: false,
        message: "Sorry, no account found",
      });
    }

    // generate hash
    const hashedPassword = await GenerateHash(password);

    // generate token
    const token = await GenerateToken(isUserExists._id);

    // store it in the db
    const newUser = await UserModel.create({
      email,
      password: hashedPassword,
      token,
    });

    // return the response
    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
