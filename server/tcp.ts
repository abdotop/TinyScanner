import { parseArgs } from "jsr:@std/cli/parse-args";

const flags = parseArgs(Deno.args, {
  string: ["p"],
});

const port = Number(flags.p) || 41234;

const listener = Deno.listen({ port });

console.log(`Serveur TCP en écoute sur le port ${port}...`);

for await (const conn of listener) {
  handleClient(conn);
}

async function handleClient(conn: Deno.Conn) {
  console.log("Nouveau client connecté :", conn.remoteAddr);

  const buffer = new Uint8Array(1024);
  while (true) {
    try {
      const bytesRead = await conn.read(buffer);
      if (bytesRead === null) break; // Fin de connexion

      const message = new TextDecoder().decode(buffer.subarray(0, bytesRead));
      console.log("Message reçu :", message);

      // Répondre au client
      const response = `Serveur: ${message.toUpperCase()}`;
      await conn.write(new TextEncoder().encode(response));
    } catch (err) {
      console.error("Erreur :", err);
      break;
    }
  }

  console.log("Client déconnecté.");
  conn.close();
}
