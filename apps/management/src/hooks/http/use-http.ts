export function useHttp() {
    const host = 'http://localhost:8000';

    return {
        get(endpoint: string) {
            return fetch(host + endpoint).then((response) => response.json())
        },
        delete(endpoint: string) {
            return fetch(host + endpoint, {
                method: 'DELETE'
            })
        },
        patch(endpoint: string, body: any) {
            return fetch(host + endpoint, {
                method: 'PATCH',
                body: JSON.stringify(body)
            })
        },
        post(endpoint: string, body: any) {
            return fetch(host + endpoint, {
                method: 'POST',
                body: JSON.stringify(body)
            })
        }
    }
}