const API_URL = "http://localhost:3000/api";

const buildUrl = (uri: string) => {
    return `${API_URL}${uri}`
}

const buildHeaders = () => {
    return {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
}

export const get = async <T>(uri: string): Promise<T> => {
    const response = await fetch(buildUrl(uri), {
        headers: buildHeaders()
    });

    const data = await response.json();

    if (!response.ok) throw data;
    return data;
}

export const post = async <T>(uri: string, payload: unknown): Promise<T> => {
    const response = await fetch(buildUrl(uri), {
        method: "POST",
        body: JSON.stringify(payload),
        headers: buildHeaders()
    });

    const data = await response.json();

    if (!response.ok) throw data;
    return data;
}

export default {
    get,
    post
}