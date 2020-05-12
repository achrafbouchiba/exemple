import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IClient } from 'app/shared/model/client.model';
import { getEntities as getClients } from 'app/entities/client/client.reducer';
import { IAdresse } from 'app/shared/model/adresse.model';
import { getEntities as getAdresses } from 'app/entities/adresse/adresse.reducer';
import { getEntity, updateEntity, createEntity, reset } from './commande.reducer';
import { ICommande } from 'app/shared/model/commande.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICommandeUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CommandeUpdate = (props: ICommandeUpdateProps) => {
  const [idClientId, setIdClientId] = useState('0');
  const [idAdresseId, setIdAdresseId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { commandeEntity, clients, adresses, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/commande');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getClients();
    props.getAdresses();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...commandeEntity,
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
          <h2 id="bazarshopApp.commande.home.createOrEditLabel">Create or edit a Commande</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : commandeEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="commande-id">ID</Label>
                  <AvInput id="commande-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="referenceLabel" for="commande-reference">
                  Reference
                </Label>
                <AvField
                  id="commande-reference"
                  type="text"
                  name="reference"
                  validate={{
                    pattern: { value: '^[a-zA-Z0-9]{0,12}$', errorMessage: "This field should follow pattern for '^[a-zA-Z0-9]{0,12}.." }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="dateLabel" for="commande-date">
                  Date
                </Label>
                <AvField id="commande-date" type="date" className="form-control" name="date" />
              </AvGroup>
              <AvGroup>
                <Label id="statutLabel" for="commande-statut">
                  Statut
                </Label>
                <AvInput
                  id="commande-statut"
                  type="select"
                  className="form-control"
                  name="statut"
                  value={(!isNew && commandeEntity.statut) || 'Commande'}
                >
                  <option value="Commande">Commande</option>
                  <option value="Annulee">Annulee</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Preparation">Preparation</option>
                  <option value="Livraison">Livraison</option>
                  <option value="Livree">Livree</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="naturePieceLabel" for="commande-naturePiece">
                  Nature Piece
                </Label>
                <AvInput
                  id="commande-naturePiece"
                  type="select"
                  className="form-control"
                  name="naturePiece"
                  value={(!isNew && commandeEntity.naturePiece) || 'Commande'}
                >
                  <option value="Commande">Commande</option>
                  <option value="Confcommande">Confcommande</option>
                  <option value="Livraison">Livraison</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="totalHTLabel" for="commande-totalHT">
                  Total HT
                </Label>
                <AvField id="commande-totalHT" type="string" className="form-control" name="totalHT" />
              </AvGroup>
              <AvGroup>
                <Label id="totalTVALabel" for="commande-totalTVA">
                  Total TVA
                </Label>
                <AvField id="commande-totalTVA" type="string" className="form-control" name="totalTVA" />
              </AvGroup>
              <AvGroup>
                <Label id="totalRemiseLabel" for="commande-totalRemise">
                  Total Remise
                </Label>
                <AvField id="commande-totalRemise" type="string" className="form-control" name="totalRemise" />
              </AvGroup>
              <AvGroup>
                <Label id="totTTCLabel" for="commande-totTTC">
                  Tot TTC
                </Label>
                <AvField id="commande-totTTC" type="string" className="form-control" name="totTTC" />
              </AvGroup>
              <AvGroup>
                <Label id="zoneLabel" for="commande-zone">
                  Zone
                </Label>
                <AvField id="commande-zone" type="text" name="zone" />
              </AvGroup>
              <AvGroup>
                <Label id="dateLivraisonLabel" for="commande-dateLivraison">
                  Date Livraison
                </Label>
                <AvField id="commande-dateLivraison" type="date" className="form-control" name="dateLivraison" />
              </AvGroup>
              <AvGroup>
                <Label id="creeLeLabel" for="commande-creeLe">
                  Cree Le
                </Label>
                <AvField id="commande-creeLe" type="date" className="form-control" name="creeLe" />
              </AvGroup>
              <AvGroup>
                <Label id="creeParLabel" for="commande-creePar">
                  Cree Par
                </Label>
                <AvField id="commande-creePar" type="text" name="creePar" />
              </AvGroup>
              <AvGroup>
                <Label id="modifieLeLabel" for="commande-modifieLe">
                  Modifie Le
                </Label>
                <AvField id="commande-modifieLe" type="date" className="form-control" name="modifieLe" />
              </AvGroup>
              <AvGroup>
                <Label id="modifieParLabel" for="commande-modifiePar">
                  Modifie Par
                </Label>
                <AvField id="commande-modifiePar" type="text" name="modifiePar" />
              </AvGroup>
              <AvGroup>
                <Label for="commande-idClient">Id Client</Label>
                <AvInput id="commande-idClient" type="select" className="form-control" name="idClientId">
                  <option value="" key="0" />
                  {clients
                    ? clients.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="commande-idAdresse">Id Adresse</Label>
                <AvInput id="commande-idAdresse" type="select" className="form-control" name="idAdresseId">
                  <option value="" key="0" />
                  {adresses
                    ? adresses.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/commande" replace color="info">
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
  clients: storeState.client.entities,
  adresses: storeState.adresse.entities,
  commandeEntity: storeState.commande.entity,
  loading: storeState.commande.loading,
  updating: storeState.commande.updating,
  updateSuccess: storeState.commande.updateSuccess
});

const mapDispatchToProps = {
  getClients,
  getAdresses,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CommandeUpdate);
