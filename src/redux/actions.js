import {
  ADD_FILTER,
  CHANGE_SORT,
  ERROR,
  GET_TICKETS,
  REMOVE_FILTER,
} from "./tupes";
import { createAction } from "redux-actions";
import { fetchSearchId, fetchTickets } from "../api/base";

export const add = createAction(ADD_FILTER, (key) => ({ keyFilter: key }));

export const error = createAction(ERROR);

export const remove = createAction(REMOVE_FILTER, (key) => ({
  keyFilter: key,
}));

export const changeSort = createAction(CHANGE_SORT, (sortName) => ({
  sortName,
}));

export const getTickets = createAction(GET_TICKETS, (tickets, searchStop) => ({
  tickets: tickets,
  searchStop: searchStop,
}));

const fetchTicketsAndUpdateState = (searchId) => {
  return async (dispatch) => {
    let stop = false;

    const processResponse = (res) => {
      if (res && res.tickets) {
        dispatch(getTickets(res.tickets, res.stop));
        stop = res.stop;
      } else if (res === null) {
        stop = true;
        dispatch(error());
      }
    };

    const makeRequest = async () => {
      try {
        const res = await fetchTickets(searchId);
        processResponse(res);
      } catch (error) {
        console.log("makeRequest error\n", error);
      }
    };

    while (!stop) {
      await makeRequest();
    }
  };
};

export const performInitialSetup = () => {
  return async (dispatch) => {
    try {
      const searchId = await fetchSearchId();
      if (searchId) {
        dispatch(fetchTicketsAndUpdateState(searchId));
      }
    } catch (error) {
      console.log("performInitialSetup error\n", error);
    }
  };
};
