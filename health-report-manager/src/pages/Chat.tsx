import React, { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'assistant',
      text: 'Hello! I\'m your health assistant. I can help explain medications, answer health questions, and provide general medical information. How can I assist you today?',
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: input.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    setError('');

    try {
      // Simulate AI response for demo purposes
      // In a real implementation, you would call the OpenRouter API here
      const response = await simulateAIResponse(userMessage.text);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: response,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err: any) {
      setError(err.message || 'An error occurred while fetching the response.');
    } finally {
      setLoading(false);
    }
  };

  // Simulate AI response - replace with actual API call
  const simulateAIResponse = async (userInput: string): Promise<string> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const lowerInput = userInput.toLowerCase();
        
        if (lowerInput.includes('medication') || lowerInput.includes('medicine') || lowerInput.includes('drug')) {
          resolve('I can help explain medications! Please provide the name of the medication you\'d like to know about, and I\'ll explain its purpose, common side effects, and usage instructions in simple terms. Always consult with your healthcare provider for personalized medical advice.');
        } else if (lowerInput.includes('blood pressure') || lowerInput.includes('hypertension')) {
          resolve('Blood pressure is the force of blood against your artery walls. Normal blood pressure is typically below 120/80 mmHg. High blood pressure (hypertension) can increase risk of heart disease and stroke. Regular monitoring, healthy diet, exercise, and medication (if prescribed) can help manage it.');
        } else if (lowerInput.includes('diabetes') || lowerInput.includes('blood sugar')) {
          resolve('Diabetes is a condition where your body has trouble managing blood sugar levels. Type 1 requires insulin, while Type 2 can often be managed with diet, exercise, and sometimes medication. Regular monitoring, healthy eating, and following your doctor\'s treatment plan are key to managing diabetes effectively.');
        } else if (lowerInput.includes('side effect') || lowerInput.includes('adverse')) {
          resolve('Side effects are unwanted reactions to medications. Common ones include nausea, dizziness, or drowsiness. Always read medication labels, report serious side effects to your doctor, and never stop prescribed medications without consulting your healthcare provider first.');
        } else if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('help')) {
          resolve('Hello! I\'m here to help with your health questions. I can explain medications, discuss common health conditions, and provide general medical information. What would you like to know about?');
        } else {
          resolve('Thank you for your question. I can help with medication explanations, general health information, and understanding medical terms. For specific medical advice, please consult with your healthcare provider. Is there a particular medication or health topic you\'d like to learn about?');
        }
      }, 1500);
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const clearChat = () => {
    setMessages([
      {
        id: '1',
        sender: 'assistant',
        text: 'Hello! I\'m your health assistant. I can help explain medications, answer health questions, and provide general medical information. How can I assist you today?',
        timestamp: new Date(),
      }
    ]);
    setError('');
  };

  return (
    <section className="max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-900">Health Assistant Chat</h2>
        <p className="text-gray-600">Get explanations about medications and general health information</p>
      </div>

      <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
        {/* Chat Header */}
        <div className="bg-purple-600 text-white p-4 flex justify-between items-center">
          <div>
            <h3 className="font-semibold">Health Assistant</h3>
            <p className="text-purple-100 text-sm">Online • Ready to help</p>
          </div>
          <button
            onClick={clearChat}
            className="px-3 py-1 bg-purple-700 hover:bg-purple-800 rounded text-sm transition-colors duration-200"
          >
            Clear Chat
          </button>
        </div>

        {/* Messages Container */}
        <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-800 border border-gray-200'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p
                  className={`text-xs mt-1 ${
                    message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}
                >
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-white text-gray-800 border border-gray-200 px-4 py-2 rounded-lg max-w-xs">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Error Display */}
        {error && (
          <div className="p-3 bg-red-50 border-t border-red-200">
            <p className="text-red-700 text-sm font-medium">Error: {error}</p>
          </div>
        )}

        {/* Input Area */}
        <div className="p-4 border-t border-gray-200 bg-white">
          <div className="flex space-x-3">
            <input
              type="text"
              placeholder="Ask about medications, health conditions, or general health questions..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={loading}
              className="flex-1 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors disabled:bg-gray-100"
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
            >
              {loading ? 'Sending...' : 'Send'}
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Press Enter to send • This assistant provides general information only
          </p>
        </div>
      </div>

      {/* Quick Questions */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Questions</h3>
        <div className="grid md:grid-cols-2 gap-3">
          {[
            "What are the side effects of my medication?",
            "How should I take my blood pressure medication?",
            "What is diabetes and how is it managed?",
            "Can you explain what hypertension means?"
          ].map((question, index) => (
            <button
              key={index}
              onClick={() => setInput(question)}
              className="text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors duration-200 text-sm"
            >
              {question}
            </button>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Important Disclaimer</h3>
        <ul className="space-y-1 text-gray-700 text-sm">
          <li>• This assistant provides general health information only</li>
          <li>• Always consult with your healthcare provider for medical advice</li>
          <li>• Do not use this information to diagnose or treat medical conditions</li>
          <li>• In case of emergency, contact your doctor or emergency services immediately</li>
        </ul>
      </div>
    </section>
  );
};

export default Chat;
