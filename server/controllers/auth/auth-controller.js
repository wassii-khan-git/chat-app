import { UserModel } from "../../models/user-model.js";
import { GenerateHash, GenerateToken, VerifyHash } from "../../utils/helper.js";

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

    // generate hash
    const hashedPassword = await GenerateHash(password);

    // store it in the db
    const newUser = await UserModel.create({
      username,
      email,
      password: hashedPassword,
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

    // compare password
    const isPasswordVerified = await VerifyHash(
      password,
      isUserExists.password
    );

    if (!isPasswordVerified) {
      return res.status(403).json({
        success: false,
        message: "Invalid! credentials",
      });
    }

    // generate token
    const token = await GenerateToken(isUserExists._id);

    // assign the token
    isUserExists.token = token;

    await isUserExists.save();

    // return the response
    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: isUserExists,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// search users
export const AllUsers = async (req, res) => {
  try {
    const { searchTerm } = req.query;
    console.log("searchTerm", searchTerm);
    // if value exists
    let users;
    if (searchTerm) {
      const re = RegExp(searchTerm, "i");
      users = await UserModel.find({
        $or: [{ email: re }, { username: re }],
      }).select("-token -password -__v"); // exclude
    } else {
      users = await UserModel.find().select("-token -password -__v"); // exlude
    }

    return res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.log("Error");
    return res.status(500).json({ success: false });
  }
};

// get user by id
export const GetUserById = async (req, res) => {
  try {
    const { id } = req.body;
    // if there is no id
    if (!id) {
      return res
        .status(402)
        .json({ success: false, message: "Id is required" });
    }
    // find the id in the db
    const user = await UserModel.findById(id);
    if (!user) {
      return res
        .status(403)
        .json({ success: false, message: "User record not found" });
    }
    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.log("Error");
    return res.status(500).json({ success: false, message: error.message });
  }
};
