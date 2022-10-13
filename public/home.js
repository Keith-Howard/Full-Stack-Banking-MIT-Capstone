function Home() {
    return (
        <Card
            backgroundColor="#E99B53"
            header="Home"
            status=""
            cardWidth='25rem'
            body={
                <>
                <h5 className="card-title">Welcome to your digital banking experience.</h5>
                <p className="card-text">You can move around using the navigation bar.</p>
                <img src="./bank.png" className="img-fluid" alt="Responsive"></img>
                </>
            }
        />
    )
}
