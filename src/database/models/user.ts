import mongoose from 'mongoose';
import user from '../models/shemas/user';
import { userModel } from './static/user';

export const User = mongoose.model<IUserDocument, typeof userModel>('users', user);