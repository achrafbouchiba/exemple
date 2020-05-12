import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './client.reducer';
import { IClient } from 'app/shared/model/client.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IClientDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ClientDetail = (props: IClientDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { clientEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          Client [<b>{clientEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="civilite">Civilite</span>
          </dt>
          <dd>{clientEntity.civilite}</dd>
          <dt>
            <span id="nom">Nom</span>
          </dt>
          <dd>{clientEntity.nom}</dd>
          <dt>
            <span id="prenom">Prenom</span>
          </dt>
          <dd>{clientEntity.prenom}</dd>
          <dt>
            <span id="dateDeNaissance">Date De Naissance</span>
          </dt>
          <dd>
            <TextFormat value={clientEntity.dateDeNaissance} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="email">Email</span>
          </dt>
          <dd>{clientEntity.email}</dd>
          <dt>
            <span id="mobile">Mobile</span>
          </dt>
          <dd>{clientEntity.mobile}</dd>
          <dt>
            <span id="reglement">Reglement</span>
          </dt>
          <dd>{clientEntity.reglement}</dd>
          <dt>
            <span id="etat">Etat</span>
          </dt>
          <dd>{clientEntity.etat ? 'true' : 'false'}</dd>
          <dt>
            <span id="derniereVisite">Derniere Visite</span>
          </dt>
          <dd>
            <TextFormat value={clientEntity.derniereVisite} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="totalAchat">Total Achat</span>
          </dt>
          <dd>{clientEntity.totalAchat}</dd>
          <dt>
            <span id="categorie">Categorie</span>
          </dt>
          <dd>{clientEntity.categorie}</dd>
          <dt>
            <span id="pointsFidelite">Points Fidelite</span>
          </dt>
          <dd>{clientEntity.pointsFidelite}</dd>
          <dt>
            <span id="creeLe">Cree Le</span>
          </dt>
          <dd>
            <TextFormat value={clientEntity.creeLe} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="creePar">Cree Par</span>
          </dt>
          <dd>{clientEntity.creePar}</dd>
          <dt>
            <span id="modifieLe">Modifie Le</span>
          </dt>
          <dd>
            <TextFormat value={clientEntity.modifieLe} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="modifiePar">Modifie Par</span>
          </dt>
          <dd>{clientEntity.modifiePar}</dd>
        </dl>
        <Button tag={Link} to="/client" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/client/${clientEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ client }: IRootState) => ({
  clientEntity: client.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ClientDetail);
