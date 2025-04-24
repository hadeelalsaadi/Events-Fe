import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { getUserbyUsername } from "../api";
import { Link , useNavigate } from "react-router";


export const LoginForm = () => {
  const { user, login,otherUserDetails, logout } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const validUser = await getUserbyUsername(username);
      console.log(validUser)
      if (validUser) {
        login(validUser.username, validUser.user_id);
        navigate("/profile")
        setUsername("");
        setError(null);
        otherUserDetails(validUser)

      }
    }  catch (err) {
      setError("Invalid username, Please try again.");
      console.error(err);
    }
  };

  return (
    <div>
      {user ? (
        <section>
          <span>
            WELCOME {user.username.toUpperCase()}
          </span>
          <button onClick={logout}> Logout
          </button>
        </section>
      ) : (
        <section className="fancy">
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Enter Username"
            name= "username"
            
          />
          <button onClick={handleLogin}>
            Login
          </button>
          {error && <p>{error}</p>}
         <Link to = "/signup"><p>Create account?</p></Link> 
        </section>
      )}
    </div>
  );
};

