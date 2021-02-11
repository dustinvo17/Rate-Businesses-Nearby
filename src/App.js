import { Button, Container } from "@material-ui/core"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import HomePage from "./pages/HomePage"
import DetailPage from "./pages/DetailPage"
import Header from "./components/Header"
function App() {
  return (
    <main>
      <Header/>
      <Router>
        <Route path="/" component={HomePage} exact />
        <Route path="/business/:reference" component={DetailPage} exact />
      </Router>
    </main>
  );
}

export default App;
