export const isAuthenticated = () => {
    return localStorage.getItem('token');
}

export const logout = () => {
    localStorage.clear();
};