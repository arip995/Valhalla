export const setCurrentUser = data => {
  localStorage.removeItem('user');
  localStorage.setItem('user', JSON.stringify(data));
};
