import React, {useEffect, useState, useRef} from 'react';
import FormFields from '../component_helpers/form_fields.js';
import FileUpload from '../component_helpers/FileUpload.js';
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
	
	const [logo_url_saved, set_logo_url_saved] = useState('');
	const [color_one_saved, set_color_one_saved] = useState('');
	const [byline_1_saved, set_byline_1_saved] = useState('');
	const [byline_2_saved, set_byline_2_saved] = useState('');
	const [logo_width_saved, set_logo_width_saved] = useState('');

	const [extra_heading_color_one, set_extra_heading_color_one ] = useState('');
    const [extra_value_color_one, set_extra_value_color_one] = useState('');

    const [extra_heading_color_two, set_extra_heading_color_two ] = useState('');
  
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
         set_logo_url_saved(data.signature_template.logo_url);
         set_color_one_saved(data.signature_template.heading_color);
         set_byline_1_saved(data.signature_template.byline_color_1);
         set_byline_2_saved(data.signature_template.byline_color_2);
         set_logo_width_saved(data.signature_template.logo_width);

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

	function saveSig(e) {
		e.preventDefault();
		setCopySaved(true);
		let token = localStorage.getItem('token');
		// root object to post
		let newValues = {
			$set: {
				signature_template: {

				}
			}
		}


		let headingColor2 = "";
		let headingExtraColor2 = "";
		let headingColor3 = "";
		let headingExtraColor3 = "";
		let headingColor4 = "";
		let headingExtraColor4 = "";
  		
  		if(values.length == 2){
  			headingColor2 = values[1].headingColor;
  			headingExtraColor2 = values[1].extraColor;

  		}
  		if(values.length == 3){
  			headingColor3 = values[2].headingColor;
  			headingExtraColor3 = values[2].extraColor;
  		}
  		if(values.length == 4){
  			headingColor4 = values[3].headingColor;
  			headingExtraColor4 = values[3].extraColor;
  		}

		// create object based on changed values
	
		if(headingColor || color_one_saved) newValues.$set.signature_template.heading_color = headingColor ? headingColor : color_one_saved;
		if(bylineColor || byline_1_saved) newValues.$set.signature_template.byline_color_1 = bylineColor ? bylineColor : byline_1_saved;
		if(addColor || byline_2_saved) newValues.$set.signature_template.byline_color_2 = addColor ? addColor : byline_2_saved;
		if(logo || logo_url_saved) newValues.$set.signature_template.logo_url = logo ? logo : logo_url_saved;
		if(logoWidth || logo_width_saved) newValues.$set.signature_template.logo_width = logoWidth ? logoWidth : logo_width_saved;
		if(values[0].headingColor) newValues.$set.signature_template.extra_heading_color_1 = values[0].headingColor;
		if(values[0].extraColor) newValues.$set.signature_template.extra_heading_color_value_1 = values[0].extraColor;
		if(headingColor2 != '') newValues.$set.signature_template.extra_heading_color_2 = headingColor2;
		if(headingExtraColor2 != '') newValues.$set.signature_template.extra_heading_color_value_2 = headingExtraColor2;
		if(headingColor3 != '') newValues.$set.signature_template.extra_heading_color_3 = headingColor3;
		if(headingExtraColor3 != '') newValues.$set.signature_template.extra_heading_color_value_3 = headingExtraColor3;
		if(headingColor4 != '') newValues.$set.signature_template.extra_heading_color_4 = headingColor4;
		if(headingExtraColor4 != '') newValues.$set.signature_template.extra_heading_color_value_4 = headingExtraColor4;

	  console.log(newValues);
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
				setheadingColorSaved={color_one_saved}
				setBylineInit={setBylineInit}
				setBylineColorChange={setBylineColorChange}
				setBylineSaved={byline_1_saved}
				setByline={setByline}
				setAddColor={setAddColor}
				setAddColorSaved={byline_2_saved}
				setLogo={setLogo}
				setWidthLogo={setWidthLogo}
				setLogoWidthSaved={logo_width_saved}
				setExtraHeading={setExtraHeading}
				setExtraHeadingColor={setExtraHeadingColor}
				setExtraHeadingColorOneSaved={extra_heading_color_one}
				setExtraHeadingColorTwoSaved={extra_heading_color_two}
				setExtraChange={setExtraChange}
				setExtraChangeColor={setExtraChangeColor}
				dymSetExtraHeading={dymSetExtraHeading}
				setValues={setValues}
				heading="Template One"
				/>
				<span className="copy" ref={sigRef}>
					<table width={500}ref={tableRef}style={{fontFamily: 'Arial, sans-serif', textAlign: 'left', color: 'rgb(0, 0, 0)', fontSize: '14px', lineHeight: '16px', width: '500px'}}> <tbody><tr><td colSpan={5}style={{paddingTop: '10px',fontSize: '20px', fontWeight: 600, color: headingColor ? headingColor : color_one_saved, fontFamily: 'Arial, sans-serif'}}>{heading ? heading : ""}</td></tr><tr> <td colSpan={5}style={{fontSize: '10px', color: addColor ? addColor : byline_2_saved, fontFamily: 'Arial, sans-serif'}} id="byline-color-2">{bylineAdd}</td></tr><tr> <td colSpan={5} style={{fontSize: '12px', color: bylineColor ? bylineColor : byline_1_saved, fontFamily: 'Arial, sans-serif'}}>{byline}<br/></td></tr><tr> <td colSpan={5}> <br/> <br/><img src={logo ? logo : logo_url_saved } id="logo-url" width={logoWidth ? logoWidth : logo_width_saved} style={{maxWidth:'251px'}}/> <br/> </td></tr><tr> <td colSpan={2}style={{color: 'rgb(0,0,0)', fontFamily: 'Arial, sans-serif'}}>{values.map((obj, i)=>{if(obj.heading==="P:" || obj.heading==="M:"){return <span style={{fontFamily: 'Arial, sans-serif', fontSize: '13px'}}> <span style={{fontWeight:'bold',fontSize:'13px', color: obj.id === 0 ? extra_heading_color_one : obj.headingColor, fontFamily: 'Arial, sans-serif'}}>{obj.heading} </span><span style={{color: obj.extraColor}}>{obj.extra}</span> | </span>}else if(obj.heading=="W:"){return <span style={{fontFamily: 'Arial, sans-serif'}}><span style={{fontWeight:'bold',fontSize:'13px', color: obj.headingColor, fontFamily: 'Arial, sans-serif'}}>{obj.heading} </span><a href={obj.extra}target="_blank" style={{color: obj.extraColor, fontSize: '13px', fontWeight: 'normal',textDecoration:'none', fontFamily: 'Arial, sans-serif'}}>{obj.extra} | </a></span>}else if (obj.heading=="E:"){return <span><span style={{fontWeight:'bold',fontSize:'13px', color: obj.headingColor, fontFamily: 'Arial, sans-serif'}}>{obj.heading} </span><a href={"mailto:" + obj.extra}style={{color: obj.extraColor, fontSize: '13px', fontWeight: 'normal',textDecoration:'none', fontFamily: 'Arial, sans-serif'}}>{obj.extra} | </a></span>}})}</td></tr></tbody></table> 
				</span>
			</div>
			<div className="download-button">
				<button onClick={copyContent} className="add-another">{copyContentSuccess ? "Copied" : "Copy Signature"}</button>
				<button onClick={copySig} className="add-another">{copySuccess ? "Copied!" : "Copy HTML"}</button>
				<button onClick={saveSig} className="add-another">{copySaved ? "Saved!" : "Save"}</button>
			</div>
		</div>
	)
}

export default TemplateOne;