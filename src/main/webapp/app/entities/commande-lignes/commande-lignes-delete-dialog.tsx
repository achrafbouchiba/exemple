import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ICommandeLignes } from 'app/shared/model/commande-lignes.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './commande-lignes.reducer';

export interface ICommandeLignesDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CommandeLignesDeleteDialog = (props: ICommandeLignesDeleteDialogProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const handleClose = () => {
    props.history.push('/commande-lignes');
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const confirmDelete = () => {
    props.deleteEntity(props.commandeLignesEntity.id);
  };

  const { commandeLignesEntity } = props;
  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose}>Confirm delete operation</ModalHeader>
      <ModalBody id="bazarshopApp.commandeLignes.delete.question">Are you sure you want to delete this CommandeLignes?</ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp; Cancel
        </Button>
        <Button id="jhi-confirm-delete-commandeLignes" color="danger" onClick={confirmDelete}>
          <FontAwesomeIcon icon="trash" />
          &nbsp; Delete
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const mapStateToProps = ({ commandeLignes }: IRootState) => ({
  commandeLignesEntity: commandeLignes.entity,
  updateSuccess: commandeLignes.updateSuccess
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CommandeLignesDeleteDialog);
