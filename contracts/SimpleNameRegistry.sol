contract SimpleNameRegistry {
  mapping (bytes32 => address) public names;

  function SimpleNameRegistry() {
    names["donate"] = msg.sender;
  }

  function register(bytes32 name, address addr) {
    if (names[name] == 0) {
      names[name] = addr;
    }
  }
}
