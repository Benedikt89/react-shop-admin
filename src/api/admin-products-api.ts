import axios from "axios";
import {I_productItem} from "../../../Core/products-types";

const testProducts = {status: 404, message: 'notFound'};

const instance = axios.create({
    baseURL: "http://127.0.0.1:8000/api/pizzas",
    withCredentials: true
});

interface I_createProduct {
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
                return testProducts;
            }
        } catch {
            return testProducts;
        }
    },

    async getFilters() {
        try {
            let res = await instance.get(`filter/`);
            if (res.status === 200) {
                return res.data;
            }
        } catch (e) {
            return testProducts;
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
    putProduct(product: I_productItem) {
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