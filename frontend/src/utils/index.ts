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
export function clearAccessTokenInCookie() {
    // Đặt tên của cookie chứa accessToken
    const cookieName = 'access_token';
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() - 7);
    // Để xóa cookie, bạn có thể đặt nó với một thời gian hết hạn trong quá khứ
    // Điều này sẽ làm cho cookie tự động bị xóa ngay lập tức
    document.cookie = `access_token=; expires=${expirationDate.toUTCString()}; path=/`;

    // Nếu cookie đã có một domain hoặc path khác, bạn nên thêm nó vào khi xóa cookie
    // Ví dụ: document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=example.com;`;
}
