import { initializeApp } from "firebase/app";

import {
getFirestore
}
from "firebase/firestore";

import {
getAuth
}
from "firebase/auth";

const firebaseConfig = {

  apiKey: "AIzaSyAA4w-dNt_uu-WMmZupdERnFdSCr8WoCfA",

authDomain:
"e-com-3af78.firebaseapp.com",

projectId:
"e-com-3af78",

storageBucket:
"e-com-3af78.firebasestorage.app",

messagingSenderId:
"673591327717",

appId:
"1:673591327717:web:3baca620946fd2a9e54d0c",

measurementId:
"G-C748JFXYHD"

};

const app =
initializeApp(
firebaseConfig
);

export const db =
getFirestore(
app
);

export const auth =
getAuth(
app
);