import Upload from 'react-native-background-upload';

export function uploadBackground(): void {
  const options = {
    url: 'https://myservice.com/path/to/post',
    path: 'file://path/to/file/on/device',
    method: 'POST',
    type: 'raw',
    maxRetries: 2, // set retry count (Android only). Default 2
    headers: {
      'content-type': 'application/octet-stream', // Customize content-type
      'my-custom-header': 's3headervalueorwhateveryouneed',
    },
    // Below are options only supported on Android
    notification: {
      enabled: true,
    },
    useUtf8Charset: true,
  };

  Upload.startUpload(options)
    .then(uploadId => {
      console.log('Upload started');
      Upload.addListener('progress', uploadId, data => {
        console.log(`Progress: ${data.progress}%`);
      });
      Upload.addListener('error', uploadId, data => {
        console.log(`Error: ${data.error}%`);
      });
      Upload.addListener('cancelled', uploadId, data => {
        console.log(`Cancelled!`);
      });
      Upload.addListener('completed', uploadId, data => {
        // data includes responseCode: number and responseBody: Object
        console.log('Completed!');
      });
    })
    .catch(err => {
      console.log('Upload error!', err);
    });
}
