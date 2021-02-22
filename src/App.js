import React, { useState, useEffect } from 'react'
import Alert from './Alert'

const App = () => {
  const [gallons, setGallons] = useState(0)
  const [dollars, setDollars] = useState(0)
  const [price, setPrice] = useState(0)
  const [timeoutValue, setTimeoutValue] = useState()
  const [isPumping, setIsPumping] = useState(false)
  const [activeKey, setActiveKey] = useState('')
  const [alert, setAlert] = useState({
    msg: 'Please choose a gas type:',
    type: 'placeholder',
  })

  if (dollars === NaN) {
    setDollars(0)
  }

  const showAlert = (type = '', msg = '') => {
    setAlert({ type, msg })
  }

  const clearPump = () => {
    setIsPumping(false)
    setGallons(0)
    setDollars(0)
    setPrice(0)
    setActiveKey('')
    setAlert({
      msg: 'Please choose a gas type:',
      type: 'placeholder',
    })
  }

  const startPump = () => {
    if (activeKey === '') {
      showAlert('danger', 'Please choose a gas type!')
    } else {
      setIsPumping(true)
    }
  }

  const stopPump = () => {
    setIsPumping(false)
  }

  const handleClick = (e) => {
    if (isPumping) {
      setIsPumping(false)
    }
    setPrice(parseFloat(e.target.value))
    setActiveKey(parseInt(e.target.getAttribute('data-key')))
    setAlert({
      msg: 'Gas type set!',
      type: 'success',
    })
    setGallons(0)
  }

  useEffect(() => {
    setPrice(price)
    console.log(price)
  }, [price])

  useEffect(() => {
    setActiveKey(activeKey)
    console.log(activeKey)
  }, [activeKey])

  useEffect(() => {
    if (isPumping) {
      setTimeoutValue(setInterval(() => pumpGas(), 250))
    } else {
      clearInterval(timeoutValue)
    }
    return () => clearInterval(timeoutValue)
  }, [isPumping])

  useEffect(() => {
    setDollars(Math.round((price * gallons + Number.EPSILON) * 100) / 100)
    console.log(dollars)
  }, [gallons])

  const pumpGas = () => {
    setGallons((prevGallons) => prevGallons + 0.1)
  }

  return (
    <main>
      <h1>Gas Pump</h1>
      <section>
        <Alert {...alert} />
        <div className='gas-prices'>
          <button
            data-key='1'
            type='button'
            className={activeKey === 1 ? 'gas-type-btn active' : 'gas-type-btn'}
            value='2.99'
            onClick={handleClick}
          >
            Regular <span className='price'>$2.99</span>
          </button>
          <button
            data-key='2'
            type='button'
            className={activeKey === 2 ? 'gas-type-btn active' : 'gas-type-btn'}
            value='3.49'
            onClick={handleClick}
          >
            Premium <span className='price'>$3.49</span>
          </button>
          <button
            data-key='3'
            type='button'
            className={activeKey === 3 ? 'gas-type-btn active' : 'gas-type-btn'}
            value='3.99'
            onClick={handleClick}
          >
            Diesel <span className='price'>$3.99</span>
          </button>
        </div>
        <div className='startstop-btn'>
          {isPumping ? (
            <button type='button' className='btn btn-stop' onClick={stopPump}>
              Stop pump
            </button>
          ) : (
            <button type='button' className='btn btn-start' onClick={startPump}>
              Start pump
            </button>
          )}
        </div>
        <div className='clear'>
          <button className='btn clear-btn' onClick={clearPump}>
            Clear pump
          </button>
        </div>
        <div className='meters'>
          <div className='gallon-counter'>
            <p>Gallons:</p>
            <p>{gallons.toFixed(1)}</p>
          </div>
          <div className='dollar-counter'>
            <p>Dollars:</p>
            <p>${dollars.toFixed(2)}</p>
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
