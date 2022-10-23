import contextExports from "./context";

function Home() {
    console.log('Home component');
    return (
        <contextExports.CardBootstrap
            backgroundColor="#E99B53"
            header="Home"
            status=""
            cardWidth='25vw'
            body={
                <>
                <h5 className="card-title">Welcome to your digital banking experience.</h5>
                <img src="bank.png" className="img-fluid" alt="Responsive"></img>
                </>
            }
        />
    )
}
export default Home;