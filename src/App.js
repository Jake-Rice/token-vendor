import './app.css';
import { useState } from 'react'
import { BigNumber, ethers } from 'ethers'
import Token from './artifacts/contracts/Token.sol/Token.json'
import TokenVendor from './artifacts/contracts/TokenVendor.sol/TokenVendor.json'

const tokenAddress = '0x59b670e9fA9D0A427751Af201D676719a970857b'
const tokenVendorAddress = '0x4ed7c70F96B99c776995fB64377f0d4aB3B0e1C1'

function App() {
  const [numTokens, setNumTokens] = useState("")  

  async function setVendor() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(tokenAddress, Token.abi, signer)
      const transaction = await contract.setVendor(tokenVendorAddress)
      await transaction.wait()
    }
  }

  async function getVendorAddress() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(tokenAddress, Token.abi, provider)
      try {
        const vendorAddress = await contract.vendor()
        alert(vendorAddress)
      } catch(err) {
        console.log(err)
      }
    }
  }

  async function buyTokens() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(tokenVendorAddress, TokenVendor.abi, signer)
      const weiPerToken = await contract.weiPerToken();
      //const transaction = {to: tokenVendorAddress, value: numTokens*weiPerToken}
      //await signer.sendTransaction(transaction)
      await contract.buyTokens(numTokens, { value: BigNumber.from(numTokens).mul(weiPerToken)  })
    }
  }

  return (
    <div className="orderForm">
      <h1 className="readout"></h1>
      <span>
        <input value={numTokens} onChange={e => setNumTokens(e.target.value)}/>
        <button onClick={buyTokens}>Buy Tokens</button>
      </span><br/>
      <button onClick={setVendor}>Set Vendor</button>
      <button onClick={getVendorAddress}>Get Vendor Address</button>
    </div>
  );
}

export default App;
