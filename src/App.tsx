import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Home } from "./pages/Home";
import { AddProduct } from "./pages/AddProduct";
import { EditProduct } from "./pages/EditProduct";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/add-product" component={AddProduct} />
        <Route path="/edit-product/:id" component={EditProduct} />
      </Switch>
    </Router>
  );
}

export default App;
