import Cookies from "js-cookie";
const setSessionCookie = (token) => {
    const expirationTime = new Date(Date.now() + 30000); 
    Cookies.set('authToken', token, { expires: expirationTime});
};
export default setSessionCookie;