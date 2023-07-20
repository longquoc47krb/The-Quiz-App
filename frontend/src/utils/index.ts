export function getTokenFromCookies(): string {
    const cookieString = document.cookie;
    const cookies = cookieString.split(';');

    for (const cookie of cookies) {
        const [name, value] = cookie.trim().split('=');

        if (name === 'access_token') {
            return decodeURIComponent(value);
        }
    }

    return "";
}
export function saveTokenToCookies(token: string): void {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 1); // Set expiration date to 1 day from now

    document.cookie = `access_token=${token}; expires=${expirationDate.toUTCString()}; path=/`;
}
