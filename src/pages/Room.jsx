import React, { useState, useEffect } from "react";
import { databases } from "../appwriteConfig";

const Room = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    getMessages();
  }, []);

  const databaseID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
  const collectionID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;
  //   console.log(databaseID, collectionID);

  const getMessages = async () => {
    const response = await databases.listDocuments(databaseID, collectionID);
    console.log(response);
    setMessages(response.documents);
  };

  return (
    <main className="container">
      <div className="room--container">
        <div>
          {messages.map((messages) => (
            <div key={messages.$id} className="message--wrapper">
              <div className="message--header">
                <small className="message-timestamp">
                  {messages.$createdAt}
                </small>
              </div>

              <div className="message--body">
                <span>{messages.body}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Room;
