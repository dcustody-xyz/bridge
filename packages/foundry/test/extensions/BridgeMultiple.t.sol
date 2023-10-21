// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {BridgeMultiple} from "../../contracts/extensions/BridgeMultiple.sol";

import "wormhole-solidity-sdk/testing/WormholeRelayerTest.sol";

import "forge-std/Test.sol";
import "forge-std/console.sol";

contract BridgeMultipleTest is WormholeRelayerBasicTest {
    event GreetingReceived(string greeting, uint16 senderChain, address sender);

    BridgeMultiple public brigeSource;
    BridgeMultiple public brigeTarget;

    ERC20Mock public tokenA;
    ERC20Mock public tokenB;

    function setUpSource() public override {
        brigeSource = new BridgeMultiple(
            address(relayerSource),
            address(tokenBridgeSource),
            address(wormholeSource)
        );

        tokenA = createAndAttestToken(sourceChain);
        tokenB = createAndAttestToken(sourceChain);
    }

    function setUpTarget() public override {
        brigeTarget = new BridgeMultiple(
            address(relayerTarget),
            address(tokenBridgeTarget),
            address(wormholeTarget)
        );
    }

    function testRemoteLP() public {
        uint256 amountA = 19e17;
        tokenA.approve(address(brigeSource), amountA);
        uint256 amountB = 13e17;
        tokenB.approve(address(brigeSource), amountB);

        vm.selectFork(targetFork);
        address recipient = 0x1234567890123456789012345678901234567890;

        vm.selectFork(sourceFork);
        uint256 cost = brigeSource.quoteCrossChainDeposit(targetChain);

        vm.recordLogs();
        brigeSource.sendCrossChainDeposit{value: cost}(
            targetChain, address(brigeTarget), recipient, amountA, address(tokenA), amountB, address(tokenB)
        );
        performDelivery();

        vm.selectFork(targetFork);

        address wormholeWrappedTokenA = tokenBridgeTarget.wrappedAsset(sourceChain, toWormholeFormat(address(tokenA)));
        assertEq(IERC20(wormholeWrappedTokenA).balanceOf(recipient), amountA);

        address wormholeWrappedTokenB = tokenBridgeTarget.wrappedAsset(sourceChain, toWormholeFormat(address(tokenB)));
        assertEq(IERC20(wormholeWrappedTokenB).balanceOf(recipient), amountB);
    }
}
