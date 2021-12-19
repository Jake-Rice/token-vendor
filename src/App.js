import './app.css';
import { useState } from 'react'
import { ethers } from 'ethers'
import Greeter from './artifacts/contracts/Greeter.sol/Greeter.json'

const greeterAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'

function App() {
  const [message, setMessage] = useState(' ')
  const [greeting, setGreetingValue] = useState('')  

  async function fetchGreeting() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, provider)
      const newMessage = await contract.greet()
      setMessage(newMessage)
    }
  }

  async function changeGreeting() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer)
      const transaction = await contract.setGreeting(greeting)
      await transaction.wait()
      setGreetingValue('')
      fetchGreeting()
    }
  }

  return (
    <div className="greetingForm">
      <h1 className="greetingReadout">{message}</h1>
      <span>
        <input value={greeting} onChange={e => setGreetingValue(e.target.value)}/>
        <button onClick={changeGreeting}>Set Greeting</button>
      </span><br/>
      <button onClick={fetchGreeting}>Fetch Greeting</button>
    </div>
  );
}

export default App;
