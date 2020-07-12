pragma solidity >=0.5.0 <0.6.0;

import "./personfactory.sol";

contract KittyInterface {
  function getKitty(uint256 _id) external view returns (
    bool isGestating,
    bool isReady,
    uint256 cooldownIndex,
    uint256 nextActionAt,
    uint256 siringWithId,
    uint256 birthTime,
    uint256 matronId,
    uint256 sireId,
    uint256 generation,
    uint256 genes
  );
}

contract PersonWorking is PersonFactory {

  KittyInterface kittyContract;

  modifier onlyOwnerOf(uint _personId) {
    require(msg.sender == personToOwner[_personId]);
    _;
  }

  function setKittyContractAddress(address _address) external onlyOwner {
    kittyContract = KittyInterface(_address);
  }

  function _triggerCooldown(Person storage _person) internal {
    _person.readyTime = uint32(now + cooldownTime);
  }

  function _isReady(Person storage _person) internal view returns (bool) {
      return (_person.readyTime <= now);
  }

  function workAndNetwork(uint _personId, uint _targetDna, string memory _species) internal onlyOwnerOf(_personId) {
    Person storage myPerson = persons[_personId];
    require(_isReady(myPerson));
    _targetDna = _targetDna % dnaModulus;
    uint newDna = (myPerson.dna + _targetDna) / 2;
    if (keccak256(abi.encodePacked(_species)) == keccak256(abi.encodePacked("kitty"))) {
      newDna = newDna - newDna % 100 + 99;
    }
    _createPerson("NoName", newDna);
    _triggerCooldown(myPerson);
  }

  function workOnKitty(uint _personId, uint _kittyId) public {
    uint kittyDna;
    (,,,,,,,,,kittyDna) = kittyContract.getKitty(_kittyId);
    workAndNetwork(_personId, kittyDna, "kitty");
  }
}
