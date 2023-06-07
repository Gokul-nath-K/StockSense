import axios from 'axios'

export const postuser = (user) => {

    return axios.post('http://localhost:8080/api/v1/user/post', user);
};

export const authuser = (email, password) => {

    return axios.get('http://localhost:8080/api/v1/user/auth_user?email=' + email + '&password=' + password)
}