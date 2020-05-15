import React from 'react';
import logo from './logo.svg';
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tabs from './components/Tabs';

function App() {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" >
            Trainer ding dong
          </Typography>
        </Toolbar>
      </AppBar>
      <Tabs/>
    </div>
  );
}

export default App;
