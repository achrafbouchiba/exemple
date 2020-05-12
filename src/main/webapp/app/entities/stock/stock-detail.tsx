import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './stock.reducer';
import { IStock } from 'app/shared/model/stock.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IStockDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const StockDetail = (props: IStockDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { stockEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          Stock [<b>{stockEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="stockPhysique">Stock Physique</span>
          </dt>
          <dd>{stockEntity.stockPhysique}</dd>
          <dt>
            <span id="stockDisponible">Stock Disponible</span>
          </dt>
          <dd>{stockEntity.stockDisponible}</dd>
          <dt>
            <span id="stockReserve">Stock Reserve</span>
          </dt>
          <dd>{stockEntity.stockReserve}</dd>
          <dt>
            <span id="stockCommande">Stock Commande</span>
          </dt>
          <dd>{stockEntity.stockCommande}</dd>
          <dt>
            <span id="derniereEntre">Derniere Entre</span>
          </dt>
          <dd>
            <TextFormat value={stockEntity.derniereEntre} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="derniereSortie">Derniere Sortie</span>
          </dt>
          <dd>
            <TextFormat value={stockEntity.derniereSortie} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="alerteStock">Alerte Stock</span>
          </dt>
          <dd>{stockEntity.alerteStock ? 'true' : 'false'}</dd>
          <dt>
            <span id="creeLe">Cree Le</span>
          </dt>
          <dd>
            <TextFormat value={stockEntity.creeLe} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="creePar">Cree Par</span>
          </dt>
          <dd>{stockEntity.creePar}</dd>
          <dt>
            <span id="modifieLe">Modifie Le</span>
          </dt>
          <dd>
            <TextFormat value={stockEntity.modifieLe} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="modifiePar">Modifie Par</span>
          </dt>
          <dd>{stockEntity.modifiePar}</dd>
          <dt>Ref Produit</dt>
          <dd>{stockEntity.refProduitReference ? stockEntity.refProduitReference : ''}</dd>
          <dt>Id Categorie</dt>
          <dd>{stockEntity.idCategorieNom ? stockEntity.idCategorieNom : ''}</dd>
          <dt>Id Sous Categorie</dt>
          <dd>{stockEntity.idSousCategorieNom ? stockEntity.idSousCategorieNom : ''}</dd>
        </dl>
        <Button tag={Link} to="/stock" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/stock/${stockEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ stock }: IRootState) => ({
  stockEntity: stock.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(StockDetail);
