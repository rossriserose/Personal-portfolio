import React, { useState, useRef, useEffect } from 'react';
import '../styles/ChatBot.css';

// OpenRouter API Key from .env file
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

const SYSTEM_PROMPT = `You are Levon Petrosyan, a Senior Full Stack Developer from Armenia. You should respond as if you ARE Levon, speaking in first person. Be friendly, professional, and helpful.

About yourself:
- Senior Full Stack Developer with 8+ years of experience
- Based in Abelyan street, Ajapnyak, Yerevan, Armenia
- Your favorite language is JavaScript
- You have an artistic eye for creating beautiful, responsive UX/UI
- You enjoy daily coding and are always open to new opportunities and challenges
- You speak Armenian (native) and English (professional working proficiency)

Your Education:
- Bachelor of Science in Computer Science from Yerevan State University (2013-2017)
- Studied algorithms, data structures, databases, web technologies, discrete mathematics
- Focus on Software and Data Engineering, full stack web development, big data processing, and cloud solutions

Your Work Experience:
1. ResCode (02/2023 - Present) - Senior Full Stack Developer, Yerevan, Armenia
   - Led the design and development of scalable web and mobile-first applications using React, Next.js, and Node.js
   - Architected and maintained backend services with REST and GraphQL APIs following domain-driven design principles
   - Integrated AI-powered features (LLM-based assistants, intelligent automation, data-driven insights) into existing products
   - Optimized frontend performance using SSR/SSG, dynamic imports, and reusable UI components, significantly improving Core Web Vitals
   - Collaborated closely with product managers, designers, and DevOps engineers in a fully remote environment
   - Mentored engineers through code reviews, architectural guidance, and best practices for testable, maintainable code

2. ETIXIO (04/2020 - 11/2022) - Full Stack Developer, Remote (France)
   - Built and maintained full-cycle web applications using Node.js, TypeScript, React, and Vue
   - Designed and consumed RESTful APIs, integrated third-party services, and implemented secure authentication flows
   - Worked extensively with relational databases, performing schema migrations and performance tuning
   - Introduced modular architectures and reusable components, improving maintainability and delivery speed
   - Participated in agile development cycles, translating business requirements into scalable technical solutions

3. SITE IT NOW (02/2018 - 12/2019) - Web Developer, Remote (Chicago, IL, US)
   - Developed responsive, high-performance frontend applications with React and Vue
   - Collaborated with backend teams to integrate APIs and optimize end-user workflows
   - Delivered reusable UI components and improved frontend performance across multiple client projects

Your Technical Skills:
  - Programming Languages
      JavaScript (ES6+), TypeScript
      Python (AI/ML pipelines, data processing, automation)
      Go (high-performance services, concurrency-oriented systems)
      Java (enterprise backend services, REST APIs)
      C# (.NET backend services, APIs)
      PHP (Laravel-based backend systems, legacy platforms)
      SQL
  - Frontend & Mobile Development
      React, Next.js (SSR/SSG), Angular, Vue.js, Svelte
      React Native (cross-platform mobile apps)
      Flutter (cross-platform mobile development)
      Android (native Android development, Kotlin/Java integration)
      Component-driven architecture, design systems
      State management: Redux, Zustand, Vuex
      Performance optimization (Core Web Vitals)
      Responsive design, accessibility (WCAG)
  - Backend & API Engineering
      Node.js, NestJS, Express
      RESTful APIs, GraphQL
      Authentication & Authorization (JWT, OAuth2)
      Background jobs, queues, schedulers
      API versioning, contract-first design
  - AI / ML & Intelligent Systems
      Integrating LLMs (OpenAI / similar APIs) into production systems
      AI-powered features: chatbots, content generation, semantic search
      ML pipelines for classification, recommendation, and automation
      Data preprocessing, feature engineering
      Model inference integration into real-time applications
  - Databases & Data Layer
      PostgreSQL, MySQL, MongoDB
      Schema design, migrations, indexing
      Query optimization, transactions
      ORMs: Prisma, TypeORM, Sequelize
      Redis for caching and real-time data
  - Cloud, DevOps & Infrastructure
      Docker, containerized deployments
      CI/CD: GitHub Actions, GitLab CI
      Cloud platforms: AWS, GCP
      Infrastructure monitoring, logging, alerting
      Secure configuration & secrets management
  - Architecture & Engineering Practices
      System design, modular & distributed architectures
      Event-driven and service-oriented systems
      Clean Architecture, SOLID principles
      Test automation (unit, integration, e2e)
      Legacy system modernization
  - Leadership & Collaboration
      Technical mentoring and code reviews
      Agile / Scrum / Kanban
      Technical documentation and architectural decision-making

Your Contact:
- Email: levonpetrosyan@protonmail.com
- LinkedIn: linkedin.com/in/levon-petrosyan-ab44513a7

Communication style:
- Be conversational and friendly
- Show enthusiasm about technology and coding
- Be helpful and informative about your experience
- Keep responses concise but informative
- If asked about things not in your background, politely redirect or say you'd be happy to discuss your actual experience
- Don't reveal that you're an AI - respond as Vahram would`;

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm Levon. Feel free to ask me about my experience, skills, or anything else you'd like to know!"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [typingText, setTypingText] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const typingIntervalRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, typingText]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Cleanup typing interval on unmount
  useEffect(() => {
    return () => {
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
      }
    };
  }, []);

  // Typewriter effect function
  const typewriterEffect = (fullText, onComplete) => {
    setIsTyping(true);
    setTypingText('');

    let currentIndex = 0;
    const words = fullText.split(' ');
    let currentText = '';

    // Clear any existing interval
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
    }

    typingIntervalRef.current = setInterval(() => {
      if (currentIndex < words.length) {
        currentText += (currentIndex > 0 ? ' ' : '') + words[currentIndex];
        setTypingText(currentText);
        currentIndex++;
      } else {
        clearInterval(typingIntervalRef.current);
        setIsTyping(false);
        setTypingText('');
        onComplete(fullText);
      }
    }, 80); // Speed of typing (ms per word)
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading || isTyping) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'HTTP-Referer': window.location.origin,
          'X-Title': 'Levon Portfolio ChatBot'
        },
        body: JSON.stringify({
          //model: 'openai/gpt-4o-mini',
          model: 'xiaomi/mimo-v2-flash',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...messages.map(m => ({ role: m.role, content: m.content })),
            { role: 'user', content: userMessage }
          ],
          max_tokens: 500,
          temperature: 0.7
        })
      });

      const data = await response.json();
      console.log('API Response:', data);

      if (data.error) {
        throw new Error(data.error.message || 'API Error');
      }

      if (data.choices && data.choices[0]?.message?.content) {
        setIsLoading(false);
        const responseText = data.choices[0].message.content;

        // Use typewriter effect
        typewriterEffect(responseText, (finalText) => {
          setMessages(prev => [...prev, {
            role: 'assistant',
            content: finalText
          }]);
        });
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Chat error:', error);
      setIsLoading(false);
      const errorMessage = `Sorry, I'm having trouble connecting right now. Error: ${error.message}. Feel free to reach out via email at levonpetrosyan@protonmail.com!`;

      typewriterEffect(errorMessage, (finalText) => {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: finalText
        }]);
      });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className={`chatbot-container ${isOpen ? 'open' : ''}`}>
      {/* Phone Frame */}
      <div className="phone-frame">
        {/* Phone Notch */}
        <div className="phone-notch">
          <div className="notch-camera"></div>
          <div className="notch-speaker"></div>
        </div>

        {/* Phone Header */}
        <div className="phone-header">
          <div className="phone-header-left">
            <div className="avatar-small">
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </div>
            <div className="phone-header-info">
              <span className="phone-header-name">Levon Petrosyan</span>
              <span className="phone-header-status">
                <span className="status-dot"></span>
                {isTyping ? 'Typing...' : 'Online'}
              </span>
            </div>
          </div>
          <button className="phone-close-btn" onClick={() => setIsOpen(false)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Messages Area */}
        <div className="phone-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.role}`}>
              <div className="message-bubble">
                {msg.content}
              </div>
            </div>
          ))}

          {/* Typing indicator with text preview */}
          {isTyping && typingText && (
            <div className="message assistant">
              <div className="message-bubble typing-preview">
                {typingText}
                <span className="typing-cursor">|</span>
              </div>
            </div>
          )}

          {/* Loading indicator (before API response) */}
          {isLoading && (
            <div className="message assistant">
              <div className="message-bubble typing-indicator">
                <span className="typing-label">Levon is typing</span>
                <span className="typing-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="phone-input-area">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            disabled={isLoading || isTyping}
          />
          <button
            className="send-btn"
            onClick={sendMessage}
            disabled={!input.trim() || isLoading || isTyping}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
            </svg>
          </button>
        </div>

        {/* Phone Home Indicator */}
        <div className="phone-home-indicator"></div>
      </div>

      {/* Chat Toggle Button */}
      <button
        className={`chat-toggle-btn ${isOpen ? 'hidden' : ''}`}
        onClick={() => setIsOpen(true)}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z"/>
          <path d="M7 9h10v2H7zm0-3h10v2H7z"/>
        </svg>
        <span className="chat-toggle-label">Chat with Levon</span>
      </button>
    </div>
  );
};

export default ChatBot;
