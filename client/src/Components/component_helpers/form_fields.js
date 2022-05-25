import React, {useRef, useState, useEffect} from 'react';
import FileUpload from './FileUpload.js';


function MoreBylines(props){
	
	return (
		<fieldset className="flex-color byline-extra">
            <label>Byline</label>
            <input 
              type="text" 
              id="color-byline-2"
              placeholder="Enter byline"
              onChange={props.byline_change}
              />
          	<div>
          		<input type="color" id="byline-color-additional" placeholder="pick a color"  onChange={props.byline_color_change} value={props.color}/>
          	</div>
      </fieldset>
	)
}

function MoreExtas(props){
	return (
		 <fieldset className="flex-color extra sub-extra">
	      	    <label>Extra</label>
	      	    <div className="field-50">
		      	    <div className="field">
			            <select 
			              type="text" 
			              id="name"
			              name="select-heading"
			              placeholder="Enter exta accent (P:, E:, W:)"
			              onChange={props.extraChangeHeading}
			              >
			              <option value="">Select option</option>
			              <option value="M:">Mobile</option>
									  <option value="P:">Phone</option>
									  <option value="E:">Email</option>
			              </select>
		             </div>
		             <div>
		          		<input type="color" id="color" placeholder="pick a color" name="heading-color" onInput={props.extraChangeHeadingColor}/>
		          	</div>
	          	</div>
	          	<div className="field-50">
	             <div className="field">
		            <input 
		              type="text" 
		              id="name"
		              name="extra-change"
		              placeholder="Enter exta accent (phone:, email:, website:)"
		              onChange={props.changeExtra}
		              />
	             </div>
	          	<div>
	          		<input type="color" id="color" placeholder="pick a color" name="extra-change-color" onChange={props.changeExtraColor}/>
	          	</div>
	          	</div>
	          	
	      </fieldset>
	)
}

