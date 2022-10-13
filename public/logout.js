function Logout() {
    const loginIndexCtx = React.useContext(LoginUserContext);
    const [show, setShow] = React.useState(false);
    const [logoutMsg, setLogoutMsg] = React.useState('')
    console.log('logout page')
    return (
        <Card
        backgroundColor="#E99B53"
        header="Logout"
        status=''
        cardWidth='25rem'
        body={show ? (
          <h5>{logoutMsg}</h5>
        ):(
            <>
            {<LogoutForm setShow={setShow} setLogoutMsg={setLogoutMsg}/>}
            </>
        )}
    />);
    
    function LogoutForm(props) {
        async function logOut() {
            var res = await fetch('/account/logout');
            var data = await res.json();
            if (data.error === '') {
              loginIndexCtx.name = '';
              loginIndexCtx.email = '';
              loginIndexCtx.password = '';
              loginIndexCtx.balance = 0;
              const deposit = document.getElementById("deposit");
              deposit.style.visibility = 'hidden';
              const withdraw = document.getElementById("withdraw");
              withdraw.style.visibility = 'hidden';
              const balance = document.getElementById("balance");
              balance.style.visibility = 'hidden';
              const allData = document.getElementById("allData");
              allData.style.visibility = 'hidden';
              const logout = document.getElementById("logout");
              logout.style.visibility = 'hidden';
              const userName = document.getElementById("userName");
              userName.style.visibility = 'hidden';
              const createAccount = document.getElementById("createAccount");
              createAccount.style.visibility = 'visible';
              const login = document.getElementById("login");
              login.style.visibility = 'visible';
              props.setShow(true);
              props.setLogoutMsg('Successfully Logged Out');
            } else {
                props.setShow(true);
                props.setLogoutMsg('Logout Error ' + data.error);
            }
          }

        return (
            <button type="submit" 
            className="btn btn-light" 
            onClick={logOut}>Logout</button>
        )
    }
    
}
