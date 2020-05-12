import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './mouvement-stock.reducer';
import { IMouvementStock } from 'app/shared/model/mouvement-stock.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IMouvementStockDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const MouvementStockDetail = (props: IMouvementStockDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { mouvementStockEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          MouvementStock [<b>{mouvementStockEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="type">Type</span>
          </dt>
          <dd>{mouvementStockEntity.type}</dd>
          <dt>
            <span id="date">Date</span>
          </dt>
          <dd>
            <TextFormat value={mouvementStockEntity.date} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="sens">Sens</span>
          </dt>
          <dd>{mouvementStockEntity.sens}</dd>
          <dt>
            <span id="quantite">Quantite</span>
          </dt>
          <dd>{mouvementStockEntity.quantite}</dd>
          <dt>
            <span id="creeLe">Cree Le</span>
          </dt>
          <dd>
            <TextFormat value={mouvementStockEntity.creeLe} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="creePar">Cree Par</span>
          </dt>
          <dd>{mouvementStockEntity.creePar}</dd>
          <dt>
            <span id="modifieLe">Modifie Le</span>
          </dt>
          <dd>
            <TextFormat value={mouvementStockEntity.modifieLe} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="modifiePar">Modifie Par</span>
          </dt>
          <dd>{mouvementStockEntity.modifiePar}</dd>
          <dt>Ref Produit</dt>
          <dd>{mouvementStockEntity.refProduitReference ? mouvementStockEntity.refProduitReference : ''}</dd>
          <dt>Ref Commande</dt>
          <dd>{mouvementStockEntity.refCommandeReference ? mouvementStockEntity.refCommandeReference : ''}</dd>
        </dl>
        <Button tag={Link} to="/mouvement-stock" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/mouvement-stock/${mouvementStockEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ mouvementStock }: IRootState) => ({
  mouvementStockEntity: mouvementStock.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(MouvementStockDetail);
