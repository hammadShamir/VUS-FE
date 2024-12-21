export const isAuthenticated = () => {
    const cookies = document.cookie.split("; ");
    const tokenCookie = cookies.find((cookie) => cookie.startsWith("token="));

    if (tokenCookie) {
        return tokenCookie.split("=")[1];
    }
    return null;
};

export const logout = () => {
    localStorage.clear();
};