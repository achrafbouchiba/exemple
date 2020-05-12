import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './adresse.reducer';
import { IAdresse } from 'app/shared/model/adresse.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAdresseDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const AdresseDetail = (props: IAdresseDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { adresseEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          Adresse [<b>{adresseEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="principale">Principale</span>
          </dt>
          <dd>{adresseEntity.principale ? 'true' : 'false'}</dd>
          <dt>
            <span id="nom">Nom</span>
          </dt>
          <dd>{adresseEntity.nom}</dd>
          <dt>
            <span id="prenom">Prenom</span>
          </dt>
          <dd>{adresseEntity.prenom}</dd>
          <dt>
            <span id="adresseLigne1">Adresse Ligne 1</span>
          </dt>
          <dd>{adresseEntity.adresseLigne1}</dd>
          <dt>
            <span id="gouvernorat">Gouvernorat</span>
          </dt>
          <dd>{adresseEntity.gouvernorat}</dd>
          <dt>
            <span id="ville">Ville</span>
          </dt>
          <dd>{adresseEntity.ville}</dd>
          <dt>
            <span id="localite">Localite</span>
          </dt>
          <dd>{adresseEntity.localite}</dd>
          <dt>
            <span id="indication">Indication</span>
          </dt>
          <dd>{adresseEntity.indication}</dd>
          <dt>
            <span id="telephone">Telephone</span>
          </dt>
          <dd>{adresseEntity.telephone}</dd>
          <dt>
            <span id="mobile">Mobile</span>
          </dt>
          <dd>{adresseEntity.mobile}</dd>
          <dt>
            <span id="creeLe">Cree Le</span>
          </dt>
          <dd>
            <TextFormat value={adresseEntity.creeLe} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="creePar">Cree Par</span>
          </dt>
          <dd>{adresseEntity.creePar}</dd>
          <dt>
            <span id="modifieLe">Modifie Le</span>
          </dt>
          <dd>
            <TextFormat value={adresseEntity.modifieLe} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="modifiePar">Modifie Par</span>
          </dt>
          <dd>{adresseEntity.modifiePar}</dd>
          <dt>Client</dt>
          <dd>{adresseEntity.clientId ? adresseEntity.clientId : ''}</dd>
          <dt>Zone</dt>
          <dd>{adresseEntity.zoneNom ? adresseEntity.zoneNom : ''}</dd>
          <dt>Code Postal</dt>
          <dd>{adresseEntity.codePostalCodePostal ? adresseEntity.codePostalCodePostal : ''}</dd>
        </dl>
        <Button tag={Link} to="/adresse" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/adresse/${adresseEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ adresse }: IRootState) => ({
  adresseEntity: adresse.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AdresseDetail);
