import jwt from "jsonwebtoken";
import User from "../model/UserModel.js";

export default async function Auth(req, res, next) {
  try {
    const token = req.header("Authorization");

    if (!token) {
      return res.status(403).json({ message: "Access denied" });
    }

    const trimmedToken = token.slice(7).trim(); // Remove "Bearer " from the token
    const decodedToken = jwt.verify(trimmedToken, process.env.SECRET);

    // Find the user associated with the decoded token
    const user = await User.findById(decodedToken.userId);

    if (!user) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.user = user; // Set the user object in the request for further use
    next();
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
}