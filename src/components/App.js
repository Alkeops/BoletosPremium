import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../views/Dashboard/Dashboard";
import Home from "../views/Home/Home";
import Staff from "../views/Staff/Staff";
import ModalManager from "./common/modals/ModalManager";
import EventDetail from "./events/EventDetail";
import GuestList from "./guests/GuestList";
import Header from "./layouts/Header";

function App() {
  return (
    <>
      <ModalManager />
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/admin" exact component={Dashboard} />
        <Route path="/:id" exact component={Staff} />
        <Route path="/admin/:id" exact component={EventDetail} />
        <Route path="/admin/:id/:boleto" component={GuestList} />
        <Redirect to="/" /> {/*TODO 404*/}
      </Switch>
    </>
  );
}
export default App;
