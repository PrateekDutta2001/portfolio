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
    
    // Chat data - Comprehensive Knowledge Base
    const botResponses = {
        greeting: "Hi there! I'm Prateek's portfolio assistant. I can help you learn about his skills, experience, projects, tutorials, publications, and more. How can I assist you today?",
        fallback: "I can help you with information about Prateek's portfolio. You can ask about:\n• Skills and expertise\n• Work experience and education\n• Projects (Shambhu.AI, Calculas.AI, DataOrbit.AI, Insightful, etc.)\n• Tutorials (Agentic AI, RAG, Neural Networks, etc.)\n• Publications and research\n• Contact information\n\nWhat would you like to know?",
        
        // Core Information
        skills: "Prateek has extensive expertise in:\n• Deep Learning (90%)\n• Machine Learning (85%)\n• Computer Vision (80%)\n• Python (80%)\n• GenAI & XAI (75%)\n• NLP-LLM-AgenticAI (75%)\n• AWS (80%)\n• Research & Analytics (80%)\n\nHe also works with TensorFlow, BERT, Azure, Generative AI, RAG-LangChain, Tableau, Power BI, PySpark, and Hadoop.",
        projects: "Prateek has developed 80+ projects including:\n• Shambhu.AI - AI code generation platform\n• AirID-Check (DigiYatra) - Contactless air check-in\n• Calculas.AI - Math problem solver\n• DataOrbit.AI - Data analysis platform\n• Insightful - RAG-based web Q&A\n• NutriWeaver - Food recommendation system\n• Verbalize - Speech recognition\n• MedBot - Healthcare chatbot\n• And many more!\n\nWould you like details about any specific project?",
        experience: "Current Role:\n• Sr. AI Developer at KPMG India (May 2024 - Present)\n\nPrevious Experience:\n• Machine Learning Engineer at Dataevolve Solutions (May 2023 - April 2024)\n• Data Science Engineer at Konverge.AI (July 2022 - March 2023)\n• Research Scholar at Curtin University, Malaysia (Sept 2021 - Jan 2022)\n• Product Innovator (Bootstrap) - Self-employed (March 2023 - Present)",
        contact: "Contact Information:\n• Email: prateekdutta2001@gmail.com\n• Phone: +91 7879362381\n• Location: Bengaluru, Karnataka, India\n• LinkedIn: linkedin.com/in/prateek-dutta-3622821a1\n• Google Scholar: Available in portfolio\n• Topmate: topmate.io/prateek_dutta",
        about: "Prateek Dutta is a Bootstrap Product Innovator specializing in Machine Learning, Generative AI, and Agentic AI. He's a Data Specialist, Research Author & Reviewer, and Google Scholar contributor.\n\nKey Achievements:\n• 23+ publications in IEEE, SCI, Scopus, AIP, Springer\n• 2 internationally published books\n• 1 Indian Patent on AI-based Diagnostic System\n• 80+ projects with societal impact\n• Built face recognition system validating 2.5 lakhs users daily",
        education: "Education:\n• B.Tech in Artificial Intelligence from G. H. Raisoni College of Engineering (Autonomous Institute affiliated with RTM Nagpur University)\n• Higher Secondary from Krishna Public School\n• Professional Diploma in Digital Data Forensic Science from Alison",
        publications: "Publications:\n• 23+ research papers in International Conferences & Journals (IEEE, SCI, Springer, Scopus, AIP)\n• 2 books published internationally:\n  - Machine Learning using Python\n  - Application of AI\n• 1 Indian Patent: AI Based Disease Diagnostic System",
        certifications: "Certifications:\n• Technical Product Management (IIBA-PMI)\n• Developing AI solutions & RAG based Agent on Azure (Microsoft)\n• Generative AI for Product Managers (LinkedIn)\n• GX25 AI Trusted-AI Foundation (KPMG)\n• Consulting Foundations (KPMG)\n• GenAI & Machine Learning (AWS)\n• Data Pattern & Storytelling (Upgrad)\n• Advanced Google Analytics\n• Industrial AI (LinkedIn)",
        
        // Tutorials Information
        tutorials: "Prateek offers 6 comprehensive tutorials:\n1. Agentic AI - Learn about autonomous AI agents\n2. Inferential Statistics - Statistical analysis methods\n3. Neural Networks - Deep learning fundamentals\n4. Explainable AI (XAI) - Making AI transparent\n5. Prompt Engineering - Optimizing LLM interactions\n6. RAG & Knowledge Workflows - Complete RAG pipeline guide\n\nAll tutorials are available in the 'Personalized Tutorial' section. Would you like details about any specific tutorial?",
        agentic_ai: "Agentic AI Tutorial covers autonomous AI agents that can make decisions and take actions independently. Access the full tutorial at: https://prateekdutta2001.github.io/Agentic.AI/",
        inferential_stats: "Inferential Statistics Tutorial teaches statistical analysis methods for drawing conclusions from data. Access at: https://prateekdutta2001.github.io/Info_Stats/",
        neural_networks: "Neural Networks Tutorial provides comprehensive coverage of deep learning fundamentals, architectures, and applications. Access at: https://prateekdutta2001.github.io/NeuraNet/",
        xai: "Explainable AI (XAI) Tutorial focuses on making AI models transparent and interpretable. Learn techniques to understand AI decision-making. Access at: https://prateekdutta2001.github.io/XAI/",
        prompt_engineering: "Prompt Engineering Tutorial teaches how to optimize interactions with Large Language Models for better results. Access at: https://prateekdutta2001.github.io/Craft-N-Vibe/",
        rag: "RAG & Knowledge Workflows Tutorial is a comprehensive guide covering:\n• Core Foundations: What is RAG, embeddings, vector similarity\n• Data Ingestion: Document processing, chunking strategies\n• Retrieval: Vector search, reranking, hybrid approaches\n• Advanced Techniques: Multi-hop reasoning, query expansion\n• Quality & Production: Evaluation metrics, monitoring, scaling\n• Security & Compliance: Access control, data protection\n\nAccess the complete tutorial at: https://prateekdutta2001.github.io/RAG-Tutorial/",
        
        // Project-specific responses (All projects from webpage)
        shambhu: "Shambhu.AI is an AI-powered code generation platform that transforms natural language descriptions into production-ready code across 13+ programming languages. It helps with application development, code optimization, and code explanation, making coding tasks easier and higher quality.",
        airid_check: "AirID-Check (formerly DigiYatra) is a computational solution for the Central Government of India's contactless air check-in system. It provides real-time facial biometric validation through a mobile application, enabling seamless airport check-in experiences.",
        calculas: "Calculas.AI is an AI-powered mathematical problem solver that transforms how students and professionals approach complex math problems. It solves problems across 9+ mathematical domains (Calculus, Algebra, Trigonometry, Statistics, etc.) and provides step-by-step solutions with detailed explanations. Access: https://calculasai.streamlit.app/",
        metalens: "MetaLens.AI is an AI-powered comprehensive image authentication and fraud detection platform designed to verify image authenticity and detect fraudulent content.",
        dataorbit: "DataOrbit.AI illuminates your data's potential with AI capability. It's a web application for data analysis and visualization, summarizing data, and generating AI-driven insights with natural language prompt search. Access: https://dataorbitai.streamlit.app/",
        digital_spokesmodel: "Digital Spokesmodel is a solution for Text-2-Video synthesis using GAN Models. Users get a choice-based avatar that narrates text into video format, enabling automated video content creation.",
        nutriweaver: "NutriWeaver is a web application using a content-based recommendation approach, developed with Scikit-Learn, FastAPI, and Streamlit. It promotes healthy eating habits by providing personalized food recommendations based on nutritional content and ingredients.",
        memegine: "Memegine is a web application that automatically generates memes according to a given image. Users upload a clear picture, and the application analyzes the person's expression in the image to produce amusing memes. Users can download the generated memes.",
        covid_termination: "COVID-19 Termination is a research project on predicting COVID-19 termination using time series forecasting. This research was published in an IEEE conference in Malaysia.",
        facereg: "FaceReg is a real-time face recognition system developed to enhance security measures for public services. It ensures efficient and reliable authentication processes while prioritizing user privacy and convenience.",
        verbalize: "Verbalize is a web-based application offering professional-grade speech recognition capabilities. It transforms spoken words into accurate textual content, designed for various professional needs with precision and reliability in transcribing voice input.",
        insightful: "Insightful is a RAG-based application where users can input a URL and ask questions about the content of any webpage. It leverages Retrieval Augmented Generation (RAG), OpenAI, and a vector database to provide accurate and insightful responses.",
        medbot: "MedBot is a Question Answering chatbot fed with medical data that assists users with day-to-day health-related queries. It's developed for healthcare-related queries, addressing prominent factors in day-to-day lifestyle.",
        bhraman: "Bhraman is your ultimate guide to exploring India's diverse tourism offerings. It provides a comprehensive overview of each state's unique attractions and helps discover nearby must-see places.",
        ytubegist: "YtubeGist is a lightweight application designed to transcribe and summarize YouTube videos efficiently using open-source language and speech recognition models optimized for CPU environments.",
        analyticspro: "AnalyticsPro is a comprehensive, standalone web application that democratizes data analysis by providing instant, intelligent insights without compromising data security.",
        face_recognition: "Prateek developed a real-time face recognition system for Government of India services, ensuring smooth security enablement for Passport Visa Applications. The system validates 2.5 lakhs new users daily.",
        text2video: "At Konverge.AI, Prateek developed a solution for Text-2-Video synthesis using GAN Models where users get a choice-based avatar that narrates text in video format.",
        covid_research: "Prateek performed research on prediction of COVID-19 termination using Time series forecasting with LSTM, which was published in an IEEE conference in Malaysia.",
        covid_xray: "Prateek developed a computational model for COVID-19 predictions through chest X-Ray Images using different transfer learning algorithms, automating Patient EHR data analysis and risk prediction.",
        cancer_diagnosis: "Prateek developed a model for Oral Cancer diagnosis using histopathological images processed through Convolutional Neural Network & Transfer Learning Architecture."
    };

    // Enhanced keyword matching with multiple variations
    const keywordResponses = {
        // Greetings
        "hi": botResponses.greeting,
        "hello": botResponses.greeting,
        "hey": botResponses.greeting,
        "greetings": botResponses.greeting,
        
        // Core Information
        "skills": botResponses.skills,
        "skill": botResponses.skills,
        "expertise": botResponses.skills,
        "technologies": botResponses.skills,
        "project": botResponses.projects,
        "projects": botResponses.projects,
        "experience": botResponses.experience,
        "total experience": "Prateek has approximately 3+ years of working experience as an AI Machine Learning Engineer & Data Scientist. He started his career in 2021 and has worked at multiple companies including KPMG India, Dataevolve Solutions, Konverge.AI, and Curtin University Malaysia.",
        "years of experience": "Prateek has approximately 3+ years of working experience as an AI Machine Learning Engineer & Data Scientist. He started his career in 2021 and has worked at multiple companies including KPMG India, Dataevolve Solutions, Konverge.AI, and Curtin University Malaysia.",
        "how much experience": "Prateek has approximately 3+ years of working experience as an AI Machine Learning Engineer & Data Scientist. He started his career in 2021 and has worked at multiple companies including KPMG India, Dataevolve Solutions, Konverge.AI, and Curtin University Malaysia.",
        "work": botResponses.experience,
        "employment": botResponses.experience,
        "job": botResponses.experience,
        "career": botResponses.experience,
        "years": "Prateek has approximately 3+ years of working experience as an AI Machine Learning Engineer & Data Scientist.",
        "contact": botResponses.contact,
        "email": botResponses.contact,
        "phone": botResponses.contact,
        "reach": botResponses.contact,
        "about": botResponses.about,
        "who": botResponses.about,
        "introduction": botResponses.about,
        "education": botResponses.education,
        "degree": botResponses.education,
        "qualification": botResponses.education,
        "publications": botResponses.publications,
        "research": botResponses.publications,
        "papers": botResponses.publications,
        "patent": botResponses.publications,
        "books": botResponses.publications,
        "certifications": botResponses.certifications,
        "certificates": botResponses.certifications,
        "certified": botResponses.certifications,
        
        // Tutorials
        "tutorial": botResponses.tutorials,
        "tutorials": botResponses.tutorials,
        "learn": botResponses.tutorials,
        "course": botResponses.tutorials,
        "agentic": botResponses.agentic_ai,
        "agentic ai": botResponses.agentic_ai,
        "inferential": botResponses.inferential_stats,
        "statistics": botResponses.inferential_stats,
        "neural": botResponses.neural_networks,
        "neural network": botResponses.neural_networks,
        "xai": botResponses.xai,
        "explainable": botResponses.xai,
        "explainable ai": botResponses.xai,
        "prompt": botResponses.prompt_engineering,
        "prompt engineering": botResponses.prompt_engineering,
        "rag": botResponses.rag,
        "retrieval augmented": botResponses.rag,
        "knowledge workflow": botResponses.rag,
        "knowledge workflows": botResponses.rag,
        
        // Projects - All from webpage
        "shambhi": botResponses.shambhu,
        "shambhu": botResponses.shambhu,
        "shambhu ai": botResponses.shambhu,
        "shambhu.ai": botResponses.shambhu,
        "code generation": botResponses.shambhu,
        "what does shambhu": botResponses.shambhu,
        "what is shambhu": botResponses.shambhu,
        "airid": botResponses.airid_check,
        "airid-check": botResponses.airid_check,
        "digiyatra": botResponses.airid_check,
        "digi yatra": botResponses.airid_check,
        "calculas": botResponses.calculas,
        "calculas.ai": botResponses.calculas,
        "math solver": botResponses.calculas,
        "mathematics": botResponses.calculas,
        "metalens": botResponses.metalens,
        "metalens.ai": botResponses.metalens,
        "image authentication": botResponses.metalens,
        "fraud detection": botResponses.metalens,
        "dataorbit": botResponses.dataorbit,
        "dataorbit.ai": botResponses.dataorbit,
        "data analysis": botResponses.dataorbit,
        "data visualization": botResponses.dataorbit,
        "spokesmodel": botResponses.digital_spokesmodel,
        "digital spokesmodel": botResponses.digital_spokesmodel,
        "text to video": botResponses.digital_spokesmodel,
        "text2video": botResponses.digital_spokesmodel,
        "nutriweaver": botResponses.nutriweaver,
        "nutri weaver": botResponses.nutriweaver,
        "food recommendation": botResponses.nutriweaver,
        "nutrition": botResponses.nutriweaver,
        "memegine": botResponses.memegine,
        "meme": botResponses.memegine,
        "meme generator": botResponses.memegine,
        "covid": botResponses.covid_termination,
        "covid-19": botResponses.covid_termination,
        "coronavirus": botResponses.covid_termination,
        "facereg": botResponses.facereg,
        "face reg": botResponses.facereg,
        "face recognition": botResponses.facereg,
        "facial recognition": botResponses.face_recognition,
        "facial": botResponses.face_recognition,
        "biometric": botResponses.face_recognition,
        "verbalize": botResponses.verbalize,
        "speech recognition": botResponses.verbalize,
        "speech to text": botResponses.verbalize,
        "transcription": botResponses.verbalize,
        "insightful": botResponses.insightful,
        "web qa": botResponses.insightful,
        "url question": botResponses.insightful,
        "medbot": botResponses.medbot,
        "med bot": botResponses.medbot,
        "healthcare chatbot": botResponses.medbot,
        "medical": botResponses.medbot,
        "health": botResponses.medbot,
        "bhraman": botResponses.bhraman,
        "tourism": botResponses.bhraman,
        "travel": botResponses.bhraman,
        "ytubegist": botResponses.ytubegist,
        "youtube": botResponses.ytubegist,
        "video summary": botResponses.ytubegist,
        "video transcription": botResponses.ytubegist,
        "analyticspro": botResponses.analyticspro,
        "analytics pro": botResponses.analyticspro,
        "xray": botResponses.covid_xray,
        "x-ray": botResponses.covid_xray,
        "chest xray": botResponses.covid_xray,
        "cancer": botResponses.cancer_diagnosis,
        "oral cancer": botResponses.cancer_diagnosis,
        
        // Technologies & Skills
        "machine learning": "Prateek has extensive experience in Machine Learning (85% proficiency), building models for face recognition, disease diagnosis, and various other applications across multiple domains.",
        "ml": "Prateek has extensive experience in Machine Learning, building models for face recognition, disease diagnosis, and various other applications.",
        "deep learning": "Prateek has worked with Deep Learning models (90% proficiency) including CNNs and Transfer Learning for medical diagnosis and computer vision applications.",
        "ai": "Prateek is an experienced AI Developer currently working as a Sr. AI Developer at KPMG India. He focuses on Aviation, Healthcare, Finance, and the Public Sector applications.",
        "artificial intelligence": "Prateek is an experienced AI Developer with expertise in Machine Learning, Computer Vision, NLP, and Generative AI applications.",
        "computer vision": "Prateek has strong experience in Computer Vision (80% proficiency), having built face recognition systems and medical image analysis models.",
        "cv": "Prateek has strong experience in Computer Vision, having built face recognition systems and medical image analysis models.",
        "nlp": "Prateek has skills in Natural Language Processing (NLP) and has worked with technologies like BERT, LLMs, and RAG frameworks.",
        "natural language processing": "Prateek has skills in Natural Language Processing (NLP) and has worked with technologies like BERT, LLMs, and RAG frameworks.",
        "tensorflow": "Prateek has expertise in TensorFlow, using it to build various deep learning models for his projects.",
        "python": "Python is Prateek's primary programming language (80% proficiency) for AI and Data Science development.",
        "aws": "Prateek has experience with AWS cloud services (80% proficiency) for deploying AI solutions and is certified in GenAI & Machine Learning on AWS.",
        "azure": "Prateek is certified in developing AI solutions & RAG based Agents on Microsoft Azure.",
        "generative ai": "Prateek has skills in Generative AI (75% proficiency) and is certified in Generative AI for Product Managers.",
        "genai": "Prateek has skills in Generative AI and is certified in Generative AI for Product Managers.",
        "llm": "Prateek has experience working with Large Language Models (LLMs) and RAG-LangChain frameworks.",
        "large language model": "Prateek has experience working with Large Language Models (LLMs) and RAG-LangChain frameworks.",
        "langchain": "Prateek has experience with LangChain and RAG frameworks for building AI applications.",
        "bert": "Prateek has worked with BERT and other transformer models for NLP tasks.",
        "pyspark": "Prateek has experience with PySpark for big data processing.",
        "hadoop": "Prateek has experience with Hadoop for distributed data processing.",
        "tableau": "Prateek has skills in Tableau for data visualization.",
        "power bi": "Prateek has skills in Power BI for business intelligence and analytics.",
        
        // Companies & Experience
        "hire": "Prateek is interested in roles like Sr. AI Developer, Lead ML Engineer, Sr. Data Scientist, Product Architect, Product Lead, or AI Researcher. You can contact him at prateekdutta2001@gmail.com.",
        "location": "Prateek is currently working at KPMG India in Bengaluru, Karnataka, India.",
        "bengaluru": "Prateek is currently working at KPMG India in Bengaluru, Karnataka, India.",
        "bangalore": "Prateek is currently working at KPMG India in Bengaluru, Karnataka, India.",
        "kpmg": "Prateek currently works as a Sr. AI Developer at KPMG India (since May 2024), where he creates automation workflows, leads AI & Data teams, and contributes to product development for Risk Advisory Center of Excellence.",
        "dataevolve": "At Dataevolve Solutions (May 2023 - April 2024), Prateek worked as a Machine Learning Engineer, building computational solutions for AirID-Check (DigiYatra) and developing POCs for real-time face recognition for government services.",
        "konverge": "At Konverge.AI (July 2022 - March 2023), Prateek worked as a Data Science Engineer and developed a solution for Text-2-Video synthesis using GAN Models.",
        "curtin": "Prateek worked as a Research Scholar at Curtin University, Malaysia (September 2021 - January 2022).",
        "resume": "Prateek's resume highlights his experience as an AI Developer focused on Aviation, Healthcare, Finance, and the Public Sector, with skills in Machine Learning, Computer Vision, Deep Learning, Python, NLP, and more. Download it from the portfolio homepage.",
        "cv": "Prateek's resume highlights his experience as an AI Developer. You can download it from the portfolio homepage.",
        
        // Polite responses
        "thanks": "You're welcome! Feel free to ask if you have any other questions about Prateek's work, projects, or tutorials.",
        "thank you": "You're welcome! Feel free to ask if you have any other questions about Prateek's work, projects, or tutorials.",
        "bye": "Goodbye! Feel free to come back if you have more questions about Prateek's portfolio.",
        "goodbye": "Goodbye! Feel free to come back if you have more questions about Prateek's portfolio."
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
        const lowerMessage = message.toLowerCase().trim();
        
        // Remove common punctuation and extra spaces
        const cleanMessage = lowerMessage.replace(/[^\w\s]/g, ' ').replace(/\s+/g, ' ');
        
        // Check for keyword matches with priority order
        let foundResponse = false;
        let bestMatch = null;
        let bestMatchLength = 0;
        
        // Priority 1: Exact phrase matches (longer phrases first)
        const sortedKeywords = Object.keys(keywordResponses).sort((a, b) => b.length - a.length);
        
        for (const keyword of sortedKeywords) {
            // Check for exact phrase match or word boundary match
            const keywordLower = keyword.toLowerCase();
            // Escape special regex characters but allow . in keywords like "shambhu.ai"
            const escapedKeyword = keywordLower.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            // Use word boundary for multi-word keywords, but allow partial matches for single words
            let regex;
            if (keywordLower.includes(' ')) {
                regex = new RegExp(`\\b${escapedKeyword}\\b`, 'i');
            } else {
                // For single words, match as whole word or as part of a compound (like shambhu.ai)
                regex = new RegExp(`\\b${escapedKeyword}\\b|${escapedKeyword}(?=\\.|\\s|$)`, 'i');
            }
            
            if (cleanMessage.includes(keywordLower) || regex.test(cleanMessage)) {
                // Prefer longer, more specific matches
                if (keyword.length > bestMatchLength) {
                    bestMatch = keywordResponses[keyword];
                    bestMatchLength = keyword.length;
                    foundResponse = true;
                }
            }
        }
        
        // Priority 2: Special handling for compound queries (only if no good match found)
        if (!foundResponse) {
            // Check for multiple keywords that might indicate a specific topic
            const words = cleanMessage.split(/\s+/);
            
            // Project name patterns
            if ((words.includes('shambhu') || words.includes('shambhi')) && (words.includes('ai') || words.includes('project') || words.includes('code'))) {
                bestMatch = botResponses.shambhu;
                foundResponse = true;
            } else if ((words.includes('calculas') || words.includes('calculus')) && (words.includes('ai') || words.includes('math') || words.includes('solver'))) {
                bestMatch = botResponses.calculas;
                foundResponse = true;
            } else if ((words.includes('dataorbit') || (words.includes('data') && words.includes('orbit'))) && words.includes('ai')) {
                bestMatch = botResponses.dataorbit;
                foundResponse = true;
            } else if ((words.includes('nutri') || words.includes('nutrition')) && (words.includes('weaver') || words.includes('recommendation') || words.includes('food'))) {
                bestMatch = botResponses.nutriweaver;
                foundResponse = true;
            } else if ((words.includes('insightful') || (words.includes('rag') && words.includes('web'))) && (words.includes('url') || words.includes('question'))) {
                bestMatch = botResponses.insightful;
                foundResponse = true;
            } else if ((words.includes('verbalize') || words.includes('speech')) && (words.includes('recognition') || words.includes('text') || words.includes('transcribe'))) {
                bestMatch = botResponses.verbalize;
                foundResponse = true;
            } else if ((words.includes('medbot') || (words.includes('med') && words.includes('bot'))) && (words.includes('health') || words.includes('medical'))) {
                bestMatch = botResponses.medbot;
                foundResponse = true;
            } else if ((words.includes('rag') || words.includes('retrieval')) && (words.includes('augmented') || words.includes('knowledge') || words.includes('workflow'))) {
                bestMatch = botResponses.rag;
                foundResponse = true;
            } else if (words.includes('agentic') && words.includes('ai')) {
                bestMatch = botResponses.agentic_ai;
                foundResponse = true;
            } else if ((words.includes('explainable') || words.includes('xai')) && words.includes('ai')) {
                bestMatch = botResponses.xai;
                foundResponse = true;
            } else if (words.includes('neural') && (words.includes('network') || words.includes('learning'))) {
                bestMatch = botResponses.neural_networks;
                foundResponse = true;
            } else if (words.includes('prompt') && (words.includes('engineering') || words.includes('optimization'))) {
                bestMatch = botResponses.prompt_engineering;
                foundResponse = true;
            }
        }
        
        // Priority 3: Check for question patterns and specific queries
        if (!foundResponse) {
            const words = cleanMessage.split(/\s+/);
            
            // Experience-related questions
            if ((cleanMessage.includes('total experience') || cleanMessage.includes('years of experience') || 
                 cleanMessage.includes('how much experience') || cleanMessage.includes('experience of')) && 
                (cleanMessage.includes('prateek') || cleanMessage.includes('he') || cleanMessage.includes('his') || words.length < 8)) {
                bestMatch = "Prateek has approximately 3+ years of working experience as an AI Machine Learning Engineer & Data Scientist. He started his career in 2021 and has worked at multiple companies including KPMG India, Dataevolve Solutions, Konverge.AI, and Curtin University Malaysia.";
                foundResponse = true;
            }
            // What does X do questions
            else if (cleanMessage.includes('what does') || cleanMessage.includes('what is') || cleanMessage.includes('what do')) {
                // Check for specific projects/products
                if (words.includes('shambhu') || words.includes('shambhi') || cleanMessage.includes('shambhu.ai')) {
                    bestMatch = botResponses.shambhu;
                    foundResponse = true;
                } else if (words.includes('calculas') || words.includes('calculus') || cleanMessage.includes('calculas.ai')) {
                    bestMatch = botResponses.calculas;
                    foundResponse = true;
                } else if (words.includes('dataorbit') || cleanMessage.includes('dataorbit.ai')) {
                    bestMatch = botResponses.dataorbit;
                    foundResponse = true;
                } else if (words.includes('nutriweaver') || words.includes('nutri') && words.includes('weaver')) {
                    bestMatch = botResponses.nutriweaver;
                    foundResponse = true;
                } else if (words.includes('insightful')) {
                    bestMatch = botResponses.insightful;
                    foundResponse = true;
                } else if (words.includes('verbalize')) {
                    bestMatch = botResponses.verbalize;
                    foundResponse = true;
                } else if (words.includes('medbot') || (words.includes('med') && words.includes('bot'))) {
                    bestMatch = botResponses.medbot;
                    foundResponse = true;
                } else if (cleanMessage.includes('prateek') || cleanMessage.includes('he') || cleanMessage.includes('his')) {
                    bestMatch = botResponses.about;
                    foundResponse = true;
                } else if (cleanMessage.includes('project')) {
                    bestMatch = botResponses.projects;
                    foundResponse = true;
                } else if (cleanMessage.includes('skill')) {
                    bestMatch = botResponses.skills;
                    foundResponse = true;
                } else if (cleanMessage.includes('experience') || cleanMessage.includes('work')) {
                    bestMatch = botResponses.experience;
                    foundResponse = true;
                }
            }
            // What questions (general)
            else if (cleanMessage.startsWith('what') || cleanMessage.startsWith('tell me about')) {
                if (cleanMessage.includes('prateek') || cleanMessage.includes('he') || cleanMessage.includes('his')) {
                    bestMatch = botResponses.about;
                    foundResponse = true;
                } else if (cleanMessage.includes('project')) {
                    bestMatch = botResponses.projects;
                    foundResponse = true;
                } else if (cleanMessage.includes('skill')) {
                    bestMatch = botResponses.skills;
                    foundResponse = true;
                } else if (cleanMessage.includes('experience') || cleanMessage.includes('work')) {
                    bestMatch = botResponses.experience;
                    foundResponse = true;
                }
            }
            // How questions
            else if (cleanMessage.startsWith('how')) {
                if (cleanMessage.includes('contact') || cleanMessage.includes('reach')) {
                    bestMatch = botResponses.contact;
                    foundResponse = true;
                } else if (cleanMessage.includes('much') && (cleanMessage.includes('experience') || cleanMessage.includes('year'))) {
                    bestMatch = "Prateek has approximately 3+ years of working experience as an AI Machine Learning Engineer & Data Scientist. He started his career in 2021 and has worked at multiple companies including KPMG India, Dataevolve Solutions, Konverge.AI, and Curtin University Malaysia.";
                    foundResponse = true;
                }
            }
            // Where questions
            else if (cleanMessage.startsWith('where')) {
                if (cleanMessage.includes('work') || cleanMessage.includes('location')) {
                    bestMatch = botResponses.contact;
                    foundResponse = true;
                }
            }
            // Simple project name mentions (even without question words)
            else if (words.includes('shambhu') || words.includes('shambhi') || cleanMessage.includes('shambhu.ai') || cleanMessage.includes('shambhu ai')) {
                bestMatch = botResponses.shambhu;
                foundResponse = true;
            } else if (words.includes('calculas') || cleanMessage.includes('calculas.ai')) {
                bestMatch = botResponses.calculas;
                foundResponse = true;
            } else if (words.includes('dataorbit') || cleanMessage.includes('dataorbit.ai')) {
                bestMatch = botResponses.dataorbit;
                foundResponse = true;
            }
        }
        
        // Use the best match found, or fallback
        if (foundResponse && bestMatch) {
            addBotMessage(bestMatch);
        } else {
            // Enhanced fallback with suggestions
            const suggestions = "Here are some things you can ask about:\n• Projects: Shambhu.AI, Calculas.AI, DataOrbit.AI, Insightful, etc.\n• Tutorials: RAG, Agentic AI, Neural Networks, XAI, etc.\n• Skills: Machine Learning, Deep Learning, Computer Vision, etc.\n• Experience: KPMG, Dataevolve, Konverge.AI\n• Contact information\n\nWhat would you like to know?";
            addBotMessage(botResponses.fallback + "\n\n" + suggestions);
        }
    }

    // Scroll to the bottom of the chat content
    function scrollToBottom() {
        chatContent.scrollTop = chatContent.scrollHeight;
    }
});
