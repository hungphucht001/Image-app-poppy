import React, {useState} from 'react';

import {ListGroupItem, Modal, ModalHeader, ModalBody,ModalFooter, Button} from "reactstrap";
import {db} from "../../firebase/config";
import './ItemCategory.scss';

function ItemCategory(props) {
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    const handleDeleteCategory = () =>{
        
        db.collection("category").doc(props.item.idDoc).delete().then(() => {
            alert("Xóa thành công")
        }).catch((error) => {
            alert("Có lỗi xảy ra" + error)
        });

        toggle()
    }

    return (
        <>
            <ListGroupItem className="d-flex AHADAD">
                <span className="me-auto">
                    {props.item.name}
                </span>
                <i className="bi bi-trash" onClick={toggle}/>
            </ListGroupItem>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader>Thông báo</ModalHeader>
                <ModalBody>
                    <h5>Bạn có chắc muốn xóa không</h5>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={handleDeleteCategory}>Ok</Button>
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </>
    );
}

export default ItemCategory;