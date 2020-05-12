import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { ICrudSearchAction, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities } from './commande-lignes.reducer';
import { ICommandeLignes } from 'app/shared/model/commande-lignes.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICommandeLignesProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const CommandeLignes = (props: ICommandeLignesProps) => {
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

  const { commandeLignesList, match, loading } = props;
  return (
    <div>
      <h2 id="commande-lignes-heading">
        Commande Lignes
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create new Commande Lignes
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
        {commandeLignesList && commandeLignesList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Quantite</th>
                <th>Prix HT</th>
                <th>Tva</th>
                <th>Prix TTC</th>
                <th>Cree Le</th>
                <th>Cree Par</th>
                <th>Modifie Le</th>
                <th>Modifie Par</th>
                <th>Ref Commande</th>
                <th>Ref Produit</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {commandeLignesList.map((commandeLignes, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${commandeLignes.id}`} color="link" size="sm">
                      {commandeLignes.id}
                    </Button>
                  </td>
                  <td>{commandeLignes.quantite}</td>
                  <td>{commandeLignes.prixHT}</td>
                  <td>{commandeLignes.tva}</td>
                  <td>{commandeLignes.prixTTC}</td>
                  <td>
                    <TextFormat type="date" value={commandeLignes.creeLe} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{commandeLignes.creePar}</td>
                  <td>
                    <TextFormat type="date" value={commandeLignes.modifieLe} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{commandeLignes.modifiePar}</td>
                  <td>
                    {commandeLignes.refCommandeReference ? (
                      <Link to={`commande/${commandeLignes.refCommandeId}`}>{commandeLignes.refCommandeReference}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {commandeLignes.refProduitReference ? (
                      <Link to={`produit/${commandeLignes.refProduitId}`}>{commandeLignes.refProduitReference}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${commandeLignes.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${commandeLignes.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${commandeLignes.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Commande Lignes found</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ commandeLignes }: IRootState) => ({
  commandeLignesList: commandeLignes.entities,
  loading: commandeLignes.loading
});

const mapDispatchToProps = {
  getSearchEntities,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CommandeLignes);
