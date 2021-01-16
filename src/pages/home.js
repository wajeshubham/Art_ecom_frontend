import React, { useState, useContext, useEffect } from "react";
import Axios from "axios";

import { Spinner } from "reactstrap";
import { server } from "../utils/server";
import "../css/ListingCard.css";

import { Redirect } from "react-router-dom";
import UserContext from "../context/UserContext";
import ListingCard from "../components/ListingCard";
import { Layout } from "antd";

const { Content } = Layout;

function Home() {
  const context = useContext(UserContext);

  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDetails = async () => {
    const token = context.user?.token;
    //headers
    await Axios({
      url: `${server}/listings/`,
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // Authorization: `Token ${token}`,
      },
    })
      .then((res) => {
        setListings(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  useEffect(() => {
    if (listings.length !== 0) {
      setLoading(false);
    }
  }, [fetchDetails]);

  useEffect(() => {
    const localCreds = localStorage.getItem("user");
    if (localCreds) {
      context.setUser(JSON.parse(localCreds));
    }
    fetchDetails();
  }, []);

  // if (!context.user?.token) {
  //   return <Redirect to="/login" />;
  // } else {
  return (
    <div>
      {loading === true ? (
        <div className="Center">
          <Spinner color="primary" />
          <div className="text-primary">Loading...</div>
        </div>
      ) : (
        <Layout style={{ padding: "0 24px 24px", margin: "3rem" }}>
          <Content
            className="site-layout-background home-cnt"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <div className="parent">
              {listings.map((listing) => (
                <ListingCard
                  className="child"
                  dis={listing.description}
                  price={listing.price}
                  title={listing.title}
                  image={listing.image}
                  date={listing.date}
                  city={listing.city}
                  state={listing.state}
                  id={listing.id}
                  listingUser={listing.user}
                  activeUser={context.user?.username}
                  isInProfile={false}
                  listings={listings}
                  setListings={setListings}
                  isInStock={listing.isInStock}
                  likedUsersList={listing.liked_users}
                  likesCount={listing.likes}
                  isLoggedIn={context.user?.token}
                />
              ))}
            </div>
          </Content>
        </Layout>
      )}
    </div>
  );
  // }
}

export default Home;
