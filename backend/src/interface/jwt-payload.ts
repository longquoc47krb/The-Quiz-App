export interface JwtPayload {
    sub: string; // Subject - typically the user ID
    username: string; // Username or any other user-specific data
    roles: string[]; // User roles or permissions
    // Add any other properties you want to include in the JWT payload
}
