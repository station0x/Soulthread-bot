export async function getHost() {
    // Try to get the host value from .env
    const host = process.env.HOST === "dev"
    ? "http://localhost:3000"
    : "https://soulthread.xyz"; 
    return host; // return the host value
}