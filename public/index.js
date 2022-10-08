const Route       = ReactRouterDOM.Route;
const Link        = ReactRouterDOM.Link;
const HashRouter  = ReactRouterDOM.HashRouter;
function Spa() {
  return (
    <HashRouter>
      <div>
      <NavBar/>        
          <div className="container" style={{padding: "20px"}}>
            <Route path="/" exact component={Home} />
            <Route path="/CreateAccount/" component={CreateAccount} />
            <Route path="/login/" component={Login} />
            <Route path="/deposit/" component={Deposit} />
            <Route path="/withdraw/" component={Withdraw} />
            <Route path="/balance/" component={Balance} />
            <Route path="/alldata/" component={AllData} />
            <Route path="/logout/" component={Logout} />
          </div>
      </div>
    </HashRouter>
  );
}

ReactDOM.render(
  <UserContext.Provider value={{users:[{name:'a',email:'b',password:'c',balance:100}]}}>
  <Spa/>
  </UserContext.Provider>,
  document.getElementById('root')
);
