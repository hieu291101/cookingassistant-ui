import axios from 'axios';
import { parse, stringify } from 'qs';
import { useDispatch } from 'react-redux';
import { logoutUser } from '~/features/authSlice';
import authHeader from './auth-header';

console.log(process.env.REACT_APP_API_URL);

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: authHeader(),
    paramsSerializer: {
        encode: parse,
        serialize: stringify,
    },
});

axiosClient.interceptors.request.use(
    // (config) => {
    // //Handle token
    //     const user = JSON.parse(localStorage.getItem('user'));
    //     config.headers.common['Authorization'] = 'Bearer ' + user.accessToken;
    //     return config;
    // }, (error) => { 
    //     return Promise.reject(error);
    // }
);

axiosClient.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data;
        }

        return response;
    },
    async (err) => {
        const originalConfig = err.config;
        
        if (originalConfig.url !== "/auth/signin" && err.response) {
          // Access Token was expired
          if (err.response.status === 401 && !originalConfig._retry) {
            originalConfig._retry = true;
    
            try {
                const dispatch = useDispatch();
                dispatch(logoutUser());
    
                return axiosClient(originalConfig);
            } catch (_error) {
              return Promise.reject(_error);
            }
          }
        }
    
        return Promise.reject(err);
    },
);

export default axiosClient;
