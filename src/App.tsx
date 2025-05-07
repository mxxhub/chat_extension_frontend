// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Home from "./components/pages/home/HomeSection";
import store from "./redux/store";
import { Toaster } from "react-hot-toast";
// import { Providers } from "./components/pages/sign/provider";

export default function App() {
  return (
    <Provider store={store}>
      {/* <Providers> */}
      <Router>
        <Toaster
          position="top-center"
          reverseOrder={true}
          toastOptions={{
            style: {
              fontSize: "14px",
              borderRadius: "8px",
            },
          }}
        />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
      {/* </Providers> */}
    </Provider>
  );
}
