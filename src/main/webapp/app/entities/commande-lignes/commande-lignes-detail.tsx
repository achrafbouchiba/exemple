import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './commande-lignes.reducer';
import { ICommandeLignes } from 'app/shared/model/commande-lignes.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICommandeLignesDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CommandeLignesDetail = (props: ICommandeLignesDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { commandeLignesEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          CommandeLignes [<b>{commandeLignesEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="quantite">Quantite</span>
          </dt>
          <dd>{commandeLignesEntity.quantite}</dd>
          <dt>
            <span id="prixHT">Prix HT</span>
          </dt>
          <dd>{commandeLignesEntity.prixHT}</dd>
          <dt>
            <span id="tva">Tva</span>
          </dt>
          <dd>{commandeLignesEntity.tva}</dd>
          <dt>
            <span id="prixTTC">Prix TTC</span>
          </dt>
          <dd>{commandeLignesEntity.prixTTC}</dd>
          <dt>
            <span id="creeLe">Cree Le</span>
          </dt>
          <dd>
            <TextFormat value={commandeLignesEntity.creeLe} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="creePar">Cree Par</span>
          </dt>
          <dd>{commandeLignesEntity.creePar}</dd>
          <dt>
            <span id="modifieLe">Modifie Le</span>
          </dt>
          <dd>
            <TextFormat value={commandeLignesEntity.modifieLe} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="modifiePar">Modifie Par</span>
          </dt>
          <dd>{commandeLignesEntity.modifiePar}</dd>
          <dt>Ref Commande</dt>
          <dd>{commandeLignesEntity.refCommandeReference ? commandeLignesEntity.refCommandeReference : ''}</dd>
          <dt>Ref Produit</dt>
          <dd>{commandeLignesEntity.refProduitReference ? commandeLignesEntity.refProduitReference : ''}</dd>
        </dl>
        <Button tag={Link} to="/commande-lignes" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/commande-lignes/${commandeLignesEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ commandeLignes }: IRootState) => ({
  commandeLignesEntity: commandeLignes.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CommandeLignesDetail);
