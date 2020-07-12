pragma solidity >=0.5.0 <0.6.0;

import "./personhelper.sol";
import "./safemath.sol";

contract PersonNetworking is PersonHelper {

  using SafeMath for uint256;

  uint randNonce = 0;
  uint attackVictoryProbability = 70;

  function randMod(uint _modulus) internal returns(uint) {
    randNonce = randNonce.add(1);
    return uint(keccak256(abi.encodePacked(now, msg.sender, randNonce))) % _modulus;
  }

  function Network(uint _personId, uint _targetId) external onlyOwnerOf(_personId) {
    Person storage myPerson = persons[_personId];
    Person storage enemyPerson = persons[_targetId];
    uint rand = randMod(100);
    if (rand <= attackVictoryProbability) {
      myPerson.winCount = myPerson.winCount.add(1);
      myPerson.level = myPerson.level.add(1);
      enemyPerson.lossCount = enemyPerson.lossCount.add(1);
      workAndNetwork(_personId, enemyPerson.dna, "person");
    } else {
      myPerson.lossCount = myPerson.lossCount.add(1);
      enemyPerson.winCount = enemyPerson.winCount.add(1);
      _triggerCooldown(myPerson);
    }
  }
}
