import React from 'react';
import { connect } from 'react-redux';
import { fetchProducts,fetchComment } from './actions';
import './Style.css';
import UserHeader from './UserHeader';


class ProductList extends React.Component{
  componentDidMount(){
    this.props.fetchProductsAndUsers();
  }  


  renderList(){
      return this.props.products.map(product =>{
          return(<div className="item__block"  key={product.id} >
                        <div className="item__inside" >
                  <h2>{product.title}</h2>
                  <img src={product.thumbnailUrl} />
                  </div> 
                  <UserHeader userId={product.userId} />
                  </div>
                 
          );
      });  
  }
   render(){
        return <div>
            {this.renderList()}
            </div>
    }
}

const mapStateToProps = state =>{
    return { 
        products: state.products,
        comments: state.comments
    }

}

export default connect(mapStateToProps, {
    // fetchProducts, fetchComment
})(ProductList);
 