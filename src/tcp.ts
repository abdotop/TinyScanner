import { deadline } from "jsr:@std/async";

async function scanTcpPort(host: string, port: number, timeout = 1000) {
  try {
    const conn = await deadline(
      Deno.connect({
        hostname: host,
        port,
        transport: "tcp",
      }),
      timeout,
    );

    await conn.write(new TextEncoder().encode("ping"));
    conn.close();
    return true;
  } catch {
    return false;
  }
}

// Function to scan a range of TCP ports
export async function scanTcpPorts(
  host: string,
  startPort: number,
  endPort: number,
  timeout?: number,
) {
  for (let port = startPort; port <= endPort; port++) {
    const isOpen = await scanTcpPort(host, port, timeout);
    console.log(
      `${isOpen ? "✅" : "❌"} Port ${port} is ${isOpen ? "open" : "closed"}`, // (${serviceName})`,
    );
  }
  Deno.exit(0);
}
