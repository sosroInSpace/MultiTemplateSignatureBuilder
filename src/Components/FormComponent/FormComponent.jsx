/*
 FORM COMPONENT
*/


import React, { Component } from 'react';  
import './FormComponent.scss';

export default class FormComponent extends React.Component {


    constructor(props) {
    super(props);

    // State.

    this.state = {
    
      active: false,
      name: '',
      job: '',
      phone: '',
      tooltip:'',
      toolinfo:'click to copy signature!',
      qualifications: '',
      email: '',
      color: '',
      color_class: '',
  
    };
  }
  nameChange(e) {
    let value = e.target.value;
    this.setState({
      name: value
    });
  }
  toolTipShow(e){
    this.setState({
      tooltip: 'active',
    })
  }
  toolTipHide(e){
    this.setState({
      tooltip:'',

    })
  }
  phoneChange(e) {
    let value = e.target.value;
    this.setState({
      phone: value
    });
  }
  qualChange(e) {
    let value = e.target.value;
    this.setState({
      qualifications: value
    });
  }
  copyContent(e){
    let content = e.currentTarget;
    let range = document.createRange();
    range.selectNode(content);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
    this.setState({
      tooltip: 'copied',
      toolinfo: 'copied!'
    })
  }
  jobChange(e) {
    let value = e.target.value;
    this.setState({
      job: value
    });
  }

  emailChange(e) {
    let value = e.target.value;
    this.setState({
      email: value
    });
  }
  
  render(){

    const {
      marginTop
    } = this.props

    return (
      <div className={this.state.color_class + " wrapper"}>
      <h1 style={{paddingBottom:'15px',textAlign:'center'}}><span><img src="https://okmg.com/assets/cdn/okmg-master.svg" width="70" style={{"marginBottom":"5px"}}/></span></h1>
      <form>
          <fieldset>
            <label>Name</label>
            <input 
              type="text" 
              id="name"
              onChange={this.nameChange.bind(this)}
              placeholder="Enter your name"
              />
          </fieldset>
          <fieldset>
            <label>Qualifications</label>
            <input 
              type="text" 
              id="job-title"
              onChange={this.qualChange.bind(this)}
              placeholder="Enter your qualifications"
              />
          </fieldset>
           <fieldset>
            <label>Job Title</label>
            <input 
              type="text" 
              id="job-title"
              onChange={this.jobChange.bind(this)}
              placeholder="Enter your job title"
              />
          </fieldset>
           
           <fieldset>
            <label>Phone</label>
            <input 
              type="text" 
              id="phone"
              onChange={this.phoneChange.bind(this)}
              placeholder="Enter your mobile number"
              />
          </fieldset>
         <fieldset>
            <label>Email</label>
            <input 
              type="text" 
              id="email"
              onChange={this.emailChange.bind(this)}
              placeholder="Enter your email"
              />
          </fieldset>
      </form>
   
      <div 
        className="signature-wrapper" 
        style={{position:'relative'}}
        >
          <p className={this.state.tooltip + ' tooltip'}>{this.state.toolinfo}</p>
          <div className='instructions'>
            <h5>Instructions</h5>
            <ul>
              <li>Click on the signature to copy it to your clipboard.</li>
              <li>Navigate to Gmail > Settings > Signatures > Paste into signature box > Save</li>
              <li>Done!</li>
            </ul>
          </div>
          <div 
          onClick={this.copyContent.bind(this)} 
          onMouseEnter={this.toolTipShow.bind(this)} 
          onMouseLeave={this.toolTipHide.bind(this)}
          >
          {/* -------------- SIGNATURE ---------*/}
<table width={450} style={{fontFamily: 'Arial, sans-serif', textAlign: 'left', color: 'rgb(0, 0, 0)', fontSize: '14px', lineHeight: '16px', width: '450px'}}>
    <tbody>
        <tr>
            <td
                colSpan={5} style={{paddingTop: '10px',fontSize: '20px', fontWeight: 600, color: 'rgb(233, 95, 34)', textTransform: 'capitalize'}}>{this.state.name ? this.state.name : 'Your Name'}</td>
        </tr>
        {this.state.qualifications ? 
            <tr>
            <td colSpan={5} style={{fontSize: '10px', color: 'rgb(0,0,0)', textTransform: 'capitalize'}}>{this.state.qualifications}</td>
        </tr>
          : ''}
        <tr>
            <td colSpan={5} style={{fontSize: '13px', color: 'rgb(0,0,0)', textTransform: 'capitalize'}}>{this.state.job ? this.state.job : 'job title'}<br /></td>
        </tr>
        <tr>
            <td colSpan={5}>
            <br/>
              <img src="https://okmg-digital-assets.s3.ap-southeast-2.amazonaws.com/femma/femma-orange-v2.png" width="130" style={{width:'130px'}} alt="femma.com.au"/>
              <br/><br/>
            </td>
        </tr>
        <tr>
            <td colSpan={2} style={{color: 'rgb(0,0,0)'}}>
            {this.state.phone ? <span> <span style={{fontWeight:'bold',fontSize:'13px'}}>M: </span>{this.state.phone} | </span> : ''}
            {this.state.email ? <span> <span style={{fontWeight:'bold',fontSize:'13px'}}>E: </span>{this.state.email} | </span> : ''}
            <span style={{fontWeight:'bold',fontSize:'13px'}}>W:</span><a href="https://www.femma.com.au/" style={{color: 'rgb(0,0,0)', fontSize: '13px', fontWeight: 'normal',textDecoration:'none'}}> femma.com.au</a>

            </td>
        </tr>
        <tr>
            <td colSpan={5} style={{color: 'rgb(153, 153, 153)', fontSize: '9px', paddingTop: '20px', paddingBottom: '20px'}}><strong>NOTICE:</strong> The information contained in this email and any attached files may be confidential information. If you are not the intended recipient, any use, disclosure or copying of this email is unauthorised. If you have received this email in error, please notify the sender by reply email and delete the original. Thank you.</td>
        </tr>
        <tr>
            <td colSpan={5} style={{width: '100%'}}><img /></td>
        </tr>
    </tbody>
</table>          {/* -------------- SIGNATURE ---------*/}
            
          </div>
        </div>
      </div>
      );
    }
  }