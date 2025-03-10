import admin from "firebase-admin";

if (!admin.apps.length) {
  let serviceAccount;
  try {
    serviceAccount = {
      projectId: process.env.FIREBASE_SERVICE_ACCOUNT_PROJECT_ID, // No need to replace \n
      privateKey: process.env.FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY,
      clientEmail: process.env.FIREBASE_SERVICE_ACCOUNT_CLIENT_EMAIL,
    };
  } catch (error) {
    throw new Error("Invalid JSON in FIREBASE_SERVICE_ACCOUNT_KEY");
  }

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export const adminAuth = admin.auth();
