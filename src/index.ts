import type ASOD from './core';
import { isIdentityOperand, isNeutralOperand } from '@asod/core/utils';

type RingOperationsConfig<
  TAddOperation extends ASOD.IRingAddOperation<any> = ASOD.IRingAddOperation,
  TMulOperation extends ASOD.IRingMulOperation<any> = ASOD.IRingMulOperation,
> = {
  add: TAddOperation;
  mul: TMulOperation;
};

type RingConfig<
  TAddOperation extends ASOD.IRingAddOperation<any> = ASOD.IRingAddOperation,
  TMulOperation extends ASOD.IRingMulOperation<any> = ASOD.IRingMulOperation,
> = {
  operations: RingOperationsConfig<TAddOperation, TMulOperation>;
};

class Ring<
  TElement extends ASOD.Operand<any> = ASOD.Operand,
  TAddOperation extends
    ASOD.IRingAddOperation<any> = ASOD.IRingAddOperation<TElement>,
  TMulOperation extends
    ASOD.IRingMulOperation<any> = ASOD.IRingMulOperation<TElement>,
> implements ASOD.IRing<TElement, TAddOperation, TMulOperation>
{
  protected readonly _implementations: Readonly<
    RingOperationsConfig<TAddOperation, TMulOperation>
  >;

  readonly add: TAddOperation;
  readonly mul: TMulOperation;

  constructor(config: RingConfig<TAddOperation, TMulOperation>) {
    this._implementations = config.operations;

    this.add = this._add as TAddOperation;
    this.mul = this._mul as TMulOperation;
  }

  private _add(a: ASOD.Operand, b: ASOD.Operand): unknown {
    if (isNeutralOperand(a)) return b;
    if (isNeutralOperand(b)) return a;
    return this._implementations.add(a, b);
  }

  private _mul(a: ASOD.Operand, b: ASOD.Operand): unknown {
    if (isIdentityOperand(a)) return b;
    if (isIdentityOperand(b)) return a;
    return this._implementations.mul(a, b);
  }
}

export { Ring };
export default Ring;
