import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ISousCategorie } from 'app/shared/model/sous-categorie.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './sous-categorie.reducer';

export interface ISousCategorieDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const SousCategorieDeleteDialog = (props: ISousCategorieDeleteDialogProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const handleClose = () => {
    props.history.push('/sous-categorie');
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const confirmDelete = () => {
    props.deleteEntity(props.sousCategorieEntity.id);
  };

  const { sousCategorieEntity } = props;
  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose}>Confirm delete operation</ModalHeader>
      <ModalBody id="bazarshopApp.sousCategorie.delete.question">Are you sure you want to delete this SousCategorie?</ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp; Cancel
        </Button>
        <Button id="jhi-confirm-delete-sousCategorie" color="danger" onClick={confirmDelete}>
          <FontAwesomeIcon icon="trash" />
          &nbsp; Delete
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const mapStateToProps = ({ sousCategorie }: IRootState) => ({
  sousCategorieEntity: sousCategorie.entity,
  updateSuccess: sousCategorie.updateSuccess
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SousCategorieDeleteDialog);
