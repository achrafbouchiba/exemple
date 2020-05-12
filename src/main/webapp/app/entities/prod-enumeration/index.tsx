import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ProdEnumeration from './prod-enumeration';
import ProdEnumerationDetail from './prod-enumeration-detail';
import ProdEnumerationUpdate from './prod-enumeration-update';
import ProdEnumerationDeleteDialog from './prod-enumeration-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ProdEnumerationDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ProdEnumerationUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ProdEnumerationUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ProdEnumerationDetail} />
      <ErrorBoundaryRoute path={match.url} component={ProdEnumeration} />
    </Switch>
  </>
);

export default Routes;
