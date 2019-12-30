import axios from "axios";
import {I_loginInfo} from "../../../Core/users-types";


const instance = axios.create({
    baseURL: "http://127.0.0.1:8000/api/users",
    withCredentials: true
});

export const authorisationAPI = {
    async logIn(data:I_loginInfo) {
        try {
            let res = await instance.post('/login', data);
            if (res.status >= 200) {
                return res.data;
            } else {
                return new Error(res.data.message);
            }
        } catch {
            return new Error('unknown Error');
        }
    },
    async logOut() {
        try {
            let res = await instance.delete('/logout');
            if (res.status >= 200) {
                return res.data;
            }
        } catch {
            return ;
        }
    },
};