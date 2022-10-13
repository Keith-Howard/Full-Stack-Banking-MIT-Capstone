function Login() {
    const [show, setShow]     = React.useState(true);
    const [status, setStatus] = React.useState('');
    
    return (
      <Card
        backgroundColor="#E99B53"
        header="Login"
        status={status}
        cardWidth='25rem'
        body={show ? 
          <LoginForm setShow={setShow} setStatus={setStatus}/> : 
          <h5>Successfully Logged In</h5>}
      />
    )
  }
  
  function LoginForm(props){
    const [email, setEmail]       = React.useState('');
    const [password, setPassword] = React.useState('');
    const loggedInCtx = React.useContext(LoginUserContext); 

    function handle(){
      const url = `/account/login/${email}/${password}`;
      if (email !== '' && password !== '') {
        (async () => {
          var res = await fetch(url);
          var data = await res.json();
          console.log(data);
          if(data.error === '') {
            const createAccount = document.getElementById("createAccount");
            createAccount.style.visibility = 'hidden';
            const login = document.getElementById("login");
            login.style.visibility = 'hidden';
            const deposit = document.getElementById("deposit");
            deposit.style.visibility = 'visible';
            const withdraw = document.getElementById("withdraw");
            withdraw.style.visibility = 'visible';
            const balance = document.getElementById("balance");
            balance.style.visibility = 'visible';
            const allData = document.getElementById("allData");
            allData.style.visibility = 'visible';
            const logout = document.getElementById("logout");
            logout.style.visibility = 'visible';
            const userName = document.getElementById("userName");
            userName.style.visibility = 'visible'; 
            loggedInCtx.name = data.balance[0].name;
            userName.innerHTML = "Welcome " + loggedInCtx.name;
            loggedInCtx.email = email;
            loggedInCtx.password = password;
            loggedInCtx.balance = Number(data.balance[0].balance);
            loggedInCtx.userToken = data.token;
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