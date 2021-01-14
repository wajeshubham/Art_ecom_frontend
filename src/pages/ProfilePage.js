import React, { useEffect, useContext, useState } from "react";
import Axios from "axios";
import { server } from "../utils/server";
import UserContext from "../context/UserContext";
import { useHistory, Redirect, Link } from "react-router-dom";
import { Layout, Col, Row, Button, Empty } from "antd";
import "../css/profilePage.css";
import ListingCard from "../components/ListingCard";
import { FaPhone, FaEnvelope } from "react-icons/fa";
import { Spinner } from "reactstrap";
import pp from "../assets/default.png";

const ProfilePage = () => {
  const context = useContext(UserContext);
  const history = useHistory();

  const [profDetails, setProfDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState([]);
  const { Content } = Layout;

  const fetchDetails = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("user")).token;
      //headers
      await Axios({
        url: `${server}/users/profile/`,
        method: "GET",
        headers: {
          Accept: "application/json",

          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      })
        .then((res) => {
          setProfDetails(res.data.data);
          setListings(res.data.listings);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    } catch (error) {
      console.log(console.error());
    }
  };

  useEffect(() => {
    if (profDetails !== null && listings) {
      setLoading(false);
      context.setProfile(profDetails);
      localStorage.setItem("profile", JSON.stringify(context.profile));
    }
  }, [fetchDetails]);

  useEffect(() => {
    const localCreds = localStorage.getItem("user");
    if (localCreds) {
      context.setUser(JSON.parse(localCreds));
    }
    fetchDetails();

    if (JSON.parse(localStorage.getItem("user")) !== null) {
      history.push(`/myprofile`);
    }
  }, []);

  if (!context.user?.token) {
    return <Redirect to="/login" />;
  } else {
    return (
      <>
        {loading === true ? (
          <div className="Center">
            <Spinner color="primary" />
            <div className="text-primary">Loading...</div>
          </div>
        ) : profDetails !== undefined &&
          profDetails !== null &&
          profDetails !== "profile details are incomplete" ? (
          <>
            <Layout
              style={{ padding: "0 24px 0", margin: "3rem", marginTop: 0 }}
              className="profile-card"
            >
              <Content
                className="site-layout-background"
                style={{
                  padding: 24,
                  margin: 0,
                  marginTop: "2rem",
                  minHeight: 280,
                }}
              >
                <Row className="profile-row">
                  <Col md={5} className="pt-4">
                    <img
                      alt="dp"
                      height="200"
                      width="200"
                      className="cardImg profile "
                      src={
                        profDetails.profile_pic ? profDetails.profile_pic : pp
                      }
                    />
                  </Col>
                  <Col md={15} className="prof-details">
                    <h1 className="mb-4 username">
                      @{profDetails.user.user_model}
                    </h1>

                    <h4
                      className="phone text-black-50 name"
                      style={{ fontWeight: 100 }}
                    >
                      {profDetails.user.first_name} {profDetails.user.last_name}
                    </h4>
                    <p className="bio mt-0">{profDetails.bio}</p>
                    {profDetails.phone_no ? (
                      <h6 className="mt-0 text-secondary phno-pro">
                        <FaPhone
                          className="mb-1 mr-2"
                          style={{ height: "10px", width: "10px" }}
                        />
                        {profDetails.phone_no}
                      </h6>
                    ) : null}
                    <a
                      className="email mr-3"
                      style={{ textDecoration: "none" }}
                      href={`mailto:{response.email}`}
                    >
                      <FaEnvelope className="icon mb-1 mr-2" />
                      {profDetails.user.email}
                    </a>
                    <Link to={`/myprofile/edit`}>
                      <Button className="edit-btn" type="primary mt-4">
                        Edit Profile
                      </Button>
                    </Link>
                  </Col>
                </Row>
              </Content>
            </Layout>
            {profDetails.user.isAdmin ? (
              <Layout
                className="list-layout"
                style={{ padding: "0 24px 24px", margin: "3rem", marginTop: 0 }}
              >
                <h2 className="profile-list-head">Manage Your Listings Here</h2>
                <Content
                  className="site-layout-background prof-lst-cnt"
                  style={{
                    padding: 24,
                    margin: 0,
                    // marginTop: "2rem",

                    minHeight: 280,
                  }}
                >
                  <Row className="item-row">
                    <Col md={24} className="listing-col">
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
                          isInProfile={true}
                          listings={listings}
                          setListings={setListings}
                          isInStock={listing.isInStock}
                        />
                      ))}
                    </Col>
                  </Row>
                </Content>
              </Layout>
            ) : null}
          </>
        ) : (
          <Empty
            style={{ marginTop: "25vh" }}
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            imageStyle={{
              height: 60,
            }}
            description={
              <span>
                Hey <span className="text-dark">{context.user?.username}</span>{" "}
                Your profile is incomplete
              </span>
            }
          >
            <Button type="primary" href="/create/proflie">
              Create Profile
            </Button>
          </Empty>
        )}
        ;
      </>
    );
  }
};

export default ProfilePage;
