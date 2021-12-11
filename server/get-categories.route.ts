import {Request, Response} from 'express';
import { CATEGORIES } from './db-data';

export function getAllCategories(req: Request, res: Response) {
    res.status(200).json({payload:Object.values(CATEGORIES)});
}

export function getCategoryByDescription(req: Request, res: Response) {

    const categoryDescription = req.params["description"];

    const categories:any = Object.values(CATEGORIES);

    const category = categories.find(category => category.description == categoryDescription);

    res.status(200).json(category);
}