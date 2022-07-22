import React, {useRef, useState} from 'react';
import S3 from 'react-aws-s3';
import 'dotenv/config';

function FileUpload(props) {

    const fileInput = useRef();
    const [s3file, setS3File] = useState('');
    const [logoWidth, setWidth] = useState('');
    const [loader, setLoader] = useState(false);
    const [fileName, setFileName] = useState('');
    const [hover, setHover] = useState(false);

    const handleClick = event => {
        console.log(fileInput.current);
        event.preventDefault();
        let file = event.currentTarget;
        var png = "image/png";
        var jpeg = "image/jpeg";
        console.log(fileInput.current.files[0].type);
       
        if(fileInput.current.files[0].size > 2097152){
            alert("File to big!");
            file.value = "";
        }
        else if(fileInput.current.files[0].type == png && fileInput.current.files[0].size < 2097152 || fileInput.current.files[0].type == jpeg && fileInput.current.files[0].size < 2097152){
            // proceed
                let file = fileInput.current.files[0];
                let newFileName = fileInput.current.files[0].name;

               const config = {
                    bucketName: `${process.env.REACT_APP_BUCKET_NAME}`,
                    region: `${process.env.REACT_APP_REGION}`,
                    accessKeyId: `${process.env.REACT_APP_ACCESS_KEY_ID}`,
                    secretAccessKey: `${process.env.REACT_APP_SECRET_ACCESS_KEY}`,
                }
                const ReactS3Client = new S3(config);
                setLoader(true);
                setFileName(newFileName);

               ReactS3Client
                .uploadFile(file, newFileName)
                .then(data => {
                    setS3File(data.location);
                    console.log(data);

                }).then(data => {
                    setLoader(false);
                })
                .catch(err => console.error(err))

                } else {
                    alert('File type not supported!');
                    file.value = "";
                }

      
       
    }

    const hoverStateIn = event => {
        setHover(true);
    }

    const hoverStateOut = event => {
        setHover(false)
    }


    const handleLogoWidth = event => {
        setWidth(event.currentTarget.value);
        console.log(logoWidth);
         let value = event.currentTarget;
        if(value.value > 251){
            value.value = "";
        }
    }

  
	return (
        <fieldset className="logo-upload">
            <div>
                <label>Upload logo</label>
                {props.setValue(s3file)}
                {props.setLogoWidth(logoWidth)}
                 <input type="file" ref={fileInput} onChange={handleClick} onMouseEnter={hoverStateIn} onMouseLeave={hoverStateOut} className="add-another"/>
                 <div className={hover ? "file-loader active" : "file-loader"}>
                    <p>{fileName ? fileName : "Upload image - .png or .jpeg - max 2mb"}</p>
                 </div>
                 <div className="loader">
                    <span className={loader ? "loading active" : "loading"}></span>
                 </div>
             </div>
             <div> 
                <label>Logo width</label>
                <input type="number" placeholder="Enter logo width in px - maximum of 251px" onChange={handleLogoWidth} value={props.logo_width_saved}/>
             </div>
        </fieldset>
    )
}

export default FileUpload;