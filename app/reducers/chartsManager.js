import { SET_THE_WANTED_COIN_DATA, ADD_THE_RECHART_HOME_DATA } from '../actions/charts';

const initialState = {
  wantedCoinsInfoSummary: [],
  rechartHomeData: [],
  stockData: {},
  lastUpdated: ''
};


export default function chartsManager(state = initialState, action) {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case SET_THE_WANTED_COIN_DATA:
      return Object.assign({}, state, { wantedCoinsInfoSummary: action.data });
    case ADD_THE_RECHART_HOME_DATA:
      return Object.assign({}, state, { rechartHomeData: [...state.rechartHomeData, action.data] });
    case "ASAS":
      newState.stockData[action.key] = action.keyValue;
    default:
      return state;
  }
}
