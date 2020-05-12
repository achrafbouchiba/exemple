import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './gestion-fidelite.reducer';
import { IGestionFidelite } from 'app/shared/model/gestion-fidelite.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IGestionFideliteUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const GestionFideliteUpdate = (props: IGestionFideliteUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { gestionFideliteEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/gestion-fidelite');
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
        ...gestionFideliteEntity,
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
          <h2 id="bazarshopApp.gestionFidelite.home.createOrEditLabel">Create or edit a GestionFidelite</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : gestionFideliteEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="gestion-fidelite-id">ID</Label>
                  <AvInput id="gestion-fidelite-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nomLabel" for="gestion-fidelite-nom">
                  Nom
                </Label>
                <AvField
                  id="gestion-fidelite-nom"
                  type="text"
                  name="nom"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="pointsLabel" for="gestion-fidelite-points">
                  Points
                </Label>
                <AvField
                  id="gestion-fidelite-points"
                  type="string"
                  className="form-control"
                  name="points"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' },
                    number: { value: true, errorMessage: 'This field should be a number.' }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="valeurLabel" for="gestion-fidelite-valeur">
                  Valeur
                </Label>
                <AvField
                  id="gestion-fidelite-valeur"
                  type="string"
                  className="form-control"
                  name="valeur"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' },
                    number: { value: true, errorMessage: 'This field should be a number.' }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="clientsilverminLabel" for="gestion-fidelite-clientsilvermin">
                  Clientsilvermin
                </Label>
                <AvField
                  id="gestion-fidelite-clientsilvermin"
                  type="string"
                  className="form-control"
                  name="clientsilvermin"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' },
                    number: { value: true, errorMessage: 'This field should be a number.' }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="clientsilvermaxLabel" for="gestion-fidelite-clientsilvermax">
                  Clientsilvermax
                </Label>
                <AvField
                  id="gestion-fidelite-clientsilvermax"
                  type="string"
                  className="form-control"
                  name="clientsilvermax"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' },
                    number: { value: true, errorMessage: 'This field should be a number.' }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="clientgoldminLabel" for="gestion-fidelite-clientgoldmin">
                  Clientgoldmin
                </Label>
                <AvField
                  id="gestion-fidelite-clientgoldmin"
                  type="string"
                  className="form-control"
                  name="clientgoldmin"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' },
                    number: { value: true, errorMessage: 'This field should be a number.' }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="clientgoldmaxLabel" for="gestion-fidelite-clientgoldmax">
                  Clientgoldmax
                </Label>
                <AvField
                  id="gestion-fidelite-clientgoldmax"
                  type="string"
                  className="form-control"
                  name="clientgoldmax"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' },
                    number: { value: true, errorMessage: 'This field should be a number.' }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="clientpremiumminLabel" for="gestion-fidelite-clientpremiummin">
                  Clientpremiummin
                </Label>
                <AvField
                  id="gestion-fidelite-clientpremiummin"
                  type="string"
                  className="form-control"
                  name="clientpremiummin"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' },
                    number: { value: true, errorMessage: 'This field should be a number.' }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="clientpremiummaxLabel" for="gestion-fidelite-clientpremiummax">
                  Clientpremiummax
                </Label>
                <AvField
                  id="gestion-fidelite-clientpremiummax"
                  type="string"
                  className="form-control"
                  name="clientpremiummax"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' },
                    number: { value: true, errorMessage: 'This field should be a number.' }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="deviseLabel" for="gestion-fidelite-devise">
                  Devise
                </Label>
                <AvInput
                  id="gestion-fidelite-devise"
                  type="select"
                  className="form-control"
                  name="devise"
                  value={(!isNew && gestionFideliteEntity.devise) || 'TND'}
                >
                  <option value="TND">TND</option>
                  <option value="EUR">EUR</option>
                  <option value="USD">USD</option>
                </AvInput>
              </AvGroup>
              <AvGroup check>
                <Label id="etatLabel">
                  <AvInput id="gestion-fidelite-etat" type="checkbox" className="form-check-input" name="etat" />
                  Etat
                </Label>
              </AvGroup>
              <AvGroup>
                <Label id="creeLeLabel" for="gestion-fidelite-creeLe">
                  Cree Le
                </Label>
                <AvField id="gestion-fidelite-creeLe" type="date" className="form-control" name="creeLe" />
              </AvGroup>
              <AvGroup>
                <Label id="creeParLabel" for="gestion-fidelite-creePar">
                  Cree Par
                </Label>
                <AvField id="gestion-fidelite-creePar" type="text" name="creePar" />
              </AvGroup>
              <AvGroup>
                <Label id="modifieLeLabel" for="gestion-fidelite-modifieLe">
                  Modifie Le
                </Label>
                <AvField id="gestion-fidelite-modifieLe" type="date" className="form-control" name="modifieLe" />
              </AvGroup>
              <AvGroup>
                <Label id="modifieParLabel" for="gestion-fidelite-modifiePar">
                  Modifie Par
                </Label>
                <AvField id="gestion-fidelite-modifiePar" type="text" name="modifiePar" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/gestion-fidelite" replace color="info">
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
  gestionFideliteEntity: storeState.gestionFidelite.entity,
  loading: storeState.gestionFidelite.loading,
  updating: storeState.gestionFidelite.updating,
  updateSuccess: storeState.gestionFidelite.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(GestionFideliteUpdate);
