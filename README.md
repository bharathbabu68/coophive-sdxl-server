# CoopHive Express Server

This Express server is designed to interact with the CoopHive network using the SDXL module. It receives a prompt, runs the specified CLI command, and returns the output along with the generated image file.

## Prerequisites

Before running the server, ensure you have the following:

- [Node.js](https://nodejs.org/) installed
- CoopHive CLI installed on the server machine

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root and set the necessary environment variables:

   ```env
   PORT=3001
   ```

## Running the Server

Run the server using the following command:

```bash
npm start
```

The server will be accessible at `http://localhost:3001`.

## API Endpoint

### `POST /execute-script`

This endpoint expects a JSON payload with the following structure:

```json
{
  "command": "hive run sdxl:v0.2.9",
  "prompt": "Your custom prompt here"
}
```

#### Example:

```bash
curl -X POST -H "Content-Type: application/json" -d '{"command": "hive run sdxl:v0.2.9", "prompt": "Your custom prompt here"}' http://localhost:3001/execute-script
```

### Response

- If successful, the server responds with a JSON object containing the output and base64-encoded image file data.

```json
{
  "output": "Command output here",
  "fileData": "Base64-encoded-image-data"
}
```

- In case of an error, the server responds with an appropriate error message.

## Security Note

Make sure to secure your server properly, especially if it's accessible from the internet. Avoid exposing it directly and consider setting up proper authentication mechanisms.
