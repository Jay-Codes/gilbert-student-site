import { db } from '.';
import {
  query,
  where,
  collection,
  getDocs,
  setDoc,
  doc,
  addDoc,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';
import { store } from '../redux/store';
import { Timestamp } from '@firebase/firestore';
import { setMessages } from '../redux/messagesSlice';
import { setProjectListener } from '../redux/ProjectReducer'
// let isStarted = false;

function subscirbeListener( message) {
  const {currentProject:project} = store.getState().projectReducer  
  if (project.hasListener) return;
  if (project == null) return;
  const q = query(
    collection(db, 'messages'),
    where('projectId', '==', project.id),
    orderBy('timeSent')
  );
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const messages = [];
    
    querySnapshot.forEach((doc) => {
      const data =doc.data()
      const message = {
        id : doc.id,
        ...data,
        left: data.from !== 'evaluator' ? true : false,
      }
      messages.push(message);
    });
    // dispatch;
    dispatch(setMessages(messages))
  });
  const dispatch = store.dispatch
  dispatch(setProjectListener(true))
}

export async function sendMessage(project, message) {
  const messagesRef = collection(db, 'messages');
  const { user } = store.getState().currentUser;
  let noteDate = Timestamp.fromDate(new Date());
  await addDoc(messagesRef, {
    projectId: project.id,
    studentId: project.studentId,
    evaluatorId: user.uid,
    text: message,
    studentName: project.studentName,
    fromId: user.uid,
    timeSent: noteDate,
    from: 'evaluator',
  });
  subscirbeListener(project);
}

export async function getMessages(project) {
  subscirbeListener(project);
  if (project == null) return;
  const messagesRef = collection(db, 'messages');
  const q = query(
    messagesRef,
    where('projectId', '==', project.id),
    orderBy('timeSent')
  );
  const querySnapShot = await getDocs(q);
  const messages = [];
  querySnapShot.forEach((doc) => {
    const data = doc.data();
    messages.push({
      id: doc.id,
      ...data,
      left: data.from !== 'evaluator' ? true : false,
    });
  });
  return messages;
}
