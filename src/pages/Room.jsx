import React, { useState, useEffect } from "react";
import { databases } from "../appwriteConfig";
import { ID, Query } from "appwrite";
import { Trash2 } from "react-feather";

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
    const response = await databases.listDocuments(databaseID, collectionID, [
      Query.orderDesc("$createdAt"),
      Query.limit(20),
    ]);
    console.log(response);
    setMessages(response.documents);
  };

  //Delete Messages
  const deleteMessage = async (message_Id) => {
    await databases.deleteDocument(databaseID, collectionID, message_Id);
    setMessages(() => messages.filter((message) => message.$id !== message_Id));
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
          {messages.map((message) => (
            <div key={message.$id} className="message--wrapper">
              <div className="message--header">
                <small className="message-timestamp">
                  {new Date(message.$createdAt).toLocaleString()}
                </small>

                <Trash2
                  className="delete--btn"
                  onClick={() => {
                    deleteMessage(message.$id);
                  }}
                />
              </div>

              <div className="message--body">
                <span>{message.body}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Room;
