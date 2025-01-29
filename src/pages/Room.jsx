import React, { useState, useEffect } from "react";
import { databases } from "../appwriteConfig";
import { ID } from "appwrite";

const Room = () => {
  const [messages, setMessages] = useState([]);
  const [messageBody, setMessageBody] = useState("");

  useEffect(() => {
    getMessages();
  }, []);

  const databaseID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
  const collectionID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;
  //   console.log(databaseID, collectionID);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let payload = {
      body: messageBody,
    };

    let response = await databases.createDocument(
      databaseID,
      collectionID,
      ID.unique(),
      payload
    );

    console.log("created!", response);
    setMessages((prev) => [response, ...messages]);
    setMessageBody("");
  };

  const getMessages = async () => {
    const response = await databases.listDocuments(databaseID, collectionID);
    console.log(response);
    setMessages(response.documents);
  };

  return (
    <main className="container">
      <div className="room--container">
        <form onSubmit={handleSubmit} id="message--form">
          <div>
            <textarea
              required
              maxLength="1000"
              placeholder="Say Something..."
              onChange={(e) => setMessageBody(e.target.value)}
              value={messageBody}
            ></textarea>
          </div>

          <div className="send-btn--wrapper">
            <input className="btn btn--secondary" type="submit" value="Send" />
          </div>
        </form>
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
