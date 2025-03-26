import {Link} from 'react-router-dom'
import './Navbar.css'

const Navbar:React.FC = () => {
    return (
        <nav 
        className="navbar">
            <ul className="nav-links">
                <li><Link className="nav-button" to="/">Home</Link></li>
                <li><Link className="nav-button" to="/projects">Projects</Link></li>
                <li><Link className="nav-button" to="/contact">Contact</Link></li>
                <li><Link className="nav-button" to="/experience">Experience</Link></li>
                <li><Link className="nav-button" to="/info">More Info</Link></li>
            </ul>
        </nav>
    )
}

export default Navbar