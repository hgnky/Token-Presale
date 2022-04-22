import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

declare var window: any
const POLLING_INTERVAL = 15000;

interface walletConnectProps {
    rpc: object,
    bridge: string,
    qrcode: boolean,
    pollingInterval: number
}

export const injected = new InjectedConnector({
    supportedChainIds: [1, 3]
});

export const walletconnect = new WalletConnectConnector({
    rpc: {
        1: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
        3: "https://ropsten.infura.io/v3/",
        // 56: 'https://bsc-dataseed1.binance.org/',
        // 97: 'https://data-seed-prebsc-1-s1.binance.org:8545/'
    },
    bridge: 'https://bridge.walletconnect.org',
    qrcode: true,
})

export const requestChangeNetwork = async (chainId: string) => {
    try {
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: chainId }],
        });
    } catch (error: any) {
        if (error.code === 4902) {
            try {
                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [
                        {
                            chainId: chainId,
                            rpcUrl: getrpcURLWithChainId(chainId),
                        },
                    ],
                });
            } catch (addError) {
                console.error(addError);
            }
        }
        console.error(error);
    }
}

export const getrpcURLWithChainId = (id: string) => {
    switch (parseInt(id)) {
        case 1:
            return "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161";
        case 3:
            return "https://ropsten.infura.io/v3/";
        case 56:
            return "https://bsc-dataseed1.binance.org/";
        case 97:
            return "https://data-seed-prebsc-1-s1.binance.org:8545/";
        case 137:
            return "https://polygon-rpc.com/"
        case 43114:
            return "https://api.avax.network/ext/bc/C/rpc"
        default:
            return "";
    }
}