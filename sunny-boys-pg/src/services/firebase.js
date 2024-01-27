
import { initializeApp } from '@firebase/app';
import { getAuth} from '@firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyAgTF8bOoth7ZWgk88-_6jcqhYgbOQ5X88",
  authDomain: "sunnyboyspg.firebaseapp.com",
  projectId: "sunnyboyspg",
  storageBucket: "sunnyboyspg.appspot.com",
  messagingSenderId: "744846025755",
  appId: "1:744846025755:web:d38601879095eb214784be"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp)



export { firebaseAuth }   

