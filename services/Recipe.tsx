import {consts} from '../config/consts';
import axios from 'axios';
import {Headers} from "./Headers";

export class Recipe {

    public static async getAll(token: string): Promise<any> {
        try {
            const response = await axios.get(
                consts.apiBaseUrl + "recipes",
                Headers.getHeaders(token)
            );
            if (response.data) {
                return Promise.resolve(response.data);
            } else {
                return Promise.resolve("No data");
            }
        } catch (e) {
            console.error(e);
            return Promise.reject(e);
        }
    }

    public static async getOne(recipeId: number, token: string): Promise<any> {
        try {
            const response = await axios.get(
                consts.apiBaseUrl + "recipe/" + recipeId,
                Headers.getHeaders(token)
            );
            if (response.data) {
                return Promise.resolve(response.data);
            } else {
                return Promise.resolve("No data");
            }
        } catch (e) {
            console.error(e);
            return Promise.reject(e);
        }
    }
}
