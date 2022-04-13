import React from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import history from "../../history";
import Modal  from '../../Modal';
import { fetchProduct, deleteProduct } from '../../actions';


class ProductDelete  extends React.Component {
    componentDidMount(){
        this.props.fetchProduct(this.props.match.params.id);
 
    }


    renderActions(){
        const { id } = this.props.match.params;
    return (
        <React.Fragment>
            <button 
            onClick={() => this.props.deleteProduct(id)}
            className="btn btn-danger me-md-2">Delete</button>
            <Link 
            to="/"
            className="btn btn-primary"
            >Cancel</Link>
        </React.Fragment>
    )
  }

  renderContent(){
      if(!this.props.product){
          return "Are you sure?"
      }
      return `Are you you want to delete this product with title: ${this.props.product.title}`;
  }
    render(){
        return (
            <div>
                <Modal 
                title="Delete Product"
                content={this.renderContent()}
                actions={this.renderActions()}
                onDismiss={() => history.push('/')}
                 />
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) =>{
    return { product: state.products[ownProps.match.params.id]}
};


export default connect(mapStateToProps, {fetchProduct, deleteProduct})(ProductDelete);