import { HashRouter as Router, Routes, Route } from "react-router-dom";
// import { Providers } from "./components/pages/sign/provider";
import { Provider } from "react-redux";
import Home from "./components/pages/home/HomeSection";
import store from "./redux/store";
import { Toaster } from "react-hot-toast";
import "./App.css";

export default function App() {
  console.log("app");
  return (
    <Provider store={store}>
      {/* <Providers> */}
      <Router>
        <div className="popup-container">
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
        </div>
      </Router>
      {/* </Providers> */}
    </Provider>
  );
}
