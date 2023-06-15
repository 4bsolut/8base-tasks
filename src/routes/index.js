import { useLocation } from 'react-router-dom';
import { Redirect, Route, Switch } from 'react-router-dom';

/* Import Components */
import { NavBar, ProtectedRoute } from 'components';

/* Import Route Components */
import { Home } from './home';
import { Profile } from './profile';
import { AuthRoutes } from './auth';
import { Task } from './task';
import { NewTask } from './new-task';

export const Routes = () => {
  const location = useLocation();
  return (
    <Switch>
      <Route path="/auth" component={AuthRoutes} />
      <Route>
        <div>
          <NavBar />
          <hr />
          <div>
            <Switch>
              <Route exact path="/" component={Home} />
              <ProtectedRoute exact path="/profile" component={Profile} />
              <ProtectedRoute   exact path="/tasks" component={Task} />
              <ProtectedRoute exact to="/new-task" component={NewTask}/>
            </Switch>
          </div>
        </div>
      </Route>
    </Switch>
  );
};
