const UniswapV2Router02 = artifacts.require("UniswapV2Router02");

const FACTORY_ADDRESS = "0xfcFcE16719BADb86385BE072837f8844BA56398d"
const WRAPPED_ETH = "0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d"

module.exports = async (deployer) => {
  await deployer.deploy(UniswapV2Router02, FACTORY_ADDRESS, WRAPPED_ETH);
};