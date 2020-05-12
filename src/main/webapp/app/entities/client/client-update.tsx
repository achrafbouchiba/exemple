import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './client.reducer';
import { IClient } from 'app/shared/model/client.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IClientUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ClientUpdate = (props: IClientUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { clientEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/client');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...clientEntity,
        ...values
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="bazarshopApp.client.home.createOrEditLabel">Create or edit a Client</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : clientEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="client-id">ID</Label>
                  <AvInput id="client-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="civiliteLabel" for="client-civilite">
                  Civilite
                </Label>
                <AvInput
                  id="client-civilite"
                  type="select"
                  className="form-control"
                  name="civilite"
                  value={(!isNew && clientEntity.civilite) || 'M'}
                >
                  <option value="M">M</option>
                  <option value="Mme">Mme</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="nomLabel" for="client-nom">
                  Nom
                </Label>
                <AvField
                  id="client-nom"
                  type="text"
                  name="nom"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="prenomLabel" for="client-prenom">
                  Prenom
                </Label>
                <AvField
                  id="client-prenom"
                  type="text"
                  name="prenom"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="dateDeNaissanceLabel" for="client-dateDeNaissance">
                  Date De Naissance
                </Label>
                <AvField
                  id="client-dateDeNaissance"
                  type="date"
                  className="form-control"
                  name="dateDeNaissance"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="emailLabel" for="client-email">
                  Email
                </Label>
                <AvField
                  id="client-email"
                  type="text"
                  name="email"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' },
                    pattern: {
                      value: '^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$',
                      errorMessage: "This field should follow pattern for '^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5}).."
                    }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="mobileLabel" for="client-mobile">
                  Mobile
                </Label>
                <AvField
                  id="client-mobile"
                  type="string"
                  className="form-control"
                  name="mobile"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' },
                    number: { value: true, errorMessage: 'This field should be a number.' }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="reglementLabel" for="client-reglement">
                  Reglement
                </Label>
                <AvInput
                  id="client-reglement"
                  type="select"
                  className="form-control"
                  name="reglement"
                  value={(!isNew && clientEntity.reglement) || 'Cartebancaire'}
                >
                  <option value="Cartebancaire">Cartebancaire</option>
                  <option value="Cash">Cash</option>
                  <option value="Cheque">Cheque</option>
                </AvInput>
              </AvGroup>
              <AvGroup check>
                <Label id="etatLabel">
                  <AvInput id="client-etat" type="checkbox" className="form-check-input" name="etat" />
                  Etat
                </Label>
              </AvGroup>
              <AvGroup>
                <Label id="derniereVisiteLabel" for="client-derniereVisite">
                  Derniere Visite
                </Label>
                <AvField id="client-derniereVisite" type="date" className="form-control" name="derniereVisite" />
              </AvGroup>
              <AvGroup>
                <Label id="totalAchatLabel" for="client-totalAchat">
                  Total Achat
                </Label>
                <AvField id="client-totalAchat" type="string" className="form-control" name="totalAchat" />
              </AvGroup>
              <AvGroup>
                <Label id="categorieLabel" for="client-categorie">
                  Categorie
                </Label>
                <AvInput
                  id="client-categorie"
                  type="select"
                  className="form-control"
                  name="categorie"
                  value={(!isNew && clientEntity.categorie) || 'Silver'}
                >
                  <option value="Silver">Silver</option>
                  <option value="Gold">Gold</option>
                  <option value="Platinium">Platinium</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="pointsFideliteLabel" for="client-pointsFidelite">
                  Points Fidelite
                </Label>
                <AvField id="client-pointsFidelite" type="string" className="form-control" name="pointsFidelite" />
              </AvGroup>
              <AvGroup>
                <Label id="creeLeLabel" for="client-creeLe">
                  Cree Le
                </Label>
                <AvField id="client-creeLe" type="date" className="form-control" name="creeLe" />
              </AvGroup>
              <AvGroup>
                <Label id="creeParLabel" for="client-creePar">
                  Cree Par
                </Label>
                <AvField id="client-creePar" type="text" name="creePar" />
              </AvGroup>
              <AvGroup>
                <Label id="modifieLeLabel" for="client-modifieLe">
                  Modifie Le
                </Label>
                <AvField id="client-modifieLe" type="date" className="form-control" name="modifieLe" />
              </AvGroup>
              <AvGroup>
                <Label id="modifieParLabel" for="client-modifiePar">
                  Modifie Par
                </Label>
                <AvField id="client-modifiePar" type="text" name="modifiePar" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/client" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">Back</span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp; Save
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  clientEntity: storeState.client.entity,
  loading: storeState.client.loading,
  updating: storeState.client.updating,
  updateSuccess: storeState.client.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ClientUpdate);
