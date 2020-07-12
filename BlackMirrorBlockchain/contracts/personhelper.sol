pragma solidity >=0.5.0 <0.6.0;

import "./personworking.sol";

contract PersonHelper is PersonWorking {

  uint levelUpFee = 0.001 ether;

  modifier aboveLevel(uint _level, uint _personId) {
    require(persons[_personId].level >= _level);
    _;
  }

  function withdraw() external onlyOwner {
    address payable _owner = address(uint160(owner()));
    _owner.transfer(address(this).balance);
  }

  function setLevelUpFee(uint _fee) external onlyOwner {
    levelUpFee = _fee;
  }

  function levelUp(uint _personId) external payable {
    require(msg.value == levelUpFee);
    persons[_personId].level = persons[_personId].level.add(1);
  }

  function changeName(uint _personId, string calldata _newName) external aboveLevel(2, _personId) onlyOwnerOf(_personId) {
    persons[_personId].name = _newName;
  }

  function changeDna(uint _personId, uint _newDna) external aboveLevel(20, _personId) onlyOwnerOf(_personId) {
    persons[_personId].dna = _newDna;
  }

  function getPersonsByOwner(address _owner) external view returns(uint[] memory) {
    uint[] memory result = new uint[](ownerPersonCount[_owner]);
    uint counter = 0;
    for (uint i = 0; i < persons.length; i++) {
      if (personToOwner[i] == _owner) {
        result[counter] = i;
        counter++;
      }
    }
    return result;
  }

}
