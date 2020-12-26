export const TOKEN_KEY = '@tcc-token';
export const CURRENT_USER = '@current-User';

export const isAuthenticated = () => {
    return localStorage.getItem(TOKEN_KEY) !== null;
};

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const getCurrentUser = () => JSON.parse(String(localStorage.getItem(CURRENT_USER)));

export const login = (token: string, currentUser: string) => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(CURRENT_USER, currentUser);
};

export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(CURRENT_USER);
};