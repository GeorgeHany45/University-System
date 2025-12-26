import React, { useState, useEffect, useCallback } from "react";
import "./messaging.css";

const Messaging = () => {
  const [messages, setMessages] = useState([]);
  const [sentMessages, setSentMessages] = useState([]);
  const [staff, setStaff] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [conversation, setConversation] = useState([]);
  const [activeTab, setActiveTab] = useState("inbox"); // inbox, sent, new
  const [showNewMessage, setShowNewMessage] = useState(false);
  const [newMessage, setNewMessage] = useState({
    receiverId: "",
    subject: "",
    content: "",
    messageType: "general",
    meetingDate: "",
  });

  const currentUserId = parseInt(localStorage.getItem("userId") || "1");
  const currentUserRole = localStorage.getItem("role") || "student";

  const fetchInbox = useCallback(async () => {
    try {
      const res = await fetch(`http://localhost:5001/api/messages/inbox/${currentUserId}`);
      const data = await res.json();
      setMessages(data.messages || []);
    } catch (err) {
      console.error("Error fetching inbox:", err);
    }
  }, [currentUserId]);

  const fetchSent = useCallback(async () => {
    try {
      const res = await fetch(`http://localhost:5001/api/messages/sent/${currentUserId}`);
      const data = await res.json();
      setSentMessages(data.messages || []);
    } catch (err) {
      console.error("Error fetching sent messages:", err);
    }
  }, [currentUserId]);

  const fetchStaff = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:5001/api/messages/staff");
      const data = await res.json();
      setStaff(data.staff || []);
    } catch (err) {
      console.error("Error fetching staff:", err);
    }
  }, []);

  const fetchStudents = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:5001/api/messages/students");
      const data = await res.json();
      setStudents(data.students || []);
    } catch (err) {
      console.error("Error fetching students:", err);
    }
  }, []);

  const fetchConversation = useCallback(async (otherUserId) => {
    try {
      const res = await fetch(
        `http://localhost:5001/api/messages/conversation/${currentUserId}/${otherUserId}`
      );
      const data = await res.json();
      setConversation(data.messages || []);
    } catch (err) {
      console.error("Error fetching conversation:", err);
    }
  }, [currentUserId]);

  useEffect(() => {
    if (currentUserRole === "admin") return; // Skip fetching for admin
    
    fetchInbox();
    fetchSent();
    if (currentUserRole === "student") {
      fetchStaff();
    } else {
      fetchStudents();
    }
  }, [currentUserRole, fetchInbox, fetchSent, fetchStaff, fetchStudents]);

  useEffect(() => {
    if (currentUserRole === "admin") return; // Skip for admin
    if (selectedUser) {
      fetchConversation(selectedUser.id);
    }
  }, [selectedUser, currentUserRole, fetchConversation]);

  // Prepare a grouped conversation list (one item per other user, latest message first)
  const listToRender = activeTab === "inbox" ? messages : sentMessages;

  const groupedMessages = React.useMemo(() => {
    const map = {};
    listToRender.forEach((msg) => {
      const other = activeTab === "inbox" ? msg.sender : msg.receiver;
      if (!other || !other.id) return;
      const key = other.id;
      if (!map[key] || new Date(msg.createdAt) > new Date(map[key].createdAt)) {
        map[key] = msg;
      }
    });
    return Object.values(map).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [listToRender, activeTab]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        senderId: currentUserId,
        receiverId: parseInt(newMessage.receiverId),
        subject: newMessage.subject,
        content: newMessage.content,
        messageType: newMessage.messageType,
        meetingDate: newMessage.meetingDate || null,
      };

      const res = await fetch("http://localhost:5001/api/messages/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Message sent successfully!");
        setNewMessage({
          receiverId: "",
          subject: "",
          content: "",
          messageType: "general",
          meetingDate: "",
        });
        setShowNewMessage(false);
        fetchInbox();
        fetchSent();
        if (selectedUser) {
          fetchConversation(selectedUser.id);
        }
      } else {
        alert(data.message || "Failed to send message");
      }
    } catch (err) {
      console.error("Error sending message:", err);
      alert("Server error. Please try again.");
    }
  };

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    if (!selectedUser) return;
    try {
      const payload = {
        senderId: currentUserId,
        receiverId: selectedUser.id,
        subject: newMessage.subject || "",
        content: newMessage.content,
        messageType: newMessage.messageType || "general",
        meetingDate: newMessage.meetingDate || null,
      };

      const res = await fetch("http://localhost:5001/api/messages/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        setNewMessage({
          receiverId: "",
          subject: "",
          content: "",
          messageType: "general",
          meetingDate: "",
        });
        // refresh conversation and lists
        fetchConversation(selectedUser.id);
        fetchInbox();
        fetchSent();
      } else {
        alert(data.message || "Failed to send reply");
      }
    } catch (err) {
      console.error("Error sending reply:", err);
      alert("Server error. Please try again.");
    }
  };

  const handleMarkAsRead = async (messageId) => {
    try {
      await fetch(`http://localhost:5001/api/messages/read/${messageId}`, {
        method: "PUT",
      });
      fetchInbox();
    } catch (err) {
      console.error("Error marking as read:", err);
    }
  };

  const handleMeetingStatusUpdate = async (messageId, status) => {
    try {
      const res = await fetch(`http://localhost:5001/api/messages/meeting/${messageId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        fetchInbox();
        fetchSent();
        if (selectedUser) {
          fetchConversation(selectedUser.id);
        }
      }
    } catch (err) {
      console.error("Error updating meeting status:", err);
    }
  };

  const getUsersList = () => {
    return currentUserRole === "student" ? staff : students;
  };

  const getDisplayName = (user) => {
    return user?.username || user?.email || "Unknown";
  };

  // Restrict access for admin users - render check instead of early return
  if (currentUserRole === "admin") {
    return (
      <div className="messaging-container">
        <div style={{ 
          textAlign: 'center', 
          padding: '60px 20px',
          background: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
        }}>
          <h2 style={{ color: '#666', marginBottom: '20px' }}>Access Restricted</h2>
          <p style={{ color: '#999' }}>
            Student-to-Staff Communication is only available for students and staff members.
            <br />
            Admins can access Announcements & Events instead.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="messaging-container">
      <div className="messaging-header">
        <h1>Student-to-Staff Communication</h1>
        <button
          className="new-message-btn"
          onClick={() => setShowNewMessage(!showNewMessage)}
        >
          {showNewMessage ? "Cancel" : "+ New Message"}
        </button>
      </div>

      {showNewMessage && (
        <div className="new-message-form">
          <h2>Compose New Message</h2>
          <form onSubmit={handleSendMessage}>
            <label>
              To:
              <select
                value={newMessage.receiverId}
                onChange={(e) =>
                  setNewMessage({ ...newMessage, receiverId: e.target.value })
                }
                required
              >
                <option value="">Select recipient</option>
                {getUsersList().map((user) => (
                  <option key={user.id} value={user.id}>
                    {getDisplayName(user)} ({user.role})
                  </option>
                ))}
              </select>
            </label>

            <label>
              Message Type:
              <select
                value={newMessage.messageType}
                onChange={(e) =>
                  setNewMessage({ ...newMessage, messageType: e.target.value })
                }
              >
                <option value="general">General Question</option>
                <option value="question">Academic Question</option>
                <option value="meeting_request">Meeting Request</option>
              </select>
            </label>

            {newMessage.messageType === "meeting_request" && (
              <label>
                Preferred Meeting Date & Time:
                <input
                  type="datetime-local"
                  value={newMessage.meetingDate}
                  onChange={(e) =>
                    setNewMessage({ ...newMessage, meetingDate: e.target.value })
                  }
                />
              </label>
            )}

            <label>
              Subject:
              <input
                type="text"
                value={newMessage.subject}
                onChange={(e) =>
                  setNewMessage({ ...newMessage, subject: e.target.value })
                }
                placeholder="Message subject (optional)"
              />
            </label>

            <label>
              Message:
              <textarea
                value={newMessage.content}
                onChange={(e) =>
                  setNewMessage({ ...newMessage, content: e.target.value })
                }
                required
                rows="6"
                placeholder="Type your message here..."
              />
            </label>

            <button type="submit" className="send-btn">
              Send Message
            </button>
          </form>
        </div>
      )}

      <div className="messaging-tabs">
        <button
          className={activeTab === "inbox" ? "active" : ""}
          onClick={() => {
            setActiveTab("inbox");
            setSelectedUser(null);
          }}
        >
          Inbox ({messages.filter((m) => !m.isRead).length})
        </button>
        <button
          className={activeTab === "sent" ? "active" : ""}
          onClick={() => {
            setActiveTab("sent");
            setSelectedUser(null);
          }}
        >
          Sent
        </button>
      </div>

      <div className="messaging-content">
        <div className="messages-list">
          {groupedMessages.map((msg) => {
            const otherUser = activeTab === "inbox" ? msg.sender : msg.receiver;
            return (
              <div
                key={otherUser?.id}
                className={`message-item ${!msg.isRead && activeTab === "inbox" ? "unread" : ""} ${
                  selectedUser?.id === otherUser?.id ? "selected" : ""
                }`}
                onClick={() => {
                  setSelectedUser(otherUser);
                  if (activeTab === "inbox" && !msg.isRead) {
                    handleMarkAsRead(msg.id);
                  }
                }}
              >
                <div className="message-header">
                  <strong>
                    {activeTab === "inbox" ? "From" : "To"}: {getDisplayName(otherUser)}
                  </strong>
                  <span className="message-date">
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </span>
                </div>
                {msg.subject && (
                  <div className="message-subject">Subject: {msg.subject}</div>
                )}
                <div className="message-preview">
                  {msg.content.substring(0, 100)}
                  {msg.content.length > 100 ? "..." : ""}
                </div>
                {msg.messageType === "meeting_request" && (
                  <div className="meeting-info">
                    Meeting: {msg.meetingDate
                      ? new Date(msg.meetingDate).toLocaleString()
                      : "Not scheduled"}
                    {activeTab === "inbox" && msg.meetingStatus === "pending" && (
                      <div className="meeting-actions">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMeetingStatusUpdate(msg.id, "approved");
                          }}
                          className="approve-btn"
                        >
                          Approve
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMeetingStatusUpdate(msg.id, "rejected");
                          }}
                          className="reject-btn"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                    {msg.meetingStatus && (
                      <span className={`status-badge ${msg.meetingStatus}`}>
                        {msg.meetingStatus}
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {selectedUser && (
          <div className="conversation-view">
            <div className="conversation-header">
              <h3>Conversation with {getDisplayName(selectedUser)}</h3>
            </div>
            <div className="conversation-messages">
              {conversation.map((msg) => (
                <div
                  key={msg.id}
                  className={`conversation-message ${
                    msg.senderId === currentUserId ? "sent" : "received"
                  }`}
                >
                  <div className="message-meta">
                    <strong>{getDisplayName(msg.sender)}</strong>
                    <span>{new Date(msg.createdAt).toLocaleString()}</span>
                  </div>
                  {msg.subject && (
                    <div className="message-subject">Subject: {msg.subject}</div>
                  )}
                  <div className="message-content">{msg.content}</div>
                  {msg.messageType === "meeting_request" && msg.meetingDate && (
                    <div className="meeting-info">
                      Meeting Date: {new Date(msg.meetingDate).toLocaleString()}
                      {msg.meetingStatus && (
                        <span className={`status-badge ${msg.meetingStatus}`}>
                          {msg.meetingStatus}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="reply-section">
              <form onSubmit={handleReplySubmit}>
                <textarea
                  placeholder="Type a reply..."
                  rows="3"
                  value={newMessage.content}
                  onChange={(e) =>
                    setNewMessage({ ...newMessage, content: e.target.value })
                  }
                />
                <button type="submit" className="reply-btn">
                  Reply
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messaging;

