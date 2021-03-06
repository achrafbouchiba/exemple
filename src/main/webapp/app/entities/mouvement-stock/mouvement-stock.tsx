import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { ICrudSearchAction, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities } from './mouvement-stock.reducer';
import { IMouvementStock } from 'app/shared/model/mouvement-stock.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IMouvementStockProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const MouvementStock = (props: IMouvementStockProps) => {
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

  const { mouvementStockList, match, loading } = props;
  return (
    <div>
      <h2 id="mouvement-stock-heading">
        Mouvement Stocks
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create new Mouvement Stock
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
        {mouvementStockList && mouvementStockList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Type</th>
                <th>Date</th>
                <th>Sens</th>
                <th>Quantite</th>
                <th>Cree Le</th>
                <th>Cree Par</th>
                <th>Modifie Le</th>
                <th>Modifie Par</th>
                <th>Ref Produit</th>
                <th>Ref Commande</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {mouvementStockList.map((mouvementStock, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${mouvementStock.id}`} color="link" size="sm">
                      {mouvementStock.id}
                    </Button>
                  </td>
                  <td>{mouvementStock.type}</td>
                  <td>
                    <TextFormat type="date" value={mouvementStock.date} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{mouvementStock.sens}</td>
                  <td>{mouvementStock.quantite}</td>
                  <td>
                    <TextFormat type="date" value={mouvementStock.creeLe} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{mouvementStock.creePar}</td>
                  <td>
                    <TextFormat type="date" value={mouvementStock.modifieLe} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{mouvementStock.modifiePar}</td>
                  <td>
                    {mouvementStock.refProduitReference ? (
                      <Link to={`produit/${mouvementStock.refProduitId}`}>{mouvementStock.refProduitReference}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {mouvementStock.refCommandeReference ? (
                      <Link to={`commande/${mouvementStock.refCommandeId}`}>{mouvementStock.refCommandeReference}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${mouvementStock.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${mouvementStock.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${mouvementStock.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Mouvement Stocks found</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ mouvementStock }: IRootState) => ({
  mouvementStockList: mouvementStock.entities,
  loading: mouvementStock.loading
});

const mapDispatchToProps = {
  getSearchEntities,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(MouvementStock);
