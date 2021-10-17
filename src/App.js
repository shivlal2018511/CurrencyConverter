
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect,useState} from 'react';
import './App.css';
import {Row } from 'reactstrap';
import CurrencyInput from './Components/CurrencyRow';
const BASE_URL = 'http://api.exchangeratesapi.io/v1/latest?access_key=e458d4429a0d56325694fb7365d7d173';
function App() {

  const [currencyOptions, setCurrencyOptions]= useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [inFromAmount, setInFromAmount] = useState(true);

  let toAmount =0,fromAmount =0;
  if(inFromAmount=== true){
    fromAmount = amount;
    toAmount = amount*exchangeRate;
  }

  else{
    toAmount = amount;
    fromAmount =amount/exchangeRate;
  }
 useEffect(() => {
  fetch(BASE_URL).then(res =>res.json())
  .then(data => {
   const firstCurrency = Object.keys(data.rates)[0]
   setCurrencyOptions([data.base, ...Object.keys(data.rates)]) 
   setFromCurrency(data.base)
   setToCurrency(firstCurrency);
   setExchangeRate(data.rates[firstCurrency]);
  })
},[])

useEffect(()=>{
   if (fromCurrency === toCurrency && fromCurrency != null) {
      setExchangeRate(1);
    }
  else if(fromCurrency != null && toCurrency != null)
  {
    fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
    .then(res => res.json())
    .then(data => console.log(data))
  }
}, [fromCurrency, toCurrency])

  function handleAmountFromChange(e){
    setAmount(e.target.value);
    setInFromAmount(true);
  }
    function handleAmountToChange(e){
    setAmount(e.target.value);
    setInFromAmount(false);
  }
  return (
    <div className="container h-100">
      <Row className=" h-100 justify-content-center text-center mt-3">
          <h1 className="m-2">Converter</h1>
          <CurrencyInput amount={fromAmount} selectCurrency={fromCurrency} currencyOptions ={currencyOptions} onCurrencyChange={e =>{setFromCurrency(e.target.value)}} onAmountChange = {handleAmountFromChange}/>
          <div className="equals  "><h1 id ="equalSign">&#8595;&#8593;</h1></div>
          <CurrencyInput amount ={toAmount} selectCurrency={toCurrency} currencyOptions ={currencyOptions} onCurrencyChange={e =>{setToCurrency(e.target.value)}} onAmountChange = {handleAmountToChange} />
      </Row>
    </div>
      
  );
}

export default App;
