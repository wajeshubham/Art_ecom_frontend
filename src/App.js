import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

import "antd/dist/antd.css";
import "./App.css";

import MyNavbar from "./layouts/header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignIn from "./pages/signin";
import PageNotFound from "./pages/PageNotFound";
import Home from "./pages/home";
import SignUp from "./pages/signup";
import UserContext from "./context/UserContext";
import CreateListing from "./pages/CreateListing";
import ListingDetails from "./pages/ListingDetails";
import ProfilePage from "./pages/ProfilePage";
import CreateProfile from "./pages/CreateProfile";
import MyCart from "./pages/MyCart";
import UpdateListing from "./pages/UpdateListing";
import MyOrders from "./pages/MyOrders";
import LandingPage from "./pages/LandingPage";

// TODO:learn about context api

const App = () => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  return (
    // <div className="App">
    <Router>
      <UserContext.Provider value={{ user, setUser, profile, setProfile }}>
        <MyNavbar />
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/login" component={SignIn} />
          <Route exact path="/register" component={SignUp} />
          <Route exact path="/add-listing" component={CreateListing} />
          <Route exact path="/listing/:id" component={ListingDetails} />
          <Route exact path="/myprofile" component={ProfilePage} />
          <Route exact path="/myprofile/edit" component={CreateProfile} />
          <Route exact path="/listing/:id/edit" component={UpdateListing} />
          <Route exact path="/mycart" component={MyCart} />
          <Route exact path="/myorders" component={MyOrders} />

          <Route path="*" component={PageNotFound} />
        </Switch>
      </UserContext.Provider>
    </Router>
    // </div>
  );
};

export default App;
