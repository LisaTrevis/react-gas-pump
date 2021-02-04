import React, { useState, useEffect } from "react";
import { FaGasPump } from "react-icons/fa";

const App = () => {
  const [gallons, setGallons] = useState(0);
  const [dollars, setDollars] = useState(0);
  const [price, setPrice] = useState(2.99);
  const [timeoutValue, setTimeoutValue] = useState();
  const [isPumping, setIsPumping] = useState(false);

  useEffect(() => {
    if (isPumping) {
      setTimeoutValue(setInterval(() => pumpGas(), 250));
    } else {
      clearInterval(timeoutValue);
    }
    return () => clearInterval(timeoutValue);
  }, [isPumping]);

  useEffect(() => {
    setDollars(price * gallons);
  }, [gallons]);

  const handleClick = (e) => {
    setDollars(0);
    setGallons(0);
    setPrice(parseFloat(e.target.value));
  };

  const pumpGas = (gallons, price, dollars) => {
    setGallons((prevGallons) => prevGallons + 0.1);
  };

  return (
    <section>
      <h1>Gas Pump</h1>
      <div className="gas-prices">
        <div className="gas-type">
          <input
            type="radio"
            name="gastype"
            id="regular"
            value="2.99"
            defaultChecked
            onClick={handleClick}
          />
          <span className="label">
            <label htmlFor="regular">Regular: $2.99</label>
          </span>
        </div>
        <div className="gas-type">
          <input
            type="radio"
            name="gastype"
            id="unleaded"
            value="3.49"
            onClick={handleClick}
          />
          <span className="label">
            <label htmlFor="unleaded">Unleaded: $3.49</label>
          </span>
        </div>
        <div className="gas-type">
          <input
            type="radio"
            name="gastype"
            id="diesel"
            value="3.99"
            onClick={handleClick}
          />
          <span className="label">
            <label htmlFor="diesel">Diesel: $3.99</label>
          </span>
        </div>
      </div>
      <div className="meters">
        <div className="gallon-counter">
          <p>Gallons:</p>
          <p>{gallons.toFixed(1)}</p>
        </div>
        <div className="dollar-counter">
          <p>Dollars:</p>
          <p>${dollars.toFixed(2)}</p>
        </div>
      </div>
      <div className="buttons">
        <button
          type="button"
          className="btn btn-start"
          onClick={() => setIsPumping(true)}
        >
          <FaGasPump className="icon" />
        </button>
        <button
          type="button"
          className="btn btn-stop"
          onClick={() => setIsPumping(false)}
        >
          <FaGasPump className="icon" />
        </button>
      </div>
    </section>
  );
};

export default App;
