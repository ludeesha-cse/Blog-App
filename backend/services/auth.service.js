import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export class AuthService {
  static async signup(username, email, password) {
    if (!username || !email || !password) {
      throw new Error("All fields are required");
    }
    const hashedPassword = bcryptjs.hashSync(password, 12);
    const newUser = new User({ 
      username, 
      email, 
      password: hashedPassword 
    });
    return await newUser.save();
  }

  static async signin(email, password) {
    if (!email || !password || email === "" || password === "") {
      throw new Error("All fields are required");
    }

    const validUser = await User.findOne({ email });
    if (!validUser) {
      throw new Error("User not found");
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign(
      {
        id: validUser._id,
        isAdmin: validUser.isAdmin
      },
      process.env.JWT_SECRET
    );

    const { password: userPassword, ...userWithoutPassword } = validUser._doc;
    return { token, user: userWithoutPassword };
  }

  static async googleAuth(name, email, photoURL) {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign(
        {
          id: user._id,
          isAdmin: user.isAdmin
        },
        process.env.JWT_SECRET
      );
      return { token, user: user._doc };
    }

    const generatedPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = bcryptjs.hashSync(generatedPassword, 12);
    const newUser = new User({
      username: name.toLowerCase().split(" ").join("") + Math.random().toString(9).slice(-4),
      email,
      password: hashedPassword,
      profilePicture: photoURL,
    });

    await newUser.save();
    const token = jwt.sign(
      {
        id: newUser._id,
        isAdmin: newUser.isAdmin
      },
      process.env.JWT_SECRET
    );

    return { token, user: newUser._doc };
  }
}