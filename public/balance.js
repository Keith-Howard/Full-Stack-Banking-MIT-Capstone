function Balance() {
    const loginIndexCtx = React.useContext(LoginUserContext);
    return (
        <Card
            bgcolor="info"
            header="Balance"
            status=""
            cardWidth='25rem'
            body={loginIndexCtx.email === '' ? ( 
                <>
                    <h2>LOGIN TO USE FEATURE</h2>
                </>
            ):(
                <>
                    {loginIndexCtx.balance}
                </>
            )}
        />
    )
}