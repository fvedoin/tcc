import React from 'react';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';

import { isAuthenticated } from "./auth/auth";

import Login from './pages/Login';
import FinishProject from './pages/FinishProject';
import ListProject from './pages/ListProject';
import NewProject from './pages/NewProject';
import NewUser from './pages/NewUser';
import EditProjectPractices from './pages/EditProjectPractices';
import Comments from './pages/Comments';

import ProjectUsers from './pages/ProjectUsers';
import SuccessPractice from './pages/SuccessPractice';

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
            <PrivateRoute component={FinishProject} path="/project/:id/finish" />
            <PrivateRoute component={ListProject} path="/list/project" />
            <PrivateRoute component={EditProjectPractices} path="/project/:id/practices" />
            <PrivateRoute component={ProjectUsers} path="/project/:id/users" />
            <PrivateRoute component={Comments} path="/practices/:id/comments" />
            <PrivateRoute component={SuccessPractice} path="/report/:id/project/:projectId/factor/:successFactor" />
            <Route path="*" component={() => <h1>Page not found</h1>} />
        </Switch>
    </BrowserRouter>
);

export default Routes;