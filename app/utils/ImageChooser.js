import CONSTANTS from './CONSTANTS';

/**
 * Grabs the image for news Card depending on subreddit flair
 * @param keyToMatch the posts flair
 */
const redditFlairImageChooser = (keyToMatch) => {
  if (CONSTANTS.flairImageDict.hasOwnProperty(keyToMatch)) {
    return CONSTANTS.flairImageDict[keyToMatch];
  }
  return CONSTANTS.flairImageDict.MOON;
};


export default {
  redditFlairImageChooser
};
