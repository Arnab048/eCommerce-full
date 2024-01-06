import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";

const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    // validation
    if (!name) {
      return res.send({ error: "Name is Required Here" });
    }
    if (!email) {
      return res.send({ error: "Email is Required Here" });
    }
    if (!address) {
      return res.send({ error: "Address is Required Here" });
    }
    if (!phone) {
      return res.send({ error: "Phone is Required Here" });
    }
    if (!password) {
      return res.send({ error: "Password is Required Here" });
    }
    // check user
    const existingUser = await userModel.findOne({ email });
    // checking if it is an existing user
    if (existingUser) {
      return res.status(200).send({
        success: true,
        message: "Already Registered. Please Log In",
      });
    }
    // register User
    const hashedPassword = await hashPassword(password);

    // save user
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Registration Succesful",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};

export { registerController };

// POST LOGIN
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // validation
    if (!email || !body) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
      // check user
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "email not found",
        });
      }
      const match = await comparePassword(password, user.password);
      if (!match) {
        return res.status(200).send({
          success: false,
          message: "Invalid Password",
        });
      }

      // token
      const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      res.status(200).send({
        success: true,
        message: "Login Succesfull",
        user: {
          name: user.name,
          email: user.email,
          phone: user.phone,
          address: user.address,
        },
        token,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in login",
      error,
    });
  }
};

// test controller
export const testController = (req, res) => {
  res.send("protected Route");
};
