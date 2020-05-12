import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { openFile, byteSize, ICrudSearchAction, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities } from './sous-categorie.reducer';
import { ISousCategorie } from 'app/shared/model/sous-categorie.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ISousCategorieProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const SousCategorie = (props: ISousCategorieProps) => {
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

  const { sousCategorieList, match, loading } = props;
  return (
    <div>
      <h2 id="sous-categorie-heading">
        Sous Categories
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create new Sous Categorie
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
        {sousCategorieList && sousCategorieList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Description</th>
                <th>Position</th>
                <th>Etat</th>
                <th>Image</th>
                <th>Cree Le</th>
                <th>Cree Par</th>
                <th>Modifie Le</th>
                <th>Modifie Par</th>
                <th>Categorie</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {sousCategorieList.map((sousCategorie, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${sousCategorie.id}`} color="link" size="sm">
                      {sousCategorie.id}
                    </Button>
                  </td>
                  <td>{sousCategorie.nom}</td>
                  <td>{sousCategorie.description}</td>
                  <td>{sousCategorie.position}</td>
                  <td>{sousCategorie.etat ? 'true' : 'false'}</td>
                  <td>
                    {sousCategorie.image ? (
                      <div>
                        <a onClick={openFile(sousCategorie.imageContentType, sousCategorie.image)}>
                          <img src={`data:${sousCategorie.imageContentType};base64,${sousCategorie.image}`} style={{ maxHeight: '30px' }} />
                          &nbsp;
                        </a>
                        <span>
                          {sousCategorie.imageContentType}, {byteSize(sousCategorie.image)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>
                    <TextFormat type="date" value={sousCategorie.creeLe} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{sousCategorie.creePar}</td>
                  <td>
                    <TextFormat type="date" value={sousCategorie.modifieLe} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{sousCategorie.modifiePar}</td>
                  <td>
                    {sousCategorie.categorieNom ? (
                      <Link to={`categorie/${sousCategorie.categorieId}`}>{sousCategorie.categorieNom}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${sousCategorie.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${sousCategorie.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${sousCategorie.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Sous Categories found</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ sousCategorie }: IRootState) => ({
  sousCategorieList: sousCategorie.entities,
  loading: sousCategorie.loading
});

const mapDispatchToProps = {
  getSearchEntities,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SousCategorie);
