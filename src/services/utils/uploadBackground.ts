import Upload from 'react-native-background-upload';

export async function singleUploadBackground(image: {
  uri: string;
}): Promise<void> {
  // UPLOAD BACKGROUND
  // https://stackoverflow.com/questions/31530200/node-multer-unexpected-field

  const { mimeType } = await Upload.getFileInfo(
    image.uri.replace('file://', ''),
  );

  const options = {
    url: 'https://api.pi.mundotech.dev/users/avatar',
    path: image.uri.replace('file://', ''), // on ios remove replace
    method: 'PATCH',
    maxRetries: 2, // set retry count (Android only). Default 2
    headers: {
      'content-type': mimeType,
      authorization: `Bearer ${user?.token}`,
    },
    // Below are options only supported on Android
    notification: {
      enabled: true,
      onProgressTitle: 'Atualizando foto de perfil',
      onCompleteTitle: 'Sua foto de perfil foi atualizada 🖼',
      onErrorTitle: 'Falha ao atualizar sua foto de perfil 😔',
    },
    field: 'avatar',
    type: 'multipart',
  };

  const uploadId = await Upload.startUpload(options);

  Upload.addListener('progress', uploadId, data => {
    console.log(`Progress: ${data.progress}%`);
  });
  Upload.addListener('error', uploadId, dataError => {
    console.log(`Error: ${dataError.error}%`);
    console.log(dataError);
  });
  Upload.addListener('cancelled', uploadId, data => {
    console.log(`Cancelled!`);
  });
  Upload.addListener('completed', uploadId, data => {});
}
