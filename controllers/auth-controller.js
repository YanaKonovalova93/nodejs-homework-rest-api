import User from "../models/User.js";
import bcrypt from "bcryptjs";

import { HttpError } from "../helpers/index.js";

import { ctrlWrapper } from "../decorators/index.js";

const register = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});

    if(user){
        throw HttpError(409, "Email in use");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    
      const newUser = await User.create({...req.body, password: hashPassword});
  res.status(201).json({
    password: newUser.password,
    email: newUser.email,
  });
};


export default {
  register: ctrlWrapper(register),
};
