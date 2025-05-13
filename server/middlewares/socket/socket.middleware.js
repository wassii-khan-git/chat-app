import { UserModel } from "../../models/user-model.js";
import { VerifyToken } from "../../utils/helper.js";

const SocketAuthHanlder = async (socket, next) => {
  try {
    const token = socket.handshake.auth.token;
    // if there is no token
    if (!token) {
      next(new Error("Token is not provided"));
    }
    // verify the token
    const decoded = await VerifyToken(token);
    // send the error if not decoded
    if (!decoded.userId) {
      next(new Error("token is not decoded"));
    }
    // get the user info
    const user = await UserModel.findById({ _id: decoded.userId }).select(
      "-password -token -__v -createdAt -updatedAt"
    );
    // if no user found
    if (!user) {
      next(new Error("No user found"));
    }
    socket.user = user;
    next();
  } catch (error) {
    next(new Error("Error occured"));
  }
};
export default SocketAuthHanlder;
