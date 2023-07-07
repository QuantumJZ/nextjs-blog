
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
    const data = [];
    const arr = JSON.parse(exitCode);
    const headers = ['Player', 'Percent Slower Than WR'];

    for(let i = 0; i < arr.length; i++) {
      const values = lines[i].split('|');
      const row = {};
      for(let j = 0; j < headers.length; j++) {
        row[headers[j]] = values[j];
      }
      data.push(row);
    }
  };

  return (
    <div>
      <button onClick={runPythonFile}>Generate Table</button>
      <pre>{output}</pre>
      {/* <div>Exit Code: {exitCode}</div> */}
      <div>
        <table className="table">
          <thead>
            <tr>
              {Object.keys(data[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                {Object.values(item).map((value, index) => (
                  <td key={index}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}