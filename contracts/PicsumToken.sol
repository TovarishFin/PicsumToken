pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721Token.sol";


contract PicsumToken is ERC721Token {
  address public creator;
  bytes public uriBase;

  modifier onlyCreator() {
    require(msg.sender == creator);

    _;
  }

  constructor(
    string _name,
    string _symbol,
    string _uriBase
  ) 
    public
    ERC721Token(_name, _symbol)
  {
    creator = msg.sender;
    uriBase = bytes(_uriBase);
    mint(msg.sender);
    mint(msg.sender);
    mint(msg.sender);
  }

  function concatenateUri(
    uint256 _tokenId
  )
    public
    view
    returns (string)
  {
    // max length of 2^256 as a string
    uint256 _maxLength = 78;
    bytes memory _reversed = new bytes(_maxLength);
    uint256 _i = 0;

    while (_tokenId != 0) {
      uint256 _remainder = _tokenId % 10;
      _tokenId = _tokenId.div(10);
      _reversed[_i++] = byte(48 + _remainder);
    }

    bytes memory _bytesString = new bytes(uriBase.length + _i);
    uint256 _j;

    for (_j = 0; _j < uriBase.length; _j++) {
      _bytesString[_j] = uriBase[_j];
    }

    for (_j = 0; _j < _i; _j++) {
      _bytesString[_j + uriBase.length] = _reversed[_i - 1 - _j];
    }

    return string(_bytesString);
  }

  function mint(
    address _to
  )
    public
    onlyCreator
    returns (bool)
  {
    uint256 _newTokenId = totalSupply();
    _mint(_to, _newTokenId);
    _setTokenURI(_newTokenId, concatenateUri(_newTokenId));

    return true;
  }

  function burn(
    uint256 _tokenId
  )
    external
    canTransfer(_tokenId)
    returns (bool)
  {
    address _owner = ownerOf(_tokenId);
    _burn(_owner, _tokenId);

    return true;
  }

  function getOwnerTokens(
    address _owner
  )
    external
    view
    returns (uint256[])
  {
    return ownedTokens[_owner];
  }

}