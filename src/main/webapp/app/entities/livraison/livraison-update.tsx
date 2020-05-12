import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IZone } from 'app/shared/model/zone.model';
import { getEntities as getZones } from 'app/entities/zone/zone.reducer';
import { getEntity, updateEntity, createEntity, reset } from './livraison.reducer';
import { ILivraison } from 'app/shared/model/livraison.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ILivraisonUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const LivraisonUpdate = (props: ILivraisonUpdateProps) => {
  const [zoneId, setZoneId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { livraisonEntity, zones, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/livraison');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getZones();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...livraisonEntity,
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
          <h2 id="bazarshopApp.livraison.home.createOrEditLabel">Create or edit a Livraison</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : livraisonEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="livraison-id">ID</Label>
                  <AvInput id="livraison-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="categorieClientLabel" for="livraison-categorieClient">
                  Categorie Client
                </Label>
                <AvInput
                  id="livraison-categorieClient"
                  type="select"
                  className="form-control"
                  name="categorieClient"
                  value={(!isNew && livraisonEntity.categorieClient) || 'Silver'}
                >
                  <option value="Silver">Silver</option>
                  <option value="Gold">Gold</option>
                  <option value="Platinium">Platinium</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="intervalValeurLabel" for="livraison-intervalValeur">
                  Interval Valeur
                </Label>
                <AvField id="livraison-intervalValeur" type="string" className="form-control" name="intervalValeur" />
              </AvGroup>
              <AvGroup>
                <Label id="fraisLabel" for="livraison-frais">
                  Frais
                </Label>
                <AvField id="livraison-frais" type="string" className="form-control" name="frais" />
              </AvGroup>
              <AvGroup>
                <Label id="creeLeLabel" for="livraison-creeLe">
                  Cree Le
                </Label>
                <AvField id="livraison-creeLe" type="date" className="form-control" name="creeLe" />
              </AvGroup>
              <AvGroup>
                <Label id="creeParLabel" for="livraison-creePar">
                  Cree Par
                </Label>
                <AvField id="livraison-creePar" type="text" name="creePar" />
              </AvGroup>
              <AvGroup>
                <Label id="modifieLeLabel" for="livraison-modifieLe">
                  Modifie Le
                </Label>
                <AvField id="livraison-modifieLe" type="date" className="form-control" name="modifieLe" />
              </AvGroup>
              <AvGroup>
                <Label id="modifieParLabel" for="livraison-modifiePar">
                  Modifie Par
                </Label>
                <AvField id="livraison-modifiePar" type="text" name="modifiePar" />
              </AvGroup>
              <AvGroup>
                <Label for="livraison-zone">Zone</Label>
                <AvInput id="livraison-zone" type="select" className="form-control" name="zoneId">
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
              <Button tag={Link} id="cancel-save" to="/livraison" replace color="info">
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
  zones: storeState.zone.entities,
  livraisonEntity: storeState.livraison.entity,
  loading: storeState.livraison.loading,
  updating: storeState.livraison.updating,
  updateSuccess: storeState.livraison.updateSuccess
});

const mapDispatchToProps = {
  getZones,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(LivraisonUpdate);
