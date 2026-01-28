/** 
 * Checks if a number contains all digits from 0-9 at least once.
 * Assumes a number input, can be negative.
 * Takes only finite and whole numbers.
 * @param {number} num
 * @returns {boolean}
 */
export function isPandigitalNumber(num)
{
    //checks to see if the input is a number, finite, and an integer; returns false if conditions not met.
    if (typeof num !== "number" || num % 1 !== 0 || !isFinite(num)) 
    {
        return false;
    }

    //convert to absolute value to handle negative numbers
    num = Math.abs(num); 

    //create a set to store the digits found in the number for O(1) lookup time
    const digitsFound = new Set();

    while (num > 0)
    {
        //add the last digit to the set
        digitsFound.add(num % 10);
        //Length 10 means that all digits were found since sets cannot have repeating characters. 
        if (digitsFound.size === 10)
        {
            return true; 
        }
        //remove the last digit
        num = Math.floor(num / 10); 
    }

    //if we exit the loop without finding all digits, return false
    return false;

}   