
import { Client, Account ,Databases, Storage} from "appwrite";

// FOR COMMUNICATING WITH APPWRITES API
export const client = new Client();

// FOR USER ACCOUNT FUNCTIONALITY AND AUTHENTICATION
const account = new Account(client);

// STORAGE FOR IMAGES
export const storage = new Storage(client);

client
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('a1') // Your project ID
;



export const promise = account;

// Database

export const databases = new Databases(client) 