import React from 'react';
import { Input,Row,Col } from 'reactstrap';
//import {useEffect,useState} from 'react';
function CurrencyInput(props){
    const {currencyOptions,selectCurrency,onCurrencyChange,onAmountChange,amount} =props;
    return(
        <div className="container " >
             <Row className = "mt-2 mb-2"> 
             <Col md={{size:"6", offset:"2"}}   >     
                 <Input type="number" name="currenc" id="currencyInput" placeholder="e.g. 2.2" value={amount} onChange ={onAmountChange}/>
             </Col> 
             <Col md={2}>
                <Input  type="select" name="select" id="currencySelect" value={selectCurrency} onChange={onCurrencyChange} >
                 { currencyOptions.map((option) =>(<option key ={option} value={option}>{option}</option>))
                      }

                </Input>
             </Col>
             </Row>
        </div>
    );
}
export default CurrencyInput;