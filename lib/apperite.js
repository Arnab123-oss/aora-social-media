import { Client, Account, ID, Avatars, Databases } from "react-native-appwrite";

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

// Register User
export const createUser = async (email, password, username) => {
  console.log(typeof(email), password, username);
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

const SignIn = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
