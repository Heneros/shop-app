import axios, {post} from 'axios';
import React  from 'react';
import { Field, reduxForm } from 'redux-form';


class ProductForm extends React.Component{
   
    state = {
        selectedFile: null
      };
      
      onFileChange = event => {
        this.setState({ selectedFile: event.target.files[0] });
      
      };

    // onFileChange = event =>{
    // //   this.setState({ selectedFile: event.target.files[0]});
    // let files = event.target.files;
    // let reader = new FileReader();
    // reader.readAsDataURL(files[0]);
    // reader.onload = (e) =>{
    //     const url = "http://localhost:3000/product/addnew";
    //     const formData = { file: e.target.result}
    //     return post(url, formData)
    //      .then(response => console.log("result" . response))
    //     // console.warn("img data", e.target.result);
    // }

    // };

    onFileUpload = () => {
        const formData = new FormData();
        formData.append(
          "myFile",
          this.state.selectedFile,
          this.state.selectedFile.name
        );
        console.log(this.state.selectedFile);
        axios.post("products/images", formData);
      };

      fileData = () => {
        if (this.state.selectedFile) {
          return (
            <div>
              <h2>File Details:</h2>
            <p>File Name: {this.state.selectedFile.name}</p> 
            <p>File Type: {this.state.selectedFile.type}</p>
                <p>
                Last Modified:{" "}
                {this.state.selectedFile.lastModifiedDate.toDateString()}
              </p>
   
            </div>
          );
        } else {
          return (
            <div>
              <br />
              <h4>Choose before Pressing the Upload button</h4>
            </div>
          );
        }
      };



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
           <Field name="title" component={this.renderInput}        label="Enter Name of Product" />
           <Field name="description" component={this.renderInput} label="Enter Description" />
           <Field name="image"  component={this.renderImage}      label="Load Image" />
           <button onClick={this.onFileUpload} className='btn btn-primary'>Submit</button>
           {this.fileData()}
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

export default  reduxForm({
    form: 'productForm',
    validate
})(ProductForm);