import React, { useEffect, useContext, useState } from "react";
import "../css/MyOrders.css";
import UserContext from "../context/UserContext";
import { useHistory, Redirect } from "react-router-dom";
import Axios from "axios";
import { server } from "../utils/server";
import { Spinner, Row, Col } from "reactstrap";
import { Layout, Empty } from "antd";
import { FaExclamationCircle } from "react-icons/fa";

function MyOrders() {
  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);
  const { Content } = Layout;

  const context = useContext(UserContext);
  const history = useHistory();

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
          setOrders(res.data.data.user.my_orders);
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
      if (orders) {
        setLoading(false);
      }
    }, 5000);
  }, [orders]);

  useEffect(() => {
    const localCreds = localStorage.getItem("user");
    if (localCreds) {
      context.setUser(JSON.parse(localCreds));
    }
    fetchDetails();
    if (JSON.parse(localStorage.getItem("user")) !== null) {
      history.push(`/myorders`);
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
            <div className="text-primary">Loading please wait...</div>
          </div>
        ) : (
          <>
            {orders.length === 0 ? (
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
                You haven't placed any order!
              </div>
            ) : (
              <>
                <h2 className="profile-list-head ml-5">Your orders</h2>
                <Layout
                  className="price-layout-header mx-5"
                  style={{
                    padding: "0 0 0",
                    margin: "0rem",
                    marginTop: 0,
                  }}
                >
                  <Content
                    className="site-layout-background"
                    style={{
                      padding: 10,
                      paddingBottom: 0,
                      margin: 0,
                      borderRadius: "0px",
                      minHeight: 20,
                    }}
                  >
                    <Col>
                      <Row>
                        <Col md={4}>
                          <p
                            style={{
                              marginBottom: "0",
                              paddingLeft: "14.7rem",
                            }}
                          >
                            Item title
                          </p>
                        </Col>
                        <Col className="pb-0" md={4}>
                          <p className="pr-3" style={{ float: "right" }}>
                            Payment id
                          </p>
                        </Col>
                        <Col className="pb-0" md={2}>
                          <p className="pr-3" style={{ float: "right" }}>
                            Order date
                          </p>
                        </Col>

                        <Col className="pb-0" md={1}>
                          <p style={{ float: "right", paddingRight: "5px" }}>
                            Amount
                          </p>
                        </Col>
                        <Col className="pb-0" md={1}>
                          <p
                            style={{
                              float: "right",
                              paddingRight: "25px",
                            }}
                          >
                            status
                          </p>
                        </Col>
                      </Row>
                    </Col>
                    <hr></hr>
                  </Content>
                </Layout>

                {orders.map((order) => (
                  <Layout
                    className="price-layout mx-5"
                    style={{
                      padding: "0 0 0",
                      margin: "0rem",
                      marginBottom: "10px",
                      marginTop: 0,
                    }}
                  >
                    <Content
                      className="site-layout-background"
                      style={{
                        padding: 5,
                        paddingBottom: 10,
                        margin: 0,
                        borderRadius: "0px",

                        minHeight: 70,
                      }}
                    >
                      <>
                        {order.listing.map((item) => (
                          <>
                            <Col>
                              <Row>
                                <Col md={2} className="ord-img-col">
                                  <a href={item.image}>
                                    <img
                                      alt="order-pic"
                                      className="order-det-img mb-0"
                                      style={{
                                        width: "45%",
                                        height: "100%",
                                      }}
                                      src={item.image}
                                    />
                                  </a>
                                </Col>
                                <Col md={4}>
                                  <h5
                                    className="order-title"
                                    style={{ marginBottom: "0" }}
                                  >
                                    {item.title}
                                  </h5>
                                  <p
                                    className="order-loc"
                                    style={{ fontSize: "10px" }}
                                  >
                                    {item.city}, {item.state}
                                  </p>
                                </Col>
                                <Col md={2}>
                                  <p
                                    className="order-pay-id"
                                    style={{ float: "right" }}
                                  >
                                    <span
                                      style={{ display: "none" }}
                                      className="mob-pay-txt"
                                    >
                                      Payment ID :
                                    </span>{" "}
                                    <span style={{ color: "blue" }}>
                                      {order.payment_id}
                                    </span>
                                  </p>
                                </Col>
                                <Col md={2}>
                                  <p
                                    className="order-date"
                                    style={{ float: "right" }}
                                  >
                                    {order.order_date}
                                  </p>
                                </Col>

                                <Col md={1}>
                                  <p
                                    className="order-price"
                                    style={{ float: "right" }}
                                  >
                                    ₹ {item.price}
                                  </p>
                                </Col>
                                <Col md={1}>
                                  <span
                                    className="status-label label label-success undefined"
                                    style={{
                                      float: "right",
                                      backgroundColor: order.isPaid
                                        ? "none"
                                        : "red",
                                    }}
                                  >
                                    {order.isPaid ? "Paid" : "Failed"}
                                  </span>
                                </Col>
                              </Row>
                            </Col>
                          </>
                        ))}
                      </>
                    </Content>
                  </Layout>
                ))}
              </>
            )}
          </>
        )}
      </div>
    );
  }
}

export default MyOrders;
