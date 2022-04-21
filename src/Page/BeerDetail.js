import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import classes from "./BeerDetail.module.css";
import tipLogo from "../Assets/TipLogo.png";
import BeerImage from "../Assets/BeerImage.png";

const BeerDetail = () => {
  const [beerDetails, setBeerDetails] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    fetch(`https://api.punkapi.com/v2/beers/${id}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setBeerDetails(data);
      });
  }, [setBeerDetails]);

  return (
    <div className={classes.body}>
      {beerDetails.map((detail) => (
        <Card className={classes.cardBox}>
          <Card.Img
            className={classes.cardImg}
            variant="top"
            src={detail.image_url ? detail.image_url : BeerImage}
          />
          <Card.Body className={classes.cardBody}>
            <Card.Title className="text-center mt-3">{detail.name}</Card.Title>
            <Card.Text className="text-center"> Abv: {detail.abv}</Card.Text>
            <Card.Text className="text-center mb-4">
              <strong>First brewed:</strong> {detail.first_brewed}
            </Card.Text>
            <Card.Text className="mt-4"> {detail.description}</Card.Text>
            <Card.Text className="my-4">
              <strong>Brewers Tip</strong>
              <span> </span>
              <img src={tipLogo} className={classes.tipImg} />
              <br />
              {detail.brewers_tips}
            </Card.Text>
            <Card.Text>
              <p className="mb-2">
                <strong>Best food pairing with:</strong>
              </p>
              <ul>
                {detail.food_pairing.map((food) => (
                  <li>{food}</li>
                ))}
              </ul>
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default BeerDetail;
