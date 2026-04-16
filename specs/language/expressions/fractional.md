# Fractional

## Overview

A type class for types supporting division and related operations with non-integer results. Extends [Number](number.md).

### Extended Type Classes

- [Number](number.md)

## Operations

### Division (Required)

Divides one value by another, producing a fractional result. The result may be infinite or undefined (e.g., division by zero).

**Precondition:** Divisor must be non-zero.

#### Test Cases

| Dividend | Divisor | Result |
| -------- | ------- | ------ |
| 7.0      | 2.0     | 3.5    |
| -7.0     | 2.0     | -3.5   |
| 7.0      | -2.0    | -3.5   |
| -7.0     | -2.0    | 3.5    |
| 5.0      | 5.0     | 1.0    |
| 0.0      | 3.0     | 0.0    |

## Type Class Members

- [Floating-Point](floating-point.md)
- [Decimal](decimal.md)
