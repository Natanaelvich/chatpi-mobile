import React from 'react';

import { Modal } from 'react-native';
import { Container } from './styles';

interface ModalProps {
  visible: boolean;
  changeSetVisible: (state: boolean) => void;
}

const ModalComponent: React.FC<ModalProps> = ({
  visible,
  changeSetVisible,
  children,
}) => {
  return (
    <Modal
      transparent
      visible={visible}
      hardwareAccelerated
      onRequestClose={() => {
        changeSetVisible(false);
      }}
    >
      <Container>{children}</Container>
    </Modal>
  );
};

export default ModalComponent;
