import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import ProductsList from "pages/ProductsList";
import ProductDetail from "pages/ProductDetail";

export default function App() {
  return (
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
  );
}
