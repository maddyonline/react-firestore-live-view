import React from 'react'
import styles from './styles.module.css'

import { collection, query, onSnapshot } from "firebase/firestore";


export function FirestorePanes({ documents, selected, setSelected }) {
  if (!documents) {
    return null;
  }
  return <div className={styles.test} style={{ display: "flex" }}>
    <div style={{ display: "flex", flexDirection: "column", borderRight: '2px solid gray', padding: '10px' }}>
      {documents.map((doc) => (
        <div
          key={doc.id}
          style={{ backgroundColor: selected === doc.id ? 'yellowgreen' : '' }}
          onClick={() => setSelected(doc.id)}>{doc.id}
        </div>)
      )}
    </div>
    <div style={{padding: '10px'}}>
      {documents.map((doc) => (
        <div key={doc.id} style={{ display: selected === doc.id ? '' : 'none' }} >
          {JSON.stringify(doc.data)}
        </div>)
      )}
    </div>
  </div>
}


export function FirestoreLiveView({ db, collectionName }) {
  const [selected, setSelected] = React.useState(null);
  const [documents, setDocuments] = React.useState([]);

  React.useEffect(() => {
    const q = query(collection(db, collectionName));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          // console.log("New city: ", change.doc.id);
          setSelected(change.doc.id);
        }
        if (change.type === "modified") {
          // console.log("Modified city: ", change.doc.data());
        }
        if (change.type === "removed") {
          // console.log("Removed city: ", change.doc.data());
        }
      });
      const documents = [];
      querySnapshot.forEach((doc) => {
        documents.push({ id: doc.id, data: doc.data() });
      });
      setDocuments(documents);
    })
    return unsubscribe;
  }, [])

  return <FirestorePanes documents={documents} selected={selected} setSelected={setSelected} />
}
