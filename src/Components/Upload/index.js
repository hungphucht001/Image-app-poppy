import React, {useEffect, useState, useContext} from 'react';
import Header from "../Header";
import Footer from "../Footer";
import {Col, ModalBody, ModalFooter, ModalHeader, Row, Button, Modal} from "reactstrap";
import {useForm} from "react-hook-form";
import {db,storage} from "../../firebase/config";
import {addDocument} from "../../firebase/services";
import Loading from "../Loading";
import { AuthContext } from "../../Context/AuthProvider";
import './upload.scss'

function Upload() {

    const { register, handleSubmit ,reset} = useForm();
    const [category, setCategory] = useState([]);
    const [isUpload, setIsUpload] = useState(false);
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);
    const infor = useContext(AuthContext);
    const metadata = {
        contentType: 'image/jpeg'
    };

    const onSubmit = data => {
        if(data.image.length > 0 && data.title.trim())
        {
            const imageName = data.image[0].name
            let today = new Date();
            var date = today.getDate()+(today.getMonth()+1)+today.getFullYear();
            var time = today.getHours()+ today.getMinutes()+ today.getSeconds();
            const uploadTask = storage.ref().child('images/'+time+'-'+date + imageName).put(data.image[0], metadata);

            uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setIsUpload(true)
            },
            (error) => {
                console.log(error)
            },
            () => {
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    addDocument('images',{
                        category: data.category? data.category : 'tong-hop',
                        imageUrl: downloadURL,
                        title: data.title,
                        imageName: imageName,
                        uid: infor.uid
                    })
                    setIsUpload(false)
                    setModal(true)
                });
            })
            reset();
        }
        else alert("Phải nhập dữ liệu")
    }

    useEffect(()=>{
        const un = db.collection('category').where('uid','==',infor.uid).onSnapshot(snapshot => {
            const data = snapshot.docs.map((doc)=>(
                {
                    ...doc.data()
                }));
            setCategory(data)
        })
        return ()=>{un()}
    },[infor])

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
                        <Col md={{ size: 6, offset: 3 }}>
                            <div>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <input placeholder="Mô tả" {...register("title")} />
                                    <select {...register("category")}>
                                        {
                                            category.map((item,index) =>
                                                <option key={index} value={item.id}>{item.name}</option>)
                                        }
                                    </select>
                                    <input style={{padding:'10px 15px'}} type="file" {...register("image")} />
                                    <input type="submit" value="Upload"/>
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

export default Upload;