import React from "react";
import Modal from '../../Modal';

const ProductDelete = () =>{
    return (
        <div>
            ProductDelete
            <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#modalWindow">
                Delete
            </button>

            <Modal/>
        </div>
    )
}

export default ProductDelete;