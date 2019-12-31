import axios from "axios";
import {I_loginInfo} from "../../../Core/users-types";


const instance = axios.create({
    baseURL: "http://127.0.0.1:8000/api/users",
    withCredentials: true
});

export const authorisationAPI = {
    async logIn(data: I_loginInfo) {
        try {
            let res = await instance.post('/login', data);
            return res.data;
        } catch (e) {
            if (e instanceof EvalError) {
                console.log('network Error')
            } else if (e instanceof RangeError) {
                console.log(e.name + ': ' + e.message);
            } else {
                console.log(e);
                return e
            }
        }
    },
    async logOut() {
        try {
            let res = await instance.delete('/logout');
            if (res.status >= 200) {
                return res.data;
            }
        } catch {
            return new Error('unknown Error');
        }
    },
};