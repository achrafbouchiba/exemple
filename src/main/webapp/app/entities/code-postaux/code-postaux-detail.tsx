import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './code-postaux.reducer';
import { ICodePostaux } from 'app/shared/model/code-postaux.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICodePostauxDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CodePostauxDetail = (props: ICodePostauxDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { codePostauxEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          CodePostaux [<b>{codePostauxEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="gouvernorat">Gouvernorat</span>
          </dt>
          <dd>{codePostauxEntity.gouvernorat}</dd>
          <dt>
            <span id="ville">Ville</span>
          </dt>
          <dd>{codePostauxEntity.ville}</dd>
          <dt>
            <span id="localite">Localite</span>
          </dt>
          <dd>{codePostauxEntity.localite}</dd>
          <dt>
            <span id="codePostal">Code Postal</span>
          </dt>
          <dd>{codePostauxEntity.codePostal}</dd>
          <dt>
            <span id="zone">Zone</span>
          </dt>
          <dd>{codePostauxEntity.zone}</dd>
          <dt>
            <span id="modifieLe">Modifie Le</span>
          </dt>
          <dd>
            <TextFormat value={codePostauxEntity.modifieLe} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="modifiePar">Modifie Par</span>
          </dt>
          <dd>{codePostauxEntity.modifiePar}</dd>
        </dl>
        <Button tag={Link} to="/code-postaux" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/code-postaux/${codePostauxEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ codePostaux }: IRootState) => ({
  codePostauxEntity: codePostaux.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CodePostauxDetail);