function FormFields(props){
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
	// add extra 
	const [addExtra, setAddExtra] = useState([]);
	// dynamic extras
  const [values, setValues] = useState([{ id: 0, heading: "", headingColor: "", extra: "", extraColor: "", heading_color_one_saved: "" }]);
  const [addLimit, setAddLimit] = useState(0);
  const [displayLimit, setDisplayLimit] = useState(false);

  
     

   useEffect(() => {


  });

	// update heading
	const headingChange = (event) => {
		let target = event.currentTarget.value;
		setHeading(target);
	}
	// update heading color
	const headingColorChange = (event) => {
		setHeadingColor(event.currentTarget.value);
	}

	const bylineChange = (event) => {
		setBylineInit(event.currentTarget.value);
	}

	const bylineColorChange = (event) => {
		setBylineColorChange(event.currentTarget.value);
	}

	const additionalColorChange = (event) => {
		setAddColor(event.currentTarget.value);
	}


	const additionalBylineChange = (event) => {
		setByline(event.currentTarget.value);
	}
	// add more bylines
	const buttonAddByline = (event) => {
		event.preventDefault();
		setBylineCount(1);
		if(bylineCount == 1){
			setBylineLimit(true);
		} else {
			setAddByline(addByline.concat(<MoreBylines key={addByline.length} byline_change={additionalBylineChange} byline_color_change={additionalColorChange}/>));
		}
		
	 };


	const buttonAddExtra = (event) => {
		event.preventDefault();
		setAddLimit(addLimit + 1);
		
		if(addLimit == 3){
			setDisplayLimit(true);
		} else {
			setValues(arr => arr.concat([{ id: addLimit + 1, heading: "", headingColor: "", extra: "", extraColor: "" }]));
		}
		

	}

	const extraChangeHeading = (event) => {
		setExtraHeading(event.currentTarget.value);
	}

	const extraChangeHeadingColor = (event) => {
		setExtraHeadingColor(event.currentTarget.value);
	}

	const changeExtra = (event) => {
		setExtraChange(event.currentTarget.value);
	}

	const changeExtraColor = (event) => {
		setExtraChangeColor(event.currentTarget.value);
	}






	return (
		 <form>
			 {props.setHeading(heading)}
			 {props.setHeadingColor(headingColor)}
			 {props.setBylineInit(byline)}
			 {props.setBylineColorChange(bylineColor)}
			 {props.setByline(bylineAdd)}
			 {props.setAddColor(addColor)}
			 {props.setLogo(logo)}
			 {props.setWidthLogo(logoWidth)}
			 {props.setExtraHeading(extraHeading)}
			 {props.setExtraHeadingColor(extraHeadingColor)}
			 {props.setExtraChange(extraChange)}
			 {props.setExtraChangeColor(extraChangeColor)}
			 {props.setValues(values)}
			 <fieldset>
			 	<h4>{props.setCompany} - {props.heading}</h4>
			 </fieldset>
			  <fieldset className="flex-color">
								
		            <label>Main heading</label>
		            <input 
		              type="text" 
		              id="name"
		              placeholder="Enter heading e.g name"
		              onChange={headingChange}
		              />
		             <div>
	              	<input type="color" id="color-one" placeholder="pick a color" onChange={headingColorChange} value={headingColor ? headingColor : props.setheadingColorSaved}/>
	              </div>
	          </fieldset>
	          <fieldset className="flex-color">
	            <label>Byline</label>
	            <input 
	              type="text" 
	              id="name"
	              placeholder="Enter byline e.g. job title"
	              onChange={bylineChange}
	              />
	          	<div>
	          		<input type="color" id="color-byline-1" placeholder="pick a color" onChange={bylineColorChange} value={bylineColor ? bylineColor : props.setBylineSaved}/>
	          	</div>
	         
	          	{props.setBylineSaved != "" ? 
	          	<MoreBylines byline_change={additionalBylineChange} byline_color_change={additionalColorChange} color={addColor ? addColor : props.setAddColorSaved}/>
	          	: addByline ? addByline : ""}
	          	
	          	<div className="byline-additional">
	          		<button onClick={buttonAddByline} className="add-another">{bylimeLimit ? "Limit Reached!" : "Add Another+"}</button>
	          	</div>
	      </fieldset>
	      
	      <FileUpload
	      setValue={setLogo}
	      setLogoWidth={setWidthLogo}
	      logo_width_saved={props.setLogoWidthSaved}
	      />
	       {
						      values.map((obj, i) => {

						      	// add saved data
						    	
										function handleChangeHeading(event) {
						          const value = event.currentTarget.value;
						          setValues(arr => arr.map(o => o === obj ? { ...o, heading: value} : o));
						          
						        }

						        function handleChangeHeadingColor(event) {
						          const value = event.currentTarget.value;
						          setValues(arr => arr.map(o => o === obj ? { ...o, headingColor: value} : o));


						        }
						        function handleExtra(event) {
						          const value = event.currentTarget.value;
						          setValues(arr => arr.map(o => o === obj ? { ...o, extra: value} : o));
						         
						        }
						        function handleExtraColor(event) {
						          const value = event.currentTarget.value;
						          setValues(arr => arr.map(o => o === obj ? { ...o, extraColor: value} : o));
						        }

						        function checkId(){
						        	let color = "";
						        	values.map((obj) => {
						        		if(obj.id == 0){
						        			console.log('match');
						        			color = props.setExtraHeadingColorOneSaved;
						        		}
						        	}) 
						        	return color;
						        }

						       

						       
						        
						        
						        return (
						        	<fieldset className="flex-color extra" key={i} test={props.setExtraHeadingColorOneSaved}>
					      	    <label>Extra</label>

					      	    <div className="field-50">
						      	    <div className="field">
							            <select 
							              type="text" 
							              id="name"
							              placeholder="Enter exta accent (P:, E:, W:)"
							              onChange={handleChangeHeading}
							              >
							              <option value="">Select option</option>
							              <option value="P:">Phone</option>
							              <option value="M:">Mobile</option>
													  <option value="W:">Website</option>
													  <option value="E:">Email</option>
							              </select>
						             </div>
						             <div>

						            	
			
						          		<input type="color" id="color" placeholder="pick a color" onChange={handleChangeHeadingColor} value={obj.headingColor ? obj.headingColor : checkId()}/>
						          	</div>
					          	</div>
					          	<div className="field-50">
					             <div className="field">
						            <input 
						              type="text" 
						              id="name"
						              placeholder="phone, mobile etc"
						              onChange={handleExtra}
						              />
					             </div>
					          	<div>
					          		<input type="color" id="color" placeholder="pick a color" onChange={handleExtraColor}/>
					          	</div>
					          	</div>
					          	
	          					</fieldset>
						         
						        );
						      })
						    }
	    				<div className="byline-additional">
	          		<button onClick={buttonAddExtra} className="add-another">{displayLimit ? "Limit Reached!" : "Add Another+"}</button>
	          	</div>
	     
	     
		</form>
	)

}

export default FormFields;