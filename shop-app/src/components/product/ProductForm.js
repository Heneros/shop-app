import axios from 'axios';
import React  from 'react';
import { Field, reduxForm } from 'redux-form';


class ProductForm extends React.Component{
   
    state ={
        selectedFile: null        
    };

    onFileChange = event =>{
      this.setState({ selectedFile: event.target.files[0]});
    };

    onFileUpload = () =>{
        const formData = new FormData();
        formData.append(
            "myFile",
            this.state.selectedFile,
            this.state.selectedFile.name
        );

        console.log(this.state.selectedFile);
        axios.post("api/uploadFile", formData);
    };

    fileData = () => {
        if(this.state.selectedFile){
            return (
                <div>
                    Working!!!
                </div>
            )
        }

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
     renderImage = ({input, label, meta, isSelected, selectedFile}) =>{
        const className = `mb-3 ${meta.error && meta.touched ? 'error' : ''}`;
        return ( <div className={className}>
            <label className="form-label">{label}</label>
            <input type="file" className="form-control " onChange={this.onFileChange} />
            {this.fileData()}
           </div>
      
            );

     }


  onSubmit = (formValues) => {
         this.props.onSubmit(formValues);
     }

    render(){
   return( 
       <form 
       onSubmit={this.props.handleSubmit(this.onSubmit)}
       >
           <Field name="title" component={this.renderInput} label="Enter Name of Product" />
           <Field name="description" component={this.renderInput} label="Enter Description" />
           <Field name="image"  component={this.renderImage} label="Load Image" />
           <button onClick={this.onFileUpload} className='btn btn-primary'>Submit</button>
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
        errors.test = 'You must load image';
    }
    return errors;
}

export default  reduxForm({
    form: 'productForm',
    validate
})(ProductForm);

