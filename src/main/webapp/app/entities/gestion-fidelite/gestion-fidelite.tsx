import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { ICrudSearchAction, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities } from './gestion-fidelite.reducer';
import { IGestionFidelite } from 'app/shared/model/gestion-fidelite.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IGestionFideliteProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const GestionFidelite = (props: IGestionFideliteProps) => {
  const [search, setSearch] = useState('');

  useEffect(() => {
    props.getEntities();
  }, []);

  const startSearching = () => {
    if (search) {
      props.getSearchEntities(search);
    }
  };

  const clear = () => {
    setSearch('');
    props.getEntities();
  };

  const handleSearch = event => setSearch(event.target.value);

  const { gestionFideliteList, match, loading } = props;
  return (
    <div>
      <h2 id="gestion-fidelite-heading">
        Gestion Fidelites
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create new Gestion Fidelite
        </Link>
      </h2>
      <Row>
        <Col sm="12">
          <AvForm onSubmit={startSearching}>
            <AvGroup>
              <InputGroup>
                <AvInput type="text" name="search" value={search} onChange={handleSearch} placeholder="Search" />
                <Button className="input-group-addon">
                  <FontAwesomeIcon icon="search" />
                </Button>
                <Button type="reset" className="input-group-addon" onClick={clear}>
                  <FontAwesomeIcon icon="trash" />
                </Button>
              </InputGroup>
            </AvGroup>
          </AvForm>
        </Col>
      </Row>
      <div className="table-responsive">
        {gestionFideliteList && gestionFideliteList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Points</th>
                <th>Valeur</th>
                <th>Clientsilvermin</th>
                <th>Clientsilvermax</th>
                <th>Clientgoldmin</th>
                <th>Clientgoldmax</th>
                <th>Clientpremiummin</th>
                <th>Clientpremiummax</th>
                <th>Devise</th>
                <th>Etat</th>
                <th>Cree Le</th>
                <th>Cree Par</th>
                <th>Modifie Le</th>
                <th>Modifie Par</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {gestionFideliteList.map((gestionFidelite, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${gestionFidelite.id}`} color="link" size="sm">
                      {gestionFidelite.id}
                    </Button>
                  </td>
                  <td>{gestionFidelite.nom}</td>
                  <td>{gestionFidelite.points}</td>
                  <td>{gestionFidelite.valeur}</td>
                  <td>{gestionFidelite.clientsilvermin}</td>
                  <td>{gestionFidelite.clientsilvermax}</td>
                  <td>{gestionFidelite.clientgoldmin}</td>
                  <td>{gestionFidelite.clientgoldmax}</td>
                  <td>{gestionFidelite.clientpremiummin}</td>
                  <td>{gestionFidelite.clientpremiummax}</td>
                  <td>{gestionFidelite.devise}</td>
                  <td>{gestionFidelite.etat ? 'true' : 'false'}</td>
                  <td>
                    <TextFormat type="date" value={gestionFidelite.creeLe} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{gestionFidelite.creePar}</td>
                  <td>
                    <TextFormat type="date" value={gestionFidelite.modifieLe} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{gestionFidelite.modifiePar}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${gestionFidelite.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${gestionFidelite.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${gestionFidelite.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Gestion Fidelites found</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ gestionFidelite }: IRootState) => ({
  gestionFideliteList: gestionFidelite.entities,
  loading: gestionFidelite.loading
});

const mapDispatchToProps = {
  getSearchEntities,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(GestionFidelite);
