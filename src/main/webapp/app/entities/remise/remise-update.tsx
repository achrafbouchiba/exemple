import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IProduit } from 'app/shared/model/produit.model';
import { getEntities as getProduits } from 'app/entities/produit/produit.reducer';
import { ISousCategorie } from 'app/shared/model/sous-categorie.model';
import { getEntities as getSousCategories } from 'app/entities/sous-categorie/sous-categorie.reducer';
import { ICategorie } from 'app/shared/model/categorie.model';
import { getEntities as getCategories } from 'app/entities/categorie/categorie.reducer';
import { getEntity, updateEntity, createEntity, reset } from './remise.reducer';
import { IRemise } from 'app/shared/model/remise.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IRemiseUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const RemiseUpdate = (props: IRemiseUpdateProps) => {
  const [refProduitId, setRefProduitId] = useState('0');
  const [sousCategorieId, setSousCategorieId] = useState('0');
  const [categorieId, setCategorieId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { remiseEntity, produits, sousCategories, categories, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/remise');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getProduits();
    props.getSousCategories();
    props.getCategories();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...remiseEntity,
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
          <h2 id="bazarshopApp.remise.home.createOrEditLabel">Create or edit a Remise</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : remiseEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="remise-id">ID</Label>
                  <AvInput id="remise-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="categorieClientLabel" for="remise-categorieClient">
                  Categorie Client
                </Label>
                <AvInput
                  id="remise-categorieClient"
                  type="select"
                  className="form-control"
                  name="categorieClient"
                  value={(!isNew && remiseEntity.categorieClient) || 'Silver'}
                >
                  <option value="Silver">Silver</option>
                  <option value="Gold">Gold</option>
                  <option value="Platinium">Platinium</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="prixLabel" for="remise-prix">
                  Prix
                </Label>
                <AvField id="remise-prix" type="string" className="form-control" name="prix" />
              </AvGroup>
              <AvGroup>
                <Label id="remiseLabel" for="remise-remise">
                  Remise
                </Label>
                <AvField id="remise-remise" type="string" className="form-control" name="remise" />
              </AvGroup>
              <AvGroup check>
                <Label id="cumulableLabel">
                  <AvInput id="remise-cumulable" type="checkbox" className="form-check-input" name="cumulable" />
                  Cumulable
                </Label>
              </AvGroup>
              <AvGroup>
                <Label id="debutPromoLabel" for="remise-debutPromo">
                  Debut Promo
                </Label>
                <AvField id="remise-debutPromo" type="date" className="form-control" name="debutPromo" />
              </AvGroup>
              <AvGroup>
                <Label id="finPromoLabel" for="remise-finPromo">
                  Fin Promo
                </Label>
                <AvField id="remise-finPromo" type="date" className="form-control" name="finPromo" />
              </AvGroup>
              <AvGroup check>
                <Label id="etatLabel">
                  <AvInput id="remise-etat" type="checkbox" className="form-check-input" name="etat" />
                  Etat
                </Label>
              </AvGroup>
              <AvGroup>
                <Label id="creeLeLabel" for="remise-creeLe">
                  Cree Le
                </Label>
                <AvField id="remise-creeLe" type="date" className="form-control" name="creeLe" />
              </AvGroup>
              <AvGroup>
                <Label id="creeParLabel" for="remise-creePar">
                  Cree Par
                </Label>
                <AvField id="remise-creePar" type="text" name="creePar" />
              </AvGroup>
              <AvGroup>
                <Label id="modifieLeLabel" for="remise-modifieLe">
                  Modifie Le
                </Label>
                <AvField id="remise-modifieLe" type="date" className="form-control" name="modifieLe" />
              </AvGroup>
              <AvGroup>
                <Label id="modifieParLabel" for="remise-modifiePar">
                  Modifie Par
                </Label>
                <AvField id="remise-modifiePar" type="text" name="modifiePar" />
              </AvGroup>
              <AvGroup>
                <Label for="remise-refProduit">Ref Produit</Label>
                <AvInput id="remise-refProduit" type="select" className="form-control" name="refProduitId">
                  <option value="" key="0" />
                  {produits
                    ? produits.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.reference}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="remise-sousCategorie">Sous Categorie</Label>
                <AvInput id="remise-sousCategorie" type="select" className="form-control" name="sousCategorieId">
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
                <Label for="remise-categorie">Categorie</Label>
                <AvInput id="remise-categorie" type="select" className="form-control" name="categorieId">
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
              <Button tag={Link} id="cancel-save" to="/remise" replace color="info">
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
  produits: storeState.produit.entities,
  sousCategories: storeState.sousCategorie.entities,
  categories: storeState.categorie.entities,
  remiseEntity: storeState.remise.entity,
  loading: storeState.remise.loading,
  updating: storeState.remise.updating,
  updateSuccess: storeState.remise.updateSuccess
});

const mapDispatchToProps = {
  getProduits,
  getSousCategories,
  getCategories,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(RemiseUpdate);
