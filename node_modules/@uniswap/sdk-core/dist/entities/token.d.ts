import { BaseCurrency } from './baseCurrency';
import { Currency } from './currency';
/**
 * Represents an ERC20 token with a unique address and some metadata.
 */
export declare class Token extends BaseCurrency {
    readonly isNative: false;
    readonly isToken: true;
    /**
     * The contract address on the chain on which this token lives
     */
    readonly address: string;
    constructor(chainId: number, address: string, decimals: number, symbol?: string, name?: string);
    /**
     * Returns true if the two tokens are equivalent, i.e. have the same chainId and address.
     * @param other other token to compare
     */
    equals(other: Currency): boolean;
    /**
     * Returns true if the address of this token sorts before the address of the other token
     * @param other other token to compare
     * @throws if the tokens have the same address
     * @throws if the tokens are on different chains
     */
    sortsBefore(other: Token): boolean;
    /**
     * Return this token, which does not need to be wrapped
     */
    get wrapped(): Token;
}
