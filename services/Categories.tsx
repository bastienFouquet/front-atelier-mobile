import {consts} from '../config/consts';
import axios from 'axios';
import {Headers} from "./Headers";

export class Categories {
    public static async getAll(token: string): Promise<any> {
      try {
        const response = await axios.get(
            consts.apiBaseUrl + 'categories',
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
}
