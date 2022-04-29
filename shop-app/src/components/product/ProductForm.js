import axios, {post} from 'axios';
import React  from 'react';
import { Field, reduxForm } from 'redux-form';
// import { useForm } from "react-hook-form";
import { connect } from 'react-redux';
// import { register } from "../../actions";



class ProductForm extends React.Component{

	constructor(props) {
		super(props);
		this.state = {file: '', msg: ''};
	}
	
	onFileChange = (event) => {
		this.setState({
			file: event.target.files[0]
		});
	}
	
	uploadFileData = (event) => {
		event.preventDefault();
		this.setState({msg: ''});

		let data = new FormData();
		data.append('file', this.state.file);

		fetch('http://localhost:3000/upload', {
			method: 'POST',
			body: data
		}).then(response => {
			this.setState({msg: "File successfully uploaded"});
		}).catch(err => {
			this.setState({error: err});
		});

	}
	
    // state = {
    //     selectedFile: null
    //   }; 
      // onFileChange = event => {
      //   this.setState({ selectedFile: event.target.files[0] });
      
      // };
    // onFileUpload = () => {
    //     const formData = new FormData();
    //     formData.append(
    //       "myFile",
    //       this.state.selectedFile,
    //       this.state.selectedFile.name
    //     );
    //     console.log(this.state.selectedFile);
    //     axios.post("products/images", formData);
    //   };

    //   fileData = () => {
    //     if (this.state.selectedFile) {
    //       return (
    //         <div>
    //           <h2>File Details:</h2>
    //         <p>File Name: {this.state.selectedFile.name}</p> 
    //         <p>File Type: {this.state.selectedFile.type}</p>
    //             <p>
    //             Last Modified:{" "}
    //             {this.state.selectedFile.lastModifiedDate.toDateString()}
    //           </p>
    //         </div>
    //       );
    //     } else {
    //       return (
    //         <div>
    //           <br />
    //           <h4>Choose before Pressing the Upload button</h4>
    //         </div>
    //       );
    //     }
    //   };



    renderError({error, touched}){
        if(touched && error){
            return (
                <div className='text-danger'>
                        {error}
                </div>
            );
        }
    }


    renderInput = ({input, label, meta}) =>{
    const className = `mb-3 ${meta.error && meta.touched ? 'error' : ''}`;
     return ( <div className={className}>
           <label className="form-label">{label}</label>
           <input required className="form-control " {...input} /> 
           {this.renderError(meta)}
           </div>
           );
     }
     renderImage = ({input, label, meta, isSelected, selectedFile}) =>{
        const className = `mb-3 ${meta.error && meta.touched ? 'error' : ''}`;
        return ( <div className={className}>
            <label className="form-label">{label}</label>
            {/* <input type="file" className="form-control" onChange={this.onFileChange} />
            <input type="file" className="form-control" ref={register} /> */}
           
           </div>
            );

     }


  onSubmit = (formValues, data) => {
         this.props.onSubmit(formValues);
         console.log(data);
     }

    render(){
 
   return( 
       <form 
       onSubmit={this.props.handleSubmit(this.onSubmit)}
       >
           <Field name="title" component={this.renderInput}        label="Enter Name of Product" />
           <Field name="description" component={this.renderInput} label="Enter Description" />
           {/* <Field name="image"  component={this.renderImage}      label="Load Image" /> */}
           {/* <button>Submit</button> */}
           <input onChange={this.onFileChange} type="file"></input>
				   <button onClick={this.uploadFileData}>Upload</button>
     </form>
        )
   }
}
const validate = (formValues) =>{
    const errors = {};

    if(!formValues.title){
        errors.title = 'You must enter a title';
    }
    if(!formValues.description){
        errors.description = 'You must enter a description';
    }
    if(!formValues.test){
        errors.test = 'You must load file';
    }
    return errors;
}
//
export default reduxForm({
    form: 'productForm',
    validate,
})(ProductForm);