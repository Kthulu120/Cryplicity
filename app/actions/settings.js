
export const LOAD_THE_SETTINGS = 'LOAD_SETTINGS';
export const SET_THE_SUBREDDITS = 'SET_SUBREDDITS';

export const LOAD_SETTINGS = (settingsObj) => ({
  type: LOAD_THE_SETTINGS,
  settingsObj
});

export const SET_SUBREDDITS = (subreddits) => ({
  type: SET_THE_SUBREDDITS,
  subreddits
});
