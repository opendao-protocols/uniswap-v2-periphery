const UniswapV2Router02 = artifacts.require("UniswapV2Router02");
const UniswapV2Router01 = artifacts.require("UniswapV2Router01");
const ERC20 = artifacts.require("ERC20")
const WETH = artifacts.require("WETH9")
const ExampleOracleSimple = artifacts.require("ExampleOracleSimple")
const ExampleSlidingWindowOracle = artifacts.require("ExampleSlidingWindowOracle")

const FACTORY_ADDRESS = "0xA818b4F111Ccac7AA31D0BCc0806d64F2E0737D7" // xdai factory address
const WRAPPED_ETH = "0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d" // xdai weth address
const HNY = "0x71850b7e9ee3f13ab46d67167341e4bdc905eef9" // xdai hny address

const toBn = (value) => new web3.utils.toBN(value)
const toBnWithDecimals = (x, y = 18) => toBn((toBn(x).mul(toBn(10).pow(toBn(y)))).toString())

module.exports = async (deployer) => {
  // await deployer.deploy(ERC20, toBnWithDecimals(1000))
  // const token1 = await ERC20.at(ERC20.address)
  // console.log(`Token 1 deployed: ${token1.address}`)
  //
  // await deployer.deploy(ERC20, toBnWithDecimals(1000))
  // const token2 = await ERC20.at(ERC20.address)
  // console.log(`Token 2 deployed: ${token2.address}`)
  //
  // await deployer.deploy(WETH)
  // console.log(`WETH deployed: ${WETH.address}`)
  //
  // await deployer.deploy(UniswapV2Router02, FACTORY_ADDRESS, WETH.address);
  //
  // await token1.approve(UniswapV2Router02.address, toBnWithDecimals(1000))
  // await token2.approve(UniswapV2Router02.address, toBnWithDecimals(1000))
  // console.log(`Approved both tokens for Router to spend`

  // await deployer.deploy(UniswapV2Router02, FACTORY_ADDRESS, WRAPPED_ETH);

  await deployer.deploy(ExampleOracleSimple, FACTORY_ADDRESS, HNY, WRAPPED_ETH)

  const defaultWindowSize = 86400 // 24 hours
  const defaultGranularity = 24 // 1 hour each

  await deployer.deploy(ExampleSlidingWindowOracle, FACTORY_ADDRESS, defaultWindowSize, defaultGranularity)

};
