import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './sous-categorie.reducer';
import { ISousCategorie } from 'app/shared/model/sous-categorie.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ISousCategorieDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const SousCategorieDetail = (props: ISousCategorieDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { sousCategorieEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          SousCategorie [<b>{sousCategorieEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="nom">Nom</span>
          </dt>
          <dd>{sousCategorieEntity.nom}</dd>
          <dt>
            <span id="description">Description</span>
          </dt>
          <dd>{sousCategorieEntity.description}</dd>
          <dt>
            <span id="position">Position</span>
          </dt>
          <dd>{sousCategorieEntity.position}</dd>
          <dt>
            <span id="etat">Etat</span>
          </dt>
          <dd>{sousCategorieEntity.etat ? 'true' : 'false'}</dd>
          <dt>
            <span id="image">Image</span>
          </dt>
          <dd>
            {sousCategorieEntity.image ? (
              <div>
                <a onClick={openFile(sousCategorieEntity.imageContentType, sousCategorieEntity.image)}>
                  <img
                    src={`data:${sousCategorieEntity.imageContentType};base64,${sousCategorieEntity.image}`}
                    style={{ maxHeight: '30px' }}
                  />
                </a>
                <span>
                  {sousCategorieEntity.imageContentType}, {byteSize(sousCategorieEntity.image)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="creeLe">Cree Le</span>
          </dt>
          <dd>
            <TextFormat value={sousCategorieEntity.creeLe} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="creePar">Cree Par</span>
          </dt>
          <dd>{sousCategorieEntity.creePar}</dd>
          <dt>
            <span id="modifieLe">Modifie Le</span>
          </dt>
          <dd>
            <TextFormat value={sousCategorieEntity.modifieLe} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="modifiePar">Modifie Par</span>
          </dt>
          <dd>{sousCategorieEntity.modifiePar}</dd>
          <dt>Categorie</dt>
          <dd>{sousCategorieEntity.categorieNom ? sousCategorieEntity.categorieNom : ''}</dd>
        </dl>
        <Button tag={Link} to="/sous-categorie" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/sous-categorie/${sousCategorieEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ sousCategorie }: IRootState) => ({
  sousCategorieEntity: sousCategorie.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SousCategorieDetail);
