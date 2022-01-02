import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../../actions';

class ProductList extends React.Component{
    componentDidMount(){
        this.props.fetchProducts();
    }


     renderList(){
        return this.props.products.map(product =>{
            return (
                <div className="col-6 col-sm-3" key={product.id}>
                   < div className='card  text-center'>
                <div className='card-body'>
                   <h2 className='card-title'> {product.title}</h2> 
                    <p className='card-text'>
                      {product.description}
                    </p>
                    {this.renderAdmin(product)}
                    </div>
                    </div>

                </div>
            )
        })
     }

     renderAdmin(product){
        return(
            <div >
                <Link 
                to={`/product/edit/${product.id}`}
                className='btn btn-primary me-md-2'>
                    Edit
                </Link>
                <button className='btn btn-danger'>
                    Delete
                </button>

            </div>
        )
    }
     renderCreate(){
         return (
             <div className='col-md-12 text-center'>
           
                 <Link 
                 to="/product/addnew"
                 className='btn btn-primary'
                 >
                 Create Product
                 </Link>
                 </div>
     
         )
     }


    render(){
        return (
        <div className='row'>
       <h2 className='text-center'>ProductList</h2> 
     
       {this.renderList()}
       {this.renderCreate()}
    
        </div>
        )
    }
}

const mapStateToProps  = (state) =>{
    return { products: Object.values(state.products)}
}

export default connect(mapStateToProps, {fetchProducts}) (ProductList);