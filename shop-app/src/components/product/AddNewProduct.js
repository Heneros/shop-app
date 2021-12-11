import React from 'react';
import { Field, reduxForm} from 'redux-form';


class AddNewProduct extends React.Component{
     renderInput({input, label}){
       return ( <div className='field'>
           <label>{label}</label>
           <input {...input} /> 
           </div>
           );
     }

     onSubmit(formValues){
         console.log(formValues)
     }

    render(){
   console.log(this.props);
   return( 
       <form 
       onSubmit={this.props.handleSubmit(this.onSubmit)}
       className='ui form'>
           <Field name="title" component={this.renderInput} label="Enter Name of Product" />
           <Field name="description" component={this.renderInput} label="Enter Description" />
           <button>Submit</button>
     </form>
        )
   }
}

export default reduxForm({
    form: 'addProduct'
})(AddNewProduct);