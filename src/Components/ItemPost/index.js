import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Button,ModalBody, ModalFooter, ModalHeader, Modal} from "reactstrap";
import "./itemPost.scss"
import {storage,db} from '../../firebase/config'
import { Image } from 'antd';
import 'antd/dist/antd.css';
ItemPost.propTypes = {
    item: PropTypes.object
};

ItemPost.defaultProps={
    item:{}
}

function ItemPost(props) {
    const {item} = props
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const handleDelete = () => {
        const desertRef = storage.ref().child(`/images/${item.imageName}`);
        desertRef.delete().then(() => {
        }).catch((error) => {
        });

        db.collection("images").doc(item.idDoc).delete().then(() => {
            alert("Xóa thành công")
        }).catch((error) => {
            alert("Có lỗi xảy ra" + error)
        });

        toggle()
    }
        
    return (
            <>
                <div className="item-post">
                    <div className="single-image">
                        <Image src={item.imageUrl} alt={item.title}/>
                    </div>
                    <div onClick={toggle} className="ATCHAOH delete">
                        <i className="bi bi-trash"/>
                    </div>
                </div>
                <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader>Thông báo</ModalHeader>
                    <ModalBody>
                        <h5>Bạn có chắc muốn xóa không</h5>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={handleDelete}>Ok</Button>
                        <Button color="secondary" onClick={toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </>
    );
}

export default ItemPost;