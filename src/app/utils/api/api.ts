import { inject } from "@angular/core";
import { Router } from "@angular/router";

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

const getActionUrl = (action: string): string | null => {
    if (action === 'LOGIN' && !['/auth/login', '/auth/signup', '/'].includes(location.pathname)) {
        return '/auth/login';
    }

    if (action === 'ACTIVATE') {
        return '/auth/pending';
    }

    return null;
}

const navigateByUrl = (url: string) => {
    location.href = url;
}


export const get = async <T>(uri: string): Promise<T> => {
    const response = await fetch(buildUrl(uri), {
        headers: buildHeaders()
    });

    const data = await response.json();

    if (!response.ok) {
        if (response.status === 403 && data.action) {
            const actionUrl = getActionUrl(data.action)
            actionUrl && navigateByUrl(actionUrl);
        }

        throw data;
    };

    return data;
}

export const post = async <T>(uri: string, payload: unknown): Promise<T> => {
    const response = await fetch(buildUrl(uri), {
        method: "POST",
        body: JSON.stringify(payload),
        headers: buildHeaders()
    });

    const data = await response.json();

    if (!response.ok) {
        if (response.status === 403 && data.action) {
            const actionUrl = getActionUrl(data.action)
            actionUrl && navigateByUrl(actionUrl);
        }

        throw data;
    };

    return data;
}

export const put = async <T>(uri: string, payload: unknown): Promise<T> => {
    const response = await fetch(buildUrl(uri), {
        method: "PUT",
        body: JSON.stringify(payload),
        headers: buildHeaders()
    });

    const data = await response.json();

    if (!response.ok) {
        if (response.status === 403 && data.action) {
            const actionUrl = getActionUrl(data.action)
            actionUrl && navigateByUrl(actionUrl);
        }

        throw data;
    };

    return data;
}

export const destroy = async <T>(uri: string, payload: unknown = {}): Promise<T> => {
    const response = await fetch(buildUrl(uri), {
        method: "DELETE",
        body: JSON.stringify(payload),
        headers: buildHeaders()
    });

    const data = await response.json();

    if (!response.ok) {
        if (response.status === 403 && data.action) {
            const actionUrl = getActionUrl(data.action)
            actionUrl && navigateByUrl(actionUrl);
        }

        throw data;
    };

    return data;
}

export default {
    get,
    post,
    put,
    delete: destroy
}