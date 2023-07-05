export function getTokenFromCookies(): string {
    const cookieString = document.cookie;
    const cookies = cookieString.split("; ");
    for (const cookie of cookies) {
        const [name, value] = cookie.split("=");
        if (name === "access_token") {
            return value;
        }
    }
    return "";
}
export function saveTokenToCookies(token: string): void {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 7); // Set expiration date to 7 days from now

    document.cookie = `access_token=${token}; expires=${expirationDate.toUTCString()}; path=/`;
}
