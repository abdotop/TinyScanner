import { deadline } from "jsr:@std/async";
async function scanUdpPort(host: string, port: number, timeout = 1000) {
  const socket = Deno.listenDatagram({
    port: 0,
    hostname: "0.0.0.0",
    transport: "udp",
  });

  const targetAddress: Deno.NetAddr = {
    transport: "udp",
    hostname: host,
    port,
  };

  try {
    // Requête DNS standard pour "example.com"
    const dnsQuery = new Uint8Array([
      0xaa,
      0xaa, // ID de la requête (aléatoire)
      0x01,
      0x00, // Flags : requête standard
      0x00,
      0x01, // 1 question
      0x00,
      0x00, // 0 réponses
      0x00,
      0x00, // 0 autorités
      0x00,
      0x00, // 0 supplémentaires
      0x07,
      0x65,
      0x78,
      0x61,
      0x6d,
      0x70,
      0x6c,
      0x65, // "example"
      0x03,
      0x63,
      0x6f,
      0x6d, // "com"
      0x00, // Fin du nom
      0x00,
      0x01, // Type A (IPv4)
      0x00,
      0x01, // Classe IN (Internet)
    ]);

    await socket.send(dnsQuery, targetAddress);
    const result = await deadline(
      socket.receive(),
      timeout,
    );

    if (result) {
      return true;
    } else {
      return false;
    }
  } catch {
    return false;
  } finally {
    socket.close();
  }
}

// Function to scan a range of UDP ports
export async function scanUdpPorts(
  host: string,
  startPort: number,
  endPort: number,
  timeout?: number,
) {
  console.log(timeout);

  for (let port = startPort; port <= endPort; port++) {
    const isOpen = await scanUdpPort(host, port, timeout);

    console.log(
      `${isOpen ? "✅" : "❌"} Port ${port} is ${isOpen ? "open" : "closed"}`,
    );
  }
}
