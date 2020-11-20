export class Headers {
    public static getHeaders(token = null): any {
        return {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            }
        }
    }
}
