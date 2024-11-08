import './App.css';
import { useState } from 'react';

function App() {
  const [mainInput, setMainInput] = useState('');
  const [outputContent, setOutputContent] = useState('');

  const markdownToJson = (text) => {
    return text
        .split('\n') // 줄바꿈 기준으로 분리
        .filter(line => line.trim() !== '') // 빈 줄 제거
        .map(line => 
            line
                // 굵게 변환 ** **
                .replace(/\*\*(.+?)\*\*/g, (_, content) => `{"text":"${content.trim()}","bold":true}`)
                
                // 기울임 변환 * *
                .replace(/\*(.+?)\*/g, (_, content) => `{"text":"${content.trim()}","italic":true}`)
                
                // 취소선 변환 ~~ ~~
                .replace(/\~\~(.+?)\~\~/g, (_, content) => `{"text":"${content.trim()}","strikethrough":true}`)
                
                // 밑줄 변환 __ __
                .replace(/\_\_(.+?)\_\_/g, (_, content) => `{"text":"${content.trim()}","underlined":true}`)
                
                // 난독화 변환 __ __
                .replace(/\&\&(.+?)\&\&/g, (_, content) => `{"text":"${content.trim()}","obfuscated":true}`)
                
                // 함수 변환 {}<>
                .replace(/\{(.*?)\}\<(.*?)\>/g, (_, text, fn) => `{"text":"${text}","clickEvent":{"action":"run_command","value":"${fn}"}}`)
                
                // 폰트 변환 []<>
                .replace(/\[(.*?)\]\<(.*?)\>/g, (_, text, font) => `{"text":"${text}","font":"${font}"}`)

                // 색상 변환 ()<>
                .replace(/\((.*?)\)\<(.*?)\>/g, (_, text, color) => `{"text":"${text}","color":"${color}"}`)

                // 일반 텍스트 변환
                .replace(/^([^{}]+)$/g, (_, content) => `"${content.trim()}"`)
        )
  };

  function convert() {
    setMainInput(document.getElementsByClassName('main-input')[0].value)
    const converted = `[${markdownToJson(mainInput).join(",\"\\n\",")}]`;
    setOutputContent(converted);
  }

  return (
    <div className="App">
      <h1>Markdown To JSON</h1>
      <textarea
        className='main-input'
        value={mainInput}
        onChange={(e) => setMainInput(e.target.value)}
      ></textarea>
      <button onClick={convert}>Convert</button>
      <div className='main-output'>
      <textarea
        readOnly
        value={outputContent}
      ></textarea>
      <button id='copy-output-btn'>Copy</button>
      </div>
      <div className='footer'>
        <div className='attribute'>
        <a href="https://www.flaticon.com/free-icons/file-type" title="file type icons">File type icons created by Muhammad Andy - Flaticon</a>
        </div>
      </div>
    </div>
  );
}

export default App;
