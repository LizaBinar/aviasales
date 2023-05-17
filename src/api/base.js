import axios from "axios";

export const MAIN_ROOT = "https://aviasales-test-api.kata.academy/";
export const SEARCH_ID = "search";

export const fetchSearchId = () => {
  return axios
    .get(MAIN_ROOT + SEARCH_ID)
    .then((response) => response.data.searchId)
    .catch(() => {
      return null;
    });
};

export const fetchTickets = (searchId) => {
  const url = MAIN_ROOT + `tickets?searchId=${searchId}`;
  return axios
    .get(url)
    .then((response) => response.data)
    .catch((error) => {
      if (error.code === "ERR_BAD_RESPONSE") {
        return error.response.status;
      } else {
        return null;
      }
    });
};
