import axios from "axios";

const instance = axios.create({
    baseURL: "http://127.0.0.1:3000/",
    withCredentials: true
});

interface I_counter {
    data: {
        count: string
    }
}

export const counterApi = {
    fetchCount () {
        return instance.get('count')
            .then(res => {
                if(res.status >= 200) {
                    return res.data
                }
            })
            .catch(()=> {
                return 0;
            })
    },
    increaseCount (quan:number) {
        return instance.patch('count', {count: quan + 1})
            .then(res => {
                if(res.status >= 200) {
                    return res.data
                }
            })
            .catch(()=> {
                return 0;
            })
    },
    async decreaseCount (quan:number) {
        try {
            const response =  await instance.get<I_counter>('count');
            const res = await instance.patch('count', {count: quan -1 });
            return res.data
        } catch (e) {
            return "0"
        }
    }
};