import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Login from "./Components/Login";
import Home from "./Components/Home";
import AuthProvider from "./Context/AuthProvider";
import Upload from "./Components/Upload";
import Category from './Components/Category';

function App() {

  return (
    <div className="App">
          <BrowserRouter>
              <AuthProvider>
                  <Switch>
                      <Route path="/category" component={Category} />
                      <Route path="/upload" component={Upload} />
                      <Route path="/login" component={Login} />
                      <Route path="/:slug" component={Home} />
                      <Route exact path="/" component={Home} />
                  </Switch>
              </AuthProvider>
          </BrowserRouter>
    </div>
  );
}

export default App;