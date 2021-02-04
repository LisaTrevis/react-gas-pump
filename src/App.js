import React, { useState } from "react";

function App() {
  // const [isGasPumping, setIsGasPumping] = useState(false);
  const [gallons, setGallons] = useState(0);
  const [dollars, setDollars] = useState(0);
  const [price, setPrice] = useState(2.99);

  const handleClick = (e) => {
    setPrice(parseFloat(e.target.value));
  };

  // const handlePump = () => {
  //   if (!isGasPumping) {
  //     setInterval(pumpGas, 1000);
  //     setIsGasPumping(true);
  //   }
  //   if (isGasPumping) {
  //     clearInterval(pumpGas);
  //     setIsGasPumping(false);
  //   }
  // };

  const startGas = () => {
    setInterval(pumpGas, 1000);
  };

  const stopGas = () => {
    clearInterval(startGas);
  };

  const pumpGas = () => {
    console.log("hello");
    setGallons((gallons + 0.1).toFixed(1));
    console.log(gallons);
    setDollars((price * gallons).toFixed(2));
    console.log(dollars);
  };

  return (
    <div>
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
          <label htmlFor="regular">Regular</label>
        </div>
        <div className="gas-type">
          <input
            type="radio"
            name="gastype"
            id="unleaded"
            value="3.49"
            onClick={handleClick}
          />
          <label htmlFor="unleaded">Unleaded</label>
        </div>
        <div className="gas-type">
          <input
            type="radio"
            name="gastype"
            id="diesel"
            value="3.99"
            onClick={handleClick}
          />
          <label htmlFor="diesel">Diesel</label>
        </div>
      </div>
      <div className="meters">
        <p className="gallon-counter">Gallons: {gallons}</p>
        <p className="dollar-counter">Dollars: ${dollars}</p>
      </div>
      {/* <button type="button" className="btn" onClick={handlePump}>Start/Stop</button>*/}
      <button type="button" className="btn" onClick={() => startGas()}>
        Start
      </button>
      <button type="button" className="btn" onClick={() => stopGas()}>
        Stop
      </button>
    </div>
  );
}

export default App;
