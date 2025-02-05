import { Client, Databases } from "appwrite";

export const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("6798748d00242c8d927e");

export const databases = new Databases(client);

export default client;
