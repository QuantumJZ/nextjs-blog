
import { PythonShell } from 'python-shell';

export default function handler(req, res) {
  const { code } = req.body;

  try {
    PythonShell.runString(code, null, function (error, result) {
      if (error) {
        console.error(`Error executing Python code: ${error.message}`);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.status(200).json({ result: result.join('\n') });
      }
    });
  } catch (error) {
    console.error('Error executing Python code:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}