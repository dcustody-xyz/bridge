// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Bridge} from "../contracts/Bridge.sol";
import {Swapper} from "../contracts/Swapper.sol";

import "wormhole-solidity-sdk/testing/WormholeRelayerTest.sol";

import "forge-std/Test.sol";
import "forge-std/console.sol";

contract BridgeTest is WormholeRelayerBasicTest {
    Bridge public brigeSource;
    Bridge public brigeTarget;
    Swapper public swapperSource;
    Swapper public swapperTarget;

    ERC20Mock public token;
    ERC20Mock public targetToken;

    function setUpSource() public override {
        brigeSource = new Bridge(
            address(relayerSource),
            address(tokenBridgeSource),
            address(wormholeSource)
        );
        swapperSource = new Swapper();

        brigeSource.setSwapper(address(swapperSource), address(swapperSource));

        token = createAndAttestToken(sourceChain);
    }

    function setUpTarget() public override {
        brigeTarget = new Bridge(
            address(relayerTarget),
            address(tokenBridgeTarget),
            address(wormholeTarget)
        );
        swapperTarget = new Swapper();

        brigeTarget.setSwapper(address(swapperTarget), address(swapperTarget));

        targetToken = createAndAttestToken(targetChain);
    }

    function testRemoteDeposit() public {
        uint256 amount = 19e17;

        token.approve(address(brigeSource), amount);

        vm.selectFork(targetFork);
        address recipient = 0x1234567890123456789012345678901234567890;
        address wormholeWrappedToken = tokenBridgeTarget.wrappedAsset(sourceChain, toWormholeFormat(address(token)));

        swapperTarget.setSwap(address(wormholeWrappedToken), address(targetToken), amount, amount);
        // We need to mint the targetToken to the swapperTarget contract to _simulate_ liquidity
        targetToken.mint(address(swapperTarget), amount);

        vm.selectFork(sourceFork);
        uint256 cost = brigeSource.quoteCrossChainDeposit(targetChain);

        vm.recordLogs();
        brigeSource.sendCrossChainDeposit{value: cost}(
            targetChain, address(brigeTarget), recipient, amount, address(token), address(targetToken)
        );
        performDelivery();

        vm.selectFork(targetFork);
        assertEq(targetToken.balanceOf(recipient), amount);
    }
}
