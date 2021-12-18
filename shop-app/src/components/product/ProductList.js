import React from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from '../../actions';

class ProductList extends React.Component{
    componentDidMount(){
        this.props.fetchProducts();
    }

     renderList(){
        return this.props.products.map(product =>{
            return (
                <div className="item" key={product.id}>
                    <div className='content'>
                     Title:     {product.title}
                    <div className='description'>
                      Description:   {product.description}
                    </div>
                    </div>
                </div>
            )
        })
     }


    render(){
        return (
            <div>
       <h2>ProductList</h2> 
       <div className="ui celled list"> 
       {this.renderList()}
       </div>
        </div>
        )
    }
}

const mapStateToProps  = (state) =>{
    return { products: Object.values(state.products)}
}

export default connect(mapStateToProps, {fetchProducts}) (ProductList);