export  const API_PATH = "http://localhost/api/";
export const TOKEN_NAME = "role-permission"; //proyekt uchun alohida yozish mn
export const tokenKey = localStorage.getItem(TOKEN_NAME); //keyda EJG tokenni
export const tokenHeader = {
    headers: {Authorization: tokenKey}
};