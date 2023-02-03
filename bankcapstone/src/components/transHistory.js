import React from 'react';
import contextExports from './context';

function TransHistory() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const [data, setData] = React.useState({exists: false, tableData:''});
    const [filter, setFilter] = React.useState('Filter')


    async function getTransData(){
        const response = await fetch(`/account/alltransactions/${JSON.parse(loggedInUser).email}`,
        { method: 'GET',
            headers: {
                'Authorization': loggedInUser.userToken,
                'Content-Type': 'application/json'
            }
        });
        const allTrans = await response.json();
        let tableString = "";
        if (allTrans !== '') {
            let transData;
            if (filter === 'Withdrawals'){
                transData = allTrans.filter(trans => trans.transType === "Withdraw");
            }else if (filter === 'Deposits'){
                transData = allTrans.filter(trans => trans.transType === "Deposit");
            } else {
                transData = allTrans;
            }
            for (const user of transData) {
                tableString = tableString + 
                `<tr>
                    <td>${user.date}</td>
                    <td>${user.transType}</td>
                    <td>${Number(user.amount).toFixed(2)}</td>
                </tr>`
            }
        };
        setData({exists: true, tableData: tableString});
    }

    if (!data.exists) {
        getTransData();
    }
    
    return (
        <contextExports.CardBootstrap
            backgroundColor="#E99B53"
            header="Transaction History"
            status=""
            cardWidth='50rem'
            body={JSON.parse(loggedInUser).email === '' ? (
                <>
                    <h2>LOGIN TO USE FEATURE</h2>
                </>
            ):(
                <>
                <div className="dropdown">
                    <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {filter}
                    </button>
                    <div className="dropdown-menu btn-secondary" aria-labelledby="dropdownMenu2">
                        <button className="dropdown-item" onClick={()=>{
                            setFilter('All');
                            setData({exists: false, tableData:''});
                            }} type="button">All</button>
                        <button className="dropdown-item" onClick={()=>{
                            setFilter('Deposits');
                            setData({exists: false, tableData:''});
                            }} type="button">Deposits</button>
                        <button className="dropdown-item" onClick={()=>{
                            setFilter('Withdrawals');
                            setData({exists: false, tableData:''});
                            }} type="button">Withdrawels</button>
                    </div>
                </div>
                    <table className='table'>
                        <thead className="thead-light">
                            <tr>
                                <th scope="col">Date</th>
                                <th scope="col">Type</th>
                                <th scope="col">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="table-light">
                        {window.HTMLReactParser(data.tableData)}
                        </tbody>
                    </table>
                </>
            )}
        />
    )
}
export default TransHistory;