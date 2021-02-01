import {consts} from '../config/consts';
import axios from 'axios';
import {Headers} from "./Headers";

export class Notes {
    public static async create(token: string, recipeId: number, value: number): Promise<any> {
        try {
            const response = await axios.post(
                consts.apiBaseUrl + 'notes/create', {
                    recipe: recipeId,
                    value: value
                }, Headers.getHeaders(token)
            );
            return Promise.resolve(response.data);
        } catch (e) {
            console.error(e);
            return Promise.reject(e);
        }
    }

    public static async update(token: string, note: any): Promise<any> {
        try {
            const response = await axios.put(
                consts.apiBaseUrl + 'notes/update/' + note.id, {
                    value: note.value
                }, Headers.getHeaders(token)
            )
            return Promise.resolve(response.data);
        } catch (e) {
            console.error(e);
            return Promise.reject(e);
        }
    }
}
