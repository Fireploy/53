import mongoose from 'mongoose';
import weigthCategory from '../models/shemas/weightCategory';
import { weightCategoryModel } from './static/weightCategory';

export const WeightCategory = mongoose.model<IweightCategoryDocument, typeof weightCategoryModel>('weihgthCategorys', weigthCategory);