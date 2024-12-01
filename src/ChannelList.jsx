import React, { useState } from 'react';
import { generateToken, messaging } from './notifications/firebase';
import styles from './ChannelList.module.css';

const ChannelList = () => {
  const [channels] = useState(['News', 'Sports', 'Weather', 'Tech']);
  const [subscribed, setSubscribed] = useState({});

  const handleSubscribe = async (channel) => {
    const token = await generateToken(messaging);
    await fetch("http://localhost:3005/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, topic: channel }),
    });
    setSubscribed({ ...subscribed, [channel]: true });
  };

  const handleUnsubscribe = async (channel) => {
    const token = await generateToken(messaging);
    await fetch("http://localhost:3005/unsubscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, topic: channel }),
    });
    setSubscribed({ ...subscribed, [channel]: false });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Notification Channels</h2>
      <ul className={styles.list}>
        {channels.map((channel) => (
          <li key={channel} className={styles.listItem}>
            <span className={styles.channelName}>{channel}</span>
            {subscribed[channel] ? (
              <button
                className={`${styles.button} ${styles.unsubscribe}`}
                onClick={() => handleUnsubscribe(channel)}
              >
                Unsubscribe
              </button>
            ) : (
              <button
                className={styles.button}
                onClick={() => handleSubscribe(channel)}
              >
                Subscribe
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChannelList;
