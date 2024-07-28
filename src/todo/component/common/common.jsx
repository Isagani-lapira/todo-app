
import { useAuth } from '../../security/AuthContext';
import './common.css';
import { Link } from "react-router-dom";

export default function HeaderComponent(){
    const {username,isAuthenticated} = useAuth();

    return (
        <nav className="navbar navbar-light bg-light">
            <Link className='navbar-brand' to={username!=''? `/welcome/${username}`:'/'}>Taskie</Link>
            <ul className='navbar-nav d-flex flex-row'>
                {isAuthenticated==false && <li className='nav-item px-2'><Link className='nav-link' to="/">Sign in</Link></li>}
                {isAuthenticated==true && <li className='nav-item px-2'><Link className='nav-link' to={`/welcome/${username}`}>Home</Link></li>}
                {isAuthenticated==true &&
                    <li className='nav-item px-2'>
                        <Link className='btn btn-primary' to="/add-task">Create New</Link>
                    </li>
                }
                
            </ul>
        </nav>
    )
}



export function FooterComponent(){
    return (
        <footer>alskdfjl</footer>
    )
}