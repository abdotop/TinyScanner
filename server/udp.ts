import { parseArgs } from "jsr:@std/cli/parse-args";

const encoder = new TextEncoder();
const decoder = new TextDecoder();

const flags = parseArgs(Deno.args, {
  string: ["p"],
});

const port = Number(flags.p) || 41234;

const server = Deno.listenDatagram({
  port,
  transport: "udp",
  hostname: "0.0.0.0",
});

console.log(`Serveur UDP démarré sur le port ${port}`);

async function handleMessages() {
  for await (const [message, remoteAddr] of server) {
    const receivedMessage = decoder.decode(message);
    console.log(`Message:${receivedMessage} at:`, performance.now());

    const response = encoder.encode(`Vous avez dit : ${receivedMessage}`);
    await server.send(response, remoteAddr);
  }
}

handleMessages().catch((error) => {
  console.error("Erreur du serveur :", error);
});
