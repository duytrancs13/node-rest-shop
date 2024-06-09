import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ROUTES from "routes";
import { store } from "store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {Object.values(ROUTES).map((route) => (
            <Route {...route} />
          ))}
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
