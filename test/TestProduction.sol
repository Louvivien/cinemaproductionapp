pragma solidity >=0.4.21 <0.7.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/SimpleStorage.sol";

contract TestProduction {

  function testItStoresAValue() public {
    Production production = Production(DeployedAddresses.Production());

    production.addProducer("Steven Spielberg", 12);

    string expected = "Steven Spielberg";

    Assert.equal(production.addProducer(), expected, "It should store the value Steven Spielberg.");
  }

}
