import {Link} from 'react-router-dom'
import './Navbar.css'

const Navbar:React.FC = () => {
    return (
        <nav className="navbar">
            <h2 className="logo">
                My Portfolio
            </h2>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/projects">Projects</Link></li>
                <li><Link to="/contact">Contact</Link></li>
            </ul>
        </nav>
    )
}

export default Navbar