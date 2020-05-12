import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { ICrudSearchAction, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities } from './adresse.reducer';
import { IAdresse } from 'app/shared/model/adresse.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAdresseProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Adresse = (props: IAdresseProps) => {
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

  const { adresseList, match, loading } = props;
  return (
    <div>
      <h2 id="adresse-heading">
        Adresses
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create new Adresse
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
        {adresseList && adresseList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Principale</th>
                <th>Nom</th>
                <th>Prenom</th>
                <th>Adresse Ligne 1</th>
                <th>Gouvernorat</th>
                <th>Ville</th>
                <th>Localite</th>
                <th>Indication</th>
                <th>Telephone</th>
                <th>Mobile</th>
                <th>Cree Le</th>
                <th>Cree Par</th>
                <th>Modifie Le</th>
                <th>Modifie Par</th>
                <th>Client</th>
                <th>Zone</th>
                <th>Code Postal</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {adresseList.map((adresse, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${adresse.id}`} color="link" size="sm">
                      {adresse.id}
                    </Button>
                  </td>
                  <td>{adresse.principale ? 'true' : 'false'}</td>
                  <td>{adresse.nom}</td>
                  <td>{adresse.prenom}</td>
                  <td>{adresse.adresseLigne1}</td>
                  <td>{adresse.gouvernorat}</td>
                  <td>{adresse.ville}</td>
                  <td>{adresse.localite}</td>
                  <td>{adresse.indication}</td>
                  <td>{adresse.telephone}</td>
                  <td>{adresse.mobile}</td>
                  <td>
                    <TextFormat type="date" value={adresse.creeLe} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{adresse.creePar}</td>
                  <td>
                    <TextFormat type="date" value={adresse.modifieLe} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{adresse.modifiePar}</td>
                  <td>{adresse.clientId ? <Link to={`client/${adresse.clientId}`}>{adresse.clientId}</Link> : ''}</td>
                  <td>{adresse.zoneNom ? <Link to={`zone/${adresse.zoneId}`}>{adresse.zoneNom}</Link> : ''}</td>
                  <td>
                    {adresse.codePostalCodePostal ? (
                      <Link to={`code-postaux/${adresse.codePostalId}`}>{adresse.codePostalCodePostal}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${adresse.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${adresse.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${adresse.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Adresses found</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ adresse }: IRootState) => ({
  adresseList: adresse.entities,
  loading: adresse.loading
});

const mapDispatchToProps = {
  getSearchEntities,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Adresse);
