import { isStringPalindrome } from "./PalindromeChecker.js";
import { isPandigitalNumber } from "./PandigitalNumberChecker.js";

//Test cases for the palindrome checker function
//asserts a message to be displayed if the test fails
console.log("Palindrome Checker Tests:");
console.assert(isStringPalindrome("racecar") === true, 'palindrome');
console.assert(isStringPalindrome("hello") === false, 'hello is not a palindrome');
console.assert(isStringPalindrome("tab a bat") === true, 'palindrome but has spaces');
console.assert(isStringPalindrome("bat a cat") === false, 'not palindrome');
console.assert(isStringPalindrome("A man, a plan, a canal: Panama!") === true, 'palindrome but ignores punctuation and case');
console.assert(isStringPalindrome("") === false, 'not palindrome because empty string');
console.assert(isStringPalindrome(12321) === false, 'not palindrome because not a string');

//Test cases for the pandigital number checker function
//asserts a message to be displayed if the test fails
console.log("Pandigital Number Checker Tests:");
console.assert(isPandigitalNumber(1023456789) === true, 'pandigital number');
console.assert(isPandigitalNumber(1234567890) === true, 'pandigital number with different order');
console.assert(isPandigitalNumber(1123456789) === false, 'not pandigital because of missing digit');
console.assert(isPandigitalNumber(-1023456789) === true, 'pandigital number but negative');
console.assert(isPandigitalNumber(123456789) === false, 'not pandigital because missing 0');
console.assert(isPandigitalNumber(12345678901) === true, 'pandigital number with extra digits');
console.assert(isPandigitalNumber(12345.6789) === false, 'not pandigital because not an integer');
console.assert(isPandigitalNumber(Infinity) === false, 'not pandigital because not finite');
console.assert(isPandigitalNumber("1023456789") === false, 'not pandigital because not a number');