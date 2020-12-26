import React from 'react';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';

import { isAuthenticated } from "./auth/auth";

import Login from './pages/Login';
import FinishProject from './pages/FinishProject';
import ListProject from './pages/ListProject';
import NewProject from './pages/NewProject';
import NewUser from './pages/NewUser';
import EditProjectPratices from './pages/EditProjectPratices';

//Here, the private routes are defined
const PrivateRoute:React.FC<{component: any, path: string}> = ({ component: Component, path }) => (
    <Route
        path={path}
        render={(props) =>
            (isAuthenticated()) ? (
                <Component {...props} />
            ) : (
                <Redirect to={{ pathname: "/", state: { from: props.location } }} />
            )
        }
    />
);

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route component={Login} path="/" exact />
            <Route component={NewUser} path="/new/user" />
            <PrivateRoute component={NewProject} path="/new/project" />
            <PrivateRoute component={FinishProject} path="/finish/project" />
            <PrivateRoute component={ListProject} path="/list/project" />
            <PrivateRoute component={EditProjectPratices} path="/project/:id/pratices" />
            <Route path="*" component={() => <h1>Page not found</h1>} />
        </Switch>
    </BrowserRouter>
);

export default Routes;