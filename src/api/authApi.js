import axiosClient from '~/api/axiosClient';
import authHeader from './auth-header';

const register = (username, email, password) => {
    const url = '/auth/signup';
    return axiosClient.post(url, {
        username,
        email,
        password,
    });
};

const login = (data) => {
    return axiosClient({
        method: 'post',
        url: '/auth/signin',
        data: data,
    }).then((response) => {
        if (response.data.accessToken) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
    });
};

const logout = () => {
    console.log(authHeader());
    return axiosClient.post('/auth/signout').then((response) => {
        return response.message;
    });
};

const sendForgotPasswordEmail = (data) => {
    return axiosClient.post('/auth/sendForgotPasswordEmail', data);
};

const refreshToken = (refreshToken) => {
    return axiosClient.post('/auth/refreshtoken', {
        refreshToken,
    });
};

const changePassword = (email, param) => {
    return axiosClient.post('/auth/savePassword' + param, {
        email,
    });
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};

const AuthApi = {
    register,
    login,
    logout,
    getCurrentUser,
    sendForgotPasswordEmail,
    changePassword,
    refreshToken,
};

export default AuthApi;
