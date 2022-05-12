import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import logo from './logo.svg';
import './App.scss';
import FormComponent from './Components/FormComponent';
import TemplateOne from './Components/TemplateOne/TemplateOne';
import TemplateTwo from './Components/TemplateTwo/TemplateTwo';
require('dotenv').config()

function App() {

  const [clickNavOne, setClickNavOne] = useState(false);
  const [clickNavTwo, setClickNavTwo] = useState(false);
  
  const navClickOne = event => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    setClickNavOne(true);
    setClickNavTwo(false);
  }
  const navClickTwo = event => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    setClickNavTwo(true);
    setClickNavOne(false);
  }
  return (
    <div className="app-wrap">
     
      <Router>
       <div className="navigation">
        <header>
          <h1>Signature Builder</h1>
        </header>
        <section>
          <h5>Instructions</h5>
          <ul>
              <li>Fill in the form on each signature template to create an email signature.</li>
              <li>Copy the signature via the <strong><em>`Copy Signature`</em></strong> button to use within Gmail or other email clients.</li>
              <li>Download the signatures source code via the <strong><em>`Download HTML`</em></strong>  button to make further edits.</li>
          </ul>
        </section>
      </div>
      
        <Routes>
           <Route exact path="/" element={<TemplateOne/>}/>
          <Route exact path="/template-two" element={<TemplateTwo/>}/>
        </Routes>
        <div className="link-wrapper navigation">
      <section className="links">
      <h2>Navigation</h2>
      <h5>Pick a template</h5>
            <Link to="/" className={clickNavOne ? "add-another active" : "add-another"} onClick={navClickOne}>Template One</Link>
            <Link to="/template-two" className={clickNavTwo ? "add-another active" : "add-another"} onClick={navClickTwo}>Template Two</Link>
        </section>
      </div>
      </Router>
      
  </div>
  );


}

export default App;


