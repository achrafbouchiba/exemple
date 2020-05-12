import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { ICrudSearchAction, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities } from './commande.reducer';
import { ICommande } from 'app/shared/model/commande.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICommandeProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Commande = (props: ICommandeProps) => {
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

  const { commandeList, match, loading } = props;
  return (
    <div>
      <h2 id="commande-heading">
        Commandes
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create new Commande
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
        {commandeList && commandeList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Reference</th>
                <th>Date</th>
                <th>Statut</th>
                <th>Nature Piece</th>
                <th>Total HT</th>
                <th>Total TVA</th>
                <th>Total Remise</th>
                <th>Tot TTC</th>
                <th>Zone</th>
                <th>Date Livraison</th>
                <th>Cree Le</th>
                <th>Cree Par</th>
                <th>Modifie Le</th>
                <th>Modifie Par</th>
                <th>Id Client</th>
                <th>Id Adresse</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {commandeList.map((commande, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${commande.id}`} color="link" size="sm">
                      {commande.id}
                    </Button>
                  </td>
                  <td>{commande.reference}</td>
                  <td>
                    <TextFormat type="date" value={commande.date} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{commande.statut}</td>
                  <td>{commande.naturePiece}</td>
                  <td>{commande.totalHT}</td>
                  <td>{commande.totalTVA}</td>
                  <td>{commande.totalRemise}</td>
                  <td>{commande.totTTC}</td>
                  <td>{commande.zone}</td>
                  <td>
                    <TextFormat type="date" value={commande.dateLivraison} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>
                    <TextFormat type="date" value={commande.creeLe} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{commande.creePar}</td>
                  <td>
                    <TextFormat type="date" value={commande.modifieLe} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{commande.modifiePar}</td>
                  <td>{commande.idClientId ? <Link to={`client/${commande.idClientId}`}>{commande.idClientId}</Link> : ''}</td>
                  <td>{commande.idAdresseId ? <Link to={`adresse/${commande.idAdresseId}`}>{commande.idAdresseId}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${commande.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${commande.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${commande.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Commandes found</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ commande }: IRootState) => ({
  commandeList: commande.entities,
  loading: commande.loading
});

const mapDispatchToProps = {
  getSearchEntities,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Commande);
