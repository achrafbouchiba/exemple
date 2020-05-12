import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { ICrudSearchAction, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities } from './livraison.reducer';
import { ILivraison } from 'app/shared/model/livraison.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ILivraisonProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Livraison = (props: ILivraisonProps) => {
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

  const { livraisonList, match, loading } = props;
  return (
    <div>
      <h2 id="livraison-heading">
        Livraisons
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create new Livraison
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
        {livraisonList && livraisonList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Categorie Client</th>
                <th>Interval Valeur</th>
                <th>Frais</th>
                <th>Cree Le</th>
                <th>Cree Par</th>
                <th>Modifie Le</th>
                <th>Modifie Par</th>
                <th>Zone</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {livraisonList.map((livraison, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${livraison.id}`} color="link" size="sm">
                      {livraison.id}
                    </Button>
                  </td>
                  <td>{livraison.categorieClient}</td>
                  <td>{livraison.intervalValeur}</td>
                  <td>{livraison.frais}</td>
                  <td>
                    <TextFormat type="date" value={livraison.creeLe} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{livraison.creePar}</td>
                  <td>
                    <TextFormat type="date" value={livraison.modifieLe} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{livraison.modifiePar}</td>
                  <td>{livraison.zoneNom ? <Link to={`zone/${livraison.zoneId}`}>{livraison.zoneNom}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${livraison.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${livraison.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${livraison.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Livraisons found</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ livraison }: IRootState) => ({
  livraisonList: livraison.entities,
  loading: livraison.loading
});

const mapDispatchToProps = {
  getSearchEntities,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Livraison);
