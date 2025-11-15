import ASOD from '@asod/core';

declare module '@asod/core' {
  /**
   * @def `(∀ a, b ∈ F)`: `a + b = b + a`
   * @def `(∀ a, b, c ∈ F)`: `(a + b) + c = a + (b + c)`
   */
  interface IRingAddOperation<
    TLeftOperand extends Operand<any> = Operand,
    TRightOperand extends Operand<any> = TLeftOperand,
    TResult = TLeftOperand | TRightOperand,
  > extends ICommutativeOperation<TLeftOperand, TRightOperand, TResult>,
      IAssociativeOperation<TLeftOperand, TRightOperand, TResult> {}

  /**
   * @def `(∀ a, b ∈ F)`: `a + b = b + a`
   * @def `(∀ a, b, c ∈ F)`: `(a + b) * c = (a * c) + (b * c)`
   */
  interface IRingMulOperation<
    TLeftOperand extends Operand<any> = Operand,
    TRightOperand extends Operand<any> = TLeftOperand,
    TResult = TLeftOperand | TRightOperand,
  > extends ICommutativeOperation<TLeftOperand, TRightOperand, TResult>,
      IDistributiveOperation<TLeftOperand, TRightOperand, TResult> {}

  interface IRing<
    TElement extends Operand<any> = Operand,
    TAddOperation extends IRingAddOperation<any> = IRingAddOperation<TElement>,
    TMulOperation extends IRingMulOperation<any> = IRingMulOperation<TElement>,
  > {
    add: TAddOperation;
    mul: TMulOperation;
  }
}

export = ASOD;
export as namespace ASOD;
