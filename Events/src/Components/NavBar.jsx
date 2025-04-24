
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router';
import { UserContext } from '../context/UserContext';

export const Navbar = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
        <section > <Link to="/">Home</Link></section>
      
      {user ? (
        <>
          <Link to="/profile">Profile</Link>
          <span>Hello, {user.username}</span>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <Link to="/login">Login</Link>
      )}
     
     
    </nav>
  );
};

