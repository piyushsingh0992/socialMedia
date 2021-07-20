import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { store } from './app/store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from "react-router-dom";
import { createTheme ,ThemeProvider} from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: "rgb(40,103,178)",
    },
    secondary: {
      main: "rgb(255,255,255)"
    }

  },
});

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ThemeProvider theme={theme}>
      <Provider store={store}>
      <App />
      </Provider>
      </ThemeProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
