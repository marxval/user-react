import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Navbar } from './components'
import { ListUsers, Register } from "./pages";
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

export default function App() {

  return (
    <Router>
      <Container maxWidth='lg'>
        <Navbar title='User Database' />
        <Box display='flex' justifyContent='center' flexDirection='column' minHeight='90vh'>
          <Switch>
            <Route exact path="/">
              <Register />
            </Route>
            <Route exact path="/users">
              <ListUsers />
            </Route>
          </Switch>
        </Box>
      </Container>

    </Router>
  );
}