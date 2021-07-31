import * as React from 'react';
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
  View,
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { RFValue } from 'react-native-responsive-fontsize';

type CameraProps = {
  setCameraOpened: (cameraOpened: boolean) => void;
  setPhotos: (oldPhotos: any) => void;
};

// const DESIRED_RATIO = '16:9';

const windowWidth = Dimensions.get('window').width;
// const screenHeight = Dimensions.get('window').height;

const Camera: React.FC<CameraProps> = ({ setCameraOpened, setPhotos }) => {
  const cameraRef = React.useRef<any>();

  const [teste, setTeste] = React.useState(0);
  // const prepareRatio = async (): Promise<void> => {
  //   try {
  //     if (Platform.OS === 'android' && cameraRef.current) {
  //       const ratios = await cameraRef.current.getSupportedRatiosAsync();

  //       // See if the current device has your desired ratio, otherwise get the maximum supported one
  //       // Usually the last element of "ratios" is the maximum supported ratio
  //       const ratioPrepareted =
  //         ratios.find(r => r === DESIRED_RATIO) || ratios[ratios.length - 1];
  //       console.log(ratios);
  //       setRatio(ratioPrepareted);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // React.useEffect(() => {
  //   prepareRatio();
  // }, []);

  const takePicture = async (): Promise<void> => {
    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.5,
        orientation: 'portrait',
      });
      console.log({ photo });
      setPhotos((oldPhotos: any) => [...oldPhotos, photo]);
      // setCameraOpened(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal transparent onRequestClose={() => setCameraOpened(false)}>
      <View style={{ height: RFValue(60), backgroundColor: 'blue' }} />
      <View
        style={{
          flex: 1,
          position: 'relative',
        }}
      >
        <RNCamera
          style={{
            width: windowWidth,
            height: windowWidth + RFValue(teste),
          }}
          ref={cameraRef}
          ratio="3:4"
          onCameraReady={() => setTeste(124)}
          captureAudio={false}
        />

        <TouchableOpacity onPress={takePicture} style={styles.barIcons}>
          <Text
            style={{ fontSize: RFValue(24), fontWeight: 'bold', color: '#fff' }}
          >
            Tirar Foto
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  containerCamera: {
    flex: 1,
  },
  barIcons: {
    flex: 1,
    backgroundColor: '#111',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textShedule: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Camera;
