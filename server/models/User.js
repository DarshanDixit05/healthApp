import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const secretKey = 'darshan'; 

// User schema
const userSchema = new mongoose.Schema({
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  fullName: { type: String, required: true },
  userName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  imgName: String,
  imgDesc: String,
  img:
  {
      data: Buffer,
      contentType: String
  }
});


userSchema.methods.generateAccessToken = function () {
  const token = jwt.sign(
    { _id: this._id },
    secretKey,
    { expiresIn: '1h' }
  );

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      console.error(err);
      // return res.status(401).json({ message: 'Unauthorized' });
    } else {
      console.log(decoded);
      // return res.status(200).json({ message: 'Token verified', decoded });
    }
  });
  this.tokens.push({ token });
  this.save();
  return token;
};

// User model from schema
const User = mongoose.model('User', userSchema);

export default User