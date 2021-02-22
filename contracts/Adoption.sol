pragma solidity ^0.5.0;

contract Adoption {
address[16] public adopters;

// Adopting a pet
function adopt(uint petId) public returns (uint) {
  require(adopters[petId]==0x0000000000000000000000000000000000000000, "This has already been adopted");
  require(petId >= 0 && petId <= 15);

  adopters[petId] = msg.sender;

  return petId;
}

// Retrieving the adopters
function getAdopters() public view returns (address[16] memory) {
  return adopters;
}

function abandon (uint petId) public returns (uint) {
  require(adopters[petId] == msg.sender, "This can only be done by owner of this pet. Sorry you are not owner");
  adopters[petId] = 0x0000000000000000000000000000000000000000;
  return petId;
}



}