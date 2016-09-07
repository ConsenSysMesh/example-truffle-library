contract('SimpleNameRegistry', function(accounts) {
  it("should set the donate address as the first name", function() {
    var namereg = SimpleNameRegistry.deployed();

    return namereg.names.call("donate").then(function(addr) {
      assert.equal(addr, accounts[0]);
    });
  });

  it("registers new names", function() {
    var namereg = SimpleNameRegistry.deployed();

    return namereg.register("newname", "0x1234567890123456789012345678901234567890").then(function() {
      return namereg.names.call("newname");
    }).then(function(addr) {
      assert.equal(addr, "0x1234567890123456789012345678901234567890");
    });
  });

  it("won't override pre-registered names", function() {
    var namereg = SimpleNameRegistry.deployed();

    return namereg.register("newname", "0x1111111111111111111111111111111111111111").then(function() {
      return namereg.names.call("newname");
    }).then(function(addr) {
      assert.equal(addr, "0x1234567890123456789012345678901234567890");
    });
  });
});
