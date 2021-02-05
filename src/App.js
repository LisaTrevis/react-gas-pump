import React, { useState, useEffect } from "react";
import { FaGasPump } from "react-icons/fa";

const App = () => {
  const [gallons, setGallons] = useState(0);
  const [dollars, setDollars] = useState(0);
  const [price, setPrice] = useState(2.99);
  const [timeoutValue, setTimeoutValue] = useState();
  const [isPumping, setIsPumping] = useState(false);
  const [activeKey, setActiveKey] = useState(0);

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
    setActiveKey(parseInt(e.target.getAttribute("data-key")));
  };

  const pumpGas = () => {
    setGallons((prevGallons) => prevGallons + 0.1);
  };

  return (
    <section>
      <h1>Gas Pump</h1>
      <div className="gas-prices">
        <button
          data-key="1"
          type="button"
          className={activeKey === 1 ? "gas-type-btn active" : "gas-type-btn"}
          value="2.99"
          onClick={handleClick}
        >
          Regular <span className="price">$2.99</span>
        </button>
        <button
          data-key="2"
          type="button"
          className={activeKey === 2 ? "gas-type-btn active" : "gas-type-btn"}
          value="3.49"
          onClick={handleClick}
        >
          Premium <span className="price">$3.49</span>
        </button>
        <button
          data-key="3"
          type="button"
          className={activeKey === 3 ? "gas-type-btn active" : "gas-type-btn"}
          value="3.99"
          onClick={handleClick}
        >
          Diesel <span className="price">$3.99</span>
        </button>
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
      <div className="startstop-btn">
        {isPumping ? (
          <button
            type="button"
            className="btn btn-stop"
            onClick={() => setIsPumping(false)}
          >
            <FaGasPump className="icon" />
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-start"
            onClick={() => setIsPumping(true)}
          >
            <FaGasPump className="icon" />
          </button>
        )}
      </div>
    </section>
  );
};

export default App;
