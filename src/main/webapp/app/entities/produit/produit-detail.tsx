import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './produit.reducer';
import { IProduit } from 'app/shared/model/produit.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProduitDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ProduitDetail = (props: IProduitDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { produitEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          Produit [<b>{produitEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="reference">Reference</span>
          </dt>
          <dd>{produitEntity.reference}</dd>
          <dt>
            <span id="nom">Nom</span>
          </dt>
          <dd>{produitEntity.nom}</dd>
          <dt>
            <span id="codeBarre">Code Barre</span>
          </dt>
          <dd>{produitEntity.codeBarre}</dd>
          <dt>
            <span id="description">Description</span>
          </dt>
          <dd>{produitEntity.description}</dd>
          <dt>
            <span id="etat">Etat</span>
          </dt>
          <dd>{produitEntity.etat ? 'true' : 'false'}</dd>
          <dt>
            <span id="marque">Marque</span>
          </dt>
          <dd>{produitEntity.marque}</dd>
          <dt>
            <span id="nature">Nature</span>
          </dt>
          <dd>{produitEntity.nature}</dd>
          <dt>
            <span id="stockMinimum">Stock Minimum</span>
          </dt>
          <dd>{produitEntity.stockMinimum}</dd>
          <dt>
            <span id="quantiteVenteMax">Quantite Vente Max</span>
          </dt>
          <dd>{produitEntity.quantiteVenteMax}</dd>
          <dt>
            <span id="horsStock">Hors Stock</span>
          </dt>
          <dd>{produitEntity.horsStock ? 'true' : 'false'}</dd>
          <dt>
            <span id="gereEnStock">Gere En Stock</span>
          </dt>
          <dd>{produitEntity.gereEnStock ? 'true' : 'false'}</dd>
          <dt>
            <span id="datePremption">Date Premption</span>
          </dt>
          <dd>
            <TextFormat value={produitEntity.datePremption} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="prixHT">Prix HT</span>
          </dt>
          <dd>{produitEntity.prixHT}</dd>
          <dt>
            <span id="tauxTVA">Taux TVA</span>
          </dt>
          <dd>{produitEntity.tauxTVA}</dd>
          <dt>
            <span id="prixTTC">Prix TTC</span>
          </dt>
          <dd>{produitEntity.prixTTC}</dd>
          <dt>
            <span id="sourceProduit">Source Produit</span>
          </dt>
          <dd>{produitEntity.sourceProduit}</dd>
          <dt>
            <span id="rating">Rating</span>
          </dt>
          <dd>{produitEntity.rating}</dd>
          <dt>
            <span id="remise">Remise</span>
          </dt>
          <dd>{produitEntity.remise}</dd>
          <dt>
            <span id="image">Image</span>
          </dt>
          <dd>
            {produitEntity.image ? (
              <div>
                <a onClick={openFile(produitEntity.imageContentType, produitEntity.image)}>
                  <img src={`data:${produitEntity.imageContentType};base64,${produitEntity.image}`} style={{ maxHeight: '30px' }} />
                </a>
                <span>
                  {produitEntity.imageContentType}, {byteSize(produitEntity.image)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="creeLe">Cree Le</span>
          </dt>
          <dd>
            <TextFormat value={produitEntity.creeLe} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="creePar">Cree Par</span>
          </dt>
          <dd>{produitEntity.creePar}</dd>
          <dt>
            <span id="modifieLe">Modifie Le</span>
          </dt>
          <dd>
            <TextFormat value={produitEntity.modifieLe} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="modifiePar">Modifie Par</span>
          </dt>
          <dd>{produitEntity.modifiePar}</dd>
          <dt>Sous Categorie</dt>
          <dd>{produitEntity.sousCategorieNom ? produitEntity.sousCategorieNom : ''}</dd>
          <dt>Unite</dt>
          <dd>{produitEntity.uniteUnite ? produitEntity.uniteUnite : ''}</dd>
        </dl>
        <Button tag={Link} to="/produit" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/produit/${produitEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ produit }: IRootState) => ({
  produitEntity: produit.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProduitDetail);
