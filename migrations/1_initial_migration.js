const MyCoin = artifacts.require("MyCoin");

const { Name, TokenSymbol, Decimals, TotalSupply } = require("./TokenConfig.json");

module.exports = function (deployer) {
  deployer.deploy(MyCoin, Name, TokenSymbol, Decimals, TotalSupply);
};
