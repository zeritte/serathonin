import { ADD_ITEM_TO_PORTFOLIO } from "../actions/MainActions";

const INITIAL_STATE = {
  portfolio: [],
  cumPortfolio: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_ITEM_TO_PORTFOLIO:
      return {
        ...state,
        portfolio: [...state.portfolio, action.payload]
      };
    default:
      return state;
  }
};
