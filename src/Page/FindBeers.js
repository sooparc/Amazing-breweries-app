/* eslint-disable */
import { useState, useRef, useEffect } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import classes from "./FindBeers.module.css";
import BeerImage from "../Assets/BeerImage.png";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

const FindBeers = () => {
  const [input, setInput] = useState();
  const [enteredInputValue, setEnteredInputValue] = useState();
  const [errorMessage, setErrorMessage] = useState(false);

  const errorMessageClose = () => setErrorMessage(false);
  const errorMessageShow = () => setErrorMessage(true);

  const inputRef = useRef();
  const params = useParams();
  const history = useHistory();

  const toggleErrorMessage = () => setErrorMessage(!errorMessage);

  const buttonClickHandler = (e) => {
    e.preventDefault();
    const enteredInput = inputRef.current.value;
    fetch(`https://api.punkapi.com/v2/beers/?beer_name=${enteredInput}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setEnteredInputValue(data);
        let cardBox = document.getElementById("cardBox");
        cardBox.scrollIntoView();
      })
      .catch((err) => {
        setErrorMessage(true);
      });
  };

  const imageClickHandler = (id) => {
    history.push(`/beer/${id}`);
  };

  const ipaLinkClickHandler = (data) => {
    const enteredInput = inputRef.current.value;
    fetch("https://api.punkapi.com/v2/beers/?beer_name=ipa")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setEnteredInputValue(data);
        let cardBox = document.getElementById("cardBox");
        cardBox.scrollIntoView();
      });
  };

  const paleAleLinkClickHandler = (data) => {
    const enteredInput = inputRef.current.value;
    fetch("https://api.punkapi.com/v2/beers/?beer_name=paleAle")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setEnteredInputValue(data);
        let cardBox = document.getElementById("cardBox");
        cardBox.scrollIntoView();
      });
  };

  const lagerLinkClickHandler = (data) => {
    const enteredInput = inputRef.current.value;
    fetch("https://api.punkapi.com/v2/beers/?beer_name=lager")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setEnteredInputValue(data);
        let cardBox = document.getElementById("cardBox");
        cardBox.scrollIntoView();
      });
  };

  const stoutLinkClickHandler = (data) => {
    const enteredInput = inputRef.current.value;
    fetch("https://api.punkapi.com/v2/beers/?beer_name=stout")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setEnteredInputValue(data);
        let cardBox = document.getElementById("cardBox");
        cardBox.scrollIntoView();
      });
  };

  return (
    <div style={{ overflowX: "hidden" }}>
      <Modal show={errorMessage} onHide={errorMessageClose}>
        <Modal.Header closeButton>
          <Modal.Title>Error Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>Sorry, that beer DOES NOT exist :( </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={errorMessageClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <div className={classes.mainHeader}>
        <form onSubmit={buttonClickHandler} className={classes.form}>
          <input
            ref={inputRef}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            className={classes.input}
            placeholder="Find your favorite beer"
            autoFocus
            required
          ></input>
          <button type="submit" className={classes.searchBtn}>
            Search
          </button>
        </form>
        <br />
        <span onClick={ipaLinkClickHandler} className={classes.popularSearch}>
          IPA
        </span>
        <span
          onClick={paleAleLinkClickHandler}
          className={classes.popularSearch}
        >
          Pale Ale
        </span>
        <span onClick={lagerLinkClickHandler} className={classes.popularSearch}>
          Lager
        </span>
        <span onClick={stoutLinkClickHandler} className={classes.popularSearch}>
          Stout
        </span>
      </div>

      <div className={classes.container}>
        <div className="row px-5">
          {enteredInputValue &&
            enteredInputValue.map((beer) => (
              <div
                className="col-md-3 mx-auto d-block text-center"
                id="cardBox"
              >
                <div className={classes.cardBox}>
                  <Card.Img
                    className={classes.cardImage}
                    src={beer.image_url ? beer.image_url : BeerImage}
                    onClick={() => imageClickHandler(beer.id)}
                  />

                  <Card.Body>
                    <Card.Title className={classes.cardTitle}>
                      {beer.name}
                    </Card.Title>
                    <Card.Text className={classes.cardText}>
                      Abv {beer.abv}%
                    </Card.Text>
                  </Card.Body>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
export default FindBeers;
