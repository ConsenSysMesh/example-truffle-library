var SimpleNameRegistry = require("../build/contracts/SimpleNameRegistry.sol.js");

var NameReg = require("../index");

// Note: This uses describe(), instead of contract(), which means this is
// a normal javascript test and doesn't have the state provided by contract().
describe("library interface", function() {
  it("should have a donation address", function(done) {
    NameReg.get("donate", function(err, address) {
      assert.equal(address, "0xc3d2a1629d3990d8b9d9799c8675ec18c6f00247");
      done();
    })
  })
});
