import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import appReducer from "./store/reducer"
import { Provider } from "react-redux"
import { applyMiddleware, createStore, compose } from "redux"
import { createMuiTheme, ThemeProvider,responsiveFontSizes } from "@material-ui/core/styles"
import reduxThunk from "redux-thunk"
const store = createStore(
  appReducer,
  applyMiddleware(reduxThunk)
//  compose(
//   applyMiddleware(reduxThunk),
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),

//  )
  
 
);
const theme = responsiveFontSizes(
  createMuiTheme({
  typography: {
    fontFamily: "Raleway, Arial",
    fontSize: 12,
  },
})
) 

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
