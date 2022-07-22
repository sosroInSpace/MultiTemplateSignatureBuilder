/*

Template One

*/

import React, {useEffect, useState, useRef} from 'react';
import FormFields from '../component_helpers/form_fields.js';
import FileUpload from '../component_helpers/FileUpload.js';
import Close from '../../images/svg/close.svg';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import PropTypes from 'prop-types';


function TemplateOne(props){

	// user info
	const [token, setToken] = useState('');
	const [userData, setUserData] = useState({
		id: "",
		first_name: "",
		last_name: "",
		email: "",
		company: "",
	});
	// refs

	const [heading, setHeading] = useState('');
	const [headingColor, setHeadingColor] = useState('');
	// bylines
	const [byline, setBylineInit] = useState('');
	const [bylineColor, setBylineColorChange] = useState('');
	// additional bylines
	const [addByline, setAddByline] = useState([]);
	const [bylineCount, setBylineCount] = useState();
	const [bylineAdd, setByline] = useState('');
	const [bylimeLimit, setBylineLimit] = useState(false);
	const [addColor, setAddColor] = useState('');
	// logo
	const [logo, setLogo] = useState('');
	const [logoWidth, setWidthLogo] = useState('');

	// extras
	const [extraHeading, setExtraHeading] = useState('');
	const [extraHeadingColor, setExtraHeadingColor] = useState('');
	const [extraChange, setExtraChange] = useState('');
	const [extraChangeColor, setExtraChangeColor] = useState('');

	// dynamic extra
	const [dymExtraHeading, dymSetExtraHeading] = useState('');
	// dynamic extras
   const [values, setValues] = useState([{heading: "", headingColor: "", extra: "", extraColor: "" }]);
    // copy
	const [copySuccess, setCopySuccess] = useState(false);
	const [copyContentSuccess, setCopyContentSuccess] = useState(false);
	const [copySaved, setCopySaved] = useState(false);
	const sigRef = useRef(null);
	const tableRef = useRef(null);

	const [referral, setReferral] = useState(false);
	
	const [extra_heading_color_one, set_extra_heading_color_one ] = useState('');
   const [extra_value_color_one, set_extra_value_color_one] = useState('');
	const [extra_heading_color_two, set_extra_heading_color_two ] = useState('');

	// show modal
	const [showModal, setShowModal] = useState(false);
  
	useEffect(() => {
	    // Update the document title using the browser API
	    // doc vars
	    
	    // token
	    let token = localStorage.getItem('token');
	    fetch(`http://localhost:5000/record/${token}`)
        .then(response=>response.json())
        .then(data=>{ 
         console.log(data);
         console.log(data.signature_template.logo_url);
         
         // fallback vars

         // extras
         set_extra_heading_color_one(data.signature_template.extra_heading_color_1);
         set_extra_value_color_one(data.signature_template.extra_heading_color_value_1);
			set_extra_heading_color_two(data.signature_template.extra_heading_color_2);
         
          
        })
        .catch(error => {
           
           console.log(error)
           return;
        });

     
   
        //set refs

	 },[]);

	


	

	function copyToClipboard(text) {
	    var dummy = document.createElement("textarea");
	    // to avoid breaking orgain page when copying more words
	    // cant copy when adding below this code
	    // dummy.style.display = 'none'
	    document.body.appendChild(dummy);
	    //Be careful if you use texarea. setAttribute('value', value), which works with "input" does not work with "textarea". – Eduard
	    dummy.value = text;
	    dummy.select();
	    document.execCommand("copy");
	    document.body.removeChild(dummy);



	}

    function copySig(e){
    	setCopySuccess(true);
    	setCopyContentSuccess(false);
    	copyToClipboard(sigRef.current.innerHTML);
	}

	function modalClose(){
		setShowModal(false);
	}

	function saveSig(e) {
		e.preventDefault();
		setCopySaved(true);
		let token = localStorage.getItem('token');
		setShowModal(true);

		/*

		const table = "<table style='font-family: Arial, sans-serif; text-align: left; color: rgb(0, 0, 0); font-size: 14px; line-height: 16px; width: 500px;'>" + tableRef.current.innerHTML + "</table>";
		// root object to post
		let newValues = {
			$push: {
				signature_templates: table
			}
		}


		// create object based on changed values

	  fetch(`http://localhost:5000/update/${token}`,
		{
		    method: "POST",
		    headers: {
		      'Content-Type': 'application/json'
		    },
		    body: JSON.stringify(newValues)
		})
		.then(function(res){ return res.json(); })
		.then(function(data){ 
			console.log(data);
			console.log(newValues)
		})
		*/
	}



	const copyContent = (e) => {


	var range = document.createRange();
    range.selectNode(tableRef.current);
    window.getSelection().removeAllRanges(); // clear current selection
    window.getSelection().addRange(range); // to select text
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
    window.getSelection().removeAllRanges();// to deselect
    setCopySuccess(false);
    setCopyContentSuccess(true);
	}
  
	return (
		<div className="signature-parent-wrapper">
			<div className="signature-wrapper">
				<FormFields
				setCompany={props.setCompany}
				setHeading={setHeading}
				setHeadingColor={setHeadingColor}
				setBylineInit={setBylineInit}
				setBylineColorChange={setBylineColorChange}
				setByline={setByline}
				setAddColor={setAddColor}
				setLogo={setLogo}
				setWidthLogo={setWidthLogo}
				setExtraHeading={setExtraHeading}
				setExtraHeadingColor={setExtraHeadingColor}
				setExtraChange={setExtraChange}
				setExtraChangeColor={setExtraChangeColor}
				dymSetExtraHeading={dymSetExtraHeading}
				setValues={setValues}
				heading="Template One"
				/>

				<span className="copy" ref={sigRef}>
					<table width={500}ref={tableRef}style={{fontFamily: 'Arial, sans-serif', textAlign: 'left', color: 'rgb(0, 0, 0)', fontSize: '14px', lineHeight: '16px', width: '500px'}}> <tbody><tr><td colSpan={5}style={{paddingTop: '10px',fontSize: '20px', fontWeight: 600, color: headingColor, fontFamily: 'Arial, sans-serif'}}>{heading ? heading : ""}</td></tr><tr> <td colSpan={5}style={{fontSize: '10px', color: addColor, fontFamily: 'Arial, sans-serif'}} id="byline-color-2">{bylineAdd}</td></tr><tr> <td colSpan={5} style={{fontSize: '12px', color: bylineColor, fontFamily: 'Arial, sans-serif'}}>{byline}<br/></td></tr><tr> <td colSpan={5}> <br/> <br/><img src={logo} id="logo-url" width={logoWidth} style={{maxWidth:'251px'}}/> <br/> </td></tr><tr> <td colSpan={2}style={{color: 'rgb(0,0,0)', fontFamily: 'Arial, sans-serif'}}>{values.map((obj, i)=>{if(obj.heading==="P:" || obj.heading==="M:"){return <span style={{fontFamily: 'Arial, sans-serif', fontSize: '13px'}}> <span style={{fontWeight:'bold',fontSize:'13px', color: obj.id === 0 ? extra_heading_color_one : obj.headingColor, fontFamily: 'Arial, sans-serif'}}>{obj.heading} </span><span style={{color: obj.extraColor}}>{obj.extra}</span> | </span>}else if(obj.heading=="W:"){return <span style={{fontFamily: 'Arial, sans-serif'}}><span style={{fontWeight:'bold',fontSize:'13px', color: obj.headingColor, fontFamily: 'Arial, sans-serif'}}>{obj.heading} </span><a href={obj.extra}target="_blank" style={{color: obj.extraColor, fontSize: '13px', fontWeight: 'normal',textDecoration:'none', fontFamily: 'Arial, sans-serif'}}>{obj.extra} | </a></span>}else if (obj.heading=="E:"){return <span><span style={{fontWeight:'bold',fontSize:'13px', color: obj.headingColor, fontFamily: 'Arial, sans-serif'}}>{obj.heading} </span><a href={"mailto:" + obj.extra}style={{color: obj.extraColor, fontSize: '13px', fontWeight: 'normal',textDecoration:'none', fontFamily: 'Arial, sans-serif'}}>{obj.extra} | </a></span>}})}</td></tr></tbody></table> 
				</span>
			</div>
			<div className="download-button">
				<button onClick={copyContent} className="add-another">{copyContentSuccess ? "Copied" : "Copy Signature"}</button>
				<button onClick={copySig} className="add-another">{copySuccess ? "Copied!" : "Copy HTML"}</button>
				<button onClick={saveSig} className="add-another">{copySaved ? "..." : "Save"}</button>
				<div className={showModal ? "modal-wrapper" : "modal-wrapper hide" }>
					<form>
						<fieldset className="close-wrapper" style={{display:'flex',flexDirection:'row-reverse'}}>
							<img src={Close} style={{width:'25px',cursor:'pointer'}} onClick={modalClose}/>
						</fieldset>
						 <fieldset className="logo-upload">
						 	 <input type="text" id="name-signature" placeholder="Name your signature"/>
						 	 <button className="add-another">Save File</button>
						 </fieldset>
					 </form>
				</div>
			</div>
		</div>
	)
}

export default TemplateOne;