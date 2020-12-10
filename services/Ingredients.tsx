import axios from "axios";
import {consts} from "../config/consts";
import {Headers} from "./Headers";

export class Ingredients {
    public static async getAll(token: string): Promise<any> {
      try {
        const response = await axios.get(
            consts.apiBaseUrl + 'ingredients',
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

    public static async create(token: string, title: string): Promise<any> {
      try {
        const response = await axios.post(
            consts.apiBaseUrl + 'ingredient/create', {
                title: title
            }, Headers.getHeaders(token)
        );
        return Promise.resolve(response.data);
      } catch (e) {
        console.error(e);
      }
    }
}
