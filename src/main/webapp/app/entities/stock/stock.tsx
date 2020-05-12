import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { ICrudSearchAction, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities } from './stock.reducer';
import { IStock } from 'app/shared/model/stock.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IStockProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Stock = (props: IStockProps) => {
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

  const { stockList, match, loading } = props;
  return (
    <div>
      <h2 id="stock-heading">
        Stocks
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create new Stock
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
        {stockList && stockList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Stock Physique</th>
                <th>Stock Disponible</th>
                <th>Stock Reserve</th>
                <th>Stock Commande</th>
                <th>Derniere Entre</th>
                <th>Derniere Sortie</th>
                <th>Alerte Stock</th>
                <th>Cree Le</th>
                <th>Cree Par</th>
                <th>Modifie Le</th>
                <th>Modifie Par</th>
                <th>Ref Produit</th>
                <th>Id Categorie</th>
                <th>Id Sous Categorie</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {stockList.map((stock, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${stock.id}`} color="link" size="sm">
                      {stock.id}
                    </Button>
                  </td>
                  <td>{stock.stockPhysique}</td>
                  <td>{stock.stockDisponible}</td>
                  <td>{stock.stockReserve}</td>
                  <td>{stock.stockCommande}</td>
                  <td>
                    <TextFormat type="date" value={stock.derniereEntre} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>
                    <TextFormat type="date" value={stock.derniereSortie} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{stock.alerteStock ? 'true' : 'false'}</td>
                  <td>
                    <TextFormat type="date" value={stock.creeLe} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{stock.creePar}</td>
                  <td>
                    <TextFormat type="date" value={stock.modifieLe} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{stock.modifiePar}</td>
                  <td>{stock.refProduitReference ? <Link to={`produit/${stock.refProduitId}`}>{stock.refProduitReference}</Link> : ''}</td>
                  <td>{stock.idCategorieNom ? <Link to={`categorie/${stock.idCategorieId}`}>{stock.idCategorieNom}</Link> : ''}</td>
                  <td>
                    {stock.idSousCategorieNom ? (
                      <Link to={`sous-categorie/${stock.idSousCategorieId}`}>{stock.idSousCategorieNom}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${stock.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${stock.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${stock.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Stocks found</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ stock }: IRootState) => ({
  stockList: stock.entities,
  loading: stock.loading
});

const mapDispatchToProps = {
  getSearchEntities,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Stock);
