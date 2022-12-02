export async function getHost() {
  // if "dev" --> Use host http://localhost:3000 for testing, else use https://soulthread.xyz (Add HOST="dev" to local .env)
  const host =
    process.env.ENV === "dev"
      ? "http://localhost:3000"
      : "https://soulthread.xyz";
  return host; // return the host value
}
