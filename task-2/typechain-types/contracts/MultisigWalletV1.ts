/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../common";

export interface MultisigWalletV1Interface extends utils.Interface {
  functions: {
    "USDT_ADDRESS()": FunctionFragment;
    "WETH_ADDRESS()": FunctionFragment;
    "approve(uint256)": FunctionFragment;
    "approved(uint256,address)": FunctionFragment;
    "confirmations()": FunctionFragment;
    "depositToken(address,uint256)": FunctionFragment;
    "execute(uint256)": FunctionFragment;
    "isOwner(address)": FunctionFragment;
    "owners(uint256)": FunctionFragment;
    "revoke(uint256)": FunctionFragment;
    "submitETH(address,uint256,bytes)": FunctionFragment;
    "submitToken(address,uint256,bytes,string)": FunctionFragment;
    "transactions(uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "USDT_ADDRESS"
      | "WETH_ADDRESS"
      | "approve"
      | "approved"
      | "confirmations"
      | "depositToken"
      | "execute"
      | "isOwner"
      | "owners"
      | "revoke"
      | "submitETH"
      | "submitToken"
      | "transactions"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "USDT_ADDRESS",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "WETH_ADDRESS",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "approve",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "approved",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "confirmations",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "depositToken",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "execute",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "isOwner",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "owners",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "revoke",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "submitETH",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "submitToken",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "transactions",
    values: [PromiseOrValue<BigNumberish>]
  ): string;

  decodeFunctionResult(
    functionFragment: "USDT_ADDRESS",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "WETH_ADDRESS",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "approved", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "confirmations",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "depositToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "execute", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "isOwner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owners", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "revoke", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "submitETH", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "submitToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transactions",
    data: BytesLike
  ): Result;

  events: {
    "Approve(address,uint256)": EventFragment;
    "Deposit(address,uint256)": EventFragment;
    "Execute(uint256)": EventFragment;
    "Revoke(address,uint256)": EventFragment;
    "Submit(uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Approve"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Deposit"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Execute"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Revoke"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Submit"): EventFragment;
}

export interface ApproveEventObject {
  owner: string;
  txId: BigNumber;
}
export type ApproveEvent = TypedEvent<[string, BigNumber], ApproveEventObject>;

export type ApproveEventFilter = TypedEventFilter<ApproveEvent>;

export interface DepositEventObject {
  sender: string;
  amount: BigNumber;
}
export type DepositEvent = TypedEvent<[string, BigNumber], DepositEventObject>;

export type DepositEventFilter = TypedEventFilter<DepositEvent>;

export interface ExecuteEventObject {
  txId: BigNumber;
}
export type ExecuteEvent = TypedEvent<[BigNumber], ExecuteEventObject>;

export type ExecuteEventFilter = TypedEventFilter<ExecuteEvent>;

export interface RevokeEventObject {
  owner: string;
  txId: BigNumber;
}
export type RevokeEvent = TypedEvent<[string, BigNumber], RevokeEventObject>;

export type RevokeEventFilter = TypedEventFilter<RevokeEvent>;

export interface SubmitEventObject {
  txId: BigNumber;
}
export type SubmitEvent = TypedEvent<[BigNumber], SubmitEventObject>;

export type SubmitEventFilter = TypedEventFilter<SubmitEvent>;

