import {consts} from '../config/consts';
import {Headers} from './Headers';
import axios from 'axios';

export class Auth {
    public static async authByCredentials(email: string, password: string): Promise<any> {
        try {
            const response = await axios.post(
                consts.apiBaseUrl + 'user/auth', {
                    email: email,
                    password: password
                }, Headers.getHeaders());
            if (response.data) {
                return Promise.resolve(response.data);
            } else {
                return Promise.resolve('Invalid Credentials !');
            }
        } catch (e) {
            console.error(e);
            return Promise.reject(e)
        }
    }
}
