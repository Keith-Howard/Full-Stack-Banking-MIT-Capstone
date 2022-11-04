import React from "react";
import contextExports from "./context";

function Logout() {
    console.log('logout component render');
    const loggedInUserString = localStorage.getItem('loggedInUser');
    let loggedInUser = JSON.parse(loggedInUserString);
    const [logStatus, setLogStatus] = React.useState({logoutStatus: false, logoutMsg: ''});
    
    async function logoutUser() {
        const response = await fetch('/account/logout',
        { method: 'GET',
        headers: {
            'Authorization': loggedInUser.userToken,
            'Content-Type': 'application/json'
        }
        });
        const data = await response.json();
        if (data.error === '') {
            localStorage.setItem('loggedInUser', JSON.stringify({}));
            const deposit = document.getElementById("deposit");
            deposit.style.display = 'none';
            const withdraw = document.getElementById("withdraw");
            withdraw.style.display = 'none';
            const balance = document.getElementById("balance");
            balance.style.display = 'none';
            const allData = document.getElementById("allData");
            allData.style.display = 'none';
            const transHistory = document.getElementById("transHistory");
            transHistory.style.display = 'none';
            const logout = document.getElementById("logout");
            logout.style.display = 'none';
            const userName = document.getElementById("userName");
            userName.style.display = 'none';
            const createAccount = document.getElementById("createAccount");
            createAccount.style.display ='inline';
            const login = document.getElementById("login");
            login.style.display ='inline';
            setLogStatus({logoutStatus: true, logoutMsg: 'Successfully Logged Out'});
        } else {
            setLogStatus({logoutStatus: false, logoutMsg: 'Logout Error ' + data.error});
        }
    }
    if (!logStatus.logoutStatus) {
        logoutUser();
    }
    return (
        <contextExports.CardBootstrap
        backgroundColor="#E99B53"
        header="Logout"
        status=''
        cardWidth='25vw'
        body={
        <>
            <h4>{logStatus.logoutMsg}</h4>
        </>
        }
    />
    );
}

export default Logout;