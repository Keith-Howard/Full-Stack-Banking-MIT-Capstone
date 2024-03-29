import React from "react";
import contextExports from "./context";

function Login() {
    const [show, setShow]     = React.useState(true);
    const [status, setStatus] = React.useState('');
    
    return (
      <contextExports.CardBootstrap
        backgroundColor="#E99B53"
        header="Login"
        status={status}
        cardWidth='33vw'
        body={show ? 
          <LoginForm setShow={setShow} setStatus={setStatus}/> : 
          <h5>Successfully Logged In</h5>}
      />
    )
  }
  
  function LoginForm(props){
    const [email, setEmail]       = React.useState('');
    const [password, setPassword] = React.useState(''); 

    function handle(){
      const url = `/account/login/${email}/${password}`;
      console.log('url ' + url);
      if (email !== '' && password !== '') {
        (async () => {
          var res = await fetch(url);
          var data = await res.json();
          console.log("data " + JSON.stringify(data));
          console.log('LoginForm data ', data.balance);
          if(data.error === '') {
            const createAccount = document.getElementById("createAccount");
            createAccount.style.display = 'none';
            const login = document.getElementById("login");
            login.style.display = 'none';
            const deposit = document.getElementById("deposit");
            deposit.style.display ='inline';
            const withdraw = document.getElementById("withdraw");
            withdraw.style.display ='inline';
            const balance = document.getElementById("balance");
            balance.style.display ='inline';
            const allData = document.getElementById("allData");
            allData.style.display ='inline';
            const transHistory = document.getElementById("transHistory");
            transHistory.style.display ='inline';
            const logout = document.getElementById("logout");
            logout.style.display ='inline';
            const userName = document.getElementById("userName");
            userName.style.display ='inline'; 
            contextExports.UserContext.name = data.balance[0].name;
            userName.innerHTML = "Welcome " + contextExports.UserContext.name;
            contextExports.UserContext.email = email;
            contextExports.UserContext.password = password;
            contextExports.UserContext.balance = Number(data.balance[0].balance);
            contextExports.UserContext.userToken = data.token;
            props.setStatus('');
            props.setShow(false);
          }else{
            props.setStatus(data.error);
          }
        })();
      } else {
        props.setStatus('Invalid Email or Passwords')
      }
    }
  
    return (<div id="login-form">
  
      Email address<br/>
      <input type="input" 
        id="login-email"
        className="form-control" 
        placeholder="Enter email" 
        value={email} 
        onChange={e => setEmail(e.currentTarget.value)}/><br/>
  
      Password<br/>
      <input type="password" 
        id="login-password"
        className="form-control" 
        placeholder="Enter password" 
        value={password} 
        onChange={e => setPassword(e.currentTarget.value)}/><br/>
  
      <button type="submit" 
        className="btn btn-light" 
        onClick={handle}>Login</button>
  
    </div>);
}
export default Login;