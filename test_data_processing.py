"""
Tests for data_processing.py.

Each "slow" variant and its optimised replacement are tested for
correctness.  Where practical a basic timing assertion confirms that
the optimised path is meaningfully faster on a realistic input size.
"""

from __future__ import annotations

import time
import unittest

from data_processing import (
    build_csv_row,
    build_csv_row_slow,
    fibonacci,
    fibonacci_slow,
    find_matching_lines,
    find_matching_lines_slow,
    get_top_n,
    get_top_n_slow,
    has_duplicates,
    has_duplicates_slow,
    sum_of_squares,
    sum_of_squares_slow,
    word_stats,
    word_stats_slow,
)


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def _elapsed(fn, *args, **kwargs) -> tuple:
    """Return (result, elapsed_seconds) for a single call to *fn*."""
    t0 = time.perf_counter()
    result = fn(*args, **kwargs)
    return result, time.perf_counter() - t0


# ---------------------------------------------------------------------------
# 1. has_duplicates
# ---------------------------------------------------------------------------

class TestHasDuplicates(unittest.TestCase):

    # --- correctness ---

    def test_no_duplicates_returns_false(self):
        for fn in (has_duplicates_slow, has_duplicates):
            with self.subTest(fn=fn.__name__):
                self.assertFalse(fn([1, 2, 3, 4, 5]))

    def test_with_duplicate_returns_true(self):
        for fn in (has_duplicates_slow, has_duplicates):
            with self.subTest(fn=fn.__name__):
                self.assertTrue(fn([1, 2, 3, 2, 5]))

    def test_single_element_no_duplicate(self):
        for fn in (has_duplicates_slow, has_duplicates):
            with self.subTest(fn=fn.__name__):
                self.assertFalse(fn([42]))

    def test_empty_list_no_duplicate(self):
        for fn in (has_duplicates_slow, has_duplicates):
            with self.subTest(fn=fn.__name__):
                self.assertFalse(fn([]))

    def test_strings(self):
        for fn in (has_duplicates_slow, has_duplicates):
            with self.subTest(fn=fn.__name__):
                self.assertTrue(fn(["a", "b", "a"]))
                self.assertFalse(fn(["a", "b", "c"]))

    # --- performance ---

    def test_optimised_faster_for_large_input(self):
        data = list(range(10_000)) + [0]   # duplicate at the very end
        _, t_slow = _elapsed(has_duplicates_slow, data)
        _, t_fast = _elapsed(has_duplicates, data)
        self.assertLess(t_fast, t_slow,
                        msg="has_duplicates should be faster than has_duplicates_slow")


# ---------------------------------------------------------------------------
# 2. build_csv_row
# ---------------------------------------------------------------------------

class TestBuildCsvRow(unittest.TestCase):

    def test_basic(self):
        for fn in (build_csv_row_slow, build_csv_row):
            with self.subTest(fn=fn.__name__):
                self.assertEqual(fn(["a", "b", "c"]), "a,b,c")

    def test_single_value(self):
        for fn in (build_csv_row_slow, build_csv_row):
            with self.subTest(fn=fn.__name__):
                self.assertEqual(fn(["only"]), "only")

    def test_empty_list(self):
        for fn in (build_csv_row_slow, build_csv_row):
            with self.subTest(fn=fn.__name__):
                self.assertEqual(fn([]), "")

    def test_values_with_spaces(self):
        for fn in (build_csv_row_slow, build_csv_row):
            with self.subTest(fn=fn.__name__):
                self.assertEqual(fn(["hello world", "foo"]), "hello world,foo")

    # --- performance ---

    def test_optimised_faster_for_large_input(self):
        data = [str(i) for i in range(10_000)]
        _, t_slow = _elapsed(build_csv_row_slow, data)
        _, t_fast = _elapsed(build_csv_row, data)
        self.assertLess(t_fast, t_slow,
                        msg="build_csv_row should be faster than build_csv_row_slow")


# ---------------------------------------------------------------------------
# 3. find_matching_lines
# ---------------------------------------------------------------------------

class TestFindMatchingLines(unittest.TestCase):

    _LINES = [
        "foo bar baz",
        "hello world",
        "foo qux",
        "no match here",
        "foo again",
    ]

    def test_matches_correct_lines(self):
        expected = ["foo bar baz", "foo qux", "foo again"]
        for fn in (find_matching_lines_slow, find_matching_lines):
            with self.subTest(fn=fn.__name__):
                self.assertEqual(fn(self._LINES, r"^foo"), expected)

    def test_no_matches(self):
        for fn in (find_matching_lines_slow, find_matching_lines):
            with self.subTest(fn=fn.__name__):
                self.assertEqual(fn(self._LINES, r"^zzz"), [])

    def test_all_match(self):
        for fn in (find_matching_lines_slow, find_matching_lines):
            with self.subTest(fn=fn.__name__):
                self.assertEqual(fn(self._LINES, r".+"), self._LINES)

    # --- performance ---

    def test_optimised_faster_for_large_input(self):
        lines = ["line number " + str(i) for i in range(5_000)]
        pattern = r"\d{3}$"
        _, t_slow = _elapsed(find_matching_lines_slow, lines, pattern)
        _, t_fast = _elapsed(find_matching_lines, lines, pattern)
        self.assertLess(t_fast, t_slow,
                        msg="find_matching_lines should be faster than find_matching_lines_slow")


