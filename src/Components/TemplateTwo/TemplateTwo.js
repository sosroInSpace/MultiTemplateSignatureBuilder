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
    	setCopyContentSuccess(false);
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
    setCopySuccess(false);
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
				heading="Template Two"
				/>
				<span className="copy" ref={sigRef}>
					<table width={450} ref={tableRef} style={{fontFamily: 'Arial, sans-serif', textAlign: 'left', color: 'rgb(0, 0, 0)', fontSize: '14px', lineHeight: '16px', width: '450px'}}>
			        <tbody>
			          <tr>
			            <td rowSpan={7} align="center" style={{width: '30%', paddingRight: '5px'}}>
			            {logo ? 
			             <img src={logo} width={logoWidth ? logoWidth : "130"} alt="" style={{maxWidth: '190px',paddingTop: '10px'}} />

			            : "" }
			           
			            
			            </td>
			            <td colSpan={5} style={{paddingTop: '10px', paddingLeft: '15px', fontSize: '16px', fontWeight: 600, color: headingColor}}>{heading ? heading : ""}</td>
			          </tr>
			          {addByline ? 
			          	<tr><td colSpan={5} style={{paddingLeft: '15px', fontSize: '10px', color: addColor}}>{bylineAdd}</td></tr>
			          	: ""}
			          {byline ? 
			          	<tr>
			             <td colSpan={5} style={{paddingLeft: '15px', fontSize: '13px', color: bylineColor}}>
			              {byline}<br />
			              <br />
			            </td>
			          </tr>
			          	: ""}
			           
			           {values.map((obj, i)=>{
			           	if(obj.heading==="P:" || obj.heading==="M:"){
			           		return <tr><td colSpan={5} style={{paddingLeft: '15px'}}><span style={{fontWeight: 600, fontSize: '12px', color: obj.headingColor}}>{obj.heading} </span><span style={{fontSize: '12px', color: obj.extraColor}}> {obj.extra}</span></td></tr>
			           		}
			           		else if(obj.heading=="W:")
			           		{
			           			return <tr><td colSpan={2} style={{paddingLeft: '15px', color: 'rgb(90, 90, 90)'}}><a href={obj.extra} style={{color: obj.extraColor, fontSize: '13px', fontWeight: 600}}> {obj.extra}<br /></a></td></tr>
			           		}
			           			else if (obj.heading=="E:"){
			           				return <tr><td colSpan={5} style={{paddingLeft: '15px'}}><span style={{fontWeight: 600, fontSize: '12px', color: obj.headingColor}}>{obj.heading} </span><span style={{fontSize: '12px', color: obj.extraColor}}><a href={"mailto:" + obj.extra}> {obj.extra}</a></span></td></tr>
			           		}})}

			          	
			        
			         </tbody>
			      </table>
				</span>
			</div>
			<div className="download-button">
				<button onClick={copyContent} className="add-another">{copyContentSuccess ? "Copied!" : "Copy Signature"}</button>
				<button onClick={copySig} className="add-another">{copySuccess ? "Copied!" : "Copy HTML"}</button>
			</div>
		</div>
	)
}

export default TemplateOne;