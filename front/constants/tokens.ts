export const FiFiXAddress = "0xbDC333C574a7C6AE77e93bfBf2cF6F30a9e401f3";
export interface Token{
    address:`0x${string}`,
    chain:string,
    logo:string,
    symbol:string,
    decimals:number,
    name: string,
}
export const validTokens:Token[]=[
    {
        address:"0xaA8E23Fb1079EA71e0a56F48a2aA51851D8433D0",
        logo:"/ETH.svg",
        chain:"sepolia",
        decimals:6,
        symbol:"ETH",
        name: 'Etherem',
    },
    {
        address:"0x29f2D40B0605204364af54EC677bD022dA425d03",
        chain:"sepolia",
        logo:"/TETHER.svg",
        decimals:8,
        symbol:"WBTC",
        name: 'Wrapped BTC'
    },
    {
        address:"0x29f2d40b0605204364af54ec677bd022da425d03",
        chain:"sepolia",
        logo:"/UNISWAP.svg",
        decimals:8,
        symbol:"UNI",
        name: 'Uniswap'
    },
    {
        address:"0x29f2d40b0605204364af54ec677bd022da425d03",
        chain:"sepolia",
        logo:"/AAVE.svg",
        decimals:8,
        symbol:"AAVE",
        name: 'Aave Token'
    },
    {
        address:"0x29f2d40b0605204364af54ec677bd022da425d03",
        chain:"sepolia",
        logo:"/CHAIN_LINK.svg",
        decimals:8,
        symbol:"LINK",
        name: 'ChainLink'
    }
]

export const extraToken:Token = {
    address:"0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8",
    chain:"sepolia",
    logo:"/USD.svg",
    decimals:6,
    symbol:"USDC",
    name: 'USD Coin'
}
export const tokenMaps = new Map<string, Token>(validTokens.map(item=> [item.address, item]))