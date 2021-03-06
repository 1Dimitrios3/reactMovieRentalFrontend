import http from './httpService';
import { apiUrl } from '../config.json';

const apiEndpoint = apiUrl + "/users";

export function register(user) {
    return http.post(apiEndpoint, {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password
    });
}
