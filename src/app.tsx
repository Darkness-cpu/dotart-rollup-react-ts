import React, { useState } from 'react';

const App: React.FC = () => {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [result, setResult] = useState('');

  const downloadMp3 = async () => {
    if (!youtubeUrl) {
      setResult('Please enter a URL.');
      return;
    }

    setResult('Processing...');
    try {
      const response = await fetch(`/dl?url=${encodeURIComponent(youtubeUrl)}`);
      const data = await response.json();
      if (data.link) {
        setResult(
          <a href={data.link} target="_blank" rel="noopener noreferrer">
            Download
          </a>
        );
      } else {
        setResult('Failed to get the MP3 link.');
      }
    } catch (error: any) {
      setResult(`Error: ${error.message}`);
    }
  };

  return (
    <div className="container">
      <h1 className="heading">YouTube MP3 Downloader</h1>
      <p>Enter a YouTube URL to download the MP3</p>
      <input
        type="text"
        value={youtubeUrl}
        onChange={(e) => setYoutubeUrl(e.target.value)}
        placeholder="Enter YouTube URL"
        className="input"
      />
      <button onClick={downloadMp3} className="button">
        Search
      </button>
      <p>{result}</p>
      <footer className="footer">
        Dev by{' '}
        <a
          href="https://github.com/mistakes333"
          target="_blank"
          rel="noopener noreferrer"
          className="link"
        >
          mistakes333
        </a>
      </footer>
    </div>
  );
};

export default App;
