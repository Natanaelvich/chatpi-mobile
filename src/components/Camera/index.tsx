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

type CameraProps = {
  setCameraOpened: (cameraOpened: boolean) => void;
  setPhotos: (oldPhotos: any) => void;
};

// const DESIRED_RATIO = '16:9';

const windowWidth = Dimensions.get('window').width;
// const screenHeight = Dimensions.get('window').height;

const Camera: React.FC<CameraProps> = ({ setCameraOpened, setPhotos }) => {
  const cameraRef = React.useRef<any>();

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
      <View
        style={{
          flex: 1,
          position: 'relative',
        }}
      >
        <RNCamera
          style={{ width: windowWidth, height: windowWidth, marginTop: 'auto' }}
          ref={cameraRef}
          ratio="1:1"
          captureAudio={false}
        />

        <TouchableOpacity
          onPress={takePicture}
          style={[styles.barIcons, { alignItems: 'center' }]}
        >
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#fff' }}>
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
    position: 'absolute',
    bottom: 16,
    right: 0,
    left: 0,
  },
  textShedule: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Camera;
