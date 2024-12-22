import Cookies from "js-cookie";
export const isAuthenticated = () => {
    return Cookies.get("token") || null;
};

export const logout = () => {
    const allCookies = Cookies.get();
    for (const cookieName in allCookies) {
        Cookies.remove(cookieName, { path: '/' });
    }
};