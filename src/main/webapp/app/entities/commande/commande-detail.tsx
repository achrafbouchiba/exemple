import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './commande.reducer';
import { ICommande } from 'app/shared/model/commande.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICommandeDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CommandeDetail = (props: ICommandeDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { commandeEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          Commande [<b>{commandeEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="reference">Reference</span>
          </dt>
          <dd>{commandeEntity.reference}</dd>
          <dt>
            <span id="date">Date</span>
          </dt>
          <dd>
            <TextFormat value={commandeEntity.date} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="statut">Statut</span>
          </dt>
          <dd>{commandeEntity.statut}</dd>
          <dt>
            <span id="naturePiece">Nature Piece</span>
          </dt>
          <dd>{commandeEntity.naturePiece}</dd>
          <dt>
            <span id="totalHT">Total HT</span>
          </dt>
          <dd>{commandeEntity.totalHT}</dd>
          <dt>
            <span id="totalTVA">Total TVA</span>
          </dt>
          <dd>{commandeEntity.totalTVA}</dd>
          <dt>
            <span id="totalRemise">Total Remise</span>
          </dt>
          <dd>{commandeEntity.totalRemise}</dd>
          <dt>
            <span id="totTTC">Tot TTC</span>
          </dt>
          <dd>{commandeEntity.totTTC}</dd>
          <dt>
            <span id="zone">Zone</span>
          </dt>
          <dd>{commandeEntity.zone}</dd>
          <dt>
            <span id="dateLivraison">Date Livraison</span>
          </dt>
          <dd>
            <TextFormat value={commandeEntity.dateLivraison} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="creeLe">Cree Le</span>
          </dt>
          <dd>
            <TextFormat value={commandeEntity.creeLe} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="creePar">Cree Par</span>
          </dt>
          <dd>{commandeEntity.creePar}</dd>
          <dt>
            <span id="modifieLe">Modifie Le</span>
          </dt>
          <dd>
            <TextFormat value={commandeEntity.modifieLe} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="modifiePar">Modifie Par</span>
          </dt>
          <dd>{commandeEntity.modifiePar}</dd>
          <dt>Id Client</dt>
          <dd>{commandeEntity.idClientId ? commandeEntity.idClientId : ''}</dd>
          <dt>Id Adresse</dt>
          <dd>{commandeEntity.idAdresseId ? commandeEntity.idAdresseId : ''}</dd>
        </dl>
        <Button tag={Link} to="/commande" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/commande/${commandeEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ commande }: IRootState) => ({
  commandeEntity: commande.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CommandeDetail);
