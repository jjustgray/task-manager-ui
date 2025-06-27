export const isAuthenticated = () => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    const auth = localStorage.getItem('auth');
    return user?.email && auth === 'true';
  } catch {
    return false;
  }
};
