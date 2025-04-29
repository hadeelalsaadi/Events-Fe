import { useState } from "react"
import { addUser } from "../api";
import { redirect } from "react-router";

export const SignUp =()=>{
    const [signUpDetails, setSignUpDetails]=useState({
        username: "",
        name: "",
        email: "",
        password:"",
        user_role:"",
        avatar: "",
        registeredat: new Date().toISOString()
    })

    const handleChange = (event) => {
        setSignUpDetails({ ...signUpDetails, [event.target.name]: event.target.value });
      };
      const handleSubmit = (event) => {
        event.preventDefault();
        addUser(signUpDetails)
          .then(() => {
            alert("Account Created Successfully! Please Login >.<");
            redirect("/login");
          })
          .catch((error) => {
            console.error(error);
            alert("Failed to create account. Please try again.");
          });
      };




    return (
        <section >
          <div>
            
            <form onSubmit={handleSubmit} >
            <h2 className="signup">
              SIGN UP
              </h2>
                <h3>Enter your details and press create acount button, please: </h3>
               
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={signUpDetails.username}
                onChange={handleChange}
                
                required
              />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={signUpDetails.name}
                onChange={handleChange}
                
                required
              />
    
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={signUpDetails.email}
                onChange={handleChange}
                
                required
              />
                <input
                type="password"
                name="password"
                placeholder="password"
                value={signUpDetails.password}
                onChange={handleChange}
                
                required
              />
               <input
                type="user_role"
                name="user_role"
                placeholder="Are you a member or admin"
                value={signUpDetails.user_role}
                onChange={handleChange}
                
                required
              />
              <input
                type="url"
                name="avatar"
                placeholder="Avatar URL"
                value={signUpDetails.avatar}
                onChange={handleChange}
                
              />
              <button type="submit" >
                Create Account
              </button>
            </form>
          </div>
        </section>
      );
}



