import Cookies from "js-cookie";

export const setTokenCookies = (token : string )=>{
    Cookies.set('refreshToken', token,  { expires: 7, sameSite: 'Strict', secure: window.location.protocol === 'https' });
}
export const getTokenCookies =() =>  Cookies.get('refreshToken')
export const clearTokenCookies =() => Cookies.remove('refreshToken')

export const tokenForMiddleware = getTokenCookies()