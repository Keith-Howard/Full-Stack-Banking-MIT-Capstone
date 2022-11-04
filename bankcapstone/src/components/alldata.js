import React from "react";
import contextExports from "./context";

function AllData() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const [data, setData] = React.useState({exists: false, tableData:''});

    async function getAllData() {
        const response = await fetch(`/account/all/${JSON.parse(loggedInUser).email}/${JSON.parse(loggedInUser).password}`,
        { method: 'GET',
            headers: {
                'Authorization': loggedInUser.userToken,
                'Content-Type': 'application/json'
            }
        });
        const allData = await response.json();
        let dataString = '';
        if (allData !== '') {
            for (const user of allData) {
                dataString = dataString + 
                `<tr>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>${user.password}</td>
                    <td>${user.balance}</td>
                </tr>`
            }
        };
        setData({exists:true, tableData: dataString});
    }
    if (!data.exists) {
        getAllData();
    }  
    return (
        <contextExports.CardBootstrap
            backgroundColor="#E99B53"
            header="All Data"
            status=""
            cardWidth='50rem'
            body={JSON.parse(loggedInUser).email === '' ? (
                <>
                    <h2>LOGIN TO USE FEATURE</h2>
                </>
            ):(
                <>
                    <table className='table'>
                        <thead className="thead-light">
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Password</th>
                                <th scope="col">Balance</th>
                            </tr>
                        </thead>
                        {!data.exists ? (<></>):
                        (<tbody className="table-light">
                            {window.HTMLReactParser(data.tableData)}
                        </tbody>)}
                    </table>
                </>
            )}
        />
    )
}
export default AllData;