import { initializeApp } from 'firebase/app';
import { collection, getFirestore, getDocs, setDoc, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { apiConfig } from './config';

class FirebaseApi {
  private _api = initializeApp(apiConfig);
  private _db = getFirestore(this._api);

  getBuildingsInfo() {
    return getDocs(collection(this._db, 'places'))
  }

  getEquipmentInfo() {
    return getDocs(collection(this._db, 'inventory'));
  }

  addEquipment(placeId: string, name: string, count: number) {
    return setDoc(doc(collection(this._db, 'inventory')), {
      name,
      count,
      place: doc(collection(this._db, 'places'), placeId)
    })
  }

  deleteEquipment(id: string) {
    return deleteDoc(doc(collection(this._db, 'inventory'), id))
  }

  updateEquipment(id: string, newName: string, newCount: number, newPlaceId: string) {
    return updateDoc(doc(collection(this._db, 'inventory'), id), {
      name: newName,
      count: newCount,
      place: newPlaceId
    })
  }
}

export const firebaseApi = new FirebaseApi();
