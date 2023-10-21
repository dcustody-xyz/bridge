//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "../contracts/Bridge.sol";
import "./DeployHelpers.s.sol";

contract DeployScript is ScaffoldETHDeploy {
    error InvalidPrivateKey(string);

    // For addresses of relayers and the like, check:
    // https://docs.wormhole.com/wormhole/reference/constants
    address constant relayer = address(0x0591C25ebd0580E0d4F27A82Fc2e24E7489CB5e0); // Mumbai
    address constant tokenBridge = address(0x377D55a7928c046E18eEbb61977e714d2a76472a); // Mumbai
    address constant wormhole = address(0x0CBE91CF822c73C2315FB05100C2F714765d5c20); // Mumbai
    // address constant relayer = address(0x01A957A525a5b7A72808bA9D10c389674E459891); // Optimism Goerli
    // address constant tokenBridge = address(0xC7A204bDBFe983FCD8d8E61D02b475D4073fF97e); // Optimism Goerli
    // address constant wormhole = address(0x6b9C8671cdDC8dEab9c719bB87cBd3e782bA6a35); // Optimism Goerli

    function run() external {
        uint256 deployerPrivateKey = setupLocalhostEnv();
        if (deployerPrivateKey == 0) {
            revert InvalidPrivateKey(
                "You don't have a deployer account. Make sure you have set DEPLOYER_PRIVATE_KEY in .env or use `yarn generate` to generate a new random account"
            );
        }
        vm.startBroadcast(deployerPrivateKey);
        Bridge bridge = new Bridge(
            relayer,
            tokenBridge,
            wormhole
        );
        console.logString(string.concat("Bridge deployed at: ", vm.toString(address(bridge))));
        vm.stopBroadcast();

        /**
         * This function generates the file containing the contracts Abi definitions.
         * These definitions are used to derive the types needed in the custom scaffold-eth hooks, for example.
         * This function should be called last.
         */
        exportDeployments();
    }

    function test() public {}
}
