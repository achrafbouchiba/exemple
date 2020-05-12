import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './remise.reducer';
import { IRemise } from 'app/shared/model/remise.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IRemiseDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const RemiseDetail = (props: IRemiseDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { remiseEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          Remise [<b>{remiseEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="categorieClient">Categorie Client</span>
          </dt>
          <dd>{remiseEntity.categorieClient}</dd>
          <dt>
            <span id="prix">Prix</span>
          </dt>
          <dd>{remiseEntity.prix}</dd>
          <dt>
            <span id="remise">Remise</span>
          </dt>
          <dd>{remiseEntity.remise}</dd>
          <dt>
            <span id="cumulable">Cumulable</span>
          </dt>
          <dd>{remiseEntity.cumulable ? 'true' : 'false'}</dd>
          <dt>
            <span id="debutPromo">Debut Promo</span>
          </dt>
          <dd>
            <TextFormat value={remiseEntity.debutPromo} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="finPromo">Fin Promo</span>
          </dt>
          <dd>
            <TextFormat value={remiseEntity.finPromo} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="etat">Etat</span>
          </dt>
          <dd>{remiseEntity.etat ? 'true' : 'false'}</dd>
          <dt>
            <span id="creeLe">Cree Le</span>
          </dt>
          <dd>
            <TextFormat value={remiseEntity.creeLe} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="creePar">Cree Par</span>
          </dt>
          <dd>{remiseEntity.creePar}</dd>
          <dt>
            <span id="modifieLe">Modifie Le</span>
          </dt>
          <dd>
            <TextFormat value={remiseEntity.modifieLe} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="modifiePar">Modifie Par</span>
          </dt>
          <dd>{remiseEntity.modifiePar}</dd>
          <dt>Ref Produit</dt>
          <dd>{remiseEntity.refProduitReference ? remiseEntity.refProduitReference : ''}</dd>
          <dt>Sous Categorie</dt>
          <dd>{remiseEntity.sousCategorieNom ? remiseEntity.sousCategorieNom : ''}</dd>
          <dt>Categorie</dt>
          <dd>{remiseEntity.categorieNom ? remiseEntity.categorieNom : ''}</dd>
        </dl>
        <Button tag={Link} to="/remise" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/remise/${remiseEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ remise }: IRootState) => ({
  remiseEntity: remise.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(RemiseDetail);
