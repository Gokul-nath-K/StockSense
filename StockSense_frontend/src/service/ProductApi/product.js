import axios from 'axios';

export const getproduct = () => {

    return axios.get(`http://localhost:8080/api/v1/products/get`);
}

export const getcount = () => {

    return axios.get(`http://localhost:8080/api/v1/products/count`);
}

export const getSortedProduct = ( label, dir, no, size) => {

    return axios.get(`http://localhost:8080/api/v1/products/get_sorted/${label}/${dir}/${no}/${size}`);
}

export const getPagedProducts = ( no, size) => {

    return axios.get(`http://localhost:8080/api/v1/products/get_paged/${no}/${size}`);
}
export const postproduct = (data) => {

    return axios.post(`http://localhost:8080/api/v1/products/post`, data)
}

export const updateproduct = (id, data) => {

    return axios.put(`http://localhost:8080/api/v1/products/put/` + id, data)
}

export const deleteproduct = (index) => {

    return axios.delete(`http://localhost:8080/api/v1/products/delete/` + index);
}

