const Production = artifacts.require("./Production.sol");

require("chai")
  .use(require("chai-as-promised"))
  .should();

contract("Production", accounts => {
  let production;

  before(async () => {
    production = await Production.deployed();
  });

  describe("deployment", async () => {
    it("deploys successfully", async () => {
      const address = await production.address;
      assert.notEqual(address, 0x0);
      assert.notEqual(address, "");
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
    });

    it("has a name", async () => {
      const name = await production.name();
      assert.equal(name, "Dapp Production");
    });
  });

  describe("producers", async () => {
    let result, producersCount;

    before(async () => {
      result = await production.addProducer("Steven Spielberg", 12, {
        from: accounts[0]
      });
      producersCount = await production.producersCount();
    });

    it("it is possible to add producers", async () => {
      // SUCCESS
      assert.equal(producersCount, 1);
      const event = result.logs[0].args;
      assert.equal(
        assert.equal(
          event.id.toNumber(),
          producersCount.toNumber(),
          "id is correct"
        )
      );
      assert.equal(event.name, "Steven Spielberg", "name is correct");
      assert.equal(event.producerShare, "12", "producerShare is correct");

      // FAILURE: Producer must have a name
      await production.addProducer("", 12, { from: accounts[0] }).should.be
        .rejected;
      // FAILURE: Producer must have a share
      await production.addProducer("Brad Pitt", 0, { from: accounts[0] }).should
        .be.rejected;
    });
  });

  describe("revenues", async () => {
    let result, revenuesCount;

    before(async () => {
      result = await production.addRevenue(100, {
        from: accounts[0]
      });
      revenuesCount = await production.revenuesCount();
    });

    it("it is possible to add revenues", async () => {
      // SUCCESS
      assert.equal(revenuesCount, 1);
      const event = result.logs[0].args;
      assert.equal(
        assert.equal(
          event.id.toNumber(),
          revenuesCount.toNumber(),
          "id is correct"
        )
      );
      assert.equal(event._revenueAmount, 100, "amount is correct");

      // FAILURE: Amount must be specified
      await production.addRevenue("", { from: accounts[0] }).should.be.rejected;
    });
  });
});
