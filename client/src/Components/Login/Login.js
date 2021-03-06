import React, {useState, useRef, useEffect} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Login.scss';

function scrollToTop(){
	window.scroll({top: 0, left: 0, behavior: 'smooth'});
}

export default function Login({ setToken, setFirstName, setCompany }) {

	const [form, setForm] = useState({
	   username: "",
	   password: "",
	   password_check: "",
	   company_name: "",
	   first_name: "",
	   last_name: "",
	   email: "",

	 });

	const [formLogin, setFormLogin] = useState({
		username: "",
		password: ""
	})

  const [register, setRegister] = useState(false);
  const [records, setRecords] = useState("");
  const [infoCheck, setInfoCheck] = useState(false);

   useEffect(() => {

   async function getRecords() {
     const response = await fetch(`http://localhost:5000/record/`);
 
     if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const records = await response.json();

     setRecords(records);
   }

  
 
   getRecords();
 
   return;
 }, [records.length]);

  	const handleSubmit = async e => {
	    e.preventDefault();
	    let current_username = formLogin.username;
	    let current_password = formLogin.password;
	    let user_id;
	    let first_name;
	    let company;
	   
	    records.forEach((element, index, array) => {
			    array.forEach((el) => {
			    	if(current_username == el.username && current_password == el.password){
			    		 	user_id = el._id;
			    		 	first_name = el.first_name;
			    		 	company = el.company;
			    	} else {
			    		setInfoCheck(true);
			    		e.currentTarget.reset();
			    	}
			    	
			    });
			});
			e.currentTarget.reset();
			setToken(user_id);
			setFirstName(first_name);
			setCompany(company);
			if(user_id){
				localStorage.setItem('token', user_id);
			}
			

	  }


	   async function handleSubmitRegister(e) {
		   e.preventDefault();

		 
		   // When a post request is sent to the create url, we'll add a new record to the database.
		   const newUser = { ...form };

		 
		   await fetch("http://localhost:5000/record/add", {
		     method: "POST",
		     headers: {
		       "Content-Type": "application/json",
		     },
		     body: JSON.stringify(newUser),
		   })
		   .catch(error => {
		     window.alert(error);
		     return;
		   });
		 	 setRegister(false);
		   setForm({ username: "", company: "", first_name: "", last_name: "", email: "", password: "", password_check: "" });
		   
		 }

	  const RegisterToggle = e => {
	  		e.preventDefault();
	  		setRegister(true);
	  		scrollToTop()
	  }
	  const LoginToggle = e => {
	  	e.preventDefault();
	  	setRegister(false);
	  	scrollToTop()
	  }


	   // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }

 const checkValidate = e => {
 	 e.preventDefault();
 	 let confirmed_pass = e.currentTarget.value;
 	 if(confirmed_pass == form.password){
 	 	 // nothing
 	 } else {
 	 	alert('don\'t match try again');
 	 }
 	
 }

	return (
		<div className="login-wrapper">
		{/* REGISTER FORM */}
      <form onSubmit={handleSubmitRegister} className={register ? "register-form show" : "register-form"}>
				<fieldset>
				<h4>Please Register</h4>
				</fieldset>
				<fieldset className="flex">
		      <label>
		        <p>Username</p>
		        <input type="text" placeholder="Enter username" 
		        onChange={e => {
						  const value = e.target.value;
						  setForm(form => ({ ...form, username: value }));
						}}
						/>
		      </label>
		       <label>
		        <p>Company Name</p>
		        <input type="text" placeholder="Enter company name" 
		        onChange={e => {
						  const value = e.target.value;
						  setForm(form => ({ ...form, company_name: value }));
						}}
		        />
		      </label>
		      </fieldset>
		      <fieldset className="flex">
		      <label>
		        <p>First Name</p>
		        <input type="text" placeholder="Enter first name" 
		        onChange={e => {
						  const value = e.target.value;
						  setForm(form => ({ ...form, first_name: value }));
						}}
		        />
		      </label>
		       <label>
		        <p>Last Name</p>
		        <input type="text" placeholder="Enter last name" 
		        onChange={e => {
						  const value = e.target.value;
						  setForm(form => ({ ...form, last_name: value }));
						}}
		        />
		      </label>
		      </fieldset>
		      <fieldset className="flex">
		      <label>
		        <p>Email</p>
		        <input type="email" placeholder="Enter email" 
		        onChange={e => {
						  const value = e.target.value;
						  setForm(form => ({ ...form, email: value }));
						}}
		        />
		      </label>

		      <label>
		        <p>Password</p>
		        <input type="password" placeholder="Enter password" 
		        onChange={e => {
						  const value = e.target.value;
						  setForm(form => ({ ...form, password: value }));
						}}
		        />
		      </label>
		      </fieldset>
		      <label>
		        <p>Confirm Password</p>
		        <input type="password" placeholder="Enter password check" 
		        onChange={e => {
						  const value = e.target.value;
						  setForm(form => ({ ...form, password_check: value }));
						}}
		        />
		      </label>
		      <div>
		        <button type="submit" className="add-another">Register</button>
		      </div>
		    </form>
		  {/* LOGIN FORM */}
			<form onSubmit={handleSubmit} className={register ? "login-form hide" : "login-form"}>
				<fieldset>
				<h4>Please Log In</h4>
				{infoCheck ? <p className="error">No username or password found!</p> : ""}
				</fieldset>
		      <label>
		        <p>Username</p>
		        <input type="text" placeholder="Enter username" 
		        onChange={e => {
						  const value = e.target.value;
						  setFormLogin(form => ({ ...form, username: value }));
						}}
						/>
		      </label>
		      <label>
		        <p>Password</p>
		        <input type="password" placeholder="Enter password" 
		        onChange={e => {
						  const value = e.target.value;
						  setFormLogin(form => ({ ...form, password: value }));
						}}
		        />
		      </label>
		      <div>
		        <button type="submit" className="add-another">Login</button>
		      </div>
		    </form>
		    <p style={{fontSize:'14px'}} className={register ? "hide" : "show"}>Don't have an account? register <button onClick={RegisterToggle}>here</button>.</p>
		    <p style={{fontSize:'14px'}} className={register ? "show" : "hide"}>Back to login <button onClick={LoginToggle}>here</button>.</p>
	    </div>
	)
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
  setFirstName: "",
  setCompany: ""
}