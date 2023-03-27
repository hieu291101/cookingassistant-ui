import AuthApi from '~/api/authApi';

export const logOut = (refreshToken) => {
    AuthApi.logout();
    AuthApi.refreshToken(refreshToken);
};