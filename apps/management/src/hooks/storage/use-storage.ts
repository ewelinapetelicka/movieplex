export function useStorage(){
    return {
        get(key: string) {
            return localStorage.getItem(key)
        },
        set(key: string, value: string) {
            localStorage.setItem(key, value)
        }
    }
}