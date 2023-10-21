// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {TokenBase, TokenSender, TokenReceiver} from "wormhole-solidity-sdk/WormholeRelayerSDK.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {Swapper} from "./Swapper.sol";

contract Bridge is TokenSender, TokenReceiver, Ownable {
    using SafeERC20 for IERC20;

    error SwapperFailed();
    error LessThanExpected(uint256 expected, uint256 actual);

    event SwapperChanged(
        address _oldSwapper, address _oldSwapperApprover, address _newSwapper, address _newSwapperApprover
    );

    uint256 constant GAS_LIMIT = 350_000;
    address public swapper;
    address public swapperApprover;

    constructor(address _wormholeRelayer, address _tokenBridge, address _wormhole)
        TokenBase(_wormholeRelayer, _tokenBridge, _wormhole)
        Ownable(msg.sender)
    {}

    function setSwapper(address _swapper, address _swapperApprover) external onlyOwner {
        emit SwapperChanged(swapper, swapperApprover, _swapper, _swapperApprover);

        swapper = _swapper;
        swapperApprover = _swapperApprover;
    }

    function quoteCrossChainDeposit(uint16 targetChain) public view returns (uint256 cost) {
        // Cost of delivering token and payload to targetChain
        uint256 deliveryCost;

        (deliveryCost,) = wormholeRelayer.quoteEVMDeliveryPrice(targetChain, 0, GAS_LIMIT);

        // Total cost: delivery cost + cost of publishing the 'sending token' wormhole message
        cost = deliveryCost + wormhole.messageFee();
    }

    function sendCrossChainDeposit(
        uint16 targetChain,
        address targetBridge,
        address recipient,
        uint256 amount,
        address token,
        address destinationToken
    ) public payable {
        uint256 cost = quoteCrossChainDeposit(targetChain);

        require(msg.value == cost, "msg.value must be quoteCrossChainDeposit(targetChain)");

        IERC20(token).transferFrom(msg.sender, address(this), amount);

        // Prepare the swapper data
        bytes memory swapperData = prepareSwapperData(token, destinationToken, amount, 0);  // Assuming 0 for the toAmount as it wasn't provided


        // Fake swapper data
        bytes memory payload = abi.encode(
            recipient, destinationToken, amount, swapperData
        );

        sendTokenWithPayloadToEvm(
            targetChain,
            targetBridge, // address (on targetChain) to send token and payload to
            payload,
            0, // receiver value
            GAS_LIMIT,
            token, // address of IERC20 token contract
            amount
        );
    }

    function receivePayloadAndTokens(
        bytes memory payload,
        TokenReceived[] memory receivedTokens,
        bytes32, // sourceAddress
        uint16,
        bytes32 // deliveryHash
    ) internal override onlyWormholeRelayer {
        require(receivedTokens.length == 1, "Expected 1 token transfers");

        address sourceToken = receivedTokens[0].tokenAddress;

        (address recipient, address destToken, uint256 destMinAmount, bytes memory swapperData) =
            abi.decode(payload, (address, address, uint256, bytes));

        IERC20 iDestToken = IERC20(destToken);
        uint256 destBalance = iDestToken.balanceOf(address(this));

        // address recipient = abi.decode(payload, (address));
        if (sourceToken != destToken && swapperData.length > 0) {
            IERC20(sourceToken).safeIncreaseAllowance(swapperApprover, receivedTokens[0].amount);

            (bool success,) = swapper.call(swapperData);

            if (!success) revert SwapperFailed();
        }

        uint256 diff = iDestToken.balanceOf(address(this)) - destBalance;

        if (diff < destMinAmount) revert LessThanExpected(destMinAmount, diff);

        iDestToken.safeTransfer(recipient, diff);
    }


    // Define a function to prepare the swapper data
    function prepareSwapperData(
        address _fromToken,
        address _toToken,
        uint256 _fromAmount,
        uint256 _toAmount
    ) internal pure returns (bytes memory) {
        // Create a SimpleData instance with the provided arguments and default values for the rest
        Swapper.SimpleData memory simpleData = Swapper.SimpleData(
            _fromToken,
            _toToken,
            _fromAmount,
            _toAmount,
            0, // expectedAmount
            new address[](0), // callees
            "", // exchangeData
            new uint256[](0), // startIndexes
            new uint256[](0), // values
            payable(address(0)), // beneficiary
            payable(address(0)), // partner
            0, // feePercent
            "", // permit
            0, // deadline
            bytes16(0) // uuid
        );

        // Encode the SimpleData instance with the appropriate function signature
        bytes memory swapperData = abi.encodeWithSignature(
            "simpleSwap((address,address,uint256,uint256,uint256,address[],bytes,uint256[],uint256[],address,address,uint256,bytes,uint256,bytes16))",
            simpleData
        );

        return swapperData;
    }
}
