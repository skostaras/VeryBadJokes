import * as express from 'express';
import {Application} from "express";
import {getAllCategories, getCategoryById} from "./get-categories.route";
import {searchLessons} from "./search-lessons.route";

const app: Application = express();

app.route('/api/categories').get(getAllCategories);

app.route('/api/categories/:id').get(getCategoryById);

app.route('/api/lessons').get(searchLessons);

const httpServer:any = app.listen(9000, () => {
    console.log("HTTP REST API Server running at http://localhost:" + httpServer.address().port);
});




