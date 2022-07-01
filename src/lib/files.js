import { getStorage, ref, uploadBytes , getDownloadURL } from "firebase/storage";

const storage = getStorage();


export async function uploadFile(file){
    const storageRef = ref(storage, file.name);
    // 'file' comes from the Blob or File API
    const snapshot  = await uploadBytes(storageRef, file)
    console.log('Uploaded a blob or file!');
    console.log(snapshot);
    // getDownloadURL(snapshot.ref).then((url) =>console.log(url) ).catch( error => console.log('error'))
    const url =  await getDownloadURL(snapshot.ref)
    console.log('done')
    return url
}
