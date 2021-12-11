import {Request, Response} from 'express';
import { CATEGORIES } from './db-data';

export function getAllCategories(req: Request, res: Response) {
    res.status(200).json({payload:Object.values(CATEGORIES)});
}

export function getCategoryById(req: Request, res: Response) {

    const categoryId = req.params["id"];

    const categories:any = Object.values(CATEGORIES);

    const category = categories.find(category => category.id == categoryId);

    res.status(200).json(category);
}