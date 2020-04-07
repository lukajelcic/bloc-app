import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

//Pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';

//Components
import Navbar from './components/Navbar';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#cfd8dc',
      main: '#205',
      dark: '#263238',
      contrastText: '#fff'
    },
    secondary: {
      light: '#fbe9e7',
      main: '#ffb74d',
      dark: '#bf360c',
      contrastText: '#bdbdbd'
    }
  },
  typography: {
    useNextVariants: true
  }

})

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path='/' component={home} />
              <Route exact path='/login' component={login} />
              <Route exact path='/signup' component={signup} />
            </Switch>
          </div>
        </Router>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
