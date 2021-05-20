import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBYHWAPsfn55cm9C7lPuuxy5tdErsz2uhQ",
    authDomain: "crwn-db-499ad.firebaseapp.com",
    projectId: "crwn-db-499ad",
    storageBucket: "crwn-db-499ad.appspot.com",
    messagingSenderId: "678223186004",
    appId: "1:678223186004:web:b0eee0240bbe5d3e9085c1",
    measurementId: "G-ZLKHKHWNDD"
  };

export const createUserProfileDocument = async (userAuth, additionalData) => {
	if (!userAuth) return;

	const userRef = firestore.doc(`users/${userAuth.uid}`);

	const snapShot = await userRef.get();
	
	if (!snapShot.exists) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();
		
		try {
			await userRef.set({
				displayName,
				email,
				createdAt,
				...additionalData
			})
		} catch (error) {
			console.log('Error creating user ', error.message);
		}
	}
	
	return userRef;
	//console.log(snapShot);
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account '});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;