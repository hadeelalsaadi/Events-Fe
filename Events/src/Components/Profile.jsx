import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

export const Profile = () => {
  const { user,logout } = useContext(UserContext);

  return (
    <div>
      <h2>Hello {user.name} 👋</h2>
      <img src={user.avatar} alt={`avatar of ${user.name}`}/>
      <p>A {user.user_role} in our Event app </p>
      <p>Roled at : {new Date(user.registeredat).toLocaleDateString()} </p>
      <p>Email : {user.email}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

