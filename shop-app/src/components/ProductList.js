import React from 'react';
import { connect } from 'react-redux';
import { fetchProducts,fetchComment } from './actions';

import './Style.css';
import UserHeader from './UserHeader';
import CommentsSidebar from './CommentsSidebar';

class ProductList extends React.Component{
  componentDidMount(){
      this.props.fetchProducts();
      this.props.fetchComment();
  }  



  renderList(){
      return this.props.products.map(product =>{
          return(
              <div>
              <div className="item__block"  key={product.id} >
                        <div className="item__inside" >
                  {/* <img src={product.thumbnailUrl} /> */}
                  <h2>{product.title}</h2>
                  </div> 
                  <UserHeader userId={product.userId} />
           
                  </div>
                  {/* <div className="item__inside" key={product.id}>
                  <CommentsSidebar postId={product.postId} />
                  </div> */}
                  </div>
          );
      });
  }
  renderComment(){
      return this.props.comments.map(comment =>{
          return(
              <div>
            <div className="item" >
            <CommentsSidebar postId={comment.postId} />
              </div>       
               </div>     
          )
      })
  }

   render(){
        return <div>
            {this.renderList()}
            {this.renderComment()}
            </div>
    }
}

const mapStateToProps = state =>{
    return { 
        products: state.products,
        comments: state.comments
    }

}

export default connect(mapStateToProps, {fetchProducts, fetchComment})(ProductList);
 