import React, {useContext, useEffect, useState} from 'react';
import {db, auth} from '../../firebase/config';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';
import { AuthContext } from "../../Context/AuthProvider";
import {Link} from "react-router-dom";

Header.propTypes = {

};

function Header() {

    const [isOpen, setIsOpen] = useState(false);
    const [category, setCategory] = useState([]);
    const toggle = () => setIsOpen(!isOpen);

    const data = useContext(AuthContext);

    useEffect(()=>{
        const un = db.collection('category').where('uid','==',data.uid).onSnapshot(snapshot => {
            const data = snapshot.docs.map((doc)=>(
                {
                    ...doc.data()
                }));
            setCategory(data)
        })
        return ()=>{un()}
    },[data])

    return (
        <Navbar color="light" light expand="md" className="px-5 py-3">
            <Link className="nav-link" to ="/">
                <img src="logo.svg" style={{width:'100px'}}/>
            </Link>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar className="justify-content-between px-5">
                <Nav className="mr-auto" navbar>
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret>
                            Thể loại
                        </DropdownToggle>
                        <DropdownMenu right>
                            {
                                category.map((item, index)=>{
                                    return <DropdownItem key={index}>
                                            <NavItem>
                                                <Link className="nav-link" to={`/${item.id}`}>{item.name}</Link>
                                            </NavItem>
                                         </DropdownItem>
                                })
                            }
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </Nav>
                <Nav>
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret style={{color:'#000', paddingLeft: '0'}}>
                            {data.displayName}
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem>
                                <Link className="nav-link py-0 ps-0" style={{color: '#000'}} to="/upload">
                                    Đăng bài
                                </Link>
                            </DropdownItem>
                            <DropdownItem>
                                <Link className="nav-link py-0 ps-0" style={{color: '#000'}} to="/category">
                                    Thêm thể loại
                                </Link>
                            </DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem style={{color: '#000'}} onClick={()=>{auth.signOut()}}>
                                Đăng xuất
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </Nav>
            </Collapse>
        </Navbar>
    );
}
export default Header;