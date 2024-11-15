export interface Token{
    address:`0x${string}`,
    chain:string,
    logo:string,
    symbol:string,
    decimals:number
}
export const validTokens:Token[]=[
    {
        address:"0xaA8E23Fb1079EA71e0a56F48a2aA51851D8433D0",
        logo:"/USDT.png",
        chain:"sepolia",
        decimals:6,
        symbol:"USDT"
    },
    {
        address:"0x29f2d40b0605204364af54ec677bd022da425d03",
        chain:"sepolia",
        logo:"/USDT.png",
        decimals:8,
        symbol:"WBTC"
    }
]
export const tokenMaps = new Map<string, Token>(validTokens.map(item=> [item.address, item]))