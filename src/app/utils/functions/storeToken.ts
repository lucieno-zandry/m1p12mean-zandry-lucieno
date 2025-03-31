export default (token: string) => {
    return localStorage.setItem('token', token);
}