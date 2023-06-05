
import { Client, Account,Databases} from "appwrite";

const client = new Client();

const account = new Account(client);

client
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('a1') // Your project ID
;

export const promise = account;

// Database
export const databases = new Databases(client,"647ca874cf8af94985ec")