export interface MultisigWalletV1 extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: MultisigWalletV1Interface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    USDT_ADDRESS(overrides?: CallOverrides): Promise<[string]>;

    WETH_ADDRESS(overrides?: CallOverrides): Promise<[string]>;

    approve(
      _txId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    approved(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    confirmations(overrides?: CallOverrides): Promise<[BigNumber]>;

    depositToken(
      token: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    execute(
      _txId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    isOwner(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    owners(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    revoke(
      _txId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    submitETH(
      _to: PromiseOrValue<string>,
      _value: PromiseOrValue<BigNumberish>,
      _data: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    submitToken(
      _to: PromiseOrValue<string>,
      _value: PromiseOrValue<BigNumberish>,
      _data: PromiseOrValue<BytesLike>,
      name: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    transactions(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [string, BigNumber, string, boolean, string] & {
        to: string;
        value: BigNumber;
        data: string;
        executed: boolean;
        name: string;
      }
    >;
  };

  USDT_ADDRESS(overrides?: CallOverrides): Promise<string>;

  WETH_ADDRESS(overrides?: CallOverrides): Promise<string>;

  approve(
    _txId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  approved(
    arg0: PromiseOrValue<BigNumberish>,
    arg1: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  confirmations(overrides?: CallOverrides): Promise<BigNumber>;

  depositToken(
    token: PromiseOrValue<string>,
    amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  execute(
    _txId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  isOwner(
    arg0: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  owners(
    arg0: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  revoke(
    _txId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  submitETH(
    _to: PromiseOrValue<string>,
    _value: PromiseOrValue<BigNumberish>,
    _data: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  submitToken(
    _to: PromiseOrValue<string>,
    _value: PromiseOrValue<BigNumberish>,
    _data: PromiseOrValue<BytesLike>,
    name: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  transactions(
    arg0: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<
    [string, BigNumber, string, boolean, string] & {
      to: string;
      value: BigNumber;
      data: string;
      executed: boolean;
      name: string;
    }
  >;

  callStatic: {
    USDT_ADDRESS(overrides?: CallOverrides): Promise<string>;

    WETH_ADDRESS(overrides?: CallOverrides): Promise<string>;

    approve(
      _txId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    approved(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    confirmations(overrides?: CallOverrides): Promise<BigNumber>;

    depositToken(
      token: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    execute(
      _txId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    isOwner(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    owners(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    revoke(
      _txId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    submitETH(
      _to: PromiseOrValue<string>,
      _value: PromiseOrValue<BigNumberish>,
      _data: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    submitToken(
      _to: PromiseOrValue<string>,
      _value: PromiseOrValue<BigNumberish>,
      _data: PromiseOrValue<BytesLike>,
      name: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    transactions(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [string, BigNumber, string, boolean, string] & {
        to: string;
        value: BigNumber;
        data: string;
        executed: boolean;
        name: string;
      }
    >;
  };

  filters: {
    "Approve(address,uint256)"(
      owner?: PromiseOrValue<string> | null,
      txId?: PromiseOrValue<BigNumberish> | null
    ): ApproveEventFilter;
    Approve(
      owner?: PromiseOrValue<string> | null,
      txId?: PromiseOrValue<BigNumberish> | null
    ): ApproveEventFilter;

    "Deposit(address,uint256)"(
      sender?: PromiseOrValue<string> | null,
      amount?: null
    ): DepositEventFilter;
    Deposit(
      sender?: PromiseOrValue<string> | null,
      amount?: null
    ): DepositEventFilter;

    "Execute(uint256)"(
      txId?: PromiseOrValue<BigNumberish> | null
    ): ExecuteEventFilter;
    Execute(txId?: PromiseOrValue<BigNumberish> | null): ExecuteEventFilter;

    "Revoke(address,uint256)"(
      owner?: PromiseOrValue<string> | null,
      txId?: PromiseOrValue<BigNumberish> | null
    ): RevokeEventFilter;
    Revoke(
      owner?: PromiseOrValue<string> | null,
      txId?: PromiseOrValue<BigNumberish> | null
    ): RevokeEventFilter;

    "Submit(uint256)"(
      txId?: PromiseOrValue<BigNumberish> | null
    ): SubmitEventFilter;
    Submit(txId?: PromiseOrValue<BigNumberish> | null): SubmitEventFilter;
  };

  estimateGas: {
    USDT_ADDRESS(overrides?: CallOverrides): Promise<BigNumber>;

    WETH_ADDRESS(overrides?: CallOverrides): Promise<BigNumber>;

    approve(
      _txId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    approved(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    confirmations(overrides?: CallOverrides): Promise<BigNumber>;

    depositToken(
      token: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    execute(
      _txId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    isOwner(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owners(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    revoke(
      _txId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    submitETH(
      _to: PromiseOrValue<string>,
      _value: PromiseOrValue<BigNumberish>,
      _data: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    submitToken(
      _to: PromiseOrValue<string>,
      _value: PromiseOrValue<BigNumberish>,
      _data: PromiseOrValue<BytesLike>,
      name: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    transactions(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    USDT_ADDRESS(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    WETH_ADDRESS(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    approve(
      _txId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    approved(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    confirmations(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    depositToken(
      token: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    execute(
      _txId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    isOwner(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    owners(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    revoke(
      _txId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    submitETH(
      _to: PromiseOrValue<string>,
      _value: PromiseOrValue<BigNumberish>,
      _data: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    submitToken(
      _to: PromiseOrValue<string>,
      _value: PromiseOrValue<BigNumberish>,
      _data: PromiseOrValue<BytesLike>,
      name: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    transactions(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
