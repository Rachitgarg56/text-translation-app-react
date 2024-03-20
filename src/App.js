
import './App.css';
import { IoMdSwap } from "react-icons/io";
import axios from 'axios';
import { useState } from 'react';

function App() {

  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('Translated');
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('hi');

  const handleClick = async () => {

    const encodedParams = new URLSearchParams();
    encodedParams.set('source_language', sourceLang);
    encodedParams.set('target_language', targetLang);
    encodedParams.set('text', inputText);

    const options= {
      method: 'POST',
      url: 'https://text-translator2.p.rapidapi.com/translate',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': 'b44edc273fmsh1d5bf2b8ce193b1p1e8307jsnd3ba87e25030',
        'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
      },
      data: encodedParams,
    }

    try {
      const response = await axios.request(options);
      setTranslatedText(response.data.data.translatedText);
    }
    catch (error) {
      console.log(error);
    }

  }

  const handleSourceLangCode = (lang) => {
   const langCode = langIntoCode(lang);
   setSourceLang(langCode);
  }

  const handleTargetLangCode = (lang) => {
    const langCode = langIntoCode(lang);
    setTargetLang(langCode);
  }

  const langIntoCode = (lang) => {
    let langCode;
    switch (lang) {
      case 'English': {
        langCode = 'en';
        break;
      }
      case 'Hindi': {
        langCode = 'hi';
        break;
      }
      case 'French': {
        langCode = 'fr';
        break;
      }
      case 'German': {
        langCode = 'de';
        break;
      }
      case 'Japanese': {
        langCode = 'ja';
        break;
      }
      default: {
        return;
      }
    }
    return langCode;
  }


  return (
    <div className="App">

      <div className='top'>

        <div className='given-lang'>
          <select onChange={(e)=>{
            handleSourceLangCode(e.target.value);
          }}>
            <option>English</option>
            <option>Hindi</option>
            <option>French</option>
            <option>German</option>
            <option>Japanese</option>
          </select>
        </div>

        <div> <IoMdSwap/> </div>
        
        <div className='translated-lang'>
        <select onChange={(e)=>{
          handleTargetLangCode(e.target.value);
        }}>
            <option>Hindi</option>
            <option>English</option>
            <option>French</option>
            <option>German</option>
            <option>Japanese</option>
          </select>
        </div>

      </div>

      <div className='bottom'>
        <textarea className='input-data' value={inputText} onChange={(e)=>setInputText(e.target.value)} placeholder='Enter text...' />
        <p className='output-data'>{translatedText}</p>
      </div>

      <button onClick={handleClick}>Translate</button>

    </div>
  )

}

export default App;
