import React  from 'react';
import { Field, reduxForm } from 'redux-form';


class ProductForm extends React.Component{
 
    constructor(props){
       super(props);
       this.state = {
           selectedFile: null,
           setSelectedFile: null,
           isFilePicked: false,
           setIsFilePicked: false
       }
   }
   changeHandler = ({setSelectedFile, setIsSelected}, event) => {
    setSelectedFile(event.target.files[0]);
    setIsSelected(true);
  };

  handleSubmission = () =>{

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
     renderImage = ({input, label, meta, isSelected}) =>{
        const className = `mb-3 ${meta.error && meta.touched ? 'error' : ''}`;
        return ( <div className={className}>
            <label className="form-label">{label}</label>
            <input type="file" className="form-control " />
            {isSelected ? <div>
            </div> : (<p>Select a File</p>)} 
            {/* {this.renderError(meta)} */}
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
           <Field name="image" onChange={this.changeHandler} component={this.renderImage} label="Load Image" />
           <button onClick={this.handleSubmission} className='btn btn-primary'>Submit</button>
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

