import React, {useEffect, useRef, useState, useContext} from 'react';
import Header from "../Header";
import {Button, Container} from "reactstrap";
import ItemPost from "../ItemPost";
import Footer from "../Footer";
import {db} from "../../firebase/config";
import {useLocation} from "react-router-dom";
import Masonry from "react-masonry-css";
import {AuthContext} from "../../Context/AuthProvider";

function Home() {

    const [data, setData] = useState([])
    const [limit, setLimit] = useState(20)
    const [count, setCount] = useState(0)

    const location = useLocation();
    const breakpointColumnsObj = {
        default: 3,
        768: 2,
        500: 1
    };
    const inputEl = useRef('');
    const infor = useContext(AuthContext);

    useEffect(()=>{
        const category = location.pathname.replace('/','')
        if(inputEl.current !== category){
            setLimit(20)
            inputEl.current = category
        }

        const c = db.collection('images').where("uid","==",infor.uid).count;

        setCount(c);

    },[location,limit,infor]);

    useEffect(()=>{

        const category = location.pathname.replace('/','')
        const citiesRef = db.collection('images').where("uid","==",infor.uid);
        if(category)
        {
            const query = citiesRef.where("category", "==", category);
            query.limit(limit).onSnapshot(snapshot => {
                const data = snapshot.docs.map((doc)=>(
                    {
                        ...doc.data(),
                        idDoc: doc.id
                    }));
                setData(data)
            })
        }
        else{
            citiesRef.limit(limit).onSnapshot(snapshot => {
                const data = snapshot.docs.map((doc)=>(
                    {
                        ...doc.data(),
                        idDoc: doc.id
                    }));
                setData(data)
            })
        }
       
    },[location, limit, infor])


    return (
        <div>
            <Header/>
            <Container>
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column my-5">
                        {data.map((item, index)=><ItemPost item={item} key={index} />)}
                </Masonry>
                <div className="text-center mb-5">
                    { count > 20? <Button onClick={()=>{ setLimit(limit+ 20) }} >Xem tiếp</Button> : ""}
                </div>
            </Container>
            <Footer/>
        </div>
    );
}
export default Home;