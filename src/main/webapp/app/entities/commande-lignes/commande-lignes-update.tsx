import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICommande } from 'app/shared/model/commande.model';
import { getEntities as getCommandes } from 'app/entities/commande/commande.reducer';
import { IProduit } from 'app/shared/model/produit.model';
import { getEntities as getProduits } from 'app/entities/produit/produit.reducer';
import { getEntity, updateEntity, createEntity, reset } from './commande-lignes.reducer';
import { ICommandeLignes } from 'app/shared/model/commande-lignes.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICommandeLignesUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CommandeLignesUpdate = (props: ICommandeLignesUpdateProps) => {
  const [refCommandeId, setRefCommandeId] = useState('0');
  const [refProduitId, setRefProduitId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { commandeLignesEntity, commandes, produits, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/commande-lignes');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getCommandes();
    props.getProduits();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...commandeLignesEntity,
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
          <h2 id="bazarshopApp.commandeLignes.home.createOrEditLabel">Create or edit a CommandeLignes</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : commandeLignesEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="commande-lignes-id">ID</Label>
                  <AvInput id="commande-lignes-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="quantiteLabel" for="commande-lignes-quantite">
                  Quantite
                </Label>
                <AvField id="commande-lignes-quantite" type="string" className="form-control" name="quantite" />
              </AvGroup>
              <AvGroup>
                <Label id="prixHTLabel" for="commande-lignes-prixHT">
                  Prix HT
                </Label>
                <AvField id="commande-lignes-prixHT" type="string" className="form-control" name="prixHT" />
              </AvGroup>
              <AvGroup>
                <Label id="tvaLabel" for="commande-lignes-tva">
                  Tva
                </Label>
                <AvField id="commande-lignes-tva" type="string" className="form-control" name="tva" />
              </AvGroup>
              <AvGroup>
                <Label id="prixTTCLabel" for="commande-lignes-prixTTC">
                  Prix TTC
                </Label>
                <AvField id="commande-lignes-prixTTC" type="string" className="form-control" name="prixTTC" />
              </AvGroup>
              <AvGroup>
                <Label id="creeLeLabel" for="commande-lignes-creeLe">
                  Cree Le
                </Label>
                <AvField id="commande-lignes-creeLe" type="date" className="form-control" name="creeLe" />
              </AvGroup>
              <AvGroup>
                <Label id="creeParLabel" for="commande-lignes-creePar">
                  Cree Par
                </Label>
                <AvField id="commande-lignes-creePar" type="text" name="creePar" />
              </AvGroup>
              <AvGroup>
                <Label id="modifieLeLabel" for="commande-lignes-modifieLe">
                  Modifie Le
                </Label>
                <AvField id="commande-lignes-modifieLe" type="date" className="form-control" name="modifieLe" />
              </AvGroup>
              <AvGroup>
                <Label id="modifieParLabel" for="commande-lignes-modifiePar">
                  Modifie Par
                </Label>
                <AvField id="commande-lignes-modifiePar" type="text" name="modifiePar" />
              </AvGroup>
              <AvGroup>
                <Label for="commande-lignes-refCommande">Ref Commande</Label>
                <AvInput id="commande-lignes-refCommande" type="select" className="form-control" name="refCommandeId">
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
              <AvGroup>
                <Label for="commande-lignes-refProduit">Ref Produit</Label>
                <AvInput id="commande-lignes-refProduit" type="select" className="form-control" name="refProduitId">
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
              <Button tag={Link} id="cancel-save" to="/commande-lignes" replace color="info">
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
  commandes: storeState.commande.entities,
  produits: storeState.produit.entities,
  commandeLignesEntity: storeState.commandeLignes.entity,
  loading: storeState.commandeLignes.loading,
  updating: storeState.commandeLignes.updating,
  updateSuccess: storeState.commandeLignes.updateSuccess
});

const mapDispatchToProps = {
  getCommandes,
  getProduits,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CommandeLignesUpdate);
