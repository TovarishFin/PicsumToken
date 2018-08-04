pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721Receiver.sol";
import "openzeppelin-solidity/contracts/Ownership/Ownable.sol";


contract PicsumWallet is ERC721Receiver, Ownable {
  address public nftToken;
  bytes public data;

  event TokenAddressUpdated(
    address _oldAddress,
    address _newAddress
  );

  constructor(
    address _nftToken
  )
    public
  {
    nftToken = _nftToken;
  }

  function updateTokenAddress(
    address _newTokenAddress
  )
    external
    onlyOwner
    returns (bool)
  {
    address _oldAddress = nftToken;
    nftToken = _newTokenAddress;

    emit TokenAddressUpdated(_oldAddress, nftToken);

    return true;
  }

  /// @notice Handle the receipt of an NFT
  /// @dev The ERC721 smart contract calls this function on the
  /// recipient after a `transfer`. This function MAY throw to revert and reject the transfer. Return
  /// of other than the magic value MUST result in the transaction being reverted.
  /// @notice The contract address is always the message sender. 
  /// @param _operator The address which called `safeTransferFrom` function
  /// @param _from The address which previously owned the token
  /// @param _tokenId The NFT identifier which is being transferred
  /// @param _data Additional data with no specified format
  /// @return `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`
  /// unless throwing
  function onERC721Received(
    address _operator, 
    address _from, 
    uint256 _tokenId, 
    bytes _data
  ) 
    public 
    returns(bytes4)
  {
    data = _data;
    return ERC721_RECEIVED;
  }

  // fallback function which can call any token functions that are needed
  function()
    external
    payable
    onlyOwner
  {
    assembly {
      // load nfttoken from storage slot using *_slot suffix
      let _nftToken := sload(nftToken_slot)

      // calldatacopy(t, f, s)
      calldatacopy(
        0x0, // t = mem position to
        0x0, // f = mem position from
        calldatasize // s = size bytes
      )

      // call(g, a, v, in, insize, out, outsize)
      let result := call(
        gas, // g = gas
        _nftToken, // a = address
        callvalue, // equivalent to msg.value
        0x0, // in = mem in  mem[in..(in+insize)
        calldatasize, // insize = mem insize  mem[in..(in+insize)
        0x0, // out = mem out  mem[out..(out+outsize)
        0 // outsize = mem outsize  mem[out..(out+outsize)
      )

      // Check if the call was successful
      if iszero(result) {
        // Revert if call failed
        revert(0, 0)
      }
        // Return if call succeeded
        return(
          0x0,
          0x01 // true
        )
    }
  }
}
