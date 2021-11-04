import React, {useEffect, useState, useContext} from 'react';
import Header from "../Header";
import Footer from "../Footer";
import {Col, ModalBody, ModalFooter, ModalHeader, Row, Button, Modal,ListGroup ,ListGroupItem} from "reactstrap";
import {useForm} from "react-hook-form";
import {db} from "../../firebase/config";
import {addDocument} from "../../firebase/services";
import Loading from "../Loading";
import { AuthContext } from "../../Context/AuthProvider";
import {findIndex} from 'lodash';
import ItemCategory from './ItemCategory';

function Category() {

    const { register, handleSubmit ,reset} = useForm();
    const [isUpload, setIsUpload] = useState(false);
    const [category, setCategory] = useState([]);
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    const infor = useContext(AuthContext);
   
    const onSubmit = data => {
        
        if(data.category.trim() !== ''){
            setIsUpload(true);
            const idCate = data.category.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ /g,'-').toLowerCase();
            if(findIndex(category, {'id': idCate}) >= 0){
                alert(data.category+" đã tồn tại");
                setIsUpload(false);
                return;
            }
            else{
                addDocument('category',{
                    id:idCate,
                    name:data.category,
                    uid: infor.uid
                })
                setIsUpload(false);
            }

        reset();
        }
        else{
            alert("Không được để rỗng")
        }

    }

    useEffect(()=>{
        const un = db.collection('category').where('uid', '==', infor.uid).onSnapshot(snapshot => {
            const data = snapshot.docs.map((doc)=>(
                {
                    ...doc.data(),
                    idDoc: doc.id
                }));
            setCategory(data)
        })
        return ()=>{un()}
    },[isUpload, infor])

    return (
        <div>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader>Thông báo</ModalHeader>
                <ModalBody>
                    <h5>Tải lên thành công</h5>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
            <Header/>
            <div className="upload my-5">
                <div className="container">
                    <Row>
                        <Col md={{ size: 6}}>
                            <div className="px-md-5 mb-5">
                                <ListGroup>
                                    <ListGroupItem active tag="a" href="#" action>Danh sách thể loại</ListGroupItem>
                                    {
                                        category.map((item, index)=>
                                            <ItemCategory item = {item} key={index} />
                                        )
                                    }
                                    
                                </ListGroup>
                            </div>
                        </Col>
                        <Col md={{ size: 6}}>
                            <div>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <input placeholder="Tên thể loại" {...register("category")} />
                                    <input type="submit" value="Thêm"/>
                                </form>
                                
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
            <Footer/>
            {
                isUpload? <div className="loading-upload">
                            <Loading/>
                        </div>
                    :
                    ""
            }
        </div>
    );
}

export default Category;