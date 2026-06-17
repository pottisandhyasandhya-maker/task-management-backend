const User = require("../config/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// REGISTER
exports.register = async (req, res) => {
  try {

    const { name, email, password } = req.body;


    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required"
      });
    }


    const exists = await User.findOne({ email });

    if (exists) {
      return res.status(400).json({
        message: "User already exists"
      });
    }


    const hashPassword = await bcrypt.hash(password, 10);


    await User.create({
      name,
      email,
      password: hashPassword
    });


    res.status(201).json({
      message: "User registered successfully"
    });


  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};



// LOGIN
exports.login = async (req, res) => {
  try {

    const { email, password } = req.body;


    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password required"
      });
    }


    const user = await User.findOne({ email });


    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }


    const correctPassword = await bcrypt.compare(
      password,
      user.password
    );


    if (!correctPassword) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }


    const token = jwt.sign(
      { id:user._id },
      process.env.JWT_SECRET,
      { expiresIn:"1d" }
    );


    res.json({
      message:"Login successful",
      token
    });


  } catch (error) {
  

    res.status(500).json({
      message:error.message
    });

  }
};