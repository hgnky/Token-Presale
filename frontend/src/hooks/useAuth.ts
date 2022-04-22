import { useWeb3React } from "@web3-react/core";
import { injected, requestChangeNetwork } from "../utils/connector";

const useAuth = () => {

    const { activate, deactivate } = useWeb3React();

    const login = async () => {
        try {
            if (window.ethereum.networkVersion !== 1 || window.ethereum.networkVersion !== 3) {
                requestChangeNetwork('0x3');
            }
            await activate(injected);
        } catch (err) {
            console.log(err);
        }
    }

    return { login, logout: deactivate }
}

export default useAuth;