import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Admin from "./pages/Admin";
import Counter from "./pages/Counter";
import CourtPage from "./pages/CourtPage";
import HallPage from "./pages/HallPage";
import Login from "./pages/Login";
import "./pages/home.css";
import Images from "./pages/Images";
const App = () => {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/studio" component={Images} />
          <Route path="/admin" component={Admin} />
          <Route path="/login" component={Login} />
          <Route path="/hall/:id" component={HallPage} />
          <Route path="/court/:id" component={CourtPage} />
          <Route path="/counter/:id" component={Counter} />
          <Route
            path="/mobile/hall/:id"
            render={(props) => <HallPage {...props} mobile={true} />}
          />
          <Route
            path="/mobile/court/:id"
            render={(props) => <CourtPage {...props} mobile={true} />}
          />
          <Route
            path="/mobile/counter/:id"
            render={(props) => <Counter {...props} mobile={true} />}
          />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
