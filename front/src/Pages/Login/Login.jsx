import axios from "axios";
import React, { useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Login.css";
var CryptoJS = require("crypto-js");
const Login = () => {
  const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const submitForm = async (e) => {
      e.preventDefault();
      const pass_hashed=CryptoJS.SHA256(pass).toString();
      const payload={
        email,
        pass_hashed,
      };
      try{
        const res=await axios.post("http://localhost:5000/add",payload);
        if (res.data.success) {
          toast.success(res.data.message);
          await new Promise(resolve => setTimeout(resolve, 5000));//wait
          console.log('OK');
          setEmail('');
          setPass('');
          window.location.reload();
        }else{
          console.log('KO');
          toast.error(res.data.message);
        }
      }catch(error){
        console.log(error);
      }
    };
  return (
    <div className="bg">
      <form>
        <div className="left-bar">
          <div>
            <h2>LOGIN</h2>
            <p>
              Get started with our app, just create an account and enjoy the
              experience.
            </p>
          </div>
          {/* <p>Get started with our app, just create an account and enjoy the experience.</p> */}
          <div className="inputs">
            <input type="mail"  onChange={(elname)=>setEmail(elname.target.value)}/>
            <span className="mail">Email</span>
          </div>
          <div className="inputs">
            <input type="password"  onChange={(elname)=>setPass(elname.target.value)} />
            <span className="user">Password</span>
          </div>

          <button className="enter" onClick={submitForm}> enter </button>
        </div>
        <div className="right-bar">
          <div className="imgs">
            <img src="images/crypto.png" alt="" />
          </div>
          <div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Est
              veniam ipsam totam distinctio, quod iure possimus iusto aut modi
              sunt nesciunt sed quos. Consequuntur veritatis odio
              exercitationem, laboriosam aut id.
            </p>
          </div>
          <button className="enter"> Sign Up </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
