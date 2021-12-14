import React from "react";
import { connect } from 'react-redux';
import { fetchComment } from './actions';


class CommentsSidebar extends React.Component{
    componentDidMount(){
        this.props.fetchComment(this.props.postId);
    }
    render(){
        const comment = this.props.comments.find((comment)=> comment.postId === this.props.postId);

        if(!comment){
            return null;
        }
        return <div>{comment.email}</div>
    }
}

const mapStateToProps = (state) =>{
    return {comments: state.comments};
}
export default connect(mapStateToProps, {fetchComment})(CommentsSidebar);