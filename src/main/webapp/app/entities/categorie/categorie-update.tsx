import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, setBlob, reset } from './categorie.reducer';
import { ICategorie } from 'app/shared/model/categorie.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICategorieUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> { }

export const CategorieUpdate = (props: ICategorieUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { categorieEntity, loading, updating } = props;

  const { image, imageContentType } = categorieEntity;

  const handleClose = () => {
    props.history.push('/categorie');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  const onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => props.setBlob(name, data, contentType), isAnImage);
  };

  const clearBlob = name => () => {
    props.setBlob(name, undefined, undefined);
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...categorieEntity,
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
          <h2 id="bazarshopApp.categorie.home.createOrEditLabel">Create or edit a Categorie</h2>
        </Col>
      </Row>
      <Row  className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
              <AvForm model={isNew ? {} : categorieEntity} onSubmit={saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="categorie-id">ID</Label>
                    <AvInput id="categorie-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}

                <Row className="justify-content-center">
                  <Col md="6">
                    <AvGroup>
                      <Label id="nomLabel" for="categorie-nom">
                        Nom
                      </Label>
                      <AvField
                        id="categorie-nom"
                        type="text"
                        name="nom"
                        validate={{
                          required: { value: true, errorMessage: 'This field is required.' }
                        }}
                      />
                    </AvGroup>
                    <AvGroup>
                  <Label id="descriptionLabel" for="categorie-description">
                    Description
                </Label>
                  <AvField id="categorie-description" type="text" name="description" />
                </AvGroup>
                <AvGroup>
                  <Label id="positionLabel" for="categorie-position">
                    Position
                </Label>
                  <AvField
                    id="categorie-position"
                    type="string"
                    className="form-control"
                    name="position"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' },
                      number: { value: true, errorMessage: 'This field should be a number.' }
                    }}
                  />
                </AvGroup>
                <AvGroup check>
                  <Label id="etatLabel">
                    <AvInput id="categorie-etat" type="checkbox" className="form-check-input" name="etat" />
                  Etat
                </Label>
                </AvGroup>
                  </Col>
                  <Col md="6">
                 
                <AvGroup>
                  <AvGroup>
                    <Label id="imageLabel" for="image">
                      Image
                  </Label>
                    <br />
                    {image ? (
                      <div>
                        <a onClick={openFile(imageContentType, image)}>
                          <img src={`data:${imageContentType};base64,${image}`} style={{ maxHeight: '100px' }} />
                        </a>
                        <br />
                        <Row>
                          <Col md="11">
                            <span>
                              {imageContentType}, {byteSize(image)}
                            </span>
                          </Col>
                          <Col md="1">
                            <Button color="danger" onClick={clearBlob('image')}>
                              <FontAwesomeIcon icon="times-circle" />
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    ) : null}
                    <input id="file_image" type="file" onChange={onBlobChange(true, 'image')} accept="image/*" />
                    <AvInput type="hidden" name="image" value={image} />
                  </AvGroup>
                </AvGroup>
                <AvGroup>
                  <Label id="creeLeLabel" for="categorie-creeLe">
                    Cree Le
                </Label>
                  <AvField id="categorie-creeLe" type="date" className="form-control" name="creeLe" />
                </AvGroup>
                <AvGroup>
                  <Label id="creeParLabel" for="categorie-creePar">
                    Cree Par
                </Label>
                  <AvField id="categorie-creePar" type="text" name="creePar" />
                </AvGroup>
                <AvGroup>
                  <Label id="modifieLeLabel" for="categorie-modifieLe">
                    Modifie Le
                </Label>
                  <AvField id="categorie-modifieLe" type="date" className="form-control" name="modifieLe" />
                </AvGroup>
                <AvGroup>
                  <Label id="modifieParLabel" for="categorie-modifiePar">
                    Modifie Par
                </Label>
                  <AvField id="categorie-modifiePar" type="text" name="modifiePar" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/categorie" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">Back</span>
                </Button>
              &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                &nbsp; Save
              </Button>
                  </Col>

                </Row>

                
                
              </AvForm>
            )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  categorieEntity: storeState.categorie.entity,
  loading: storeState.categorie.loading,
  updating: storeState.categorie.updating,
  updateSuccess: storeState.categorie.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CategorieUpdate);
