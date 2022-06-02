import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

const Header = (props) => {
  const arrowIcon = <FontAwesomeIcon icon={faAngleDown} />;

  const arrowClick = () => {
    let arrow = document.getElementById("cardImg");
    arrow.scrollIntoView();
  };

  return (
    <div className="header">
      <div className="headerMain">Amazing Breweries</div>
      <p className="headerParagraph">
        There's plenty of craft beer in the City of Angels
        <br /> Here is the list of highest-rated breweries along with info on
        hours of operation and food
      </p>
      <span className="icon" onClick={arrowClick}>
        {arrowIcon}
      </span>
    </div>
  );
};

export default Header;
