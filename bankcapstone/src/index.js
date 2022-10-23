import contextExports from './components/context.js';
import {Routes, Route, HashRouter} from 'react-router-dom';
import ReactDOM from 'react-dom';
import Home from './components/home.js';
import Logout from './components/logout.js';
import Login from './components/login.js';
import CreateAccount from './components/createaccount.js';
import AllData from './components/alldata.js';
import Balance from './components/balance.js';
import Deposit from './components/deposit.js';
import NavBar from './components/navbar.js';
import TransHistory from './components/transHistory.js';
import Withdraw from './components/withdraw.js'

function Spa() {
  return (
    <contextExports.UserContext.Provider value={{users:[{name:'a',email:'b',password:'c',balance:100}]}}>
    <HashRouter>
      <div>
      <NavBar/>        
          <div className="container ml-2" style={{padding: "20px"}}>
            <Routes>
              <Route path="/components/CreateAccount" element={<CreateAccount />} />
              <Route path="/components/login" element={<Login />} />
              <Route path="/components/deposit" element={<Deposit />} />
              <Route path="/components/withdraw" element={<Withdraw />} />
              <Route path="/components/balance" element={<Balance />} />
              <Route path="/components/alldata" element={<AllData />} />
              <Route path="/components/transHistory" element={<TransHistory />} />
              <Route path="/components/logout" element={<Logout />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </div>
      </div>
    </HashRouter>
  </contextExports.UserContext.Provider>
  );
}

ReactDOM.render(
  <Spa/>,
  document.getElementById('root')
);
