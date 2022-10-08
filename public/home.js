function Home() {
    return (
        <Card
            bgcolor="info"
            header="Welcome to BadBank"
            status=""
            cardWidth='25rem'
            body={
                <>
                <h5 className="card-title">Welcome to BadBank</h5>
                <p className="card-text">You can move around using the navigation bar.</p>
                <img src="./bank.png" className="img-fluid" alt="Responsive"></img>
                </>
            }
        />
    )
}
