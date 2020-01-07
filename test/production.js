constProduction = artifacts.require("./Production.sol");

contract("Production", accounts => {
  it("...should store the producer name.", async () => {
    const ProductionInstance = await Production.deployed();

    // Set value 
    await ProductionInstance.addProducer("Steven Spielberg", 12 { from: accounts[0] });

    // Get stored value
    const storedData = await ProductionInstance.get.call();

    assert.equal(storedData, "Steven Spielberg", "The value was not stored.");
  });
});
