import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Providers } from "./components/pages/sign/provider";
import { Provider } from "react-redux";
import Home from "./components/pages/home/HomeSection";
import store from "./redux/store";

export default function App() {
  return (
    <Provider store={store}>
      <Providers>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      </Providers>
    </Provider>
  );
}
