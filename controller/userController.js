import user from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//register user
export const register = async (req, res) => {
  const { name, email, password, phone } = req.body;
  try {
    const userExists = await user.findOne({ where: { email: email } });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    const phoneExists = await user.findOne({ where: { phone: phone } });
    if (phoneExists) {
      return res.status(400).json({ message: "Phone number already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await user.create({
      name: name,
      email: email,
      phone: phone,
      password: hashedPassword,
      role: "user",
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//login user
export const login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Cari user berdasarkan email
      const User = await user.findOne({
        where: { email },
      });
  
      // Jika user tidak ditemukan
      if (!User) {
        return res.status(404).json({ message: 'Email not registered' });
      }
  
      // Verifikasi password
      const match = await bcrypt.compare(password, User.password);
      if (!match) {
        return res.status(401).json({ message: 'Wrong password' });
      }
  
      // Generate access token
      const accessToken = jwt.sign({ email: User.email, name: User.name }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '1d',
      });

        // Generate refresh token
      const refreshToken = jwt.sign({ email: User.email, name: User.name }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '3h',
      });

        // Simpan refresh token ke database
        await user.update({ refreshToken }, { where: { email } });
  
      const detailData = {
        user_id: User.id,
        name: User.name,
      };
  
      // Kirim response dengan accessToken
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: 3 * 60 * 60 * 1000, // 3 jam
      });
  
      res.status(200).json({ message: 'Login successfully', refreshToken, detailData });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };