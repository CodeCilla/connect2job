import "../styles/Card.css";
import logo from "../assets/acf-logo.png";
import { useOffers } from "../hooks/useOffers";
import { useEffect, useState } from "react";

const Card = ({offer}) => {

  console.log(offer);

  return (

      <div className="card">
        <div className="card__title">
          <img src={logo} alt="logo" />
          <h2>{offer?.title}</h2>
        </div>
        <div className="card__info">
          <h3>{offer?.company.name}</h3>
          <h3>{offer?.company.location}</h3>
        </div>
        <div className="card__content">
            {offer?.description}
        </div>
      <div className="card__badges">
        {offer?.keywords?.map((keyword, index) => (
          <div key={index}>{keyword}</div>
        ))}
      </div>
      </div>

  );
};
export default Card;
