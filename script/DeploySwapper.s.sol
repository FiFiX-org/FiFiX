// SPDX-License-Identifier: MIT
pragma solidity >=0.8.10;

import {Script} from "forge-std/Script.sol";
import {Swapper} from "../src/Swapper.sol";

import "forge-std/console.sol";

contract DeploySwapper is Script {
    address public owner = address(0x123);
    address public swapRouter = address(0x456); // Replace with actual swapRouter address
    address public poolAddressesProvider = address(0x012bAC54348C0E635dCAc9D5FB99f06F24136C9A); // sepolia address provider 
    function run() external {
        uint privateKey = vm.envUint("DEV_PRIVATE_KEY");
        address account = vm.addr(privateKey);
        vm.startBroadcast(privateKey);

        Swapper swapper = new Swapper(owner,swapRouter,poolAddressesProvider);

        console.log("Swapper deployed at:", address(swapper));

        vm.stopBroadcast();
    }
}