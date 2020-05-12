import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './prod-enumeration.reducer';
import { IProdEnumeration } from 'app/shared/model/prod-enumeration.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IProdEnumerationUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ProdEnumerationUpdate = (props: IProdEnumerationUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { prodEnumerationEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/prod-enumeration');
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
        ...prodEnumerationEntity,
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
          <h2 id="bazarshopApp.prodEnumeration.home.createOrEditLabel">Create or edit a ProdEnumeration</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : prodEnumerationEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="prod-enumeration-id">ID</Label>
                  <AvInput id="prod-enumeration-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="typeLabel" for="prod-enumeration-type">
                  Type
                </Label>
                <AvInput
                  id="prod-enumeration-type"
                  type="select"
                  className="form-control"
                  name="type"
                  value={(!isNew && prodEnumerationEntity.type) || 'Marque'}
                >
                  <option value="Marque">Marque</option>
                  <option value="Classe">Classe</option>
                  <option value="Nature">Nature</option>
                  <option value="Collection">Collection</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="nomLabel" for="prod-enumeration-nom">
                  Nom
                </Label>
                <AvField id="prod-enumeration-nom" type="text" name="nom" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/prod-enumeration" replace color="info">
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
  prodEnumerationEntity: storeState.prodEnumeration.entity,
  loading: storeState.prodEnumeration.loading,
  updating: storeState.prodEnumeration.updating,
  updateSuccess: storeState.prodEnumeration.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProdEnumerationUpdate);
