import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IClient } from 'app/shared/model/client.model';
import { getEntities as getClients } from 'app/entities/client/client.reducer';
import { IZone } from 'app/shared/model/zone.model';
import { getEntities as getZones } from 'app/entities/zone/zone.reducer';
import { ICodePostaux } from 'app/shared/model/code-postaux.model';
import { getEntities as getCodePostauxes } from 'app/entities/code-postaux/code-postaux.reducer';
import { getEntity, updateEntity, createEntity, reset } from './adresse.reducer';
import { IAdresse } from 'app/shared/model/adresse.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IAdresseUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const AdresseUpdate = (props: IAdresseUpdateProps) => {
  const [clientId, setClientId] = useState('0');
  const [zoneId, setZoneId] = useState('0');
  const [codePostalId, setCodePostalId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { adresseEntity, clients, zones, codePostauxes, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/adresse');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getClients();
    props.getZones();
    props.getCodePostauxes();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...adresseEntity,
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
          <h2 id="bazarshopApp.adresse.home.createOrEditLabel">Create or edit a Adresse</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : adresseEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="adresse-id">ID</Label>
                  <AvInput id="adresse-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup check>
                <Label id="principaleLabel">
                  <AvInput id="adresse-principale" type="checkbox" className="form-check-input" name="principale" />
                  Principale
                </Label>
              </AvGroup>
              <AvGroup>
                <Label id="nomLabel" for="adresse-nom">
                  Nom
                </Label>
                <AvField
                  id="adresse-nom"
                  type="text"
                  name="nom"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="prenomLabel" for="adresse-prenom">
                  Prenom
                </Label>
                <AvField
                  id="adresse-prenom"
                  type="text"
                  name="prenom"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="adresseLigne1Label" for="adresse-adresseLigne1">
                  Adresse Ligne 1
                </Label>
                <AvField
                  id="adresse-adresseLigne1"
                  type="text"
                  name="adresseLigne1"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="gouvernoratLabel" for="adresse-gouvernorat">
                  Gouvernorat
                </Label>
                <AvField
                  id="adresse-gouvernorat"
                  type="text"
                  name="gouvernorat"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="villeLabel" for="adresse-ville">
                  Ville
                </Label>
                <AvField id="adresse-ville" type="text" name="ville" />
              </AvGroup>
              <AvGroup>
                <Label id="localiteLabel" for="adresse-localite">
                  Localite
                </Label>
                <AvField id="adresse-localite" type="text" name="localite" />
              </AvGroup>
              <AvGroup>
                <Label id="indicationLabel" for="adresse-indication">
                  Indication
                </Label>
                <AvField id="adresse-indication" type="text" name="indication" />
              </AvGroup>
              <AvGroup>
                <Label id="telephoneLabel" for="adresse-telephone">
                  Telephone
                </Label>
                <AvField id="adresse-telephone" type="string" className="form-control" name="telephone" />
              </AvGroup>
              <AvGroup>
                <Label id="mobileLabel" for="adresse-mobile">
                  Mobile
                </Label>
                <AvField id="adresse-mobile" type="string" className="form-control" name="mobile" />
              </AvGroup>
              <AvGroup>
                <Label id="creeLeLabel" for="adresse-creeLe">
                  Cree Le
                </Label>
                <AvField id="adresse-creeLe" type="date" className="form-control" name="creeLe" />
              </AvGroup>
              <AvGroup>
                <Label id="creeParLabel" for="adresse-creePar">
                  Cree Par
                </Label>
                <AvField id="adresse-creePar" type="text" name="creePar" />
              </AvGroup>
              <AvGroup>
                <Label id="modifieLeLabel" for="adresse-modifieLe">
                  Modifie Le
                </Label>
                <AvField id="adresse-modifieLe" type="date" className="form-control" name="modifieLe" />
              </AvGroup>
              <AvGroup>
                <Label id="modifieParLabel" for="adresse-modifiePar">
                  Modifie Par
                </Label>
                <AvField id="adresse-modifiePar" type="text" name="modifiePar" />
              </AvGroup>
              <AvGroup>
                <Label for="adresse-client">Client</Label>
                <AvInput id="adresse-client" type="select" className="form-control" name="clientId">
                  <option value="" key="0" />
                  {clients
                    ? clients.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="adresse-zone">Zone</Label>
                <AvInput id="adresse-zone" type="select" className="form-control" name="zoneId">
                  <option value="" key="0" />
                  {zones
                    ? zones.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.nom}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="adresse-codePostal">Code Postal</Label>
                <AvInput id="adresse-codePostal" type="select" className="form-control" name="codePostalId">
                  <option value="" key="0" />
                  {codePostauxes
                    ? codePostauxes.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.codePostal}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/adresse" replace color="info">
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
  clients: storeState.client.entities,
  zones: storeState.zone.entities,
  codePostauxes: storeState.codePostaux.entities,
  adresseEntity: storeState.adresse.entity,
  loading: storeState.adresse.loading,
  updating: storeState.adresse.updating,
  updateSuccess: storeState.adresse.updateSuccess
});

const mapDispatchToProps = {
  getClients,
  getZones,
  getCodePostauxes,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AdresseUpdate);
