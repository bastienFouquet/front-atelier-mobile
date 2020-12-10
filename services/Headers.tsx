export const Headers = {
    getHeaders: (token: any = null): any => {
        return {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            }
        }
    }
}
