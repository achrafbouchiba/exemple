import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './livraison.reducer';
import { ILivraison } from 'app/shared/model/livraison.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ILivraisonDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const LivraisonDetail = (props: ILivraisonDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { livraisonEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          Livraison [<b>{livraisonEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="categorieClient">Categorie Client</span>
          </dt>
          <dd>{livraisonEntity.categorieClient}</dd>
          <dt>
            <span id="intervalValeur">Interval Valeur</span>
          </dt>
          <dd>{livraisonEntity.intervalValeur}</dd>
          <dt>
            <span id="frais">Frais</span>
          </dt>
          <dd>{livraisonEntity.frais}</dd>
          <dt>
            <span id="creeLe">Cree Le</span>
          </dt>
          <dd>
            <TextFormat value={livraisonEntity.creeLe} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="creePar">Cree Par</span>
          </dt>
          <dd>{livraisonEntity.creePar}</dd>
          <dt>
            <span id="modifieLe">Modifie Le</span>
          </dt>
          <dd>
            <TextFormat value={livraisonEntity.modifieLe} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="modifiePar">Modifie Par</span>
          </dt>
          <dd>{livraisonEntity.modifiePar}</dd>
          <dt>Zone</dt>
          <dd>{livraisonEntity.zoneNom ? livraisonEntity.zoneNom : ''}</dd>
        </dl>
        <Button tag={Link} to="/livraison" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/livraison/${livraisonEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ livraison }: IRootState) => ({
  livraisonEntity: livraison.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(LivraisonDetail);
