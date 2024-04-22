

import React, { useState } from 'react';
import styles from "./styles/EditProfile.module.css"; 

function EditProfile({ onSave, onCancel }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ username, password });
  };

  return (
    <div className={styles.editProfileContainer}>
      <h2 className={styles.heading}>Edit Profile</h2>
      <form className={styles.editProfileForm} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="username" className={styles.label}>Username:</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={handleUsernameChange}
            className={styles.input}
          />
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            className={styles.input}
          />
        </div>
        
        <div className={styles.formActions}>
          <button type="submit" className={styles.saveButton}>Save Changes</button>
          <button type="button" onClick={onCancel} className={styles.cancelButton}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default EditProfile;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   