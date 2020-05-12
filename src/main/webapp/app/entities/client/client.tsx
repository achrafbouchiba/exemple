import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { ICrudSearchAction, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities } from './client.reducer';
import { IClient } from 'app/shared/model/client.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IClientProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Client = (props: IClientProps) => {
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

  const { clientList, match, loading } = props;
  return (
    <div>
      <h2 id="client-heading">
        Clients
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create new Client
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
        {clientList && clientList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Civilite</th>
                <th>Nom</th>
                <th>Prenom</th>
                <th>Date De Naissance</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Reglement</th>
                <th>Etat</th>
                <th>Derniere Visite</th>
                <th>Total Achat</th>
                <th>Categorie</th>
                <th>Points Fidelite</th>
                <th>Cree Le</th>
                <th>Cree Par</th>
                <th>Modifie Le</th>
                <th>Modifie Par</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {clientList.map((client, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${client.id}`} color="link" size="sm">
                      {client.id}
                    </Button>
                  </td>
                  <td>{client.civilite}</td>
                  <td>{client.nom}</td>
                  <td>{client.prenom}</td>
                  <td>
                    <TextFormat type="date" value={client.dateDeNaissance} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{client.email}</td>
                  <td>{client.mobile}</td>
                  <td>{client.reglement}</td>
                  <td>{client.etat ? 'true' : 'false'}</td>
                  <td>
                    <TextFormat type="date" value={client.derniereVisite} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{client.totalAchat}</td>
                  <td>{client.categorie}</td>
                  <td>{client.pointsFidelite}</td>
                  <td>
                    <TextFormat type="date" value={client.creeLe} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{client.creePar}</td>
                  <td>
                    <TextFormat type="date" value={client.modifieLe} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{client.modifiePar}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${client.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${client.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${client.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Clients found</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ client }: IRootState) => ({
  clientList: client.entities,
  loading: client.loading
});

const mapDispatchToProps = {
  getSearchEntities,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Client);
