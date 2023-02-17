import contextExports from "./context";

function Balance() {
    return (
        <contextExports.CardBootstrap
            backgroundColor="#E99B53"
            header="Balance"
            status=""
            cardWidth='25vw'
            body={contextExports.UserContext.email === '' ? ( 
                <>
                    <h2>LOGIN TO USE FEATURE</h2>
                </>
            ):(
                <>
                    <h3>Available Balance</h3><br/>
                    <h3>${Number(contextExports.UserContext.balance).toFixed(2)}</h3>
                </>
            )}
        />
    )
}
export default Balance;