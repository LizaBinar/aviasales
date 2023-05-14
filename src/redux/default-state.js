const filters = {
  0: { title: "Без пересадок", key: "0", checked: true },
  1: { title: "1 пересадка", key: "1", checked: false },
  2: { title: "2 пересадки", key: "2", checked: false },
  3: { title: "3 пересадки", key: "3", checked: false },
};

const defaultState = {
  filters: filters,
  sort: "cheapest", // fastest optimal
  searchId: false,
  searchStop: false,
  tickets: {},
};

export default defaultState;
