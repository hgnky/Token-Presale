import Web3 from "web3";
import { AbiItem } from 'web3-utils'
import uniAbi from '../abi/uni.json';
import { uni_address } from "../utils/contract";

const useWallet = () => {

    const getBalance = async (address: string) => {
        const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
        var eth_balance = await web3.eth.getBalance(address); //Will give value in.
        eth_balance = web3.utils.fromWei(eth_balance.toString());

        const uniContract = new web3.eth.Contract((uniAbi as unknown) as AbiItem, uni_address);
        const uni_balance = await uniContract.methods.balanceOf(address).call();

        return {
            eth: Number(eth_balance).toFixed(4),
            uni: uni_balance
        }
    }

    return { getBalance };
}

export default useWallet;