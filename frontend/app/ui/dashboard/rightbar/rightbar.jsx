import { useState, useEffect } from 'react'; 
import styles from './rightbar.module.css';
import { MdPlayCircleFilled, MdDelete } from 'react-icons/md';

const Rightbar = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    console.log('Rightbar mounted');
    return () => {
      console.log('Rightbar unmounted');
    };
  }, []);

  const handleSend = () => {
    if (input.trim()) {
      const newMessage = {
        text: input,
        timestamp: new Date().toLocaleString(),
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInput('');
    }
  };

  const handleRemoveMessage = (index) => {
    setMessages((prevMessages) => {
      if (index >= 0 && index < prevMessages.length) {
        const updatedMessages = [...prevMessages];
        updatedMessages.splice(index, 1);
        return updatedMessages;
      }
      return prevMessages;
    });
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>Announcements</h3>
      <div className={styles.chatBox}>
        {messages.map((msg, index) => (
          <div key={index} className={styles.message}>
            <span className={styles.messageText}>{msg.text}</span>
            <span className={styles.timestamp}>{msg.timestamp}</span>
            <button onClick={() => handleRemoveMessage(index)} className={styles.deleteButton}>
              <MdDelete />
            </button>
          </div>
        ))}
      </div>
      <div className={styles.messageInput}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className={styles.input}
        />
        <button onClick={handleSend} className={styles.button}>
          <MdPlayCircleFilled />
        </button>
      </div>
    </div>
  );
};

export default Rightbar;
