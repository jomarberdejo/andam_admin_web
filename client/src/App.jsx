import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import RouteLayout from "./routes/RouteLayout";

function App() {
  return (
    <Router>
      <RouteLayout />
    </Router>
  );
}

export default App;
