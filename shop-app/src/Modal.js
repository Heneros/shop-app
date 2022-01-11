import React from 'react';
import ReactDOM from 'react-dom';


class Modal extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          modalState: true
      };
      this.handleShow = this.handleShow.bind(this);
  }

  handleShow() {
      this.setState({ modalState: !this.state.modalState });
  }

  render() {
      return ReactDOM.createPortal(
          <div>
              <div className={"modal fade" + (this.state.modalState ? " show d-block" : " d-none")} tabIndex="-1" role="dialog">
                  <div 
                  className="modal-dialog"
                   role="document">
                      <div className="modal-content">
                          <div className="modal-header">
                          <h5 className="modal-title">{this.props.title}

                          </h5>
                              <button type="button" className="close" onClick={this.handleShow}>
                                  <span>&times;</span>
                              </button>
                          </div>
                          <div className="modal-body">
                          {this.props.content}
                          </div>
                          <div className="modal-footer">
                          {this.props.actions}
                
                          </div>
                      </div>
                  </div>
              </div>
          </div>,
              document.querySelector('#modal')
      );
  }
}

// const Modal = props =>{
//     return ReactDOM.createPortal(
// <div
// onClick={props.onDismiss}
//  className="modal fade in" id="modalWindow" aria-labelledby="staticBackdropLabel">
//   <div onClick={(e) => e.stopPropagation()} className="modal-dialog">
//     <div className="modal-content">
//       <div className="modal-header">
//         <h5 className="modal-title" id="staticBackdropLabel">{props.title}</h5>
//         <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//       </div>
//       <div className="modal-body">
//       {props.content}
//       </div>
//       <div className="modal-footer">
//         {props.actions}
//       </div>
//     </div>
//   </div>
// </div>
// ,
// document.querySelector('#modal')
//     );
// }

export default Modal;