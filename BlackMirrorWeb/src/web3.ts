import Web3 from "web3";
let web3;

declare global {
    interface Window {
        ethereum: any;
        web3: any;
    }
}
const loadWeb3 = async (): Promise<any> => {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.enable();
            web3.eth.defaultAccount = await window.web3.eth.defaultaAccount;
            return web3;
        } catch (e) {}
    } else if (window.web3) {
        web3 = new Web3(window.web3.currentProvider);
        return web3;
    } else {
        alert("Metamask isn't installed. Please install and then try again.");
    }
};

export default loadWeb3;
