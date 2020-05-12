import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './categorie.reducer';
import { ICategorie } from 'app/shared/model/categorie.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICategorieDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CategorieDetail = (props: ICategorieDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { categorieEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          Categorie [<b>{categorieEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="nom">Nom</span>
          </dt>
          <dd>{categorieEntity.nom}</dd>
          <dt>
            <span id="description">Description</span>
          </dt>
          <dd>{categorieEntity.description}</dd>
          <dt>
            <span id="position">Position</span>
          </dt>
          <dd>{categorieEntity.position}</dd>
          <dt>
            <span id="etat">Etat</span>
          </dt>
          <dd>{categorieEntity.etat ? 'true' : 'false'}</dd>
          <dt>
            <span id="image">Image</span>
          </dt>
          <dd>
            {categorieEntity.image ? (
              <div>
                <a onClick={openFile(categorieEntity.imageContentType, categorieEntity.image)}>
                  <img src={`data:${categorieEntity.imageContentType};base64,${categorieEntity.image}`} style={{ maxHeight: '30px' }} />
                </a>
                <span>
                  {categorieEntity.imageContentType}, {byteSize(categorieEntity.image)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="creeLe">Cree Le</span>
          </dt>
          <dd>
            <TextFormat value={categorieEntity.creeLe} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="creePar">Cree Par</span>
          </dt>
          <dd>{categorieEntity.creePar}</dd>
          <dt>
            <span id="modifieLe">Modifie Le</span>
          </dt>
          <dd>
            <TextFormat value={categorieEntity.modifieLe} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="modifiePar">Modifie Par</span>
          </dt>
          <dd>{categorieEntity.modifiePar}</dd>
        </dl>
        <Button tag={Link} to="/categorie" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/categorie/${categorieEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ categorie }: IRootState) => ({
  categorieEntity: categorie.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CategorieDetail);
