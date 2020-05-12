import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { ICrudSearchAction, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities } from './remise.reducer';
import { IRemise } from 'app/shared/model/remise.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IRemiseProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Remise = (props: IRemiseProps) => {
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

  const { remiseList, match, loading } = props;
  return (
    <div>
      <h2 id="remise-heading">
        Remises
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create new Remise
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
        {remiseList && remiseList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Categorie Client</th>
                <th>Prix</th>
                <th>Remise</th>
                <th>Cumulable</th>
                <th>Debut Promo</th>
                <th>Fin Promo</th>
                <th>Etat</th>
                <th>Cree Le</th>
                <th>Cree Par</th>
                <th>Modifie Le</th>
                <th>Modifie Par</th>
                <th>Ref Produit</th>
                <th>Sous Categorie</th>
                <th>Categorie</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {remiseList.map((remise, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${remise.id}`} color="link" size="sm">
                      {remise.id}
                    </Button>
                  </td>
                  <td>{remise.categorieClient}</td>
                  <td>{remise.prix}</td>
                  <td>{remise.remise}</td>
                  <td>{remise.cumulable ? 'true' : 'false'}</td>
                  <td>
                    <TextFormat type="date" value={remise.debutPromo} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>
                    <TextFormat type="date" value={remise.finPromo} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{remise.etat ? 'true' : 'false'}</td>
                  <td>
                    <TextFormat type="date" value={remise.creeLe} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{remise.creePar}</td>
                  <td>
                    <TextFormat type="date" value={remise.modifieLe} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{remise.modifiePar}</td>
                  <td>
                    {remise.refProduitReference ? <Link to={`produit/${remise.refProduitId}`}>{remise.refProduitReference}</Link> : ''}
                  </td>
                  <td>
                    {remise.sousCategorieNom ? <Link to={`sous-categorie/${remise.sousCategorieId}`}>{remise.sousCategorieNom}</Link> : ''}
                  </td>
                  <td>{remise.categorieNom ? <Link to={`categorie/${remise.categorieId}`}>{remise.categorieNom}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${remise.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${remise.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${remise.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Remises found</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ remise }: IRootState) => ({
  remiseList: remise.entities,
  loading: remise.loading
});

const mapDispatchToProps = {
  getSearchEntities,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Remise);
