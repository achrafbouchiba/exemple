import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './code-postaux.reducer';
import { ICodePostaux } from 'app/shared/model/code-postaux.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICodePostauxUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CodePostauxUpdate = (props: ICodePostauxUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { codePostauxEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/code-postaux');
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
        ...codePostauxEntity,
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
          <h2 id="bazarshopApp.codePostaux.home.createOrEditLabel">Create or edit a CodePostaux</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : codePostauxEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="code-postaux-id">ID</Label>
                  <AvInput id="code-postaux-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="gouvernoratLabel" for="code-postaux-gouvernorat">
                  Gouvernorat
                </Label>
                <AvField id="code-postaux-gouvernorat" type="text" name="gouvernorat" />
              </AvGroup>
              <AvGroup>
                <Label id="villeLabel" for="code-postaux-ville">
                  Ville
                </Label>
                <AvField id="code-postaux-ville" type="text" name="ville" />
              </AvGroup>
              <AvGroup>
                <Label id="localiteLabel" for="code-postaux-localite">
                  Localite
                </Label>
                <AvField id="code-postaux-localite" type="text" name="localite" />
              </AvGroup>
              <AvGroup>
                <Label id="codePostalLabel" for="code-postaux-codePostal">
                  Code Postal
                </Label>
                <AvField id="code-postaux-codePostal" type="string" className="form-control" name="codePostal" />
              </AvGroup>
              <AvGroup>
                <Label id="zoneLabel" for="code-postaux-zone">
                  Zone
                </Label>
                <AvField id="code-postaux-zone" type="text" name="zone" />
              </AvGroup>
              <AvGroup>
                <Label id="modifieLeLabel" for="code-postaux-modifieLe">
                  Modifie Le
                </Label>
                <AvField id="code-postaux-modifieLe" type="date" className="form-control" name="modifieLe" />
              </AvGroup>
              <AvGroup>
                <Label id="modifieParLabel" for="code-postaux-modifiePar">
                  Modifie Par
                </Label>
                <AvField id="code-postaux-modifiePar" type="text" name="modifiePar" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/code-postaux" replace color="info">
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
  codePostauxEntity: storeState.codePostaux.entity,
  loading: storeState.codePostaux.loading,
  updating: storeState.codePostaux.updating,
  updateSuccess: storeState.codePostaux.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CodePostauxUpdate);
