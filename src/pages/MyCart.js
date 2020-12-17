import React, { useEffect, useContext, useState } from "react";
import UserContext from "../context/UserContext";
import { useHistory, Redirect, Link } from "react-router-dom";
import Axios from "axios";
import { server } from "../utils/server";
import { Spinner, Row, Col, Container } from "reactstrap";
import { Layout, Empty } from "antd";
import ListingCard from "../components/ListingCard";
import {
  FaExclamationCircle,
  FaExclamationTriangle,
  FaHouseDamage,
  FaThermometerEmpty,
} from "react-icons/fa";

function MyCart() {
  const [userCart, setUserCart] = useState([]);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(true);
  const { Content } = Layout;
  const [total, setTotal] = useState(0);
  const [isPlaced, setIsPlaced] = useState(false);

  const context = useContext(UserContext);
  const history = useHistory();

  const handelPaymentSuccess = async (response) => {
    try {
      const token = JSON.parse(localStorage.getItem("user")).token;
      let bodyData = new FormData();
      bodyData.append("response", JSON.stringify(response));
      bodyData.append("listings", JSON.stringify(userCart));

      //headers
      await Axios({
        url: `${server}/listings/payment/success/`,
        method: "POST",
        data: bodyData,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      })
        .then((res) => {
          if (res.data.message) {
            setUserCart([]);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(console.error());
    }
  };

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  const showRazorpay = async () => {
    setIsPlaced(true);
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    let bodyData = new FormData();
    let token = JSON.parse(localStorage.getItem("user")).token;

    bodyData.append("amount", total.toString());
    bodyData.append("address", context.user?.profile.address);
    bodyData.append("listings", JSON.stringify(userCart));

    const data = await Axios({
      url: `${server}/listings/pay/`,
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      data: bodyData,
    }).then((res) => res);

    var options = {
      key_id: `${process.env.REACT_APP_TEST_PUBLIC_KEY}`,
      key_secret: `${process.env.REACT_APP_TEST_SECRET_KEY}`,
      amount: data.data.payment.amount,
      currency: "INR",
      name: "SketchIt",
      description: "Pay securely",
      image: "https://cdn.razorpay.com/logos/G14lg8DydAc4b0_original.jpg",
      order_id: data.data.payment.id,
      handler: function (response) {
        handelPaymentSuccess(response);
      },
      prefill: {
        name:
          data.data.order_data.user.user.first_name +
          data.data.order_data.user.user.last_name,
        email: data.data.order_data.user.user.email,
        contact: data.data.order_data.user.phone_no,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

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
          setAddress(res.data.data.address);
          setPhone(res.data.data.phone_no);
          setUserCart(res.data.data.user.mycart);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    } catch (error) {
      console.log(console.error());
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (userCart) {
        setLoading(false);
      }
    }, 5000);
  }, [fetchDetails]);

  useEffect(() => {
    let total = 0;
    userCart.map((item) => {
      total += item.price;
      setTotal(total);
    });
  }, [userCart]);

  useEffect(() => {
    const localCreds = localStorage.getItem("user");
    if (localCreds) {
      context.setUser(JSON.parse(localCreds));
    }
    fetchDetails();
    if (JSON.parse(localStorage.getItem("user")) !== null) {
      history.push(`/mycart`);
    }
  }, []);

  if (!context.user?.token) {
    return <Redirect to="/login" />;
  } else {
    return (
      <div>
        {loading === true ? (
          <div className="Center">
            <Spinner color="primary" />
            <div className="text-primary">Loading...</div>
          </div>
        ) : (
          <>
            {userCart.length === 0 ? (
              <div
                style={{
                  display: "flex",
                  marginTop: "35vh",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <FaExclamationCircle className="mb-4" size="3em" color="red" />
                Your Cart is empty!
              </div>
            ) : (
              <Row style={{ margin: "0" }}>
                <Col className="cart-item-col" md={7}>
                  <Container fluid className="cart-cont">
                    <Layout
                      className="list-layout"
                      style={{
                        padding: "0 24px 24px",

                        margin: "3rem",
                        marginTop: 0,
                      }}
                    >
                      <h2 className="profile-list-head">My Cart</h2>
                      <Content
                        className="site-layout-background prof-lst-cnt"
                        style={{
                          paddingLeft: "4rem",
                          borderRadius: "10px",
                          paddingBottom: "1.3rem",

                          margin: 0,

                          minHeight: 280,
                        }}
                      >
                        <Row className="item-row">
                          <Col md={24} className="listing-col">
                            {userCart.map((item) => (
                              <ListingCard
                                className="child"
                                dis={item.description}
                                price={item.price}
                                title={item.title}
                                image={item.image}
                                date={item.date}
                                city={item.city}
                                state={item.state}
                                id={item.id}
                                inCart={true}
                                cart={userCart}
                                setCart={setUserCart}
                                isInCart={true}
                                isInStock={item.isInStock}
                              />
                            ))}
                          </Col>
                        </Row>
                      </Content>
                    </Layout>
                  </Container>
                </Col>
                <Col>
                  <Layout
                    className="price-layout"
                    style={{
                      padding: "0 0 0",
                      margin: "0rem",
                      marginTop: 0,
                    }}
                  >
                    <h2 className="profile-list-head">Details</h2>
                    <Content
                      className="site-layout-background"
                      style={{
                        padding: 24,
                        margin: 0,
                        borderRadius: "10px",

                        minHeight: 70,
                      }}
                    >
                      {userCart.map((item) => (
                        <>
                          <Row className="mb-1 mini-listing">
                            <Col>
                              <h5
                                className="price-title"
                                style={{ marginBottom: "0" }}
                              >
                                {item.title}
                              </h5>
                              <p
                                className="price-loc"
                                style={{ fontSize: "10px" }}
                              >
                                {item.city}, {item.state}
                              </p>
                            </Col>
                            <Col>
                              <p style={{ float: "right" }}>₹ {item.price}</p>
                            </Col>
                          </Row>
                          <hr className="m-0 mb-3 p-0"></hr>
                        </>
                      ))}
                      <Row className="mb-1 mini-listing">
                        <Col>
                          <h5 style={{ marginBottom: "0" }}>Total</h5>
                        </Col>
                        <Col>
                          <p style={{ float: "right" }}>₹ {total}</p>
                        </Col>
                      </Row>
                      {address !== "" && phone !== "" ? (
                        <button
                          className="btn btn-primary btn-block"
                          style={{ overflow: "hidden" }}
                          target="_blank"
                          onClick={showRazorpay}
                          disabled={isPlaced}
                        >
                          <span style={{ color: "white" }} id="rzp-button1">
                            Place an Order
                          </span>
                        </button>
                      ) : (
                        <>
                          <button
                            className="btn btn-secondary btn-block"
                            style={{ overflow: "hidden" }}
                            target="_blank"
                            disabled={isPlaced}
                          >
                            <Link to="/myprofile/edit">
                              <span style={{ color: "white" }} id="rzp-button1">
                                Please complete your profile
                              </span>
                            </Link>
                          </button>
                          <span style={{ fontSize: "10px", float: "right" }}>
                            *We need your address and phone number.
                          </span>
                        </>
                      )}
                    </Content>
                  </Layout>
                </Col>
              </Row>
            )}
          </>
        )}
      </div>
    );
  }
}

export default MyCart;
