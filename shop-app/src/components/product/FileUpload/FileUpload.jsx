import React from 'react'
import { faPlus} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
// import './FileUpload.scss';
import axios from 'axios';

export default function FileUpload({files, setFiles, removeFile}) {
 const uploadHandler = (event) => {
   const file = event.target.files[0];
   file.isUploading = true;
   setFiles([...files, file]);

    const formData = new FormData();
    formData.append(
      file.name,
      file,
      file.name
    )

    axios.post('http://localhost/8080/upload', formData)
    .then((res) =>{
      file.isUploading = false;
      setFiles([...files, file])
    })
    .catch((err) =>{
      console.log(err);
      removeFile(file.name);
    })

 }
    return (
    <>
    <div className="file-card">
        <div className="file-inputs">
            <input type="file" onChange={uploadHandler} />
            <button>
              <i>
                <FontAwesomeIcon icon={faPlus} />
              </i>
            </button>
        </div>
        <p className='main'>Support files</p>
        <p className="info">JPEG, PNG</p>
    </div>
    
    </>
  )
}
