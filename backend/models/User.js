import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  type: { type: String, enum: ["citizen", "lawyer", "judge"], default: "citizen" },
  phone: { type: String },
  location: { type: String },
  barRegistration: { type: String },
  specialization: { type: String },
  experience: { type: String },
  fees: { type: String },
  qualifications: { type: String },
  about: { type: String }
});

const User = mongoose.model('User', userSchema);
export default User;
