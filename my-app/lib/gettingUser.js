export function gettingUser() {

    const token = localStorage.getItem('token');

    return { token };
}