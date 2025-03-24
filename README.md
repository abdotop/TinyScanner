# TinyScanner

TinyScanner is a lightweight port scanner and server utility built with Deno. It
allows you to scan TCP and UDP ports on a target host and includes simple TCP
and UDP servers for testing purposes.

---

## Features

- **TCP Port Scanner**: Scan a range of TCP ports on a target host.
- **UDP Port Scanner**: Scan a range of UDP ports on a target host.
- **TCP Server**: A simple TCP server for testing TCP connections.
- **UDP Server**: A simple UDP server for testing UDP communication.

---

## Prerequisites

- [Deno](https://deno.land/) installed on your system.

---

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/abdotop/TinyScanner.git
   cd tinyscanner
   ```

2. Install dependencies (if any):
   - This project uses Deno's native modules, so no additional installation is
     required.

---

## Usage

### 1. **Port Scanner**

The main script (`src/main.ts`) allows you to scan TCP or UDP ports on a target
host.

#### Command-Line Options

| Option      | Description                                                          | Example                          |
| ----------- | -------------------------------------------------------------------- | -------------------------------- |
| `-t`        | Scan TCP ports                                                       | `tinyscanner -t 127.0.0.1 -p 80` |
| `-u`        | Scan UDP ports                                                       | `tinyscanner -u 127.0.0.1 -p 53` |
| `-p`        | Port range (e.g., `80` or `80-85`)                                   | `-p 80-85`                       |
| `--timeout` | Set the timeout for the scan in milliseconds (e.g., --timeout 3000). | `-p 80-85`                       |
| `--help`    | Show help message                                                    | `tinyscanner --help`             |

#### Examples

- Scan TCP ports 80 to 85 on \`127.0.0.1\`:
  ```bash
  deno task scan -t 127.0.0.1 -p 80-85
  ```

- Scan UDP port 53 on \`8.8.8.8\`:
  ```bash
  deno task scan -u 8.8.8.8 -p 53
  ```

---

### 2. **TCP Server**

The TCP server (`server/tcp.ts`) listens for incoming TCP connections and echoes
back received messages in uppercase.

#### Start the TCP Server

```bash
deno task tcp -p 41234
```

- Replace `41234` with the desired port number.

#### Example Client Interaction

Use `netcat` or any TCP client to connect to the server:

```bash
nc 127.0.0.1 41234
```

Send a message, and the server will respond with the message in uppercase.

---

### 3. **UDP Server**

The UDP server (`server/udp.ts`) listens for incoming UDP messages and echoes
them back to the sender.

#### Start the UDP Server

```bash
deno task udp -p 41234
```

- Replace `41234` with the desired port number.

#### Example Client Interaction

Use `netcat` or any UDP client to send messages to the server:

```bash
echo "Hello" | nc -u 127.0.0.1 41234
```

The server will respond with `Vous avez dit : Hello`.

---

## Tasks

The project includes predefined tasks in the `deno.json` file:

| Task    | Description          | Command                             |
| ------- | -------------------- | ----------------------------------- |
| `scan`  | Run the port scanner | `deno task scan -t 127.0.0.1 -p 80` |
| `tcp`   | Start the TCP server | `deno task tcp -p 41234`            |
| `udp`   | Start the UDP server | `deno task udp -p 41234`            |
| `help`  | Show help message    | `deno task help`                    |


---

## Permissions

- `--allow-net`: Required for network access.
- `--unstable-net`: Required for unstable Deno networking APIs.

---

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file
for details.

---

Enjoy scanning and testing with TinyScanner! 🚀
