
import { exec } from 'child_process';

export default function handler(req, res) {
  const { file_path } = req.query;

  const pythonProcess = exec(`python ${file_path}`);

  let output = '';

  pythonProcess.stdout.on('data', (data) => {
    output += data.toString();
  });

  pythonProcess.stderr.on('data', (data) => {
    output += data.toString();
  });

  pythonProcess.on('close', (code) => {
    res.status(200).json({ output, exitCode: code });
  });
}