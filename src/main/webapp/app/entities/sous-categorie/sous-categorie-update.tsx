import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICategorie } from 'app/shared/model/categorie.model';
import { getEntities as getCategories } from 'app/entities/categorie/categorie.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './sous-categorie.reducer';
import { ISousCategorie } from 'app/shared/model/sous-categorie.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ISousCategorieUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const SousCategorieUpdate = (props: ISousCategorieUpdateProps) => {
  const [categorieId, setCategorieId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { sousCategorieEntity, categories, loading, updating } = props;

  const { image, imageContentType } = sousCategorieEntity;

  const handleClose = () => {
    props.history.push('/sous-categorie');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getCategories();
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
        ...sousCategorieEntity,
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
          <h2 id="bazarshopApp.sousCategorie.home.createOrEditLabel">Create or edit a SousCategorie</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : sousCategorieEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="sous-categorie-id">ID</Label>
                  <AvInput id="sous-categorie-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nomLabel" for="sous-categorie-nom">
                  Nom
                </Label>
                <AvField
                  id="sous-categorie-nom"
                  type="text"
                  name="nom"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="descriptionLabel" for="sous-categorie-description">
                  Description
                </Label>
                <AvField id="sous-categorie-description" type="text" name="description" />
              </AvGroup>
              <AvGroup>
                <Label id="positionLabel" for="sous-categorie-position">
                  Position
                </Label>
                <AvField
                  id="sous-categorie-position"
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
                  <AvInput id="sous-categorie-etat" type="checkbox" className="form-check-input" name="etat" />
                  Etat
                </Label>
              </AvGroup>
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
                <Label id="creeLeLabel" for="sous-categorie-creeLe">
                  Cree Le
                </Label>
                <AvField id="sous-categorie-creeLe" type="date" className="form-control" name="creeLe" />
              </AvGroup>
              <AvGroup>
                <Label id="creeParLabel" for="sous-categorie-creePar">
                  Cree Par
                </Label>
                <AvField id="sous-categorie-creePar" type="text" name="creePar" />
              </AvGroup>
              <AvGroup>
                <Label id="modifieLeLabel" for="sous-categorie-modifieLe">
                  Modifie Le
                </Label>
                <AvField id="sous-categorie-modifieLe" type="date" className="form-control" name="modifieLe" />
              </AvGroup>
              <AvGroup>
                <Label id="modifieParLabel" for="sous-categorie-modifiePar">
                  Modifie Par
                </Label>
                <AvField id="sous-categorie-modifiePar" type="text" name="modifiePar" />
              </AvGroup>
              <AvGroup>
                <Label for="sous-categorie-categorie">Categorie</Label>
                <AvInput id="sous-categorie-categorie" type="select" className="form-control" name="categorieId">
                  <option value="" key="0" />
                  {categories
                    ? categories.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.nom}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/sous-categorie" replace color="info">
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
  categories: storeState.categorie.entities,
  sousCategorieEntity: storeState.sousCategorie.entity,
  loading: storeState.sousCategorie.loading,
  updating: storeState.sousCategorie.updating,
  updateSuccess: storeState.sousCategorie.updateSuccess
});

const mapDispatchToProps = {
  getCategories,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SousCategorieUpdate);
