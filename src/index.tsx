import { render } from "react-dom";
import { store } from './state/store'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import App from "./App";

const rootElement = document.getElementById("root");
render((
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
), rootElement);

