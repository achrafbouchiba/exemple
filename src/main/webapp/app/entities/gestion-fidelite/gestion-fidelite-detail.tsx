import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './gestion-fidelite.reducer';
import { IGestionFidelite } from 'app/shared/model/gestion-fidelite.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IGestionFideliteDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const GestionFideliteDetail = (props: IGestionFideliteDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { gestionFideliteEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          GestionFidelite [<b>{gestionFideliteEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="nom">Nom</span>
          </dt>
          <dd>{gestionFideliteEntity.nom}</dd>
          <dt>
            <span id="points">Points</span>
          </dt>
          <dd>{gestionFideliteEntity.points}</dd>
          <dt>
            <span id="valeur">Valeur</span>
          </dt>
          <dd>{gestionFideliteEntity.valeur}</dd>
          <dt>
            <span id="clientsilvermin">Clientsilvermin</span>
          </dt>
          <dd>{gestionFideliteEntity.clientsilvermin}</dd>
          <dt>
            <span id="clientsilvermax">Clientsilvermax</span>
          </dt>
          <dd>{gestionFideliteEntity.clientsilvermax}</dd>
          <dt>
            <span id="clientgoldmin">Clientgoldmin</span>
          </dt>
          <dd>{gestionFideliteEntity.clientgoldmin}</dd>
          <dt>
            <span id="clientgoldmax">Clientgoldmax</span>
          </dt>
          <dd>{gestionFideliteEntity.clientgoldmax}</dd>
          <dt>
            <span id="clientpremiummin">Clientpremiummin</span>
          </dt>
          <dd>{gestionFideliteEntity.clientpremiummin}</dd>
          <dt>
            <span id="clientpremiummax">Clientpremiummax</span>
          </dt>
          <dd>{gestionFideliteEntity.clientpremiummax}</dd>
          <dt>
            <span id="devise">Devise</span>
          </dt>
          <dd>{gestionFideliteEntity.devise}</dd>
          <dt>
            <span id="etat">Etat</span>
          </dt>
          <dd>{gestionFideliteEntity.etat ? 'true' : 'false'}</dd>
          <dt>
            <span id="creeLe">Cree Le</span>
          </dt>
          <dd>
            <TextFormat value={gestionFideliteEntity.creeLe} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="creePar">Cree Par</span>
          </dt>
          <dd>{gestionFideliteEntity.creePar}</dd>
          <dt>
            <span id="modifieLe">Modifie Le</span>
          </dt>
          <dd>
            <TextFormat value={gestionFideliteEntity.modifieLe} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="modifiePar">Modifie Par</span>
          </dt>
          <dd>{gestionFideliteEntity.modifiePar}</dd>
        </dl>
        <Button tag={Link} to="/gestion-fidelite" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/gestion-fidelite/${gestionFideliteEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ gestionFidelite }: IRootState) => ({
  gestionFideliteEntity: gestionFidelite.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(GestionFideliteDetail);
