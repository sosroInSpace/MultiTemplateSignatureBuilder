import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import logo from './logo.svg';
import './App.scss';
import TemplateOne from './Components/TemplateOne/TemplateOne';
import TemplateTwo from './Components/TemplateTwo/TemplateTwo';
import Login from './Components/Login/Login';
require('dotenv').config()





function App() {

  const [clickNavOne, setClickNavOne] = useState(false);
  const [clickNavTwo, setClickNavTwo] = useState(false);

  const [token, setToken] = useState();
  const [firstName, setFirstName] = useState();
  const [company, setCompany] = useState();
  const [userData, setUserData] = useState({
    first_Name: "",
    last_name: "",
    email: "",
    company: ""
  })

  useEffect(() => {
    // check for token in storage
    if(localStorage.getItem('token')){
      let saved_token = localStorage.getItem('token')
      setToken(saved_token);
      console.log(token);
        fetch("http://localhost:5000/record/")
        .then(response=>response.json())
        .then(data=>{ 
          data.find(function(info, index) {
 
           if(info._id == saved_token){
              setUserData({
                first_name: info.first_name,
                last_name: info.last_name,
                company: info.company,
                email: info.email
              })
           }
        
           });
        })
        .catch(error => {
           
           window.alert('error!');
           return;
        });

      
         

    }

  },[])
  if(!token) {
    return <div><Login setToken={setToken} setFirstName={setFirstName} setCompany={setCompany}/></div>
  }

  console.log("first name: " + firstName)


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

  const logOut = event => {
    event.preventDefault();
    localStorage.removeItem('token');
    window.location.reload();

  }

  return (
    <div className="app-wrap">
     
      <Router>
       <div className="navigation">
        <header>
          <h5>Signature Builder</h5>
          {firstName ? <h1>Welcome {firstName}!</h1>: ""}
          {userData.first_name ? <h1>Welcome {userData.first_name}!</h1>: ""}
        </header>
        <section>
          <h5>Instructions</h5>
          <ul>
              <li>Fill in the form on each signature template to create an email signature.</li>
              <li>Copy the signature via the <strong><em>`Copy Signature`</em></strong> button to use within Gmail or other email clients.</li>
              <li>Download the signatures source code via the <strong><em>`Download HTML`</em></strong>  button to make further edits.</li>
              <li>Save the signatures style options via the <strong><em>`Save`</em></strong>  button to retain your design updates.</li>
          </ul>
        </section>
        <section>
          <button className="add-another" onClick={logOut}>Logout</button>
        </section>
      </div>
      
        <Routes>
           <Route exact path="/" element={<TemplateOne setCompany={company ? company : userData.company} />}/>
          <Route exact path="/template-two" element={<TemplateTwo setCompany={company ? company : userData.company}/>}/>
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


