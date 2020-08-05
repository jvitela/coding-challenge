import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import ProductsList from "pages/ProductsList";
import ProductDetail from "pages/ProductDetail";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/:pid">
          <ProductDetail />
        </Route>
        <Route exact path="/">
          <ProductsList />
        </Route>
        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>
    </Router>
  );
}
