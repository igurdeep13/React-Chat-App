import { Client, Databases } from "appwrite";

export const PROJECT_ID = "";
export const DATABASE_ID = "";

const client = new Client();

client.setProject("6798748d00242c8d927e");

export const databases = new Databases(client);

export default client;
