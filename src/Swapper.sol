pragma solidity >=0.8.10;
import {FlashLoanSimpleReceiverBase} from "aave/src/core/contracts/flashloan/base/FlashLoanSimpleReceiverBase.sol";
import {IPoolAddressesProvider} from "aave/src/core/contracts/interfaces/IPoolAddressesProvider.sol";
import {CurrencyLibrary,Currency} from "v4-core/src/types/Currency.sol";
import {IERC20} from "aave/src/core/contracts/dependencies/openzeppelin/contracts/IERC20.sol";
import {IPoolManager} from "v4-core/src/interfaces/IPoolManager.sol";
import {PoolKey} from "v4-core/src/types/PoolKey.sol";
import {IERC20Minimal} from "v4-core/src/interfaces/external/IERC20Minimal.sol";
import "forge-std/console.sol";

import {PoolSwapTest} from "v4-core/src/test/PoolSwapTest.sol";
import {TickMath} from "v4-core/src/libraries/TickMath.sol";

contract  Swapper is FlashLoanSimpleReceiverBase{
    using CurrencyLibrary for Currency;
    address payable owner; // aave address provider 
    PoolSwapTest swapRouter; // uniswap router 

    // slippage tolerance to allow for unlimited price impact
    uint160 public constant MIN_PRICE_LIMIT = TickMath.MIN_SQRT_PRICE + 1;
    uint160 public constant MAX_PRICE_LIMIT = TickMath.MAX_SQRT_PRICE - 1;

 
    constructor(address _owner, address _swapRouter, address _poolAddressesProvider) FlashLoanSimpleReceiverBase(IPoolAddressesProvider(_poolAddressesProvider)) {
        owner = payable(_owner);
        swapRouter = PoolSwapTest(_swapRouter);
    }

    /// @notice Swap tokens
    /// @param key the pool where the swap is happening
    /// @param amountSpecified the amount of tokens to swap. Negative is an exact-input swap
    /// @param zeroForOne whether the swap is token0 -> token1 or token1 -> token0
    /// @param hookData any data to be passed to the pool's hook
    function swap(PoolKey memory key, uint256 amountSpecified, bool zeroForOne, bytes memory hookData) public {
        IPoolManager.SwapParams memory params = IPoolManager.SwapParams({
            zeroForOne: zeroForOne,
            amountSpecified: -int256(amountSpecified),
            sqrtPriceLimitX96: zeroForOne ? MIN_PRICE_LIMIT : MAX_PRICE_LIMIT
        });

        PoolSwapTest.TestSettings memory testSettings = PoolSwapTest.TestSettings({
            takeClaims: false,
            settleUsingBurn: false
        });
        Currency curToChange;

        if(zeroForOne){
            curToChange = key.currency0;
        }
        else{
            curToChange = key.currency1;
        }
        console.log("swapper,",address(this),"balance",key.currency1.balanceOf(address(this)));
        console.log("swapper,",address(this),"balance",key.currency0.balanceOf(address(this)));
        console.log("msg.sender,",address(msg.sender),"balance",key.currency1.balanceOf(address(msg.sender)));
        // IERC20Minimal(addr_cur).transferFrom(msg.sender, address (this), amountSpecified);
        console.log("tansfered");

        IERC20Minimal(Currency.unwrap(key.currency0)).approve(address(swapRouter), type(uint256).max);
        IERC20Minimal(Currency.unwrap(key.currency1)).approve(address(swapRouter), type(uint256).max);
        console.log("balance selected currency",curToChange.balanceOf(address(this)));

        uint256 balance0 = IERC20(Currency.unwrap(key.currency0)).balanceOf(address(this));
        uint256 balance1 = IERC20(Currency.unwrap(key.currency1)).balanceOf(address(this));
        console.log("currency0 balance", balance0);
        console.log("currency1 balance", balance1);
        console.log("manager balance0: ", key.currency0.balanceOf(address(swapRouter.manager())));
        console.log("manager balance1: ", key.currency1.balanceOf(address(swapRouter.manager())));
        console.log("amount", params.amountSpecified);
        console.log("ZeroForOne", params.zeroForOne);
        console.log("Here We Are 2");
        // swapRouter.swap(key, params, testSettings, hookData);
        console.log("Here We Are 3");

    }
    function openPosition(PoolKey memory key, uint256 _amount, uint8 leverage) public {
        console.log("Open Position amount: ",_amount,"leverage: ",leverage);
        address receiverAddress = address(this);
        address asset = Currency.unwrap(key.currency1);
        uint256 amount = _amount * leverage;
        bytes memory params = abi.encode(_amount, leverage, key);
        uint16 referralCode = 0;
        POOL.flashLoanSimple(
            receiverAddress,
            asset,
            amount,
            params,
            referralCode
        );
    }
    function executeOperation(
        address asset,
        uint256 amount,
        uint256 premium,
        address initiator,
        bytes calldata params
    ) external override returns (bool) {
        (uint256 _amount, uint8 leverage, PoolKey memory key) = abi.decode(params, (uint256, uint8, PoolKey));
        console.log("FL Received, token", asset,"amount",amount);
        console.log("balance of ", address(this),"amount",IERC20(asset).balanceOf(address(this)));

        // Step 1: Swap key.token1 (asset) to key.token0
        // IERC20(asset).approve(address(swapRouter), amount);
        // console.log("asset",asset);
        // console.logStruct("key",key);
        swap(key, amount/2, true, "");

        console.log("Here We Are 4");
        // Step 2: Supply key.token0 as collateral to Aave
        uint256 swappedAmount = IERC20(Currency.unwrap(key.currency0)).balanceOf(address(this));
        IERC20(Currency.unwrap(key.currency0)).approve(address(POOL), swappedAmount);
        console.log("Here We Are 5");

        POOL.supply(Currency.unwrap(key.currency0), swappedAmount, address(this), 0);
        console.log("Here We Are 6");

        POOL.setUserUseReserveAsCollateral(Currency.unwrap(key.currency0), true);
        console.log("Here We Are 7");
        // Step 3: Borrow from Aave
        uint256 amountOwed = amount + premium;
        POOL.borrow(Currency.unwrap(key.currency0), amountOwed, 2, 0, address(this));

        // Step 4: Approve the flash loan payback
        IERC20(asset).approve(address(POOL), amountOwed);

        return true;
    }
}