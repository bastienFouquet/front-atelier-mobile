import {consts} from '../config/consts';
import axios from 'axios';
import {Headers} from "./Headers";

export class Recipe {
    public static async getAll(token: string): Promise<any> {
        try {
            const response = await axios.get(
                consts.apiBaseUrl + 'recipes',
                Headers.getHeaders(token)
            );
            if (response.data) {
                return Promise.resolve(response.data);
            } else {
                return Promise.resolve(null);
            }
        } catch (e) {
            console.error(e);
            return Promise.reject(e);
        }
    }

    public static async getOne(recipeId: number, token: string): Promise<any> {
        try {
            const response = await axios.get(
                consts.apiBaseUrl + 'recipe/' + recipeId,
                Headers.getHeaders(token)
            );
            if (response.data) {
                return Promise.resolve(response.data);
            } else {
                return Promise.resolve(null);
            }
        } catch (e) {
            console.error(e);
            return Promise.reject(e);
        }
    }

    public static async create(token: string, data: any): Promise<any> {
        try {
            const response = await axios.post(
                consts.apiBaseUrl + 'recipe/create', {
                    title: data.title,
                    level: data.level,
                    categoryId: data.categoryId,
                    servings: data.servings,
                    duration: data.duration,
                    ingredients: data.ingredients,
                    steps: data.steps,
                    image: data.image ? data.image : null
                }, Headers.getHeaders(token)
            );
            return Promise.resolve(response.data);
        } catch (e) {
            console.error(e);
        }
    }
}
