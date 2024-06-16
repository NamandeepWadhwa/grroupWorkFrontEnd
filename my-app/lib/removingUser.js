export function removingUser(){

  localStorage.removeItem('token');
  localStorage.removeItem('email');
  localStorage.removeItem('role');

} 