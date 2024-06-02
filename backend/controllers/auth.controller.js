import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    // return res.status(400).json({ message: "All fields are required" });
    next(errorHandler(400, "All fields are required"));
  }
  const hashedPassword = bcryptjs.hashSync(password, 12);

  const newUser = new User({ username, email, password: hashedPassword }); //username=username, email=email, password=password

  try {
    await newUser.save();
    res.json("Signup successful");
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    return next(errorHandler(400, "All fields are required"));
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      next(errorHandler(404, "User not found"));
      return;
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      next(errorHandler(400, "Invalid credentials"));
      return;
    }

    const token = jwt.sign(
      {
        id: validUser._id,
        isAdmin: validUser.isAdmin
      },
      process.env.JWT_SECRET
    );

    const { password: userPassword, ...userWithoutPassword } = validUser._doc;

    res
      .status(200)
      .cookie("access_token", token, { httpOnly: true })
      .json(userWithoutPassword);
  } catch (error) {
    next(error);
  }
};

export const googleSign = async (req, res, next) => {
  const { name, email, photoURL } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign(
        {
          id: user._id,
          isAdmin: user.isAdmin
        },
        process.env.JWT_SECRET
      );
      const { password: userPassword, ...userWithoutPassword } = user._doc;
      res
        .status(200)
        .cookie("access_token", token, { httpOnly: true })
        .json(userWithoutPassword);
      return;
    }
    else{
      const generatedPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 12);

      const newUser = new User({
        username: name.toLowerCase().split(" ").join("")+Math.random().toString(9).slice(-4),
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
      const { password: userPassword, ...userWithoutPassword } = newUser._doc;
      res
        .status(200)
        .cookie("access_token", token, { httpOnly: true })
        .json(userWithoutPassword);
    }
    
  } catch (error) {
    next(error);
  }
};
