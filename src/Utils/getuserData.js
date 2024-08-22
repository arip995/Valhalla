export const getUserData = () => {
  return JSON.parse(localStorage.getItem('user') || '{}');
};
export const setUserData = data => {
  localStorage.setItem('user', JSON.stringify(data));
};
