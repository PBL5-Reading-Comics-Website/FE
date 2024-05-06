import axios from 'axios';
import { Cookies } from 'react-cookie';
export async function LoginAPI(inputs: object) {

    return await axios.post('/api/auth/login', inputs).then(async (response) => {
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(response.status + "");
        }
    });
}
export async function validateUser() {
    return await axios.get(`/api/auth/validate`).then((isValid) => isValid.data);
}
export async function logout() {
    const cookie = new Cookies();
    cookie.remove("jwt")
    return await axios.get(`/api/auth/logout`).then((response) => {

        return response
    });
}
