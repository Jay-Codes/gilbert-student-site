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
let isStarted = false;

function subscirbeListener(project, message) {
  if (isStarted) return;
  if (project == null) return;
  const dispatch = store.dispatch;
  const q = query(
    collection(db, 'messages'),
    where('projectId', '==', project.id)
  );
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const messages = [];
    querySnapshot.forEach((doc) => {
      messages.push(doc.data());
    });
    console.log(messages);
    dispatch;
  });
  isStarted = true;
}

export async function sendMessage(project, message) {
  subscirbeListener(project);
  const messagesRef = collection(db, 'messages');
  const { user } = store.getState().currentUser;
  let noteDate = Timestamp.fromDate(new Date());
  console.log(project);
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
}

export async function getMessages(project) {
  subscirbeListener(project);
  if (project == null) return;
  const messagesRef = collection(db, 'messages');
  const q = query(
    messagesRef,
    where('projectId', '==', project.id),
    orderBy('timeSent', 'desc')
  );
  const querySnapShot = await getDocs(q);
  const messages = [];
  querySnapShot.forEach((doc) => {
    const data = doc.data();
    messages.push({
      id: doc.id,
      ...data,
      left: data.evaluator === 'evaluator' ? true : false,
    });
  });
  return messages;
}
