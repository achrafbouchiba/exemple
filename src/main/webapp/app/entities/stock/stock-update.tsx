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
import { ICategorie } from 'app/shared/model/categorie.model';
import { getEntities as getCategories } from 'app/entities/categorie/categorie.reducer';
import { ISousCategorie } from 'app/shared/model/sous-categorie.model';
import { getEntities as getSousCategories } from 'app/entities/sous-categorie/sous-categorie.reducer';
import { getEntity, updateEntity, createEntity, reset } from './stock.reducer';
import { IStock } from 'app/shared/model/stock.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IStockUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const StockUpdate = (props: IStockUpdateProps) => {
  const [refProduitId, setRefProduitId] = useState('0');
  const [idCategorieId, setIdCategorieId] = useState('0');
  const [idSousCategorieId, setIdSousCategorieId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { stockEntity, produits, categories, sousCategories, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/stock');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getProduits();
    props.getCategories();
    props.getSousCategories();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...stockEntity,
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
          <h2 id="bazarshopApp.stock.home.createOrEditLabel">Create or edit a Stock</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : stockEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="stock-id">ID</Label>
                  <AvInput id="stock-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="stockPhysiqueLabel" for="stock-stockPhysique">
                  Stock Physique
                </Label>
                <AvField id="stock-stockPhysique" type="string" className="form-control" name="stockPhysique" />
              </AvGroup>
              <AvGroup>
                <Label id="stockDisponibleLabel" for="stock-stockDisponible">
                  Stock Disponible
                </Label>
                <AvField id="stock-stockDisponible" type="string" className="form-control" name="stockDisponible" />
              </AvGroup>
              <AvGroup>
                <Label id="stockReserveLabel" for="stock-stockReserve">
                  Stock Reserve
                </Label>
                <AvField id="stock-stockReserve" type="string" className="form-control" name="stockReserve" />
              </AvGroup>
              <AvGroup>
                <Label id="stockCommandeLabel" for="stock-stockCommande">
                  Stock Commande
                </Label>
                <AvField id="stock-stockCommande" type="string" className="form-control" name="stockCommande" />
              </AvGroup>
              <AvGroup>
                <Label id="derniereEntreLabel" for="stock-derniereEntre">
                  Derniere Entre
                </Label>
                <AvField id="stock-derniereEntre" type="date" className="form-control" name="derniereEntre" />
              </AvGroup>
              <AvGroup>
                <Label id="derniereSortieLabel" for="stock-derniereSortie">
                  Derniere Sortie
                </Label>
                <AvField id="stock-derniereSortie" type="date" className="form-control" name="derniereSortie" />
              </AvGroup>
              <AvGroup check>
                <Label id="alerteStockLabel">
                  <AvInput id="stock-alerteStock" type="checkbox" className="form-check-input" name="alerteStock" />
                  Alerte Stock
                </Label>
              </AvGroup>
              <AvGroup>
                <Label id="creeLeLabel" for="stock-creeLe">
                  Cree Le
                </Label>
                <AvField id="stock-creeLe" type="date" className="form-control" name="creeLe" />
              </AvGroup>
              <AvGroup>
                <Label id="creeParLabel" for="stock-creePar">
                  Cree Par
                </Label>
                <AvField id="stock-creePar" type="text" name="creePar" />
              </AvGroup>
              <AvGroup>
                <Label id="modifieLeLabel" for="stock-modifieLe">
                  Modifie Le
                </Label>
                <AvField id="stock-modifieLe" type="date" className="form-control" name="modifieLe" />
              </AvGroup>
              <AvGroup>
                <Label id="modifieParLabel" for="stock-modifiePar">
                  Modifie Par
                </Label>
                <AvField id="stock-modifiePar" type="text" name="modifiePar" />
              </AvGroup>
              <AvGroup>
                <Label for="stock-refProduit">Ref Produit</Label>
                <AvInput id="stock-refProduit" type="select" className="form-control" name="refProduitId">
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
                <Label for="stock-idCategorie">Id Categorie</Label>
                <AvInput id="stock-idCategorie" type="select" className="form-control" name="idCategorieId">
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
              <AvGroup>
                <Label for="stock-idSousCategorie">Id Sous Categorie</Label>
                <AvInput id="stock-idSousCategorie" type="select" className="form-control" name="idSousCategorieId">
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
              <Button tag={Link} id="cancel-save" to="/stock" replace color="info">
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
  categories: storeState.categorie.entities,
  sousCategories: storeState.sousCategorie.entities,
  stockEntity: storeState.stock.entity,
  loading: storeState.stock.loading,
  updating: storeState.stock.updating,
  updateSuccess: storeState.stock.updateSuccess
});

const mapDispatchToProps = {
  getProduits,
  getCategories,
  getSousCategories,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(StockUpdate);
