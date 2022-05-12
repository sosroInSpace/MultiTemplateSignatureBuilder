import React, {useEffect, useState, useRef} from 'react';
import FormFields from '../component_helpers/form_fields.js';
import FileUpload from '../component_helpers/FileUpload.js';
import {CopyToClipboard} from 'react-copy-to-clipboard';


function TemplateOne(props){

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
	const sigRef = useRef(null);
	const tableRef = useRef(null);


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
    	copyToClipboard(sigRef.current.innerHTML);
	}



	const copyContent = (e) => {
	var range = document.createRange();
    range.selectNode(tableRef.current);
    console.log(range);
    window.getSelection().removeAllRanges(); // clear current selection
    window.getSelection().addRange(range); // to select text
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
    window.getSelection().removeAllRanges();// to deselect
    setCopyContentSuccess(true);
	}
  
	return (
		<div className="signature-parent-wrapper">
			<div className="signature-wrapper">
				<FormFields
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
					<table width={500}ref={tableRef}style={{fontFamily: 'Arial, sans-serif', textAlign: 'left', color: 'rgb(0, 0, 0)', fontSize: '14px', lineHeight: '16px', width: '450px'}}> <tbody><tr><td colSpan={5}style={{paddingTop: '10px',fontSize: '20px', fontWeight: 600, color: headingColor, fontFamily: 'Arial, sans-serif'}}>{heading ? heading : ""}</td></tr>{addByline ? <tr> <td colSpan={5}style={{fontSize: '10px', color: addColor, fontFamily: 'Arial, sans-serif'}}>{bylineAdd}</td></tr>: ""}{byline ? <tr> <td colSpan={5}style={{fontSize: '12px', color: bylineColor, fontFamily: 'Arial, sans-serif'}}>{byline}<br/></td></tr>: ""}<tr> <td colSpan={5}> <br/> <br/>{logo ? <img src={logo}width={logoWidth ? logoWidth : "130"}style={{maxWidth:'251px'}}/> : <div style={{marginTop: '50px', color: '#eee'}}></div>}<br/> </td></tr><tr> <td colSpan={2}style={{color: 'rgb(0,0,0)', fontFamily: 'Arial, sans-serif'}}>{values.map((obj, i)=>{if(obj.heading==="P:" || obj.heading==="M:"){return <span style={{fontFamily: 'Arial, sans-serif', fontSize: '13px'}}> <span style={{fontWeight:'bold',fontSize:'13px', color: obj.headingColor, fontFamily: 'Arial, sans-serif'}}>{obj.heading} </span>{obj.extra} | </span>}else if(obj.heading=="W:"){return <span style={{fontFamily: 'Arial, sans-serif'}}><span style={{fontWeight:'bold',fontSize:'13px', color: obj.headingColor, fontFamily: 'Arial, sans-serif'}}>{obj.heading} </span><a href={obj.extra}target="_blank" style={{color: obj.extraColor, fontSize: '13px', fontWeight: 'normal',textDecoration:'none', fontFamily: 'Arial, sans-serif'}}>{obj.extra} | </a></span>}else if (obj.heading=="E:"){return <span><span style={{fontWeight:'bold',fontSize:'13px', color: obj.headingColor, fontFamily: 'Arial, sans-serif'}}>{obj.heading} </span><a href={"mailto:" + obj.extra}style={{color: obj.extraColor, fontSize: '13px', fontWeight: 'normal',textDecoration:'none', fontFamily: 'Arial, sans-serif'}}>{obj.extra} | </a></span>}})}</td></tr></tbody></table> 
				</span>
			</div>
			<div className="download-button">
				<button onClick={copyContent} className="add-another">{copyContentSuccess ? "Copied" : "Copy Signature"}</button>
				<button onClick={copySig} className="add-another">{copySuccess ? "Copied!" : "Copy HTML"}</button>
			</div>
		</div>
	)
}

export default TemplateOne;