import mongoose from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends mongoose.Document {
  email: string;
  password: string;
  refreshToken?: string;
  comparePassword(candidate: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    refreshToken: { type: String }
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete (ret as any).password;
        delete (ret as any).refreshToken;
        delete (ret as any).__v;
        return ret;
      }
    }
  }
);

// Hash password before save
userSchema.pre<IUser>('save', async function (this: IUser) {
  if (!this.isModified('password')) return;
  const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS) || 10;
  try {
    const hash = await bcrypt.hash(this.password, saltRounds);
    this.password = hash;
  } catch (err) {
    throw err;
  }
});

userSchema.methods.comparePassword = async function (candidate: string) {
  return bcrypt.compare(candidate, this.password);
};

const UserModel = mongoose.model<IUser>("User", userSchema);
export default UserModel;
