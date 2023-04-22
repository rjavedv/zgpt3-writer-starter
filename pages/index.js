import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';

const Home = () => {
  const [userInput, setUserInput] = useState('');    //spreadsheet topic
  const [userInput2, setUserInput2] = useState('');  // number of columns
  const [userInput3, setUserInput3] = useState('');  // column names , or | separated
  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);

    //console.log("Calling OpenAI...")
    //console.log("TextBoxes", userInput, userInput2, userInput3)  //RJV
    //console.log(JSON.stringify({ userInput, userInput2, userInput3 })) //RJV


    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput, userInput2, userInput3 }),
    });

    const data = await response.json();
    const { output } = data;
    //console.log("OpenAI replied...", output.text)

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  }
  const onUserChangedText = (event) => {
    //console.log(event.target.value);
    setUserInput(event.target.value);
  };
  const onUserChangedText2 = (event) => {
    //console.log(event.target.value);
    setUserInput2(event.target.value);
  };
  const onUserChangedText3 = (event) => {
    //console.log(event.target.value);
    setUserInput3(event.target.value);
  };
  return (
    <div className="root">
      <Head>
        <title>GPT-3 Writer | buildspace</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Generate Spreadsheets about whatever...!</h1>
          </div>
          <div className="header-subtitle">
            <h2>Just define the subject, number of columns and column headings to get spreadsheet</h2>
          </div>
        </div>
        {/* Add this code here*/}
        <div className="prompt-container">
          <textarea
            className="prompt-box"
            placeholder="Spreadsheet topic/about ...."
            value={userInput}
            onChange={onUserChangedText}
          />
          {/* RJV Code */}
          <div className="normtext">
            <p> Number of columns in a spreadsheet: (eg 2 or 3 or whatever)</p>
          </div>
          <textarea
            className="prompt2-box"
            placeholder="number of columns"
            value={userInput2}
            onChange={onUserChangedText2}
          />;
          <div className="normtext">
            <p> Column Names: (separated by pipe character | )</p>
          </div>
          <textarea
            className="prompt-box"
            placeholder="Column names (separated by pipe character | )"
            value={userInput3}
            onChange={onUserChangedText3}
          />;

          {/* New code I added here */}
          <div className="prompt-buttons">
            <a
              className={isGenerating ? 'generate-button loading' : 'generate-button'}
              onClick={callGenerateEndpoint}>
              <div className="generate">
                {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
              </div>
            </a>
          </div>
          {/* New code I added here */}
          {apiOutput && (
            <div className="output">
              <div className="output-header-container">
                <div className="output-header">
                  <h3>Output</h3>
                </div>
              </div>
              <div className="output-content">
                <p>{apiOutput}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="badge-container grow">
        <a
          href="https://buildspace.so/builds/ai-writer"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={buildspaceLogo} alt="buildspace logo" />
            <p>build with buildspace</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
