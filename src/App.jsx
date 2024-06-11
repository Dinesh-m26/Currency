import { useEffect, useState } from "react";
import Icon from "./assets/Icon.png";
import axios from 'axios'

export default function App() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [converter, setConverter] = useState(null);
  const [exchangerate,setExchangerate]=useState("")

  useEffect(() => {
    const data = async () => {
      try {
        let url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
        const res = await axios.get(url)
        setExchangerate(res.data.rates[toCurrency])

      } catch (error) {
        console.log(error)
      }
    }; data()
  }, [fromCurrency,toCurrency])
  useEffect(()=>{
    if(exchangerate !== null){
      setConverter((amount*exchangerate))
    }
  },[amount,exchangerate])


  return (
    <>
      <div className="bg-[#FFBF78] flex justify-center items-center h-screen">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <img src={Icon} className="h-44 mx-auto my-4" alt="Icon" />
          <div className="text-center mb-6">
            <strong className="text-2xl">Currency Converter</strong>
          </div>
          <div className="space-y-4 text-lg">
            <div>
              <label>Amount :</label>
              <input type="number" onChange={(e) => setAmount(e.target.value)} value={amount} className="w-full p-2 mt-1 border border-gray-300 rounded" placeholder="Enter an Amount" />
            </div>
            <div>
              <label>From Currency :</label>
              <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)} className="w-full p-2 mt-1 border border-gray-300 rounded">
                <option value="INR">INR - Indian Rupee</option>
                <option value="EUR">EUR - Euro</option>
                <option value="GBP">GBP - British Pound Sterling</option>
                <option value="JPY">JPY - Japanese Yen</option>
                <option value="AUD">AUD - Australian Dollar</option>
                <option value="CAD">CAD - Canadian Dollar</option>
                <option value="CNY">CNY - Chinese Yuan</option>
                <option value="USD">USD - United States Dollar</option>
                <option value="BRL">BRL - Brazilian Real</option>
                <option value="ZAR">ZAR - South African Rand</option>
              </select>
            </div>
            <div>
              <label>To Currency :</label>
              <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)} className="w-full p-2 mt-1 border border-gray-300 rounded">
                <option value="EUR">EUR - Euro</option>
                <option value="GBP">GBP - British Pound Sterling</option>
                <option value="JPY">JPY - Japanese Yen</option>
                <option value="AUD">AUD - Australian Dollar</option>
                <option value="CAD">CAD - Canadian Dollar</option>
                <option value="CNY">CNY - Chinese Yuan</option>
                <option value="USD">USD - United States Dollar</option>
                <option value="BRL">BRL - Brazilian Real</option>
                <option value="ZAR">ZAR - South African Rand</option>
                <option value="INR">INR - Indian Rupee</option>
              </select>
            </div>
          </div>
          <div className="text-center p-3 border-2 border-dashed border-[#26355D] text-[#26355D] mt-4">
            <p>{amount} {fromCurrency} Equal to {converter}{toCurrency}</p>
          </div>
        </div>
      </div>
    </>
  );
}
