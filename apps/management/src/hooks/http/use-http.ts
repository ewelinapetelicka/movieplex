export function useHttp() {
    const host = 'http://localhost:8000/';

    return {
        get(endpoint: string, params?: any) {
            let url = host + endpoint;

            if (params) {
                url = url + "?";
                for (const key in params) {
                    url = url + key + "=" + params[key] + "&";
                }
            }
            return fetch(url).then((response) => response.json())
        },
        delete(endpoint: string) {
            return fetch(host + endpoint, {
                method: 'DELETE'
            })
        },
        patch(endpoint: string, body: any) {
            return fetch(host + endpoint, {
                method: 'PATCH',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        },
        post(endpoint: string, body: any) {
            return fetch(host + endpoint, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }
    }
}