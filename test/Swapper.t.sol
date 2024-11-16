// SPDX-License-Identifier: MIT
pragma solidity >=0.8.10;

import {Test} from "forge-std/Test.sol";
import {CurrencyLibrary, Currency} from "v4-core/src/types/Currency.sol";
import {IERC20} from "aave/src/core/contracts/dependencies/openzeppelin/contracts/IERC20.sol";
import {IHooks} from "v4-core/src/interfaces/IHooks.sol";
import {Swapper} from "../src/Swapper.sol";
import {IPoolAddressesProvider} from "aave/src/core/contracts/interfaces/IPoolAddressesProvider.sol";
import {PoolKey} from "v4-core/src/types/PoolKey.sol";
import {Deployers} from "v4-core/test/utils/Deployers.sol";
import "forge-std/console.sol";

contract SwapperTest is Test{
    using CurrencyLibrary for Currency;

Swapper public swapper;
    address public owner = address(0x012bAC54348C0E635dCAc9D5FB99f06F24136C9A);
    address public sepoliaSwapper = address(0xbDC333C574a7C6AE77e93bfBf2cF6F30a9e401f3);
    address public sepoliaUSDT = address(0xaA8E23Fb1079EA71e0a56F48a2aA51851D8433D0);
    address public sepoliaaETHWBTC = address(0x1804Bf30507dc2EB3bDEbbbdd859991EAeF6EefF);
    address public sepoliaUSDC = address(0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8);
    address public baseSepoliaUSDC = address(0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913);
    address public baseSepoliacbBTC = address(0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf);
    address public swapRouter = address(0xe49d2815C231826caB58017e214Bed19fE1c2dD4); // this is for sepolia testnet
    // address public swapRouter = address(0x95273d871c8156636e114b63797d78D7E1720d81);// this is for base sepolia 
    address public poolAddressesProvider = address(0x012bAC54348C0E635dCAc9D5FB99f06F24136C9A); // this is seplia testnet
    // address public poolAddressesProvider = address(0xe20fCBdBfFC4Dd138cE8b2E6FBb6CB49777ad64D); // this is for base sepolia 
    uint256 public initialAmount = 10 wei;
    uint8 public leverage = 2;
    Currency public currency0 = Currency.wrap(sepoliaUSDT);
    Currency public currency1 = Currency.wrap(sepoliaUSDC); 
    // Currency public currency0 = Currency.wrap(baseSepoliaUSDC);
    // Currency public currency1 = Currency.wrap(baseSepoliacbBTC); 
    // Currency public c0 = Currency.wrap(baseSepoliaUSDC);
    // Currency public c1 = Currency.wrap(baseSepoliacbBTC); 
    Currency public c0 = Currency.wrap(sepoliaUSDT);
    Currency public c1 = Currency.wrap(sepoliaUSDC); 

    function setUp() public {
        // Deploy fresh pool manager and routers
        // deployFreshManagerAndRouters();
        // deployMintAndApprove2Currencies();
        
        //         deployAndApprovePosm(manager);

        // // Deploy the hook to an address with the correct flags
        // address flags = address(
        //     uint160(
        //         Hooks.BEFORE_SWAP_FLAG | Hooks.AFTER_SWAP_FLAG | Hooks.BEFORE_ADD_LIQUIDITY_FLAG
        //             | Hooks.BEFORE_REMOVE_LIQUIDITY_FLAG
        //     ) ^ (0x4444 << 144) // Namespace the hook to avoid collisions
        // );
        // bytes memory constructorArgs = abi.encode(manager); //Add all the necessary constructor arguments from the hook
        // deployCodeTo("Counter.sol:Counter", constructorArgs, flags);
        // hook = Counter(flags);

        // // Create the pool
        // key = PoolKey(currency0, currency1, 3000, 60, IHooks(hook));
        // poolId = key.toId();
        // manager.initialize(key, SQRT_PRICE_1_1);

        // // Provide full-range liquidity to the pool
        // tickLower = TickMath.minUsableTick(key.tickSpacing);
        // tickUpper = TickMath.maxUsableTick(key.tickSpacing);

        // uint128 liquidityAmount = 100e18;

        // (uint256 amount0Expected, uint256 amount1Expected) = LiquidityAmounts.getAmountsForLiquidity(
        //     SQRT_PRICE_1_1,
        //     TickMath.getSqrtPriceAtTick(tickLower),
        //     TickMath.getSqrtPriceAtTick(tickUpper),
        //     liquidityAmount
        // );

        // (tokenId,) = posm.mint(
        //     key,
        //     tickLower,
        //     tickUpper,
        //     liquidityAmount,
        //     amount0Expected + 1,
        //     amount1Expected + 1,
        //     address(this),
        //     block.timestamp,
        //     ZERO_BYTES
        // );
        // // Create pool with currency0 and c1
        // // PoolKey memory poolKey = PoolKey({
        // //     currency0: c0,
        // //     currency1: c1, 
        // //     fee: 3000,
        // //     tickSpacing: 60,
        // //     hooks: IHooks(address(0))
        // // });
        // deal(Currency.unwrap(currency1), address(this), 1000 ether);
        // deal(Currency.unwrap(currency1), address(this), 1000 ether);
        // // initPoolAndAddLiquidity(c0, c1, IHooks(address(0)), 3000, SQRT_PRICE_1_1);

        // // Deploy the Swapper contract
        // swapper = new Swapper(owner, address(swapRouter), poolAddressesProvider);
        
        swapper = Swapper(sepoliaSwapper);
        // Deal some tokens to the test contract and approve Swapper
        deal(Currency.unwrap(c1), address(this), initialAmount*5);
        deal(Currency.unwrap(c0), address(this), initialAmount*5);
        IERC20(Currency.unwrap(c1)).approve(address(swapper), initialAmount);
    }
    // function testSwap() public { 
    //     // Create a PoolKey for the swap
    //     PoolKey memory key = PoolKey({
    //         currency0: currency0,
    //         currency1: currency1,
    //         fee: 3000,
    //         tickSpacing: 60, // Replace with appropriate tick spacing
    //         hooks: IHooks(address(0))
    //     });
    //     console.log("key:", Currency.unwrap(key.currency0));
    //     // console.log("key:", address(key.currency1));
    //     // Call openPosition and check the resulting state
    //     deal(Currency.unwrap(currency1), address(this), initialAmount);
    //     IERC20(Currency.unwrap(currency1)).transfer(address(swapper), initialAmount);
    //     address receiverAddress = address(this);
    //     address asset = Currency.unwrap(currency1);
    //     uint256 amount = initialAmount;
    //     bytes memory params = abi.encode(amount, leverage, key);
    //     swapper.executeOperation(Currency.unwrap(currency1),initialAmount,0,address(this),params);

    //     // Verify the flash loan was taken and swap was performed
    //     uint256 balanceToken0 = IERC20(Currency.unwrap(currency0)).balanceOf(address(swapper));
    //     uint256 balanceToken1 = IERC20(Currency.unwrap(currency1)).balanceOf(address(swapper));

    //     assertGt(balanceToken0, 0, "Should have some token0 after swap");
    //     assertEq(balanceToken1, 0, "Token1 should be swapped out");
    // }
    // function testExecuteOperation() public {
    //     // Create a PoolKey for the swap
    //     PoolKey memory key = PoolKey({
    //         currency0: c0,
    //         currency1: c1,
    //         fee: 3000,
    //         tickSpacing: 60, // Replace with appropriate tick spacing
    //         hooks: IHooks(address(0))
    //     });
    //     console.log("key:", Currency.unwrap(key.currency0));
    //     // console.log("key:", address(key.currency1));
    //     // Call openPosition and check the resulting state
    //     IERC20(Currency.unwrap(c0)).approve(address(swapper), initialAmount/2);
    //     swapper.openPosition(key, initialAmount/4, leverage);

    //     // Verify the flash loan was taken and swap was performed
    //     uint256 balanceToken0 = IERC20(Currency.unwrap(c0)).balanceOf(address(swapper));
    //     uint256 balanceToken1 = IERC20(Currency.unwrap(c1)).balanceOf(address(swapper));

    //     assertGt(balanceToken0, 0, "Should have some token0 after swap");
    //     assertEq(balanceToken1, 0, "Token1 should be swapped out");
    // }

    function testOpenPosition() public {
        // Create a PoolKey for the swap
        PoolKey memory key = PoolKey({
            currency0: c0,
            currency1: c1,
            fee: 3000,
            tickSpacing: 60, // Replace with appropriate tick spacing
            hooks: IHooks(address(0))
        });
        console.log("key:", Currency.unwrap(key.currency0));
        // console.log("key:", address(key.currency1));
        // Call openPosition and check the resulting state
        IERC20(Currency.unwrap(c0)).approve(address(swapper), initialAmount/2);
        IERC20(Currency.unwrap(c0)).transfer(address(swapper), initialAmount*2);
        console.log("After transfer");
        swapper.openPosition(key, initialAmount/4, leverage);

        // Verify the flash loan was taken and swap was performed
        uint256 balanceToken0 = IERC20(Currency.unwrap(c0)).balanceOf(address(swapper));
        uint256 balanceToken1 = IERC20(Currency.unwrap(c1)).balanceOf(address(swapper));

        assertGt(balanceToken0, 0, "Should have some token0 after swap");
        assertEq(balanceToken1, 0, "Token1 should be swapped out");
    }

    function deal(address token, address to, uint256 amount) internal override{
        vm.store(
            token,
            keccak256(abi.encode(to, uint256(0))),
            bytes32(amount)
        );
    }
}
