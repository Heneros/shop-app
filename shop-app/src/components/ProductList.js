import React from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from './actions';
import './Style.css';
import UserHeader from './UserHeader';


class ProductList extends React.Component{
  componentDidMount(){
      this.props.fetchProducts();
  }  

  renderList(){
      return this.props.products.map(product =>{
          return(
              <div className="item__block"  key={product.id} >
                        <div className="item__inside" >
                  <img src={product.thumbnailUrl} />
                  <h2>{product.title}</h2>
                  </div> 
                  <UserHeader userId={product.userId} />
                  </div>
          );
      });
  }

   render(){

      
        return <div>{this.renderList()}</div>
    }
}

const mapStateToProps = state =>{
    return { products: state.products}
}

export default connect(mapStateToProps, {fetchProducts})(ProductList);
 