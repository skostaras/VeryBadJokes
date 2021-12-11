import {Request, Response} from 'express';
import { COURSES, CATEGORIES } from './db-data';

export function getAllCourses(req: Request, res: Response) {
    res.status(200).json({payload:Object.values(COURSES)});
}

export function getAllCategories(req: Request, res: Response) {
    res.status(200).json({payload:Object.values(CATEGORIES)});
}

export function getCourseById(req: Request, res: Response) {

    const courseId = req.params["id"];

    const courses:any = Object.values(COURSES);

    const course = courses.find(course => course.id == courseId);

    res.status(200).json(course);
}

export function getCategoryById(req: Request, res: Response) {

    const categoryId = req.params["id"];

    const categories:any = Object.values(CATEGORIES);

    const category = categories.find(category => category.id == categoryId);

    res.status(200).json(category);
}