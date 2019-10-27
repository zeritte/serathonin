export const ADD_ITEM_TO_PORTFOLIO = "add-portfolio-item";

export const addItemToPortfolio = item => dispatch => {
  dispatch({ type: ADD_ITEM_TO_PORTFOLIO, payload: item });
};
