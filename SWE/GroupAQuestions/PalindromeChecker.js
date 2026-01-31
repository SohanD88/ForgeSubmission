/**
 * Checks if the given string is a palindrome.
 * Assumes a string input.
 * Ignores case and non-alphanumeric characters.
 * Assumes an empty string is NOT a palindrome.
 * 
 * Returns true if the string is a palindrome, false otherwise.
 * @param {string} str
 * @returns {boolean}
 */
export function isStringPalindrome(str) 
{
    //checks to see if the input is a string, returns false if not
    if (typeof str !== "string")
    {
        return false;
    }
    
    //removes all non-alphanumeric characters and converts to lowercase
    const alNumChars = /[^a-zA-Z0-9]/g;
    const cleanedStr = str.replace(alNumChars, '').toLowerCase();

    //if the cleaned string is empty, return false
    if (cleanedStr.length === 0)
    {
        return false;
    }

    //To check if the string is a palindrome, we use a two pointer approach
    //Uses less memory than reversing the string
    let left = 0;
    let right = cleanedStr.length - 1;

    //while the left pointer is less than the right pointer, compare the characters and move the pointers inward
    //if the pointers do not point to the same letter, return false
    while (left < right)
    {
        if (cleanedStr[left] !== cleanedStr[right])
        {
            return false;
        }
        left++;
        right--;
    }

    return true;

    
}

//Example usage:
console.log(isStringPalindrome("A man, a plan, a canal: Panama")); //true
console.log(isStringPalindrome("racecar")); //true
console.log(isStringPalindrome("hello")); //false
console.log(isStringPalindrome("")); //false
console.log(isStringPalindrome("No 'x' in Nixon")); //true
console.log(isStringPalindrome(12321)); //false
console.log(isStringPalindrome("12321")); //true
console.log(isStringPalindrome("!!!")); //false