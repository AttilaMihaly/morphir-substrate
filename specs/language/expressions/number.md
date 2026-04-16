# Number Type Class

## Overview

The Number type class defines operations for numeric types, supporting arithmetic and related transformations. It extends [Equality](equality.md) and [Ordering](ordering.md): numeric values can be compared for equality and relative order.

## Operations

### Addition

Returns the sum of two numbers.

#### Test cases

| Input A | Input B | Output |
| ------- | ------- | ------ |
| 1       | 2       | 3      |
| -1      | 1       | 0      |
| 0       | 0       | 0      |

### Subtraction

Returns the difference of two numbers.

#### Test cases

| Input A | Input B | Output |
| ------- | ------- | ------ |
| 3       | 2       | 1      |
| 1       | 1       | 0      |
| 0       | 3       | -3     |

### Multiplication

Returns the product of two numbers.

#### Test cases

| Input A | Input B | Output |
| ------- | ------- | ------ |
| 3       | 2       | 6      |
| -2      | 3       | -6     |
| 0       | 5       | 0      |

### Division

Returns the quotient of two numbers. Precondition: divisor must not be zero; the result is undefined otherwise.

#### Test cases

| Input A | Input B | Output |
| ------- | ------- | ------ |
| 6       | 2       | 3      |
| 7       | 2       | 3.5    |
| 0       | 5       | 0      |

### Negation

Returns the additive inverse of a number such that `a + negate(a) == 0`.

#### Test cases

| Input | Output |
| ----- | ------ |
| 3     | -3     |
| -3    | 3      |
| 0     | 0      |

### Absolute Value

Returns the non-negative magnitude of a number. Equal to the number itself when non-negative, and its [negation](#negation) otherwise.

#### Test cases

| Input | Output |
| ----- | ------ |
| 3     | 3      |
| -3    | 3      |
| 0     | 0      |

### Modulus

Returns the remainder after dividing the first number by the second. Precondition: divisor must not be zero.

#### Test cases

| Input A | Input B | Output |
| ------- | ------- | ------ |
| 7       | 3       | 1      |
| 6       | 3       | 0      |
| 2       | 5       | 2      |
