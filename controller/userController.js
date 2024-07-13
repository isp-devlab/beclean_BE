import user from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from 'nodemailer';

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

      
        // Simpan access token
        await user.update({ accessToken }, { where: { email } });
  
      const detailData = {
        name: User.name,
      };
  
      // Kirim response dengan accessToken
      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        maxAge: 3 * 60 * 60 * 1000, // 3 jam
      });
  
      res.status(200).json({ message: 'Login successfully', accessToken, detailData });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

//logout
export const logout = async (req, res) => {
  const accessToken = req.cookies.accessToken;
  if (!accessToken) return res.sendStatus(204); // No content, no accessToken provided

  try {
    const User = await user.findAll({
      where: {
        accessToken: accessToken
      }
    });

    if (!User.length) return res.sendStatus(404); // User not found

    const email = User[0].email;
    
    // Clear access token
    res.clearCookie('accessToken');
    
    await user.update({ accessToken: null }, {
      where: {
        email: email
      }
    });

    return res.status(200).json({ message: 'Logout successfully' });
  } catch (error) {
    console.error('Error during logout:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

//random token
const generateRandomString = (length) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

//forgot password
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  
  try {
    const User = await user.findOne({
      where: { email },
    });
    
    if (!User) {
      return res.status(404).json({ message: 'Email not registered' });
    }

    const accessToken = generateRandomString(32);

    // Save the access token
    await user.update({ accessToken }, { where: { email } });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: email,
      subject: 'Reset Password',
      text: `Click this link to reset your password: http://localhost:3000/changePassword?token=${accessToken}`,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully');

      return res.status(200).json({ message: 'Email sent successfully' });
    } catch (emailError) {
      console.error('Error sending email:', emailError);
      return res.status(500).json({ message: 'Email not sent', error: emailError.message });
    }

  } catch (error) {
    console.error('Error during forgot password:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Reset Password
export const resetPassword = async (req, res) => {
  const { token } = req.query;
  const { password } = req.body;

  if (!token) {
    return res.status(400).json({ message: 'Token is required' });
  }

  try {
    // Verify and decode the token
    const User = await user.findOne({ where: { accessToken: token } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const decoded = (token)=>{
      return token === user.accessToken;
    };

    //cek umur token
    if (Date.now() >= User.updatedAt + 3600000) {
      return res.status(401).json({ message: 'Token expired' });
    }

    // Update the user's password (make sure to hash it)
    const hashedPassword = await bcrypt.hash(password, 10); // Adjust the hashing method as needed
    await User.update({ password: hashedPassword }, { where: { email: decoded.email } });

    // Optionally, clear the access token after successful password reset
    await User.update({ accessToken: null }, { where: { email: decoded.email } });

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error during password reset:', error);
    return res.status(500).json({ message: 'Invalid or expired token' });
  }
};
