// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {BridgeNative} from "../../contracts/extensions/BridgeNative.sol";

import "wormhole-solidity-sdk/testing/WormholeRelayerTest.sol";

import "forge-std/Test.sol";
import "forge-std/console.sol";

contract BridgeNativeTest is WormholeRelayerBasicTest {
    BridgeNative public brigeSource;
    BridgeNative public brigeTarget;

    ERC20Mock public token;

    function setUpSource() public override {
        brigeSource = new BridgeNative(
            address(relayerSource),
            address(tokenBridgeSource),
            address(wormholeSource)
        );

        token = createAndAttestToken(sourceChain);
    }

    function setUpTarget() public override {
        brigeTarget = new BridgeNative(
            address(relayerTarget),
            address(tokenBridgeTarget),
            address(wormholeTarget)
        );
    }

    function testRemoteDeposit() public {
        uint256 amount = 19e17;
        token.approve(address(brigeSource), amount);

        vm.selectFork(targetFork);
        address recipient = 0x1234567890123456789012345678901234567890;

        vm.selectFork(sourceFork);
        uint256 cost = brigeSource.quoteCrossChainDeposit(targetChain);

        vm.recordLogs();
        brigeSource.sendCrossChainDeposit{value: cost}(
            targetChain, address(brigeTarget), recipient, amount, address(token)
        );
        performDelivery();

        vm.selectFork(targetFork);
        address wormholeWrappedToken = tokenBridgeTarget.wrappedAsset(sourceChain, toWormholeFormat(address(token)));
        assertEq(IERC20(wormholeWrappedToken).balanceOf(recipient), amount);
    }

    function testRemoteNativeDeposit() public {
        uint256 amount = 19e17;

        vm.selectFork(targetFork);
        address recipient = 0x1234567890123456789012345678901234567890;

        vm.selectFork(sourceFork);
        uint256 cost = brigeSource.quoteCrossChainDeposit(targetChain);

        address wethAddress = address(tokenBridgeSource.WETH());

        vm.recordLogs();
        brigeSource.sendNativeCrossChainDeposit{value: cost + amount}(
            targetChain, address(brigeTarget), recipient, amount
        );
        performDelivery();

        vm.selectFork(targetFork);
        address wormholeWrappedToken = tokenBridgeTarget.wrappedAsset(sourceChain, toWormholeFormat(wethAddress));
        assertEq(IERC20(wormholeWrappedToken).balanceOf(recipient), amount);
    }
}
