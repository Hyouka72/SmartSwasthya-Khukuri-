import React, { useState, useRef, useEffect } from "react";

function Chat() {
  // State to control the visibility of the chat window
  const [isChatOpen, setIsChatOpen] = useState(false);
  // State to store chat messages
  const [messages, setMessages] = useState([]);
  // State for the text input field
  const [inputText, setInputText] = useState("");
  // State to store the selected image file object
  const [selectedImage, setSelectedImage] = useState(null);
  // State to store the base64 URL of the image for preview
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  // State to indicate if the AI is currently processing a response
  const [isLoading, setIsLoading] = useState(false);
  // Ref for scrolling to the bottom of the messages area
  const messagesEndRef = useRef(null);
  // Ref for the hidden file input element
  const fileInputRef = useRef(null);

  // Function to toggle the chat window's visibility
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  // Function to scroll the message area to the bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Effect hook to scroll to the bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handler for image file selection
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file); // Store the file object
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result); // Store base64 for preview
      };
      reader.readAsDataURL(file); // Read file as Data URL
    } else {
      setSelectedImage(null);
      setImagePreviewUrl(null);
    }
  };

  // Function to clear the selected image
  const clearImage = () => {
    setSelectedImage(null);
    setImagePreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Clear the file input element's value
    }
  };

  // Handler for sending messages (text, image, or both)
  const handleSendMessage = async () => {
    // Prevent sending empty messages
    if (!inputText.trim() && !selectedImage) {
      return;
    }

    setIsLoading(true); // Show loading indicator

    // Create a new user message object
    const newUserMessage = {
      id: Date.now(), // Unique ID for the message
      sender: "user",
      text: inputText.trim() || undefined, // Text content, or undefined if empty
      imageUrl: imagePreviewUrl || undefined, // Image URL, or undefined if no image
      timestamp: new Date().toLocaleTimeString(), // Current time for timestamp
    };

    // Add the new user message to the chat history
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    // Clear input fields after sending
    setInputText("");
    setSelectedImage(null);
    setImagePreviewUrl(null);

    let aiResponseText = "";
    const isTextOnly = inputText.trim() && !selectedImage;
    const isImageOnly = !inputText.trim() && selectedImage;
    const isTextAndImage = inputText.trim() && selectedImage;

    if (isTextOnly) {
      aiResponseText = {};
    } else if (isImageOnly) {
      aiResponseText =
        "Thanks for sending an image! What would you like to know about it?";
    } else if (isTextAndImage) {
      aiResponseText =
        "I received both your text and an image! Let's analyze them together.";
    }

    // If a predefined response is determined, directly add it and bypass the API call
    if (aiResponseText) {
      const newAiMessage = {
        id: Date.now() + 1,
        sender: "ai",
        text: aiResponseText,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prevMessages) => [...prevMessages, newAiMessage]);
      setIsLoading(false); // Hide loading indicator
      return; // Exit the function after sending predefined message
    }

    // --- Original Gemini API call logic (will only run if no predefined message is set) ---
    let chatHistory = [];
    let parts = [];

    if (inputText.trim()) {
      parts.push({ text: inputText.trim() });
    }
    if (imagePreviewUrl) {
      const base64ImageData = imagePreviewUrl.split(",")[1];
      parts.push({
        inlineData: {
          mimeType: selectedImage.type || "image/png",
          data: base64ImageData,
        },
      });
    }

    chatHistory.push({ role: "user", parts: parts });

    const payload = { contents: chatHistory };
    const apiKey = "";
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (
        result.candidates &&
        result.candidates.length > 0 &&
        result.candidates[0].content &&
        result.candidates[0].content.parts &&
        result.candidates[0].content.parts.length > 0
      ) {
        aiResponseText = result.candidates[0].content.parts[0].text;
        const newAiMessage = {
          id: Date.now() + 1,
          sender: "ai",
          text: aiResponseText,
          timestamp: new Date().toLocaleTimeString(),
        };
        setMessages((prevMessages) => [...prevMessages, newAiMessage]);
      } else {
        console.error("Gemini API response structure unexpected:", result);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            id: Date.now() + 1,
            sender: "ai",
            text: "Sorry, I couldn't get a response from the AI.",
            timestamp: new Date().toLocaleTimeString(),
          },
        ]);
      }
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: Date.now() + 1,
          sender: "ai",
          text: "An error occurred while communicating with the AI.",
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative h-screen bg-gray-100 font-inter">
      {/* Tailwind CSS CDN for styling */}
      <script src="https://cdn.tailwindcss.com"></script>
      {/* Google Fonts link for Inter font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      {/* Custom CSS for scrollbar styling */}
      <style>
        {`
          body { font-family: 'Inter', sans-serif; }
          .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #888;
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #555;
          }
        `}
      </style>

      {/* Main content of the page (placeholder) */}
      <div className="flex items-center justify-center h-full">
        <h1 className="text-4xl font-bold text-gray-700">
          Welcome to the Page!
        </h1>
      </div>

      {/* Floating Chat Button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out z-50"
        aria-label={isChatOpen ? "Close Chat" : "Open Chat"}
      >
        {isChatOpen ? (
          // Close icon when chat is open
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          // Chat icon when chat is closed
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        )}
      </button>

      {/* Chat Window - conditionally rendered based on isChatOpen state */}
      {isChatOpen && (
        <div className="fixed bottom-24 right-8 w-80 md:w-96 h-[600px] bg-white rounded-lg shadow-xl flex flex-col z-50 overflow-hidden border border-gray-200">
          {/* Chat Header */}
          <div className="flex items-center justify-between p-4 bg-blue-600 text-white rounded-t-lg shadow-md">
            <h3 className="text-lg font-semibold">AI Chat</h3>
            <button
              onClick={toggleChat}
              className="p-1 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
              aria-label="Close Chat"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto custom-scrollbar bg-gray-50">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 mt-10">
                Start a conversation!
              </div>
            )}
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex mb-4 ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[75%] p-3 rounded-lg shadow-sm ${
                    msg.sender === "user"
                      ? "bg-blue-500 text-white rounded-br-none" // User messages
                      : "bg-gray-200 text-gray-800 rounded-bl-none" // AI messages
                  }`}
                >
                  {msg.text && (
                    <p className="text-sm break-words">{msg.text}</p>
                  )}
                  {msg.imageUrl && (
                    <img
                      src={msg.imageUrl}
                      alt="Sent image"
                      className="mt-2 rounded-md max-w-full h-auto object-cover"
                      style={{ maxHeight: "200px" }} // Limit image height
                    />
                  )}
                  <span
                    className={`block text-xs mt-1 ${
                      msg.sender === "user" ? "text-blue-100" : "text-gray-600"
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}
            {isLoading && (
              // Loading indicator when AI is typing
              <div className="flex justify-start mb-4">
                <div className="max-w-[75%] p-3 rounded-lg shadow-sm bg-gray-200 text-gray-800 rounded-bl-none">
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600 mr-2"></div>
                    <span className="text-sm">AI is typing...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} /> {/* Element to scroll into view */}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-200 bg-white">
            {imagePreviewUrl && (
              // Image preview section
              <div className="relative mb-3 p-2 border border-gray-300 rounded-md bg-gray-50">
                <img
                  src={imagePreviewUrl}
                  alt="Preview"
                  className="max-w-full h-24 object-contain rounded-sm"
                />
                <button
                  onClick={clearImage}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs hover:bg-red-600 transition-colors"
                  aria-label="Remove image"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            )}
            <div className="flex items-center space-x-2">
              {/* Hidden file input */}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                ref={fileInputRef}
                className="hidden"
              />
              {/* Button to trigger file input */}
              <button
                onClick={() => fileInputRef.current.click()}
                className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition-colors"
                aria-label="Upload Image"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </button>
              {/* Textarea for message input */}
              <textarea
                className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none custom-scrollbar"
                placeholder="Type your message..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => {
                  // Send message on Enter key press (without Shift)
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                rows={1} // Start with one row
                style={{ maxHeight: "100px" }} // Allow growing up to 100px
              ></textarea>
              {/* Send Message Button */}
              <button
                onClick={handleSendMessage}
                disabled={isLoading || (!inputText.trim() && !selectedImage)} // Disable if loading or inputs are empty
                className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Send Message"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chat;
