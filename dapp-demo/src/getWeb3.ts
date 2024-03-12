import Web3 from "web3";

let web3: Web3;

//export const init = async () => {
  let selectedAccount: any;

  if (typeof (window as any).ethereum === "undefined" && "http://127.0.0.1:7545") {
	web3 = new Web3((window as any).ethereum);
    (window as any).ethereum
      .request({ method: "eth_requestAccounts" })
      .then((accounts: any) => {
        selectedAccount = accounts[0];
        console.log(`Selected account is ${selectedAccount}`);
      })
      .catch((err: any) => {
        console.log(err);
        return;
      });

    (window as any).ethereum.on("accountsChanged", function (accounts: any) {
      selectedAccount = accounts[0];
      console.log(`Selected account changed to ${selectedAccount}`);
    });
  } else {
    const new_provider = new Web3.providers.HttpProvider(
      "https://goerli.infura.io/v3/5afa097083074a87a5e759ad1ad58512"
    ); // Replace with your local provider URL
    web3 = new Web3(new_provider);
    console.log("chiku")
  }

  export default web3;

  
