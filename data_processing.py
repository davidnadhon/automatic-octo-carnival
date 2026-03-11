"""
Data processing utilities.

This module provides functions for common data-processing tasks.
Each function exists in two forms:
  - an original (slow) implementation that exhibits a common inefficiency
  - an optimised replacement that fixes that inefficiency

The "slow" variants are kept for reference and benchmarking; production
code should use the optimised variants.
"""

from __future__ import annotations

import heapq
import re
from collections import Counter
from functools import lru_cache
from typing import Iterable


# ---------------------------------------------------------------------------
# 1. Membership test: list vs set
# ---------------------------------------------------------------------------

def has_duplicates_slow(items: list) -> bool:
    """Return True if *items* contains any duplicate values.

    Inefficiency: iterates over the already-seen list with the ``in``
    operator, giving O(n²) overall time complexity.
    """
    seen = []
    for item in items:
        if item in seen:          # O(n) membership test on a list
            return True
        seen.append(item)
    return False


def has_duplicates(items: list) -> bool:
    """Return True if *items* contains any duplicate values.

    Improvement: uses a ``set`` for O(1) membership tests, reducing
    overall time complexity from O(n²) to O(n).
    """
    seen: set = set()
    for item in items:
        if item in seen:          # O(1) membership test on a set
            return True
        seen.add(item)
    return False


# ---------------------------------------------------------------------------
# 2. String building: += in a loop vs str.join
# ---------------------------------------------------------------------------

def build_csv_row_slow(values: list[str]) -> str:
    """Join *values* into a comma-separated string.

    Inefficiency: uses ``+=`` inside a loop.  Because strings are
    immutable, every concatenation allocates a new string object,
    leading to O(n²) memory copies for *n* values.
    """
    result = ""
    for i, v in enumerate(values):
        if i > 0:
            result += ","
        result += v
    return result


def build_csv_row(values: list[str]) -> str:
    """Join *values* into a comma-separated string.

    Improvement: delegates to ``str.join``, which pre-allocates a
    single buffer and fills it in one pass — O(n) time and memory.
    """
    return ",".join(values)


# ---------------------------------------------------------------------------
# 3. Repeated expensive computation inside a loop
# ---------------------------------------------------------------------------

def find_matching_lines_slow(lines: list[str], pattern: str) -> list[str]:
    """Return the lines from *lines* that match *pattern*.

    Inefficiency: ``re.compile`` (or the equivalent ``re.search``
    short-hand) recompiles the regular expression on every iteration.
    """
    return [line for line in lines if re.search(pattern, line)]


def find_matching_lines(lines: list[str], pattern: str) -> list[str]:
    """Return the lines from *lines* that match *pattern*.

    Improvement: compiles the regular expression once before the loop.
    Regex compilation is non-trivial; hoisting it out of the loop
    eliminates redundant work.
    """
    compiled = re.compile(pattern)
    return [line for line in lines if compiled.search(line)]


# ---------------------------------------------------------------------------
# 4. Redundant passes over the data
# ---------------------------------------------------------------------------

def word_stats_slow(text: str) -> dict[str, int]:
    """Return a word-frequency mapping for *text*.

    Inefficiency: iterates over ``words`` twice — once to build a
    unique-word list, and again to count occurrences of each word.
    Each ``words.count(w)`` call is itself an O(n) scan, making the
    overall algorithm O(n²).
    """
    words = text.lower().split()
    unique_words = list(set(words))
    return {w: words.count(w) for w in unique_words}   # O(n) per word


def word_stats(text: str) -> dict[str, int]:
    """Return a word-frequency mapping for *text*.

    Improvement: ``collections.Counter`` counts all words in a single
    O(n) pass, and returns a ready-to-use mapping.
    """
    return dict(Counter(text.lower().split()))


# ---------------------------------------------------------------------------
# 5. Redundant sorting
# ---------------------------------------------------------------------------

def get_top_n_slow(numbers: list[int], n: int) -> list[int]:
    """Return the *n* largest values in *numbers*, in descending order.

    Inefficiency: sorts the entire list (O(m log m) where m = len(numbers))
    even though only the *n* largest elements are needed.
    """
    sorted_numbers = sorted(numbers, reverse=True)
    return sorted_numbers[:n]


def get_top_n(numbers: list[int], n: int) -> list[int]:
    """Return the *n* largest values in *numbers*, in descending order.

    Improvement: ``heapq.nlargest`` runs in O(m log n) time (where
    m = len(numbers)) — much faster than a full sort when n << m.
    """
    return heapq.nlargest(n, numbers)


# ---------------------------------------------------------------------------
# 6. Recomputing the same result on every call
# ---------------------------------------------------------------------------

def fibonacci_slow(n: int) -> int:
    """Return the *n*-th Fibonacci number (0-indexed).

    Inefficiency: pure recursion with no memoisation.  The call tree
    has exponential size — fib(n) recomputes fib(n-2) as many times
    as fib(n-1) is called, giving O(2^n) time complexity.
    """
    if n <= 1:
        return n
    return fibonacci_slow(n - 1) + fibonacci_slow(n - 2)


@lru_cache(maxsize=None)
def fibonacci(n: int) -> int:
    """Return the *n*-th Fibonacci number (0-indexed).

    Improvement: ``functools.lru_cache`` memoises results so each
    sub-problem is solved only once, reducing time complexity to O(n).
    """
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)


# ---------------------------------------------------------------------------
# 7. Unnecessary list materialisation
# ---------------------------------------------------------------------------

def sum_of_squares_slow(numbers: Iterable[int]) -> int:
    """Return the sum of squares of *numbers*.

    Inefficiency: builds an intermediate list in memory before summing,
    wasting O(n) extra space.
    """
    squares = [x * x for x in numbers]   # list comprehension → materialised list
    return sum(squares)


def sum_of_squares(numbers: Iterable[int]) -> int:
    """Return the sum of squares of *numbers*.

    Improvement: passes a generator expression directly to ``sum``,
    which consumes values one at a time without allocating an
    intermediate list — O(1) extra space.
    """
    return sum(x * x for x in numbers)   # generator expression → O(1) space
