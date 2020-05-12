import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { openFile, byteSize, ICrudSearchAction, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities } from './produit.reducer';
import { IProduit } from 'app/shared/model/produit.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProduitProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Produit = (props: IProduitProps) => {
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

  const { produitList, match, loading } = props;
  return (
    <div>
      <h2 id="produit-heading">
        Produits
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create new Produit
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
        {produitList && produitList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Reference</th>
                <th>Nom</th>
                <th>Code Barre</th>
                <th>Description</th>
                <th>Etat</th>
                <th>Marque</th>
                <th>Nature</th>
                <th>Stock Minimum</th>
                <th>Quantite Vente Max</th>
                <th>Hors Stock</th>
                <th>Gere En Stock</th>
                <th>Date Premption</th>
                <th>Prix HT</th>
                <th>Taux TVA</th>
                <th>Prix TTC</th>
                <th>Source Produit</th>
                <th>Rating</th>
                <th>Remise</th>
                <th>Image</th>
                <th>Cree Le</th>
                <th>Cree Par</th>
                <th>Modifie Le</th>
                <th>Modifie Par</th>
                <th>Sous Categorie</th>
                <th>Unite</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {produitList.map((produit, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${produit.id}`} color="link" size="sm">
                      {produit.id}
                    </Button>
                  </td>
                  <td>{produit.reference}</td>
                  <td>{produit.nom}</td>
                  <td>{produit.codeBarre}</td>
                  <td>{produit.description}</td>
                  <td>{produit.etat ? 'true' : 'false'}</td>
                  <td>{produit.marque}</td>
                  <td>{produit.nature}</td>
                  <td>{produit.stockMinimum}</td>
                  <td>{produit.quantiteVenteMax}</td>
                  <td>{produit.horsStock ? 'true' : 'false'}</td>
                  <td>{produit.gereEnStock ? 'true' : 'false'}</td>
                  <td>
                    <TextFormat type="date" value={produit.datePremption} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{produit.prixHT}</td>
                  <td>{produit.tauxTVA}</td>
                  <td>{produit.prixTTC}</td>
                  <td>{produit.sourceProduit}</td>
                  <td>{produit.rating}</td>
                  <td>{produit.remise}</td>
                  <td>
                    {produit.image ? (
                      <div>
                        <a onClick={openFile(produit.imageContentType, produit.image)}>
                          <img src={`data:${produit.imageContentType};base64,${produit.image}`} style={{ maxHeight: '30px' }} />
                          &nbsp;
                        </a>
                        <span>
                          {produit.imageContentType}, {byteSize(produit.image)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>
                    <TextFormat type="date" value={produit.creeLe} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{produit.creePar}</td>
                  <td>
                    <TextFormat type="date" value={produit.modifieLe} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{produit.modifiePar}</td>
                  <td>
                    {produit.sousCategorieNom ? (
                      <Link to={`sous-categorie/${produit.sousCategorieId}`}>{produit.sousCategorieNom}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>{produit.uniteUnite ? <Link to={`produit-unite/${produit.uniteId}`}>{produit.uniteUnite}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${produit.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${produit.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${produit.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Produits found</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ produit }: IRootState) => ({
  produitList: produit.entities,
  loading: produit.loading
});

const mapDispatchToProps = {
  getSearchEntities,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Produit);
