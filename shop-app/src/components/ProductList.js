import React from 'react';
import { connect } from 'react-redux';
import { fetchProduct } from './actions';
import './Style.css';


class ProductList extends React.Component{
  componentDidMount(){
      this.props.fetchProduct();
  }  

  renderList(){
      return this.props.products.map(product =>{
          return(
              <div className="item__block"  key={product.id} >
                        <div className="item__inside" >
                  <h2>{product.title}</h2>
                  <img src={product.thumbnailUrl} />
                  </div>
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

export default connect(mapStateToProps, {fetchProduct})(ProductList);
 