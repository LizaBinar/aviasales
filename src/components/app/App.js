import classes from "./App.module.scss";
import Buttons from "../buttons/buttons";
import Filter from "../filter/filter";
import Logo from "../logo/logo";
import TicketList from "../ticket-list/ticket-list";
import { applyMiddleware, createStore } from "redux";
import reducer from "../../redux/reducer";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import LoadingAnimation from "../loading-animation/loading-animation";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

function App() {
  return (
    <Provider store={store}>
      <div className={classes.app}>
        <header className={classes.app__header}>
          <Logo />
        </header>
        <main className={classes.app__main}>
          <Filter />
          <div className={classes.app__right}>
            <Buttons />
            <TicketList />
          </div>
        </main>
      </div>
      <LoadingAnimation />
    </Provider>
  );
}

export default App;
