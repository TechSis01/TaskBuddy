
import { Client, Account ,Databases, Storage} from "appwrite";

const client = new Client();

const account = new Account(client);

const storage = new Storage(client);

client
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('a1') // Your project ID
;



export const promise = account;

// Database
// The database ID is the second argument
export const databases = new Databases(client) 