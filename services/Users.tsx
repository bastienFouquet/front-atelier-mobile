import {consts} from '../config/consts';
import {Headers} from './Headers';
import axios from 'axios';

export class Users {
    public static async register(data: any): Promise<any> {
        try {
            const response = await axios.post(
                consts.apiBaseUrl + 'user/register', {
                    firstname: data.firstname,
                    lastname: data.lastname,
                    email: data.email,
                    password: data.password,
                    confirmationPassword: data.confirmationPassword
                }, Headers.getHeaders());
            if (response.data) {
                return Promise.resolve(response.data);
            } else {
                return Promise.resolve('An error occured !');
            }
        } catch (e) {
            console.error(e);
            return Promise.reject(e)
        }
    }
}
