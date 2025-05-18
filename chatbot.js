// chatbot.js
document.addEventListener('DOMContentLoaded', function() {
    // Create chatbot HTML structure
    const chatbotHTML = `
        <!-- Chat button -->
        <button id="chat-button">💬</button>
        
        <!-- Chatbot container -->
        <div class="chatbot-container hidden">
            <div class="chatbot-header">
                <h3>Prateek's AI Assistant</h3>
                <div class="chatbot-controls">
                    <button id="minimize-chat">—</button>
                    <button id="close-chat">✕</button>
                </div>
            </div>
            <div class="chatbot-content" id="chat-content">
                <!-- Messages will be added here -->
            </div>
            <div class="chatbot-input">
                <input type="text" id="user-input" placeholder="Type a message...">
                <button id="send-button">Send</button>
            </div>
        </div>
    `;
    
    // Insert the chatbot HTML into the body
    const chatbotContainer = document.createElement('div');
    chatbotContainer.id = 'portfolio-chatbot';
    chatbotContainer.innerHTML = chatbotHTML;
    document.body.appendChild(chatbotContainer);
    
    // Chat data
    const botResponses = {
        greeting: "Hi there! I'm Prateek's portfolio assistant. How can I help you today?",
        fallback: "I'm not sure I understand. You can ask me about Prateek's skills, work experience, education, publications, or how to contact him.",
        // Knowledge base
        skills: "Prateek has expertise in Machine Learning, Computer Vision, Deep Learning, Python, NLP, Tensorflow, BERT, Analytics, AWS, Azure, Generative AI, LLM-RAG-LangChain, Tableau & Power BI, Agentic AI, PySpark, Hadoop, and basic HTML-CSS.",
        projects: "Prateek has worked on several innovative AI products including Insightful, Verbalize, Nutriweaver, iDetect, Humanoid, medBot, and BlinkCheck. He's also developed computational models for COVID-19 predictions and oral cancer diagnosis. Would you like to know more about any specific project?",
        experience: "Prateek is currently a Sr. AI Developer at KPMG India (May 2024-Present). Previously, he worked as a Machine Learning Engineer at Dataevolve Solutions (Jun 2023-Apr 2024), Data Science Engineer at Konverge.AI (Jul 2022-Mar 2023), and Research Associate at Curtin University Malaysia (Aug 2021-Jan 2022). He also worked as a Self Product Innovator (part-time freelance) from Aug 2021 to Mar 2024.",
        contact: "You can contact Prateek via email at prateekdutta2001@gmail.com or call at +91 7879362381. You can also connect on LinkedIn or check his portfolio and Google Scholar profiles.",
        about: "Prateek Dutta is an experienced Data & AI Developer focused on Aviation, Healthcare, Finance, and the Public Sector. He has successfully built and deployed scalable models, including a face recognition system validating 2.5 lakhs new users daily. He's a passionate researcher with 20 publications across prestigious platforms like IEEE, SCI, Scopus, AIP, and Springer, along with 2 book publications and 1 Indian patent.",
        education: "Prateek completed his Bachelors of Technology (B.Tech) in Artificial Intelligence (4 Years) from G H Raisoni College of Engineering, Nagpur, India.",
        publications: "Prateek has published 20 research papers in International Conferences & Journals like IEEE, SCI, Springer, Scopus and AIP. He has also published 2 books on Python with AIML and Introduction to application of AI. Additionally, he has an Indian patent for an AI Based Disease Diagnostic System.",
        certifications: "Prateek holds several certifications including Technical Product Management (IIBA-PMI), Developing AI solutions & RAG based Agent on Azure (Microsoft), Generative AI for Product Managers (LinkedIn), GX25 AI Trusted-AI Foundation (KPMG), Consulting Foundations (KPMG), GenAI & Machine Learning (AWS), Data Pattern & Storytelling (Upgrad), Advance Google Analytics, and Industrial AI (LinkedIn).",
        
        // Project-specific responses
        digiyatra: "Prateek built a computational solution for DigiYatra, a product associated with the Central Government of India for contactless air check-in with real-time facial biometric validation through a mobile application.",
        face_recognition: "Prateek developed a POC for real-time face recognition model to ensure smooth security enablement for Government of India services for Passport Visa Application.",
        text2video: "At Konverge.AI, Prateek developed a solution for Text-2-Video synthesis using GAN Models where users get a choice-based avatar which narrates text in video format.",
        covid_research: "Prateek performed research on prediction of COVID-19 termination using Time series forecasting with LSTM, which was published in an IEEE conference in Malaysia.",
        covid_xray: "Prateek developed a computational model for COVID-19 predictions through chest X-Ray Images using different transfer learning algorithms, automating the process of Patient EHR data analysis and risk prediction.",
        cancer_diagnosis: "Prateek developed a model for Oral Cancer diagnosis using histopathological images processed through Convolutional Neural Network & Transfer Learning Architecture."
    };

    // Bot messages that trigger automatically based on user input
    const keywordResponses = {
        "hi": botResponses.greeting,
        "hello": botResponses.greeting,
        "hey": botResponses.greeting,
        "skills": botResponses.skills,
        "project": botResponses.projects,
        "projects": botResponses.projects,
        "experience": botResponses.experience,
        "work": botResponses.experience,
        "contact": botResponses.contact,
        "email": botResponses.contact,
        "about": botResponses.about,
        "who": botResponses.about,
        "education": botResponses.education,
        "degree": botResponses.education,
        "publications": botResponses.publications,
        "research": botResponses.publications,
        "papers": botResponses.publications,
        "patent": botResponses.publications,
        "certifications": botResponses.certifications,
        "certificates": botResponses.certifications,
        "certified": botResponses.certifications,
        "digiyatra": botResponses.digiyatra,
        "face recognition": botResponses.face_recognition,
        "facial": botResponses.face_recognition,
        "text2video": botResponses.text2video,
        "text to video": botResponses.text2video,
        "covid": botResponses.covid_research,
        "xray": botResponses.covid_xray,
        "cancer": botResponses.cancer_diagnosis,
        "machine learning": "Prateek has extensive experience in Machine Learning, building models for face recognition, disease diagnosis, and various other applications.",
        "deep learning": "Prateek has worked with Deep Learning models including CNNs and Transfer Learning for medical diagnosis and computer vision applications.",
        "ai": "Prateek is an experienced AI Developer currently working as a Sr. AI Developer at KPMG India. He focuses on Aviation, Healthcare, Finance, and the Public Sector applications.",
        "computer vision": "Prateek has strong experience in Computer Vision, having built face recognition systems and medical image analysis models.",
        "nlp": "Prateek has skills in Natural Language Processing (NLP) and has worked with technologies like BERT.",
        "tensorflow": "Prateek has expertise in TensorFlow, using it to build various deep learning models for his projects.",
        "python": "Python is Prateek's primary programming language for AI and Data Science development.",
        "aws": "Prateek has experience with AWS cloud services for deploying AI solutions.",
        "azure": "Prateek is certified in developing AI solutions & RAG based Agents on Microsoft Azure.",
        "generative ai": "Prateek has skills in Generative AI and is certified in Generative AI for Product Managers.",
        "llm": "Prateek has experience working with Large Language Models (LLMs) and RAG-LangChain frameworks.",
        "hire": "Prateek is interested in roles like Sr. Machine Learning Engineer, Sr. AI Engineer, Lead AI Engineer, Sr. Data Scientist, Product Leader, or Product Architect. You can contact him at prateekdutta2001@gmail.com.",
        "location": "Prateek is currently working at KPMG India in Bengaluru. His official work address is KPMG India, Pebble Beach, Embassy Golf Link Business Park, 100 feet Road, Domlur, Bengaluru, Karnataka, India. 560071",
        "languages": "Prateek is fluent in English, Hindi, and Bengali.",
        "kpmg": "Prateek currently works as a Sr. AI Developer at KPMG India (since May 2024), where he creates automation workflows, leads AI & Data teams, and contributes to product development for Risk Advisory Center of Excellence.",
        "dataevolve": "At Dataevolve Solutions (Jun 2023-Apr 2024), Prateek built computational solutions for DigiYatra and developed POCs for real-time face recognition for government services.",
        "konverge": "At Konverge.AI (Jul 2022-Mar 2023), Prateek developed a solution for Text-2-Video synthesis using GAN Models.",
        "resume": "Prateek's resume highlights his experience as an AI Developer focused on Aviation, Healthcare, Finance, and the Public Sector, with skills in Machine Learning, Computer Vision, Deep Learning, Python, NLP, and more.",
        "thanks": "You're welcome! Feel free to ask if you have any other questions about Prateek's work.",
        "thank you": "You're welcome! Feel free to ask if you have any other questions about Prateek's work."
    };

    // DOM elements
    const chatButton = document.getElementById('chat-button');
    const chatContainer = document.querySelector('.chatbot-container');
    const chatContent = document.getElementById('chat-content');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    const minimizeButton = document.getElementById('minimize-chat');
    const closeButton = document.getElementById('close-chat');

    // Event listeners
    chatButton.addEventListener('click', toggleChat);
    sendButton.addEventListener('click', sendMessage);
    minimizeButton.addEventListener('click', minimizeChat);
    closeButton.addEventListener('click', closeChat);
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Initialize the chatbot
    function initChat() {
        addBotMessage(botResponses.greeting);
    }

    // Toggle chat visibility
    function toggleChat() {
        chatContainer.classList.toggle('hidden');
        chatButton.classList.toggle('hidden');
        
        // If it's the first time opening the chat, initialize it
        if (!chatContainer.classList.contains('hidden') && chatContent.children.length === 0) {
            initChat();
        }
        
        // If the chat was minimized, restore it
        chatContainer.classList.remove('chatbot-collapsed');
    }

    // Minimize the chat
    function minimizeChat(e) {
        e.stopPropagation();
        chatContainer.classList.toggle('chatbot-collapsed');
    }

    // Close the chat
    function closeChat() {
        chatContainer.classList.add('hidden');
        chatButton.classList.remove('hidden');
    }

    // Send a message from the user
    function sendMessage() {
        const message = userInput.value.trim();
        if (message !== '') {
            addUserMessage(message);
            userInput.value = '';
            
            // Show typing indicator
            showTypingIndicator();
            
            // Process the message and generate a response with a delay
            setTimeout(() => {
                processMessage(message);
            }, 1000);
        }
    }

    // Add a user message to the chat
    function addUserMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', 'user-message');
        messageElement.textContent = message;
        chatContent.appendChild(messageElement);
        scrollToBottom();
    }

    // Add a bot message to the chat
    function addBotMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', 'bot-message');
        messageElement.textContent = message;
        chatContent.appendChild(messageElement);
        scrollToBottom();
    }

    // Show typing indicator
    function showTypingIndicator() {
        const indicator = document.createElement('div');
        indicator.classList.add('typing-indicator');
        indicator.id = 'typing-indicator';
        
        for (let i = 0; i < 3; i++) {
            const dot = document.createElement('span');
            indicator.appendChild(dot);
        }
        
        chatContent.appendChild(indicator);
        scrollToBottom();
    }

    // Remove typing indicator
    function removeTypingIndicator() {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) {
            indicator.remove();
        }
    }

    // Process the user's message and generate a response
    function processMessage(message) {
        removeTypingIndicator();
        
        // Convert to lowercase for matching
        const lowerMessage = message.toLowerCase();
        
        // Check for keyword matches
        let foundResponse = false;
        
        // Check for specific project inquiries
        if (lowerMessage.includes('digiyatra') || lowerMessage.includes('digi yatra')) {
            addBotMessage(botResponses.digiyatra);
            foundResponse = true;
        } else if (lowerMessage.includes('face recognition') || lowerMessage.includes('facial recognition')) {
            addBotMessage(botResponses.face_recognition);
            foundResponse = true;
        } else if (lowerMessage.includes('text2video') || lowerMessage.includes('text to video')) {
            addBotMessage(botResponses.text2video);
            foundResponse = true;
        } else if (lowerMessage.includes('covid') && (lowerMessage.includes('research') || lowerMessage.includes('lstm'))) {
            addBotMessage(botResponses.covid_research);
            foundResponse = true;
        } else if (lowerMessage.includes('covid') && (lowerMessage.includes('xray') || lowerMessage.includes('x-ray'))) {
            addBotMessage(botResponses.covid_xray);
            foundResponse = true;
        } else if (lowerMessage.includes('cancer') || lowerMessage.includes('oral cancer')) {
            addBotMessage(botResponses.cancer_diagnosis);
            foundResponse = true;
        }
        
        // If no project-specific response, check general keywords
        if (!foundResponse) {
            for (const keyword in keywordResponses) {
                if (lowerMessage.includes(keyword)) {
                    addBotMessage(keywordResponses[keyword]);
                    foundResponse = true;
                    break;
                }
            }
        }
        
        // If no matching keywords, use fallback response
        if (!foundResponse) {
            addBotMessage(botResponses.fallback);
        }
    }

    // Scroll to the bottom of the chat content
    function scrollToBottom() {
        chatContent.scrollTop = chatContent.scrollHeight;
    }
});
