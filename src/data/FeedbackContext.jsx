import React, { createContext, useContext, useState } from 'react';
import { dummyFeedback, dummyFeedbackForms } from '../data/dummyData';

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const raw = localStorage.getItem('fs_currentUser');
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  });
  const [userRole, setUserRole] = useState(() => {
    try {
      return localStorage.getItem('fs_userRole') || null;
    } catch (e) {
      return null;
    }
  });
  const [feedbacks, setFeedbacks] = useState(dummyFeedback);
  const [feedbackForms, setFeedbackForms] = useState(dummyFeedbackForms);

  const login = (email, password, role) => {
    const user = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      role,
    };
    setCurrentUser(user);
    setUserRole(role);
    try {
      localStorage.setItem('fs_currentUser', JSON.stringify(user));
      localStorage.setItem('fs_userRole', role);
    } catch (e) {
      // ignore storage errors
    }
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    setUserRole(null);
    try {
      localStorage.removeItem('fs_currentUser');
      localStorage.removeItem('fs_userRole');
    } catch (e) {
      // ignore
    }
  };

  const submitFeedback = (feedback) => {
    const newFeedback = {
      id: feedbacks.length + 1,
      ...feedback,
      timestamp: new Date().toISOString().split('T')[0],
      studentId: currentUser?.id || 'anonymous',
    };
    setFeedbacks([...feedbacks, newFeedback]);
    return newFeedback;
  };

  const createFeedbackForm = (form) => {
    const newForm = {
      id: feedbackForms.length + 1,
      ...form,
      semester: 'Spring 2026',
    };
    setFeedbackForms([...feedbackForms, newForm]);
    return newForm;
  };

  return (
    <FeedbackContext.Provider
      value={{
        currentUser,
        userRole,
        feedbacks,
        feedbackForms,
        login,
        logout,
        submitFeedback,
        createFeedbackForm,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export const useFeedback = () => {
  const context = useContext(FeedbackContext);
  if (!context) {
    throw new Error('useFeedback must be used within FeedbackProvider');
  }
  return context;
};
