import axios from "axios";


const instance = axios.create({
    baseURL: "http://127.0.0.1:8000/api/users",
    withCredentials: true
});

export const authorisationAPI = {
    async logIn(data:{phone: string, password:string}) {
        try {
            let res = await instance.post('/login', data);
            if (res.status >= 200) {
                return res.data;
            }
        } catch {
            return null;
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