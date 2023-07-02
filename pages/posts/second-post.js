
import { useState } from 'react';

export default function MyComponent() {
  const [output, setOutput] = useState('');
  const [exitCode, setExitCode] = useState(null);

  const runPythonFile = async () => {
    try {
      const response = await fetch(`/api/readPythonFile?file_path=pages/api/Difference.py`);
      const data = await response.json();
      setOutput(data.output);
      setExitCode(data.exitCode);
    } catch (error) {
      console.error(`Error executing Python file: ${error.message}`);
    }
  };

  return (
    <div>
      <button onClick={runPythonFile}>Run Python File</button>
      <pre>{output}</pre>
      <div>Exit Code: {exitCode}</div>
    </div>
  );
}