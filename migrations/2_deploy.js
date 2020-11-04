const UniswapV2Router02 = artifacts.require("UniswapV2Router02");
const UniswapV2Router01 = artifacts.require("UniswapV2Router01");
const Factory = artifacts.require("IUniswapV2Factory")
const ERC20 = artifacts.require("ERC20")
const WETH = artifacts.require("WETH9")
const IncentivisedSlidingWindowOracle = artifacts.require("IncentivisedSlidingWindowOracle")

// const FACTORY_ADDRESS = "0xA818b4F111Ccac7AA31D0BCc0806d64F2E0737D7" // xdai factory address
// const WRAPPED_ETH = "0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d" // xdai weth address
// const HNY = "0x71850b7e9ee3f13ab46d67167341e4bdc905eef9" // xdai hny address
// const INCENTIVISED_PAIR = "0x4505b262dc053998c10685dc5f9098af8ae5c8ad" // xdai/hny pair on xdai

const FACTORY_ADDRESS = "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f" // rinkeby factory address
const UNISWAP_V2_ROUTER_02 = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D" // rinkeby router
const INCENTIVISED_PAIR = "" // xdai/hny pair on rinkeby
const HNY = "0x658BD9EE8788014b3DBf2bf0d66af344d84a5aA1" // rinkeby
const DAI = "0x848a3752aEcF096B68deb2143714F6b62F899C8e" // rinkeby

const toBn = (value) => new web3.utils.toBN(value)
const toBnWithDecimals = (x, y = 18) => toBn((toBn(x).mul(toBn(10).pow(toBn(y)))).toString())
const onePercent = toBnWithDecimals(1, 16)

module.exports = async (deployer) => {
  // await deployer.deploy(ERC20, toBnWithDecimals(10000))
  // const hny = await ERC20.at(ERC20.address)
  const hny = await ERC20.at(HNY)
  console.log(`Honey: ${hny.address}`)

  // await deployer.deploy(ERC20, toBnWithDecimals(100000))
  // const wxdai = await ERC20.at(ERC20.address)
  const wxdai = await ERC20.at(DAI)
  console.log(`xDAI: ${wxdai.address}`)

  const uniswapV2Router02 = await UniswapV2Router02.at(UNISWAP_V2_ROUTER_02)
  const factory = await Factory.at(FACTORY_ADDRESS)

  console.log(`Approving hny for liquidity...`)
  await hny.approve(uniswapV2Router02.address, toBnWithDecimals(1000))
  console.log(`Approving wxdai for liquidity...`)
  await wxdai.approve(uniswapV2Router02.address, toBnWithDecimals(100000))

  console.log(`Adding liquidity...`)
  await uniswapV2Router02.addLiquidity(hny.address, wxdai.address, toBnWithDecimals(1000), toBnWithDecimals(100000),
    0, 0, (await web3.eth.getAccounts())[0], toBn(99999999999999999))

  const incentivisedPair = await factory.getPair(hny.address, wxdai.address)

  const defaultWindowSize = 86400 // 24 hours
  const defaultGranularity = 24 // 1 hour each

  // await deployer.deploy(IncentivisedSlidingWindowOracle, FACTORY_ADDRESS, defaultWindowSize,
  //   defaultGranularity, HNY, onePercent, INCENTIVISED_PAIR) // xDAI

  console.log(`Deploying incentivised price oracle...`)
  const priceOracle = await deployer.deploy(IncentivisedSlidingWindowOracle, FACTORY_ADDRESS, defaultWindowSize,
    defaultGranularity, hny.address, onePercent, incentivisedPair) // Rinkeby

  console.log(`Transfer incentive token to oracle...`)
  // await (await ERC20.at("0x6a2D6EeA302e7C4c8Abe3b4F04FdB2443459283A")).transfer(toBnWithDecimals(1000), priceOracle.address)
  await hny.transfer(priceOracle.address, toBnWithDecimals(1000))

};
