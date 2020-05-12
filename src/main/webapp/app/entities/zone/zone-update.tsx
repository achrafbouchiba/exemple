import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './zone.reducer';
import { IZone } from 'app/shared/model/zone.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IZoneUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ZoneUpdate = (props: IZoneUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { zoneEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/zone');
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
        ...zoneEntity,
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
          <h2 id="bazarshopApp.zone.home.createOrEditLabel">Create or edit a Zone</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : zoneEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="zone-id">ID</Label>
                  <AvInput id="zone-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nomLabel" for="zone-nom">
                  Nom
                </Label>
                <AvField id="zone-nom" type="text" name="nom" />
              </AvGroup>
              <AvGroup>
                <Label id="creeLeLabel" for="zone-creeLe">
                  Cree Le
                </Label>
                <AvField id="zone-creeLe" type="date" className="form-control" name="creeLe" />
              </AvGroup>
              <AvGroup>
                <Label id="creeParLabel" for="zone-creePar">
                  Cree Par
                </Label>
                <AvField id="zone-creePar" type="text" name="creePar" />
              </AvGroup>
              <AvGroup>
                <Label id="modifieLeLabel" for="zone-modifieLe">
                  Modifie Le
                </Label>
                <AvField id="zone-modifieLe" type="date" className="form-control" name="modifieLe" />
              </AvGroup>
              <AvGroup>
                <Label id="modifieParLabel" for="zone-modifiePar">
                  Modifie Par
                </Label>
                <AvField id="zone-modifiePar" type="text" name="modifiePar" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/zone" replace color="info">
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
  zoneEntity: storeState.zone.entity,
  loading: storeState.zone.loading,
  updating: storeState.zone.updating,
  updateSuccess: storeState.zone.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ZoneUpdate);
