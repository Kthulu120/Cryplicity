/**
 * Slugifys a string
 * @param text the string to be slugfied
 * @returns {string} slugified string
 */
export const slugify = (text) => {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
};

/**
 * Method that simply abbreviates numbers
 * @param num Number we're abbreviating
 * @param fixed the anount of decimals that you want
 * @returns {*} simplified number
 */
export const abbreviateNumber = (num, fixed) => {
  if (num === null) { return null; } // terminate early
  if (num === 0) { return '0'; } // terminate early
  fixed = (!fixed || fixed < 0) ? 0 : fixed; // number of decimal places to show
  let b = (num).toPrecision(2).split("e"), // get power
    k = b.length === 1 ? 0 : Math.floor(Math.min(b[1].slice(1), 14) / 3), // floor at decimals, ceiling at trillions
    c = k < 1 ? num.toFixed(0 + fixed) : (num / Math.pow(10, k * 3) ).toFixed(1 + fixed), // divide by power
    d = c < 0 ? c : Math.abs(c), // enforce -0 is 0
    e = d + ['', 'K', 'M', 'B', 'T'][k]; // append power
  return e;
};

export const functiontofindIndexByKeyValue = (arraytosearch, key, valuetosearch) => {

  for (let i = 0; i < arraytosearch.length; i++) {

    if (arraytosearch[i][key] === valuetosearch) {
      return i;
    }
  }
  return null;
};
