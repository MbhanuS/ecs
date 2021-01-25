import { BrowserRouter, Route } from "react-router-dom";
import LIST from './Components/Layout/List/ListData'

import CART from './Components/Layout/Cart/Cart'
import DETAIL from './Components/Layout/Detail/Detail'

function App() {
  return (
    <BrowserRouter>
      <Route path='/' exact component={LIST} />
      <Route path='/cart' exact component={CART} />
      <Route path='/detail/:id' component={DETAIL} />
    </BrowserRouter>
  );
}

export default App;
