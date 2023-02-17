import React from "react";
import contextExports from "./context";


function AllData() {
    const [data, setData] = React.useState({exists: false, tableData: {}});

    async function getAllData() {
        const response = await fetch(`/account/all/${contextExports.UserContext.email}/${contextExports.UserContext.password}`,
        { method: 'GET',
            headers: {
                'Authorization': contextExports.UserContext.userToken,
                'Content-Type': 'application/json'
            }
        });
        const allData = await response.json();
        return allData;
    }

    getAllData().then(user => {
        if (user.length > 0) {
            setData({exists:true, tableData: {name: user[0].name, email: user[0].email, password: user[0].password, balance: user[0].balance}});
        }
    })
    
    return (
        <contextExports.CardBootstrap
            backgroundColor="#E99B53"
            header="All Data"
            status=""
            cardWidth='50rem'
            body={contextExports.UserContext.email === '' ? (
                <>
                    <h2>LOGIN TO USE FEATURE</h2>
                </>
            ):(
                <>
                    <table className='table'>
                        {!data.exists ? (<></>):
                        (<tbody className="table-light">
                        <tr>
                            <td scope="col">Name</td><td>{data.tableData.name}</td>
                        </tr>
                        <tr>
                            <td scope="col">Email</td><td>{data.tableData.email}</td>
                        </tr>
                        <tr>
                            <td scope="col">Password</td><td>{data.tableData.password}</td>
                        </tr>
                        <tr>
                            <td scope="col">Balance</td><td>{data.tableData.balance}</td>
                        </tr>
                        </tbody>)}
                    </table>
                </>
            )}
        />
    )
}
export default AllData;