# ---------------------------------------------------------------------------
# 4. word_stats
# ---------------------------------------------------------------------------

class TestWordStats(unittest.TestCase):

    def test_basic_counts(self):
        text = "apple banana apple cherry banana apple"
        expected = {"apple": 3, "banana": 2, "cherry": 1}
        for fn in (word_stats_slow, word_stats):
            with self.subTest(fn=fn.__name__):
                self.assertEqual(fn(text), expected)

    def test_case_insensitive(self):
        text = "Hello hello HELLO"
        for fn in (word_stats_slow, word_stats):
            with self.subTest(fn=fn.__name__):
                self.assertEqual(fn(text), {"hello": 3})

    def test_empty_string(self):
        for fn in (word_stats_slow, word_stats):
            with self.subTest(fn=fn.__name__):
                self.assertEqual(fn(""), {})

    # --- performance ---

    def test_optimised_faster_for_large_input(self):
        import random
        import string
        words = ["".join(random.choices(string.ascii_lowercase, k=5))
                 for _ in range(500)]
        text = " ".join(words * 20)   # 10 000 words total
        _, t_slow = _elapsed(word_stats_slow, text)
        _, t_fast = _elapsed(word_stats, text)
        self.assertLess(t_fast, t_slow,
                        msg="word_stats should be faster than word_stats_slow")


# ---------------------------------------------------------------------------
# 5. get_top_n
# ---------------------------------------------------------------------------

class TestGetTopN(unittest.TestCase):

    def test_basic(self):
        for fn in (get_top_n_slow, get_top_n):
            with self.subTest(fn=fn.__name__):
                self.assertEqual(fn([3, 1, 4, 1, 5, 9, 2, 6], 3), [9, 6, 5])

    def test_n_larger_than_list(self):
        data = [1, 2, 3]
        for fn in (get_top_n_slow, get_top_n):
            with self.subTest(fn=fn.__name__):
                self.assertEqual(sorted(fn(data, 10), reverse=True),
                                 sorted(data, reverse=True))

    def test_single_element(self):
        for fn in (get_top_n_slow, get_top_n):
            with self.subTest(fn=fn.__name__):
                self.assertEqual(fn([42], 1), [42])

    # --- performance ---

    def test_optimised_faster_for_large_input(self):
        import random
        data = [random.randint(0, 1_000_000) for _ in range(100_000)]
        n = 10
        _, t_slow = _elapsed(get_top_n_slow, data, n)
        _, t_fast = _elapsed(get_top_n, data, n)
        self.assertLess(t_fast, t_slow,
                        msg="get_top_n should be faster than get_top_n_slow")


# ---------------------------------------------------------------------------
# 6. fibonacci
# ---------------------------------------------------------------------------

class TestFibonacci(unittest.TestCase):

    _EXPECTED = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]

    def test_known_values_slow(self):
        for i, expected in enumerate(self._EXPECTED):
            with self.subTest(n=i):
                self.assertEqual(fibonacci_slow(i), expected)

    def test_known_values_fast(self):
        for i, expected in enumerate(self._EXPECTED):
            with self.subTest(n=i):
                self.assertEqual(fibonacci(i), expected)

    # --- performance ---

    def test_optimised_faster_for_large_n(self):
        n = 35
        _, t_slow = _elapsed(fibonacci_slow, n)
        # Clear the LRU cache so we measure a cold start
        fibonacci.cache_clear()
        _, t_fast = _elapsed(fibonacci, n)
        self.assertLess(t_fast, t_slow,
                        msg="fibonacci should be faster than fibonacci_slow")


# ---------------------------------------------------------------------------
# 7. sum_of_squares
# ---------------------------------------------------------------------------

class TestSumOfSquares(unittest.TestCase):

    def test_basic(self):
        for fn in (sum_of_squares_slow, sum_of_squares):
            with self.subTest(fn=fn.__name__):
                self.assertEqual(fn([1, 2, 3, 4]), 30)

    def test_empty(self):
        for fn in (sum_of_squares_slow, sum_of_squares):
            with self.subTest(fn=fn.__name__):
                self.assertEqual(fn([]), 0)

    def test_single_element(self):
        for fn in (sum_of_squares_slow, sum_of_squares):
            with self.subTest(fn=fn.__name__):
                self.assertEqual(fn([7]), 49)

    def test_accepts_generator(self):
        """The optimised version should work with any iterable."""
        gen = (x for x in range(1, 5))
        self.assertEqual(sum_of_squares(gen), 30)


if __name__ == "__main__":
    unittest.main()
