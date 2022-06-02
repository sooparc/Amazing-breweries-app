/* eslint-disable */
import { useState, useRef, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Modal, Button, Card, Alert } from "react-bootstrap";
import breweryData from "../Data/Data";
import classes from "../Page/Home.module.css";
import ReactStars from "react-rating-stars-component";
import React from "react";
import AuthContext from "../Store/auth-context";
import { db } from "../firebase";
import { uid } from "uid";
import { set, ref, onValue, remove, update } from "firebase/database";
import Logo from "../Assets/Logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

const Breweries = (props) => {
  const [show, setShow] = useState(false);
  const [textarea, setTextarea] = useState();
  const [reviews, setReviews] = useState([]);
  const [reviewRating, setReviewRating] = useState(null);
  const [review, setReview] = useState([]);
  const [reviewEdit, setReviewEdit] = useState(false);
  const [tempUuid, setTempUuid] = useState("");
  const [selectedBrewery, setSelectedBrewery] = useState({});
  const [starTotal, setStarTotal] = useState();
  const [profileImage, setProfileImage] = useState();

  const [modalShow, setModalShow] = useState(false);
  const handleClose = () => setModalShow(false);
  const [noClick, setNoClick] = useState(false);

  const reviewInputRef = useRef();
  const history = useHistory();

  const warningIcon = <FontAwesomeIcon icon={faTriangleExclamation} />;

  const ratingHandler = {
    size: 35,
    isHalf: true,
    char: "☆",
    value: 3.5,
    onChange: (newValue) => {
      setReviewRating(newValue);
    },
  };

  const today = new Date();
  const date =
    today.getMonth() + 1 + "-" + today.getDate() + "-" + today.getFullYear();

  const selectBrewery = (i) => {
    let pickedData = breweryData[i];
    setSelectedBrewery(pickedData);
    setShow(true);
  };

  // show data
  useEffect((i) => {
    onValue(ref(db), (snapshot) => {
      setReviews([]);

      const data = snapshot.val();
      if (data !== null) {
        Object.values(data).map((review) => {
          setReviews((oldArray) => [...oldArray, review]);
        });
      }
      let pop_status = localStorage.getItem("showModal");
      if (!pop_status) {
        setModalShow(true);
        localStorage.setItem("showModal", true);
      }
    });
  }, []);

  // send data
  const reviewSubmitHandler = () => {
    if (reviewRating > 0) {
      let enteredReview = reviewInputRef.current.value;
      let reviewCopy = [...review];

      let userReview = {
        brewery: selectedBrewery.name,
        comment: enteredReview,
        user: props.userEmail,
        userImage: props.profileImage,
        rating: reviewRating,
        date: date,
      };
      reviewCopy.push(userReview);
      setReview(reviewCopy);

      const uuid = uid();
      set(ref(db, `/${uuid}`), {
        brewery: selectedBrewery.name,
        comment: enteredReview,
        user: props.userEmail,
        userImage: props.profileImage,
        rating: reviewRating,
        date: date,
        uuid,
      });

      console.log(userReview);

      reviewInputRef.current.value = "";
    } else {
      alert("Please select your rating !");
    }
  };

  // delete data;
  const deleteHandler = (review) => {
    remove(ref(db, `/${review.uuid}`));
  };

  // update data
  const editHandler = (review) => {
    setReviewEdit(true);
    setTempUuid(review.uuid);
    setReview(review.review);

    let editBtn = document.getElementById("editBtn");
    editBtn.scrollIntoView();
    reviewInputRef.current.value = "";
  };

  const submitChangeHandler = () => {
    let enteredReview = reviewInputRef.current.value;

    update(ref(db, `/${tempUuid}`), {
      brewery: selectedBrewery.name,
      comment: enteredReview,
      user: props.userEmail,
      userImage: props.profileImage,
      rating: reviewRating,
      date: date,
      uuid: tempUuid,
    });

    setReview("");
    setReviewEdit(false);

    reviewInputRef.current.value = "";
  };

  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  const noClickHandler = () => {
    setNoClick(true);
  };

  return (
    <div style={{ overflowX: "hidden" }}>
      <Modal
        show={modalShow}
        size="xl"
        style={{
          backgroundColor: "rgba(0,0,0,0.7)",
          marginTop: "15vh",
        }}
      >
        <Modal.Header>
          <Modal.Title className={classes.modalTitle}>
            Please verify that you are over 21
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          {noClick === false ? (
            <>
              <img src={Logo} className={classes.modalImg} />
              <p className={classes.modalText}>Are you over 21 years of age?</p>
              <div>
                <button onClick={handleClose} className={classes.btn}>
                  YES
                </button>
                <button className={classes.btn} onClick={noClickHandler}>
                  NO
                </button>
              </div>
            </>
          ) : (
            <>
              <img src={Logo} className={classes.img} />
              <p className={classes.modalText2}>
                {warningIcon}
                <span> </span>You are not old enough to view this content
              </p>
            </>
          )}
        </Modal.Body>
      </Modal>

      <div>
        <div className="row">
          {breweryData.map((brewery, i) => {
            let reviewsArr = reviews
              .filter((e) => e.brewery === brewery.name)
              .map((e) => e.rating);
            let avgReview =
              reviewsArr.reduce((a, b) => a + b, 0) / reviewsArr.length;

                     return (
              <div className="col-lg-3" style={{ padding: "0" }} key={i}>
                <div
                  id="cardImg"
                  className={classes.card}
                  style={{
                    backgroundImage: `url(${brewery.image_url})`,
                  }}
                >
                  <div className={classes.cardWrap}>
                    <p className={classes.cardTitle}>{brewery.name}</p>
                    <p className={classes.cardText}>
                      {brewery.street}, {brewery.city}, {brewery.zip_code}
                    </p>
                    <p>
                      Review : {avgReview.toFixed(1)}
                      /5
                    </p>

                    <div style={{ textAlign: "center", marginTop: "10%" }}>
                      <a href={brewery.url} className={classes.websiteBtn}>
                        Visit Website
                      </a>

                      <a
                        onClick={() => selectBrewery(i)}
                        className={classes.reviewBtn}
                      >
                        Review
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          <Modal
            show={show}
            onHide={() => setShow(false)}
            dialogClassName="modal-90w"
            aria-labelledby="example-custom-modal-styling-title"
            backdrop="static"
            size="lg"
            scrollable="true"
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-custom-modal-styling-title">
                Leave a Review
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {/* view Reviews */}

              <div>
                <img
                  src={selectedBrewery.image_url}
                  style={{
                    width: "100%",
                    height: "300px",
                    objectFit: "cover",
                  }}
                ></img>
              </div>
              <p
                className="text-center"
                style={{
                  fontSize: "25px",
                  fontWeight: "bold",
                  marginTop: "30px",
                  marginBottom: "50px",
                }}
              >
                {selectedBrewery.name}
              </p>

              {reviews
                .filter((e) => e.brewery === selectedBrewery.name)
                .map((review, index) => (
                  <div key={index} style={{ marginBottom: "60px" }}>
                    <Card className={classes.reviewCard}>
                      <Card.Body>
                        <Card.Title>
                          <p
                            className={classes.starabilityResult}
                            data-rating={review.rating}
                          ></p>
                          <small className="text-muted">{review.user}</small>
                        </Card.Title>
                        <Card.Text>{review.comment}</Card.Text>
                      </Card.Body>

                      {isLoggedIn && review.user === props.userEmail && (
                        <Card.Footer>
                          <small
                            className="text-muted"
                            style={{
                              display: "block",
                              textAlign: "right",
                            }}
                          >
                            {review.date}

                            <button
                              className={classes.editBtn}
                              onClick={() => {
                                editHandler(review);
                              }}
                            >
                              Edit
                            </button>

                            <button
                              className={classes.deleteBtn}
                              onClick={() => {
                                deleteHandler(review);
                              }}
                            >
                              Delete
                            </button>
                          </small>
                        </Card.Footer>
                      )}
                    </Card>
                  </div>
                ))}

              {/* Leave Reviews */}
              <hr />
              {isLoggedIn ? (
                <div style={{ marginTop: "50px" }}>
                  <div className="text-center">
                    <div className={classes.locateStars}>
                      Select your rating (required)
                      <ReactStars {...ratingHandler} />
                    </div>
                  </div>

                  <div id="editBtn">
                    <textarea
                      ref={reviewInputRef}
                      className={classes.textarea}
                      onChange={(e) => {
                        setTextarea(e.target.value);
                      }}
                    />
                  </div>

                  <br />

                  {reviewEdit ? (
                    <div className={classes.buttonWrap}>
                      <button
                        className={classes.editReviewBtn}
                        onClick={submitChangeHandler}
                      >
                        Edit Review
                      </button>
                      <button
                        onClick={() => {
                          setReviewEdit(false);
                          setReview("");
                        }}
                        className={classes.editCancelReviewBtn}
                      >
                        X
                      </button>
                    </div>
                  ) : (
                    <button
                      className={classes.postReviewBtn}
                      onClick={reviewSubmitHandler}
                    >
                      Post Review
                    </button>
                  )}
                </div>
              ) : (
                <p className="text-center mt-4">
                  Please <a href="/login">login</a> or<span> </span>
                  <a href="/register"> sign up</a> to leave a review.
                </p>
              )}
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Breweries;
