import React from 'react';
import { Field, reduxForm} from 'redux-form';
import { connect } from 'react-redux';
import { createProduct } from '../../actions';


class AddNewProduct extends React.Component{
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
    const className = `mb-3 ${meta.error && meta.touched ? '' : ''}`;
     return ( <div className={className}>
           <label className="form-label">{label}</label>
           <input required className="form-control " {...input} /> 
           {this.renderError(meta)}
           </div>
           );
     }

  onSubmit = (formValues) => {
         this.props.createProduct(formValues);
     }

    render(){
   console.log(this.props);
   return( 
       <form 
       onSubmit={this.props.handleSubmit(this.onSubmit)}
       className=''>
           <Field name="title" component={this.renderInput} label="Enter Name of Product" />
           <Field name="description" component={this.renderInput} label="Enter Description" />
           <button className='btn btn-primary'>Submit</button>
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
    return errors;
}

const formWrapped = reduxForm({
    form: 'AddNewProduct',
    validate
})(AddNewProduct);

export default connect(null, { createProduct })(formWrapped);