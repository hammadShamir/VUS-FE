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

export const getUser = () => {
    const user = Cookies.get("user");
    if (user) {
        try {
            const storedUser = JSON.parse(user);
            return storedUser
        } catch (error) {
            console.error("Error parsing user cookie:", error);
            return undefined;
        }
    }
}