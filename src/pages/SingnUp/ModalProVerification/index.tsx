import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { Modal } from 'react-native';

import * as S from './styles';

type ModalProVerificationProps = {
  visible: boolean;
  changeSetVisible: (status: boolean) => void;
  handleVerification: () => void;
};

const ModalProVerification: React.FC<ModalProVerificationProps> = ({
  visible,
  changeSetVisible,
  handleVerification,
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
      <S.Container>
        <S.ModalContent>
          <S.ButtonClose
            onPress={() => {
              changeSetVisible(false);
            }}
          >
            <AntDesign name="close" size={16} color="#fff" />
          </S.ButtonClose>
          <S.ModalTitle>Verificação Profissional</S.ModalTitle>
          <S.TextArea
            secureTextEntry
            placeholder="Numero de Inscrição"
            placeholderTextColor="#fff"
          />
          <S.Desc>
            Por medidas de segurança e para sabermos se você esta realmente apto
            a exercer essa profissão digite seu numero de registro cadastrado no
            órgão regularizador da sua área
          </S.Desc>
          <S.Button onPress={handleVerification}>
            <S.ButtonText>Verificar</S.ButtonText>
          </S.Button>
        </S.ModalContent>
      </S.Container>
    </Modal>
  );
};

export default ModalProVerification;
