import mongoose from 'mongoose';

// We are establishing a 1-1 relationship here, where one user account can only map back to one profile
// Can an account have more than one profile. Sure. You can make your design choices in your own project on this matter. But for now, we will establish this as a 1-1 relationship.

const profileSchema = mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  bio: { type: String },
  profileImageUrl: { type: String },
  accountId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
});

const skipInit = process.env.NODE_ENV === 'development';
export default mongoose.model('profiles', profileSchema, 'profiles', skipInit);
