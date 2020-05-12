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
import { ICommande } from 'app/shared/model/commande.model';
import { getEntities as getCommandes } from 'app/entities/commande/commande.reducer';
import { getEntity, updateEntity, createEntity, reset } from './mouvement-stock.reducer';
import { IMouvementStock } from 'app/shared/model/mouvement-stock.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IMouvementStockUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const MouvementStockUpdate = (props: IMouvementStockUpdateProps) => {
  const [refProduitId, setRefProduitId] = useState('0');
  const [refCommandeId, setRefCommandeId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { mouvementStockEntity, produits, commandes, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/mouvement-stock');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getProduits();
    props.getCommandes();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...mouvementStockEntity,
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
          <h2 id="bazarshopApp.mouvementStock.home.createOrEditLabel">Create or edit a MouvementStock</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : mouvementStockEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="mouvement-stock-id">ID</Label>
                  <AvInput id="mouvement-stock-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="typeLabel" for="mouvement-stock-type">
                  Type
                </Label>
                <AvInput
                  id="mouvement-stock-type"
                  type="select"
                  className="form-control"
                  name="type"
                  value={(!isNew && mouvementStockEntity.type) || 'Stock'}
                >
                  <option value="Stock">Stock</option>
                  <option value="Commande">Commande</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="dateLabel" for="mouvement-stock-date">
                  Date
                </Label>
                <AvField id="mouvement-stock-date" type="date" className="form-control" name="date" />
              </AvGroup>
              <AvGroup>
                <Label id="sensLabel" for="mouvement-stock-sens">
                  Sens
                </Label>
                <AvField id="mouvement-stock-sens" type="string" className="form-control" name="sens" />
              </AvGroup>
              <AvGroup>
                <Label id="quantiteLabel" for="mouvement-stock-quantite">
                  Quantite
                </Label>
                <AvField id="mouvement-stock-quantite" type="string" className="form-control" name="quantite" />
              </AvGroup>
              <AvGroup>
                <Label id="creeLeLabel" for="mouvement-stock-creeLe">
                  Cree Le
                </Label>
                <AvField id="mouvement-stock-creeLe" type="date" className="form-control" name="creeLe" />
              </AvGroup>
              <AvGroup>
                <Label id="creeParLabel" for="mouvement-stock-creePar">
                  Cree Par
                </Label>
                <AvField id="mouvement-stock-creePar" type="text" name="creePar" />
              </AvGroup>
              <AvGroup>
                <Label id="modifieLeLabel" for="mouvement-stock-modifieLe">
                  Modifie Le
                </Label>
                <AvField id="mouvement-stock-modifieLe" type="date" className="form-control" name="modifieLe" />
              </AvGroup>
              <AvGroup>
                <Label id="modifieParLabel" for="mouvement-stock-modifiePar">
                  Modifie Par
                </Label>
                <AvField id="mouvement-stock-modifiePar" type="text" name="modifiePar" />
              </AvGroup>
              <AvGroup>
                <Label for="mouvement-stock-refProduit">Ref Produit</Label>
                <AvInput id="mouvement-stock-refProduit" type="select" className="form-control" name="refProduitId">
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
                <Label for="mouvement-stock-refCommande">Ref Commande</Label>
                <AvInput id="mouvement-stock-refCommande" type="select" className="form-control" name="refCommandeId">
                  <option value="" key="0" />
                  {commandes
                    ? commandes.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.reference}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/mouvement-stock" replace color="info">
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
  commandes: storeState.commande.entities,
  mouvementStockEntity: storeState.mouvementStock.entity,
  loading: storeState.mouvementStock.loading,
  updating: storeState.mouvementStock.updating,
  updateSuccess: storeState.mouvementStock.updateSuccess
});

const mapDispatchToProps = {
  getProduits,
  getCommandes,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(MouvementStockUpdate);
