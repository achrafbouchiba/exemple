import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './produit-unite.reducer';
import { IProduitUnite } from 'app/shared/model/produit-unite.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProduitUniteDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ProduitUniteDetail = (props: IProduitUniteDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { produitUniteEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          ProduitUnite [<b>{produitUniteEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="unite">Unite</span>
          </dt>
          <dd>{produitUniteEntity.unite}</dd>
        </dl>
        <Button tag={Link} to="/produit-unite" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/produit-unite/${produitUniteEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ produitUnite }: IRootState) => ({
  produitUniteEntity: produitUnite.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProduitUniteDetail);