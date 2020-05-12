import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { ICrudSearchAction, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities } from './code-postaux.reducer';
import { ICodePostaux } from 'app/shared/model/code-postaux.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICodePostauxProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const CodePostaux = (props: ICodePostauxProps) => {
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

  const { codePostauxList, match, loading } = props;
  return (
    <div>
      <h2 id="code-postaux-heading">
        Code Postauxes
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create new Code Postaux
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
        {codePostauxList && codePostauxList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Gouvernorat</th>
                <th>Ville</th>
                <th>Localite</th>
                <th>Code Postal</th>
                <th>Zone</th>
                <th>Modifie Le</th>
                <th>Modifie Par</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {codePostauxList.map((codePostaux, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${codePostaux.id}`} color="link" size="sm">
                      {codePostaux.id}
                    </Button>
                  </td>
                  <td>{codePostaux.gouvernorat}</td>
                  <td>{codePostaux.ville}</td>
                  <td>{codePostaux.localite}</td>
                  <td>{codePostaux.codePostal}</td>
                  <td>{codePostaux.zone}</td>
                  <td>
                    <TextFormat type="date" value={codePostaux.modifieLe} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{codePostaux.modifiePar}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${codePostaux.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${codePostaux.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${codePostaux.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Code Postauxes found</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ codePostaux }: IRootState) => ({
  codePostauxList: codePostaux.entities,
  loading: codePostaux.loading
});

const mapDispatchToProps = {
  getSearchEntities,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CodePostaux);
