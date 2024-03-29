import React from 'react';
import contextExports from './context';

function Transaction(props) {
    const [amount, setAmount] = React.useState('');
    const [transMessage, setTransMessage] = React.useState('');
    return (
        <contextExports.CardBootstrap
        backgroundColor="#E99B53"
        header={props.transType}
        status={transMessage}
        cardWidth='25vw'
        body={contextExports.UserContext.email === '' ? ( 
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
        let intLoggedInBalance = Number(contextExports.UserContext.balance);
        let updateDb = true;
        if (isNaN(amount) || Number(amount) < .01) {
            setTransMessage('Enter Number Greater or Equal to .01');
            updateDb = false;
        } else {
            let numericAmount = Number(amount);
            if ((numericAmount - Math.floor(numericAmount) !== 0)){
                let decimalPlaces = amount.split('.');
                if (decimalPlaces[1].length > 2) {
                    setTransMessage("Only 2 decimal places allowed.");
                    return
                }
            }
        }
        const maxTransAmount = 100000;
            if (Number(amount) > maxTransAmount) {
                setTransMessage(`Visit Branch for Transactions over $${maxTransAmount}`);
                return
            }
        if (props.transType === 'Withdraw') {
            if (Number(amount) > intLoggedInBalance) {
                setTransMessage('Insufficient Funds');
                updateDb = false;
            }
        }
        setAmount(0);
        if (updateDb) {
            let intAmount = Number(amount);
            let newBalance;
            if (props.transType === 'Deposit'){
                newBalance = (intLoggedInBalance + intAmount).toFixed(2);
            } else {
                newBalance = (intLoggedInBalance - intAmount).toFixed(2);
            }
            const d = new Date()
            let month = d.getMonth() + 1;
            let day = d.getDate();
            let year = d.getFullYear();
            let date = `${month}-${day}-${year}`;
            const url = `/account/transaction/${contextExports.UserContext.email}/${String(amount)}/${props.transType}/${date}/${String(newBalance)}`;
            (async () => {
                var res = await fetch(url,
                    { method: 'GET',
                    headers: {
                        'Authorization': contextExports.UserContext.userToken,
                        'Content-Type': 'application/json'
                    }});
                var data  =  await res.json();
                console.log('Transaction component data ' + JSON.stringify(data));
                if (data.status === "success") {
                    if (props.transType === 'Deposit') {
                        setTransMessage(`Deposited $${amount}`);
                    } else {
                        setTransMessage(`Withdrew $${amount}`);
                    }
                    contextExports.UserContext.balance = newBalance;
                } else {
                    setTransMessage(data.status);
                }
            })();
        }
    }
}
export default Transaction;