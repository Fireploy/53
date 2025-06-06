import mongoose from 'mongoose';
import webToken from '../models/shemas/webToken';
import { webTokenModel } from './static/webToken';

export const WebToken = mongoose.model<IWebTokenDocument, typeof webTokenModel>('webTokens', webToken);