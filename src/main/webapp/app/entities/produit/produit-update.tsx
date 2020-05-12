import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ISousCategorie } from 'app/shared/model/sous-categorie.model';
import { getEntities as getSousCategories } from 'app/entities/sous-categorie/sous-categorie.reducer';
import { IProduitUnite } from 'app/shared/model/produit-unite.model';
import { getEntities as getProduitUnites } from 'app/entities/produit-unite/produit-unite.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './produit.reducer';
import { IProduit } from 'app/shared/model/produit.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IProduitUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ProduitUpdate = (props: IProduitUpdateProps) => {
  const [sousCategorieId, setSousCategorieId] = useState('0');
  const [uniteId, setUniteId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { produitEntity, sousCategories, produitUnites, loading, updating } = props;

  const { image, imageContentType } = produitEntity;

  const handleClose = () => {
    props.history.push('/produit');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getSousCategories();
    props.getProduitUnites();
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
        ...produitEntity,
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
          <h2 id="bazarshopApp.produit.home.createOrEditLabel">Create or edit a Produit</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : produitEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="produit-id">ID</Label>
                  <AvInput id="produit-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="referenceLabel" for="produit-reference">
                  Reference
                </Label>
                <AvField
                  id="produit-reference"
                  type="text"
                  name="reference"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' },
                    pattern: { value: '^([\\S]{1,25}$)*', errorMessage: "This field should follow pattern for '^([\\S]{1,25}$)*'." }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="nomLabel" for="produit-nom">
                  Nom
                </Label>
                <AvField
                  id="produit-nom"
                  type="text"
                  name="nom"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="codeBarreLabel" for="produit-codeBarre">
                  Code Barre
                </Label>
                <AvField id="produit-codeBarre" type="string" className="form-control" name="codeBarre" />
              </AvGroup>
              <AvGroup>
                <Label id="descriptionLabel" for="produit-description">
                  Description
                </Label>
                <AvField id="produit-description" type="text" name="description" />
              </AvGroup>
              <AvGroup check>
                <Label id="etatLabel">
                  <AvInput id="produit-etat" type="checkbox" className="form-check-input" name="etat" />
                  Etat
                </Label>
              </AvGroup>
              <AvGroup>
                <Label id="marqueLabel" for="produit-marque">
                  Marque
                </Label>
                <AvField id="produit-marque" type="text" name="marque" />
              </AvGroup>
              <AvGroup>
                <Label id="natureLabel" for="produit-nature">
                  Nature
                </Label>
                <AvField id="produit-nature" type="text" name="nature" />
              </AvGroup>
              <AvGroup>
                <Label id="stockMinimumLabel" for="produit-stockMinimum">
                  Stock Minimum
                </Label>
                <AvField id="produit-stockMinimum" type="string" className="form-control" name="stockMinimum" />
              </AvGroup>
              <AvGroup>
                <Label id="quantiteVenteMaxLabel" for="produit-quantiteVenteMax">
                  Quantite Vente Max
                </Label>
                <AvField id="produit-quantiteVenteMax" type="string" className="form-control" name="quantiteVenteMax" />
              </AvGroup>
              <AvGroup check>
                <Label id="horsStockLabel">
                  <AvInput id="produit-horsStock" type="checkbox" className="form-check-input" name="horsStock" />
                  Hors Stock
                </Label>
              </AvGroup>
              <AvGroup check>
                <Label id="gereEnStockLabel">
                  <AvInput id="produit-gereEnStock" type="checkbox" className="form-check-input" name="gereEnStock" />
                  Gere En Stock
                </Label>
              </AvGroup>
              <AvGroup>
                <Label id="datePremptionLabel" for="produit-datePremption">
                  Date Premption
                </Label>
                <AvField id="produit-datePremption" type="date" className="form-control" name="datePremption" />
              </AvGroup>
              <AvGroup>
                <Label id="prixHTLabel" for="produit-prixHT">
                  Prix HT
                </Label>
                <AvField id="produit-prixHT" type="string" className="form-control" name="prixHT" />
              </AvGroup>
              <AvGroup>
                <Label id="tauxTVALabel" for="produit-tauxTVA">
                  Taux TVA
                </Label>
                <AvField id="produit-tauxTVA" type="string" className="form-control" name="tauxTVA" />
              </AvGroup>
              <AvGroup>
                <Label id="prixTTCLabel" for="produit-prixTTC">
                  Prix TTC
                </Label>
                <AvField id="produit-prixTTC" type="string" className="form-control" name="prixTTC" />
              </AvGroup>
              <AvGroup>
                <Label id="sourceProduitLabel" for="produit-sourceProduit">
                  Source Produit
                </Label>
                <AvInput
                  id="produit-sourceProduit"
                  type="select"
                  className="form-control"
                  name="sourceProduit"
                  value={(!isNew && produitEntity.sourceProduit) || 'Locale'}
                >
                  <option value="Locale">Locale</option>
                  <option value="Externe">Externe</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="ratingLabel" for="produit-rating">
                  Rating
                </Label>
                <AvField
                  id="produit-rating"
                  type="text"
                  name="rating"
                  validate={{
                    pattern: { value: '^[1-5]$', errorMessage: "This field should follow pattern for '^[1-5].." }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="remiseLabel" for="produit-remise">
                  Remise
                </Label>
                <AvField id="produit-remise" type="string" className="form-control" name="remise" />
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
                <Label id="creeLeLabel" for="produit-creeLe">
                  Cree Le
                </Label>
                <AvField id="produit-creeLe" type="date" className="form-control" name="creeLe" />
              </AvGroup>
              <AvGroup>
                <Label id="creeParLabel" for="produit-creePar">
                  Cree Par
                </Label>
                <AvField id="produit-creePar" type="text" name="creePar" />
              </AvGroup>
              <AvGroup>
                <Label id="modifieLeLabel" for="produit-modifieLe">
                  Modifie Le
                </Label>
                <AvField id="produit-modifieLe" type="date" className="form-control" name="modifieLe" />
              </AvGroup>
              <AvGroup>
                <Label id="modifieParLabel" for="produit-modifiePar">
                  Modifie Par
                </Label>
                <AvField id="produit-modifiePar" type="text" name="modifiePar" />
              </AvGroup>
              <AvGroup>
                <Label for="produit-sousCategorie">Sous Categorie</Label>
                <AvInput id="produit-sousCategorie" type="select" className="form-control" name="sousCategorieId">
                  <option value="" key="0" />
                  {sousCategories
                    ? sousCategories.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.nom}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="produit-unite">Unite</Label>
                <AvInput id="produit-unite" type="select" className="form-control" name="uniteId">
                  <option value="" key="0" />
                  {produitUnites
                    ? produitUnites.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.unite}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/produit" replace color="info">
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
  sousCategories: storeState.sousCategorie.entities,
  produitUnites: storeState.produitUnite.entities,
  produitEntity: storeState.produit.entity,
  loading: storeState.produit.loading,
  updating: storeState.produit.updating,
  updateSuccess: storeState.produit.updateSuccess
});

const mapDispatchToProps = {
  getSousCategories,
  getProduitUnites,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProduitUpdate);
