pragma solidity >=0.5.0 <0.6.0;

import "./ownable.sol";
import "./safemath.sol";

contract PersonFactory is Ownable {

  using SafeMath for uint256;
  using SafeMath32 for uint32;
  using SafeMath16 for uint16;

  event NewPerson(uint personId, string name, uint dna);

  uint dnaDigits = 16;
  uint dnaModulus = 10 ** dnaDigits;
  uint cooldownTime = 1 days;

  struct Person {
    string name;
    uint dna;
    uint32 level;
    uint32 readyTime;
    uint16 winCount;
    uint16 lossCount;
  }

  Person[] public persons;

  mapping (uint => address) public personToOwner;
  mapping (address => uint) ownerPersonCount;

  function _createPerson(string memory _name, uint _dna) internal {
    uint id = persons.push(Person(_name, _dna, 1, uint32(now + cooldownTime), 0, 0)) - 1;
    personToOwner[id] = msg.sender;
    ownerPersonCount[msg.sender] = ownerPersonCount[msg.sender].add(1);
    emit NewPerson(id, _name, _dna);
  }

  function _generateRandomDna(string memory _str) private view returns (uint) {
    uint rand = uint(keccak256(abi.encodePacked(_str)));
    return rand % dnaModulus;
  }

  function createRandomPerson(string memory _name) public {
    require(ownerPersonCount[msg.sender] == 0);
    uint randDna = _generateRandomDna(_name);
    randDna = randDna - randDna % 100;
    _createPerson(_name, randDna);
  }

}
