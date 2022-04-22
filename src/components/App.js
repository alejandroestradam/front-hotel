import Login from "./routes-components/Login";
import Navbar from "./routes-components/Navbar";
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from "./routes-components/Home";
import Signup from "./routes-components/Signup";
import Notfound from "./routes-components/Notfound";
import React from "react";

function App() {

  return (
    <div className="App">
      <Router>
          <Navbar/>
          <Switch>
              <Route path="/login">
                <Login/>
              </Route>
              <Route path="/signup">
                <Signup/>
              </Route>
              <Route path ="/home">
                <Home/>
              </Route>
              <Route path="*">
                <Notfound/>
              </Route>
          </Switch>
      </Router>
    </div>
  );
}

export default App;
