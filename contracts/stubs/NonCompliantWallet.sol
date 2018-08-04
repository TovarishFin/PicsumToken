pragma solidity ^0.4.24;

import "../PicsumWallet.sol";


contract NonCompliantWallet is PicsumWallet {

  constructor(
    address _nftToken
  )
    PicsumWallet(_nftToken)
    public
  {}

  function onERC721Received(
    address _operator, 
    address _from, 
    uint256 _tokenId, 
    bytes _data
  ) 
    public 
    returns(bytes4)
  {
    return 0x64657270;
  }
}