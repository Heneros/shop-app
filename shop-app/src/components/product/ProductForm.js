import axios, {post} from 'axios';
import React, { useState }  from 'react';
import { Field, reduxForm } from 'redux-form';
// import { useForm } from "react-hook-form";
import { connect } from 'react-redux';
import FileUpload from './FileUpload/FileUpload';
// import { register } from "../../actions";



function ProductForm() {

   const [files, setFiles] = useState([{
       name: 'FileName.png'
   }])
    const removeFile = (filename, files) =>{
        setFiles(files.filter(file => file.name !== filename))
    }
    console.log(files);
   return( 
       <>
             <p className='title'>Upload file</p>
            <FileUpload files={files} setFiles={setFiles} removeFile={removeFile} />
       </>
        )
}

export default ProductForm;