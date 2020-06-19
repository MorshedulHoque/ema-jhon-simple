import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Review from './components/Review/Review';
import Manage from './components/Manage/Manage';
import Notfound from './components/Notfound/Notfound'
import ProductDetail from './components/ProductDetail/ProductDetail';
import Login from './components/Login/Login';
import { createContext } from 'react';
import { AuthContexProvider, PrivateRoute } from './components/Login/useAuth';
import Shipment from './components/Shipment/Shipment';





function App(props) {
  return (
    <div>
      <AuthContexProvider>
        <Header></Header>
        <Router>
          <Switch>
            <Route path="/shop">
              <Shop></Shop>
            </Route>
            <Route path="/review">
              <Review></Review>
            </Route>
            <Route path="/manage">
              <Manage></Manage>
            </Route>
            <Route exact path="/">
              <Shop></Shop>
            </Route>
            <Route path="/login">
              <Login></Login>
            </Route>
            <Route path="/product/:productKey">
              <ProductDetail></ProductDetail>
            </Route>
            <PrivateRoute path="/shipment">
              <Shipment></Shipment>
            </PrivateRoute>
            <Route path="*">
              <Notfound></Notfound>
            </Route>
          </Switch>
        </Router>
        
        </AuthContexProvider>  
    </div>
  );
}

export default App;
