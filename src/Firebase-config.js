// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from 'firebase/firestore/lite';
import { getAuth } from "firebase/auth";
import { getStorage, ref } from "firebase/storage";

// 파이어베이스 설정과 관련된 개인 정보
const firebaseConfig = {
  apiKey: "AIzaSyC5PTtbueoglvfp9L1pfrFNFOZrzBgLZ60",
  authDomain: "hafun-4d476.firebaseapp.com",
  projectId: "hafun-4d476",
  storageBucket: "hafun-4d476.appspot.com",
  messagingSenderId: "576862472681",
  appId: "1:576862472681:web:46a582caf09ce54905a378",
  measurementId: "G-9KCJSZ596E"
};

// firebaseConfig 정보로 firebase 시작
const app = initializeApp(firebaseConfig);

// firebase의 firestore 인스턴스를 변수에 저장
const db = getFirestore(app);

// getStorage 인스턴스를 변수에 저장
export const storage = getStorage();

// storage 참조 변수를 선언
export const storageRef = ref(storage);

export const auth = getAuth(app);

export default db;