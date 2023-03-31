import React,{useEffect} from 'react'
import {Link,useLocation} from "react-router-dom";
import { useNavigate } from 'react-router-dom' ;
function Navbar() {
    const navigate = useNavigate();
    const handleLogout=(e)=>{
        localStorage.removeItem('token')
        e.preventDefault();
        navigate('/')
        window.location.reload();
    }
    let location = useLocation();

    useEffect(() => {
    }, [location]);
    return (
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
            <div className="container-fluid"> 
                <Link className="navbar-brand" to="/">iNoteBook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname==="/"?"active":""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname==="/about"?"active":""}`} to="/about">About</Link>
                        </li>
                    </ul>
                   {!localStorage.getItem('token')?<form className="d-flex">
                    <Link to= "/login" className="btn btn-primary btn-lg mx-1" role="button" >Login</Link>
                    <Link to ="/signup" className="btn btn-primary btn-lg mx-1" role="button" >Sign UP </Link>
                    </form>:<button className='btn btn-primary btn-lg ' onClick={handleLogout}> Logout</button>}
                </div>
            </div>
        </nav>
    )
}

export default Navbar