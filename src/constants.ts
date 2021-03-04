import JSBI from 'jsbi'

// exports for external consumption
export type BigintIsh = JSBI | bigint | string

export enum ChainId {
  MAINNET = 1,
  ROPSTEN = 3,
  RINKEBY = 4,
  GÖRLI = 5,
  KOVAN = 42,
  XDAI = 100
}

export enum TradeType {
  EXACT_INPUT,
  EXACT_OUTPUT
}

export enum Rounding {
  ROUND_DOWN,
  ROUND_HALF_UP,
  ROUND_UP
}

const FACTORY_ADDRESS = '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f'
const INIT_CODE_HASH = '0x96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f'

const FACTORY_ADDRESS_XDAI = '0xA818b4F111Ccac7AA31D0BCc0806d64F2E0737D7'
const INIT_CODE_HASH_XDAI = '0x3f88503e8580ab941773b59034fb4b2a63e86dbc031b3633a925533ad3ed2b93'

interface FactoryParams {
  factoryAddress: string
  initCode: string
}

export function getFactoryParams(chainId: ChainId): FactoryParams {
  if (chainId === ChainId.XDAI) {
    return {
      factoryAddress: FACTORY_ADDRESS_XDAI,
      initCode: INIT_CODE_HASH_XDAI
    }
  } else {
    return {
      factoryAddress: FACTORY_ADDRESS,
      initCode: INIT_CODE_HASH
    }
  }
}

export const MINIMUM_LIQUIDITY = JSBI.BigInt(1000)

// exports for internal consumption
export const ZERO = JSBI.BigInt(0)
export const ONE = JSBI.BigInt(1)
export const TWO = JSBI.BigInt(2)
export const THREE = JSBI.BigInt(3)
export const FIVE = JSBI.BigInt(5)
export const TEN = JSBI.BigInt(10)
export const _100 = JSBI.BigInt(100)
export const _997 = JSBI.BigInt(997)
export const _1000 = JSBI.BigInt(1000)

export enum SolidityType {
  uint8 = 'uint8',
  uint256 = 'uint256'
}

export const SOLIDITY_TYPE_MAXIMA = {
  [SolidityType.uint8]: JSBI.BigInt('0xff'),
  [SolidityType.uint256]: JSBI.BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
}
