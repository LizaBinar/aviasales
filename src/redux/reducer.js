import {
  ADD_FILTER,
  GET_SEARCH_ID,
  REMOVE_FILTER,
  CHANGE_SORT,
  GET_TICKETS,
} from "./tupes";
import { nanoid } from "nanoid";
import defaultState from "./default-state";

const addFilter = (newState, keyFilter) => {
  newState.filters[keyFilter].checked = true;
  return newState;
};

const removeFilter = (newState, keyFilter) => {
  newState.filters[keyFilter].checked = false;
  return newState;
};

const changeSort = (newState, sortName) => {
  newState.sort = sortName;
  return newState;
};

const handleGetTickets = (newState, tickets, searchStop) => {
  const obj = tickets.reduce((obj, ticket) => {
    const id = nanoid(4);
    ticket.id = id;
    obj[id] = ticket;
    return obj;
  }, {});

  newState.searchStop = searchStop;
  newState.tickets = { ...newState.tickets, ...obj };
  return newState;
};

const handleGetSearchId = (newState, searchId) => {
  return {
    ...newState,
    searchId: searchId,
  };
};

const reducer = (state = defaultState, actions) => {
  const { type } = actions;
  let { payload } = actions;
  if (payload === undefined) {
    payload = {};
  }
  const { keyFilter, sortName, searchId, tickets, searchStop } = payload;
  const newState = structuredClone(state);
  switch (type) {
    case ADD_FILTER:
      return addFilter(newState, keyFilter);
    case REMOVE_FILTER:
      return removeFilter(newState, keyFilter);
    case CHANGE_SORT:
      return changeSort(newState, sortName);
    case GET_SEARCH_ID:
      return handleGetSearchId(newState, searchId);
    case GET_TICKETS:
      return handleGetTickets(newState, tickets, searchStop);
    default:
      return newState;
  }
};

export default reducer;
