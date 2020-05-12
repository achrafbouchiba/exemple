import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IMouvementStock } from 'app/shared/model/mouvement-stock.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './mouvement-stock.reducer';

export interface IMouvementStockDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const MouvementStockDeleteDialog = (props: IMouvementStockDeleteDialogProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const handleClose = () => {
    props.history.push('/mouvement-stock');
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const confirmDelete = () => {
    props.deleteEntity(props.mouvementStockEntity.id);
  };

  const { mouvementStockEntity } = props;
  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose}>Confirm delete operation</ModalHeader>
      <ModalBody id="bazarshopApp.mouvementStock.delete.question">Are you sure you want to delete this MouvementStock?</ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp; Cancel
        </Button>
        <Button id="jhi-confirm-delete-mouvementStock" color="danger" onClick={confirmDelete}>
          <FontAwesomeIcon icon="trash" />
          &nbsp; Delete
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const mapStateToProps = ({ mouvementStock }: IRootState) => ({
  mouvementStockEntity: mouvementStock.entity,
  updateSuccess: mouvementStock.updateSuccess
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(MouvementStockDeleteDialog);
