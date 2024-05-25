import { jwtDecode } from 'jwt-decode';
import {gettingUser } from'./gettingUser';

export function readToken() {
  try {
    const token = gettingUser().token;
    return token ? jwtDecode(token) : null;
  } catch (err) {
    return null;
  }
}

export function isAuthenticated() {

const token =readToken();
return token ? true:false
}