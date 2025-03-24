import { parseArgs } from "jsr:@std/cli/parse-args";
import { scanTcpPorts } from "./tcp.ts";
import { scanUdpPorts } from "./udp.ts";

const helpOptions = `
  Usage: tinyscanner [OPTIONS] [HOST] [PORT]
  Options:
    -p               Range of ports to scan
    -u               UDP scan
    -t               TCP scan
    --timeout <ms>    Set the timeout for the scan in milliseconds (e.g., --timeout 3000).
    --help           Show this message and exit.
  Example:
    tinyscanner -t 127.0.0.1 -p 80
    tinyscanner -t 10.53.224.5 -p 80-83
  `;

async function main() {
  const flags = parseArgs(Deno.args, {
    boolean: ["u", "t", "h", "help"],
    string: ["p", "timeout"],
  });

  if (flags.help || flags.h) {
    console.log(helpOptions);
    Deno.exit(0);
  }

  const host = flags._[0] as string;
  const portRange = flags.p as string;

  if (!host || !portRange) {
    console.error("Error: Host and port range are required.");
    Deno.exit(1);
  }

  const [startPort, endPort] = portRange.split("-").map(Number);

  if (flags.t) {
    console.log(`Scanning TCP ports on ${host}...`);
    await scanTcpPorts(
      host,
      startPort,
      endPort || startPort,
      Number(flags.timeout) || undefined,
    );
  } else if (flags.u) {
    console.log(`Scanning UDP ports on ${host}...`);
    await scanUdpPorts(
      host,
      startPort,
      endPort || startPort,
      Number(flags.timeout) || undefined,
    );
  } else {
    console.error("Error: Specify either -t for TCP or -u for UDP.");
    Deno.exit(1);
  }
}

await main();
