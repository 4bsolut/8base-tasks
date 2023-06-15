import { Link } from 'react-router-dom';
import { AuthButton } from './AuthButton';
import './Nav.css';

const NavBar = () => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container">
      <Link className="navbar-brand" to="/">
        ReactJS 8base
      </Link>
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" to="/tasks">
            Tasks
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/profile">
            Profile
          </Link>
        </li>
      </ul>
      <AuthButton />
    </div>
  </nav>
);

export { NavBar };
