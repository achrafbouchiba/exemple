import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './prod-enumeration.reducer';
import { IProdEnumeration } from 'app/shared/model/prod-enumeration.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProdEnumerationDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ProdEnumerationDetail = (props: IProdEnumerationDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { prodEnumerationEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          ProdEnumeration [<b>{prodEnumerationEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="type">Type</span>
          </dt>
          <dd>{prodEnumerationEntity.type}</dd>
          <dt>
            <span id="nom">Nom</span>
          </dt>
          <dd>{prodEnumerationEntity.nom}</dd>
        </dl>
        <Button tag={Link} to="/prod-enumeration" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/prod-enumeration/${prodEnumerationEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ prodEnumeration }: IRootState) => ({
  prodEnumerationEntity: prodEnumeration.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProdEnumerationDetail);
