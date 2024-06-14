import {
  Client,
  Account,
  ID,
  Avatars,
  Databases,
  Query,
} from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.arnab.aora",
  projectId: "66682b08002a865555d7",
  databaseId: "66682dfa0034e3fb26d0",
  userCollectionId: "66682e4b00202aa253c2",
  videoCollectionId: "66682ea2002a5ecb55ba",
  storagedId: "666830b300057677e54a",
};

// Init your React Native SDK
const client = new Client();
const account = new Account(client);
const avatars = new Avatars(client);
const database = new Databases(client);

client
  .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
  .setProject(appwriteConfig.projectId) // Your project ID
  .setPlatform(appwriteConfig.platform); // Your application ID or bundle ID.


  // console.log(client);
// Register User
export const createUser = async (email, password, username) => {
  // console.log(typeof email, password, username);
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    console.log(newAccount);

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);
    await SignIn(email, password);

    const newUser = await database.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

// Improved SignIn Function with Detailed Logging
export const signIn = async (email, password) => {
  try {
    // Check if there is an active session
    // const sessions = await account.listSessions();
    // if (sessions.total > 0) {
      // Delete all active sessions
      // for (const session of sessions.sessions) {
        // await account.deleteSession(session.$id);
      // }
    // }

    // Create a new email session
    const newSession = await account.createEmailPasswordSession(email, password);
    console.log('Session created:', newSession);
    return newSession;
  } catch (error) {
    console.error('Error signing in:', error);
    throw new Error(error.message);
  }
};


// Improved getCurrentUser Function with Detailed Logging
export const getCurrentUser = async () => {
  try {
    // Get the current account
    const currentAccount = await account.get();
    // console.log('Current account:', currentAccount);

    if (!currentAccount) {
      throw new Error('No current account found.');
    }

    // Fetch the user document from the database
    const currentUser = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    // console.log('Current user documents:', currentUser);

    if (!currentUser || currentUser.total === 0) {
      throw new Error('User not found in the database.');
    }

    return currentUser.documents[0];
  } catch (error) {
    console.error('Error in getCurrentUser:', error.message);
    return null;
  }
};


// Get all video Posts
export const getAllPosts = async () => {
  try {
    const posts = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const getLatestPosts = async () => {
  try {
    const posts = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.orderDesc("$createdAt",Query.limit(7))]
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};


export const searchPosts = async (query) => {
  // console.log(query);
  try {
    const posts = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.search("title",query)]
    );
    if (!posts) throw new Error("Something went wrong");
    
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};


export const getUserPosts = async (userId) => {
  // console.log(query);
  try {
    const posts = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.equal("creator",userId)]
    );
    if (!posts) throw new Error("Something went wrong");
    
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export async function signOut() {
  try {
    const session = await account.deleteSessions();

    return session;
  } catch (error) {
    throw new Error(error);
  }
}

export const uploadFile = async(file, type)=>{

  if (!file) return;

  const { mimeType, ...rest } = file;
  const asset = { type: mimeType, ...rest };

  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storagedId,
      ID.unique(),
      asset
    );

    const fileUrl = await getFilePreview(uploadedFile.$id, type);
    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }

}


export const createVideo = async(form)=>{
try{
  const [thumbnailUrl, videoUrl] = await Promise.all([
    uploadFile(form.thumbnail, "image"),
    uploadFile(form.video, "video"),
  ]);

}catch (error) {
    throw new Error(error);
  }  
}

// signIn('abc@gmail.com', "123456789")
//   .then(() => getCurrentUser())
//   .then(currentUser => console.log('Current user:', currentUser))
//   .catch(error => console.error('Error during test scenario:', error.message));


