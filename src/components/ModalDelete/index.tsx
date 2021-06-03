import React from 'react';
import ModalComponent from '../Modal';

import {
  ButtonContainerDelete,
  ModalContentDelete,
  ModalTitleDelete,
  ButtonModal,
  ButtonText,
} from './styles';

interface ModalProps {
  handleDeleteItem: any;
  setVisibleDelete: (state: boolean) => void;
  visibleDelete: boolean;
  title: string;
}

const ModalDelete: React.FC<ModalProps> = ({
  handleDeleteItem,
  setVisibleDelete,
  visibleDelete,
  title,
}) => {
  return (
    <ModalComponent changeSetVisible={setVisibleDelete} visible={visibleDelete}>
      <ModalContentDelete>
        <ModalTitleDelete>{title}</ModalTitleDelete>
        <ButtonContainerDelete>
          <ButtonModal
            onPress={() => {
              handleDeleteItem();
              setVisibleDelete(false);
            }}
          >
            <ButtonText>Sim</ButtonText>
          </ButtonModal>

          <ButtonModal secundary onPress={() => setVisibleDelete(false)}>
            <ButtonText secundary>Não</ButtonText>
          </ButtonModal>
        </ButtonContainerDelete>
      </ModalContentDelete>
    </ModalComponent>
  );
};

export default ModalDelete;
