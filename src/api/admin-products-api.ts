import axios from "axios";
import {IProductItem} from "../../../Core/products-types";

const testPissas = {status: 404, message: 'notFound'};

const instance = axios.create({
    baseURL: "http://127.0.0.1:8000/api/pizzas",
    withCredentials: true
});

interface IcreateProduct {
    name: string
    photo: File
    price: string
    size: string
    text_long: string
    text_short: string
}

export const adminProductsAPI = {
    async getProducts() {
        try {
            let res = await instance.get('/');
            if (res.status >= 200 && res.status < 300) {
                return res.data.products;
            } else {
                return testPissas;
            }
        } catch {
            return testPissas;
        }
    },

    async getFilters() {
        try {
            let res = await instance.get(`filter/`);
            if (res.status === 200) {
                return res.data;
            }
        } catch (e) {
            return testPissas;
        }
    },
    postProduct(sendData: any) {
        return instance.post(`/`, sendData, {
            headers: {
                'Content-type': 'multipart/form-data',
            }
        })
            .then(res => {
                debugger;
                return res.data
            })
    },
    putProduct(product: IProductItem) {
        return instance.put(`/`, product)
            .then(res => {
                if (res.status >= 200) {
                    return res.data
                }
            })
            .catch((e) => {
                return alert(e.message ? e.message : 'update error');
            })
    },

    deleteProduct(productId: string) {
        return instance.delete(`/${productId}`)
            .then(res => {
                if (res.status >= 200) {
                    return res.data
                }
            })
            .catch((e) => {
                return alert(e.message ? e.message : 'delete error');
            })
    },
};