
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import utilStyles from '../../styles/utils.module.css';

export default function MyComponent() {
  const [output, setOutput] = useState('');
  const [exitCode, setExitCode] = useState(null);
  const [data, setData] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/readPythonFile?file_path=pages/api/Difference.py`);
        const responseData = await response.json();
        setOutput(responseData.output);
        setExitCode(responseData.exitCode);

        const dataString = responseData.output;
        const dataArray = dataString.slice(1, -1).split(', ');

        const parsedData = dataArray.map((item, index) => {
          const [player, percent] = item.split('|');
          const formattedPercent = index === dataArray.length - 1 ? percent.replace("']", "%") : `${percent.replace("'", "")}%`;
          return { 'Player (All Consoles)': player.replace("'", (index + 1) + ". "), 'Percent Slower Than WR': formattedPercent };
        });

        setData(parsedData);
      } catch (error) {
        console.error(`Error executing Python file: ${error.message}`);
      }
    };

    fetchData();
  }, []);

  const Table = () => {
    if (data.length === 0) {
      return <div style={{textAlign: 'center', fontSize: '30px'}}>Loading...(May Take 15 Seconds)</div>;
    }

    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <table className={`table ${isDarkMode ? 'dark-mode' : ''}`}>
          <thead>
            <tr>
              {Object.keys(data[0]).map((key, index) => (
                <th key={index}>{key}</th>
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
    );
  };

  return (
    <div className={`container ${isDarkMode ? 'dark-mode' : ''}`}>
      <p><Link href="/">Home</Link></p>
      <div className='center'>
          <Image
          priority
          src="/images/SM64Cover.png"
          className={utilStyles.borderSquare}
          height={244}
          width={244}
          alt=""
          />
      </div>
      <Table />
    </div>
  );
}