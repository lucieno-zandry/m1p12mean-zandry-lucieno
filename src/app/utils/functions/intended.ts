type Intended = {
    uri: string,
    authOnly: boolean
}

export const setIntended = (uri: string, required: Intended['authOnly']) => {
    sessionStorage.setItem('intended', JSON.stringify({
        uri,
        required
    }))
}

export const getIntended = (): Intended | null => {
    const intended = sessionStorage.getItem('intended');
    return intended && JSON.parse(intended);
}

export const clear = () => {
    sessionStorage.removeItem('intended');
}

export default {
    setIntended,
    getIntended,
    clear
}