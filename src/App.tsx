import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Admin from "./pages/Admin";
import Counter from "./pages/Counter";
import CourtPage from "./pages/CourtPage";
import HallPage from "./pages/HallPage";
import Login from "./pages/Login";
import Home from "./pages/Home";
import "./pages/home.css";
import Images from "./pages/Images";
import { useQuery } from "@apollo/client";
import { GET_SETTINGS } from "./GraphQueiries";

const App = () => {
  const { data } = useQuery(GET_SETTINGS);
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/studio" component={Images} />
          <Route path="/admin" component={Admin} />
          <Route path="/login" component={Login} />
          <Route
            path="/hall/:id"
            render={(props) => (
              <HallPage {...props} settings={data?.settings} />
            )}
          />
          <Route
            path="/court/:id"
            render={(props) => (
              <CourtPage {...props} settings={data?.settings} />
            )}
          />
          <Route path="/counter/:id" component={Counter} />
          <Route
            path="/mobile/hall/:id"
            render={(props) => (
              <HallPage {...props} mobile={true} settings={data?.settings} />
            )}
          />
          <Route
            path="/mobile/court/:id"
            render={(props) => (
              <CourtPage {...props} mobile={true} settings={data?.settings} />
            )}
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
