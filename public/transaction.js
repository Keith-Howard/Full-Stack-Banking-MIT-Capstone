//var firebase = require('firebase');

function Transaction(props) {
    const loggedInCtx = React.useContext(LoginUserContext);
    const [amount, setAmount] = React.useState(0);
    const [transMessage, setTransMessage] = React.useState('');
    return (
        <Card
        bgcolor="warning"
        header={props.transType}
        status={transMessage}
        cardWidth='25rem'
        body={loggedInCtx.email === '' ? ( 
        <>
            <h2>LOGIN TO USE FEATURE</h2>
        </>
        ):(
        <>
            Amount<br/>
            <input type="number" 
                className="form-control"
                placeholder="Enter amount"
                value={amount}
                onChange={e => setAmount(e.currentTarget.value)}/><br/>
        
            <button type="submit" 
                className="btn btn-light" 
                onClick={handle}>{props.transType}</button>
        </>)}
      />
    )

    function handle() {
        let updateDb = true;
        if (isNaN(Number(amount)) || Number(amount) <= 0) {
            setTransMessage('Enter Valid Positive Number');
        } else {
            if (props.transType === 'Deposit'){
                loggedInCtx.balance = (Number(loggedInCtx.balance) + Number(amount)).toFixed(2);
                setTransMessage(`Deposited $${amount}`);
            } else {
                if (amount > loggedInCtx.balance) {
                    setTransMessage('Insufficient Funds');
                    updateDb = false;
                } else{
                    loggedInCtx.balance = (Number(loggedInCtx.balance) - Number(amount)).toFixed(2);
                    setTransMessage(`Withdrew $${amount}`);
                }
            }
            setAmount(0);
            const url = `/account/transaction/${loggedInCtx.email}/${loggedInCtx.password}/${loggedInCtx.balance}`;
            if (updateDb) {
                (async () => {
                    var res = await fetch(url)
                    //var data = await res.json();
                    //const auth  = firebase.auth();
                    /* const token = await firebase.auth().currentUser.getIdToken()
                    var res = await fetch(url, {
                        method: 'GET',
                        headers: {
                            'Authorization': token
                        }
                    }); */
                    //var data = await res.json();
                    console.log(res);
                })();
            }
        }
    }

}