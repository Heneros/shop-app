import axios, {post} from 'axios';
import React  from 'react';
import { Field, reduxForm } from 'redux-form';
// import { useForm } from "react-hook-form";
import { connect } from 'react-redux';
import FileUpload from './FileUpload/FileUpload';
// import { register } from "../../actions";



class ProductForm extends React.Component{

	constructor(props) {
		super(props);
		this.state = {
            files: '', 
            setFiles: ''
        };
	}
	
	
 


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



  onSubmit = (formValues, data) => {
         this.props.onSubmit(formValues);
         console.log(data);
     }
     setFiles = ()=>{

     }
    render(){
 
   return( 
       <form 
       onSubmit={this.props.handleSubmit(this.onSubmit)}
       >
           <Field name="title" component={this.renderInput}   label="Enter Name of Product" />
           <Field name="description" component={this.renderInput} label="Enter Description" />
 
           <FileUpload files="files" onClick={this.setFiles} />

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
export default reduxForm({
    form: 'productForm',
    validate,
})(ProductForm);