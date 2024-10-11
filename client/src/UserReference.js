import { useState } from "react";
import axios from 'axios'
import "./App.css";

function App() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log({username,email, password })
    try{
      const res = await axios.post('/auth/register',{
        userRavi: username,
        email,
        password
      })
      console.log(res);
      setSuccess(true);
      }catch(error){
        console.error(error);
      }
  };
  return (
    <>
      {success ? (
        <h1>You are welcome!</h1>
      ) : (
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="passoword">Password:</label>
          <input
            type="passoword"
            id="passoword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button>Submit</button>
        </form>
      )}
    </>
  );
}

export default App;
