import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../../actions';

class ProductList extends React.Component{
    componentDidMount(){
        this.props.fetchProducts();
    }

    renderAdmin(product){
        return(
            <div className='right floated content'>
                <Link 
                to={`/product/edit/${product.id}`}
                className='ui button primary'>
                    Edit
                </Link>
                <button className='ui button negative'>
                    Delete
                </button>
            </div>
        )
    }

     renderList(){
        return this.props.products.map(product =>{
            return (
                <div className="item" key={product.id}>
                     {this.renderAdmin(product)}
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

     renderCreate(){
         return (
             <div style={{textAlign: 'right'}}>
                 <Link 
                 to="/product/addnew"
                 className='ui button primary'
                 >
                 Create Product
                 </Link>
             </div>
         )
     }


    render(){
        return (
            <div>
       <h2>ProductList</h2> 
       <div className="ui celled list"> 
       {this.renderList()}
       </div>
       {this.renderCreate()}
        </div>
        )
    }
}

const mapStateToProps  = (state) =>{
    return { products: Object.values(state.products)}
}

export default connect(mapStateToProps, {fetchProducts}) (ProductList);