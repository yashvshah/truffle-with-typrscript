// import React, { useEffect, useState } from "react";
// import "./App.css";
// import web3 from "./getWeb3";
// import Contract from "./contracts/Lottery.json";

// function App() {
//   const contract_address = Contract.networks[5777].address;
//   const [address, setTransferAddress] = useState<string>("");
//   const createAcc = async () => {
//     var account_create = web3.eth.accounts.create();
//     var wallet = web3.eth.accounts.wallet.add(account_create);
//     console.log(wallet);
//     console.log(account_create);
//   };

//   const getAccount = async () => {
//     web3.eth.getBlockNumber().then(console.log);
//     var acc = web3.eth.wallet?.map((values) => {
//       console.log(values);
//     });
//   };

//   const participants = async () => {
//     alert(address);
//     try {
//       await web3.eth.sendTransaction({
//         to: contract_address,
//         from: address,
//         value: web3.utils.toWei("1", "ether"),
//       });
//       console.log("participant added successfully!");
//     } catch (error) {
//       console.error("Error calling participants", error);
//     }
//   };
//   const selectWinner = async () => {
//     const contract = new web3.eth.Contract(Contract.abi, contract_address);
//     try {
//       await web3.eth.sendTransaction({
//         from: address,
//         to: contract_address,
//         data: contract.methods.selectWinner().encodeABI(),
//       });
//       //await contract.methods.selectWinner().send({from:account,gas:"30000"})
//       console.log("selectWinner function called successfully!");
//     } catch (error) {
//       console.error("Error calling selectWinner:", error);
//     }
//   };

//   return (
//     <div className="App">
//       <p>Your balance is </p>
//       <input
//         type="text"
//         name="address"
//         value={address}
//         onChange={(event) => {
//           setTransferAddress(event.target.value);
//         }}
//       />
//       <button onClick={createAcc}>Create Account</button>
//       <button onClick={getAccount}>Accounts</button>
//       <button onClick={participants}>add Participant</button>
//       <button onClick={selectWinner}>Winner</button>
//     </div>
//   );
// }

// export default App;

import React, { useEffect, useState } from "react";
import "./App.css";
import web3 from "./getWeb3";
import Contract from "./contracts/Lottery.json";

function App() {
  const contract_address = Contract.networks[5].address;
  const contract = new web3.eth.Contract(Contract.abi, contract_address);

  const [privateKey, setPrivateKey] = useState<string>("");
  const [address, setTransferAddress] = useState<string>("");

  const createAcc = async () => {
    var account_create = web3.eth.accounts.create();
    var wallet = web3.eth.accounts.wallet.add(account_create);
    console.log(account_create);
  };

  const getAccount = async () => {
    web3.eth.getBlockNumber().then(console.log);
    var acc = web3.eth.wallet?.map((values) => {
      console.log(values);
    });
  };

  const participants = async () => {
    const tx = {
      from: address,
      to: contract_address,
      value: web3.utils.toWei("0.1", "ether"),
      nonce: await web3.eth.getTransactionCount(address),
      maxPriorityFeePerGas: web3.utils.toWei("1", "gwei"),
      maxFeePerGas: web3.utils.toWei("1", "gwei"),
    };

    const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);

    const receipt = await web3.eth
      .sendSignedTransaction(signedTx.rawTransaction)
      .once("transactionHash", (txhash) => {
        console.log(`Mining transaction ...`, txhash);
      });
    console.log(`Mined in block ${receipt.blockNumber}`);
    console.log(signedTx);
  };
  const selectWinner = async () => {
    try {
      const tx = {
        from: address,
        to: contract_address,
        data: contract.methods.selectWinner().encodeABI(),
        maxPriorityFeePerGas: web3.utils.toWei("1", "gwei"),
        maxFeePerGas: web3.utils.toWei("1", "gwei"),
      };
      const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
      var data = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
      console.log(data);
      //await contract.methods.selectWinner().send({from:account,gas:"30000"})
      console.log("selectWinner function called successfully!");
    } catch (error) {
      console.error("Error calling selectWinner:", error);
    }
  };

  return (
    <div className="App">
      <p>Your balance is </p>
      <input
        type="text"
        name="address"
        placeholder="Address"
        value={address}
        onChange={(event) => {
          setTransferAddress(event.target.value);
        }}
      />
      <input
        type="text"
        name="privateKey"
        value={privateKey}
        onChange={(e) => {
          setPrivateKey(e.target.value);
        }}
        placeholder="PrivateKey"
      />
      <button onClick={createAcc}>Create Account</button>
      <button onClick={getAccount}>Accounts</button>
      <button onClick={participants}>add Participant</button>
      <button onClick={selectWinner}>Winner</button>
    </div>
  );
}

export default App;
