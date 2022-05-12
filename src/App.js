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
    setClickNavOne(true);
    setClickNavTwo(false);
  }
  const navClickTwo = event => {
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
              <li>Copy the signature via the copy button to use within Gmail or other email clients.</li>
              <li>Download the signatures source code via the `download HTML`  button to make further edits.</li>
          </ul>
        </section>
        <section className="links">
            <Link to="/" className={clickNavOne ? "add-another active" : "add-another"} onClick={navClickOne}>Template One</Link>
            <Link to="/template-two" className={clickNavTwo ? "add-another active" : "add-another"} onClick={navClickTwo}>Template Two</Link>
        </section>
      </div>
      
        <Routes>
           <Route exact path="/" element={<TemplateOne/>}/>
          <Route exact path="/template-two" element={<TemplateTwo/>}/>
        </Routes>
      </Router>
  </div>
  );


}

export default App;


