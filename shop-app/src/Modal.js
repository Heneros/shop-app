import React from 'react';
import ReactDOM from 'react-dom';
import history from './history';


const Modal = props =>{
    return ReactDOM.createPortal(
<div
onClick={() => history.push('/') }
 className="modal fade" id="modalWindow" aria-labelledby="staticBackdropLabel">
  <div onClick={(e) => e.stopPropagation()} className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="staticBackdropLabel">Modal title</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
       
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary">Understood</button>
      </div>
    </div>
  </div>
</div>
,
document.querySelector('#modal')
    );
}

export default Modal;