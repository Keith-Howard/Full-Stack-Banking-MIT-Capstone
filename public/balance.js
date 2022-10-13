function Balance() {
    const loginIndexCtx = React.useContext(LoginUserContext);
    return (
        <Card
            backgroundColor="#E99B53"
            header="Balance"
            status=""
            cardWidth='25rem'
            body={loginIndexCtx.email === '' ? ( 
                <>
                    <h2>LOGIN TO USE FEATURE</h2>
                </>
            ):(
                <>
                    <h3>Available Balance</h3><br/>
                    <h3>${Number(loginIndexCtx.balance).toFixed(2)}</h3>
                </>
            )}
        />
    )
}