export default (token: string | null) => {
    if (!token) return localStorage.removeItem('token');
    localStorage.setItem('token', token);
}