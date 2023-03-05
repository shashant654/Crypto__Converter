import React, {useState, useEffect } from "react";
import { Select, Card, Form, Input } from "antd";
import {RiCoinsLine} from 'react-icons/ri'

function Converter() {
  const apiUrl = ' https://api.coingecko.com/api/v3/exchange_rates';

  const defaultFirstSelectValue = "Bitcoin"
  const defaultSecondSelectValue = "Ether"


  const [cryptoList ,setCryptoList]= useState([])

  const [inputValue ,setInputValue]= useState("0")

  const [firstSelect ,setFirstSelect]= useState(defaultFirstSelectValue)

  const [secondSelect ,setSecondSelect]= useState(defaultSecondSelectValue)

  const [result,setResult] = useState("0")

  // const names = [
  //   {
  //     value: "jack",
  //     label: "Jack",
  //   },
  //   {
  //     value: "lucy",
  //     label: "Lucy",
  //   },
  //   {
  //     value: "Yiminghe",
  //     label: "yiminghe",
  //   },
  //   {
  //     value: "disabled",
  //     label: "Disabled",
  //   },
  // ];

  useEffect(() => {
fetchData();
  },[])


  async function fetchData() {
    const response = await fetch(apiUrl)
    const jsonData = await response.json();

    const data = jsonData.rates;
    const tempArray = 
    Object.entries(data).map(item => {
      return {
        value: item[1].name,
        label: item[1].name,
        rate: item[1].value

      }
    })
    setCryptoList(tempArray)
  }

useEffect(() => {
  // console.log(inputValue,firstSelect,secondSelect);
// first of all we have to check cryptoList.length == 0 then return nothing becoz in empty array we can't find anything
  if(cryptoList.length === 0) return ;

  const firstSelectRate = cryptoList.find((item) => {
    return item.value === firstSelect
  }).rate;

  const secondSelctRate = cryptoList.find((item) => {
    return item.value === secondSelect
  }).rate;

  // console.log(firstSelectRate,secondSelctRate);

  // **  as we know  1 BTC == 13 ETH == 40 LTC 
            // TAHT'S WE CAN SAY  that  13 ETH = 40 LTC 
            // then                 2 ETH = (2 * 40 LTC) / 13 ETH  
                 // here firstRate = ETH , and secondRate = LTC
                 //  and input value = 2;
            
  const resultValue = (inputValue * secondSelctRate) / firstSelectRate;

  setResult(resultValue.toFixed(6));

},[inputValue,firstSelect,secondSelect])

  return (
    <div className="container">
      <Card className="crypto-card" title={<h1> <RiCoinsLine/> Crypto-Converter</h1>}>
        <Form>
          <Form.Item>
            <Input onChange={(event) => setInputValue(event.target.value)}/>
          </Form.Item>
        </Form>

        <div className="select-box">

          <Select style={{ width: "120px" }}
           defaultValue={defaultFirstSelectValue} 
           options={cryptoList}
           onChange={(value) => setFirstSelect(value)}
            />

          <Select style={{ width: "120px" }}
           defaultValue={defaultSecondSelectValue}
           options={cryptoList}
           onChange={(value) => setSecondSelect(value)}
            />
        </div>

        {/* <p>2 Bitcoin = 12 Ethereum</p> */}
        <p>{inputValue} {firstSelect} = {result} {secondSelect}</p>
      </Card>
    </div>
  );
}

export default Converter;
