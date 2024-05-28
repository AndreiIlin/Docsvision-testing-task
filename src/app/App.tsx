import { useEffect } from 'react';
import { firebaseApi } from './shared/api';

export const App = () => {
  useEffect(() => {
    firebaseApi.getBuildingsInfo().then(data => {
      let docs = data.docs.map(x => ({
        id: x.id,
        data: x.data(),
        parts:  x.data().parts && x.data().parts.map(part => part.id)
      }));
      console.log(docs);
    })
  }, []);
  return (
    <div>

    </div>
  );
};
