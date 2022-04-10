import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import  { fetchProduct, editProduct } from '../../actions';
import ProductForm from './ProductForm';

class ProductEdit extends React.Component{
  componentDidMount(){
      this.props.fetchProduct(this.props.match.params.id);
  }

  onSubmit = (formValues) => {
     this.props.editProduct(this.props.match.params.id, formValues);
  }


    render(){
    if(!this.props.product){
        return <div>Loading...</div>
    }
    return (<div>
         <h3>Edit a product</h3>
        <ProductForm 
        initialValues={_.pick(this.props.product, 'title', 'description', 'image')}
        onSubmit={this.onSubmit}/>
        </div>)
  } 
   
}

const mapStateToProps = (state, ownProps) => {
    return { product: state.products[ownProps.match.params.id]};
}

export default connect(mapStateToProps, 
  { fetchProduct, editProduct })(ProductEdit);