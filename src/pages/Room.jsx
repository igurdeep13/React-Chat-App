import React from "react";
import { databases } from "../appwriteConfig";

const Room = () => {
  useEffect(() => {
    getMessages();
  }, []);

  const getMessages = async () => {};

  return <div>Room</div>;
};

export default Room;
