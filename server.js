const fs = require('fs');
const path = require('path');
const express = require('express');
const { exec } = require('child_process');
const app = express();
var cors = require('cors')
const port = 3001;

app.use(express.json());
app.use(cors());

app.post('/execute-script', async (req, res) => {
  const { command, prompt } = req.body;

  const fullCommand = `${command} -i PromptEnv="PROMPT=${prompt}"`;

  exec(fullCommand, async (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
    
    // Parse stdout to extract file path
    const filePathRegex = /\/tmp\/coophive\/data\/downloaded-files\/[^\s]+/;
    const match = stdout.match(filePathRegex);

    if (match) {
      const filePath = match[0];

      try {
        const fileData = fs.readFileSync(path.join(filePath, 'outputs', 'image-42.png'), { encoding: 'base64' });
        res.json({ output: stdout, fileData });
      } catch (readFileError) {
        console.error(`Error reading file: ${readFileError.message}`);
        res.status(500).json({ error: 'Error reading file' });
      }
    } else {
      res.status(500).json({ error: 'File path not found in stdout' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
