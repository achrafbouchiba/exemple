import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import CodePostaux from './code-postaux';
import CodePostauxDetail from './code-postaux-detail';
import CodePostauxUpdate from './code-postaux-update';
import CodePostauxDeleteDialog from './code-postaux-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={CodePostauxDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CodePostauxUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CodePostauxUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CodePostauxDetail} />
      <ErrorBoundaryRoute path={match.url} component={CodePostaux} />
    </Switch>
  </>
);

export default Routes;
