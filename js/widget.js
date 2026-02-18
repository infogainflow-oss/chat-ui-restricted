// Chatbot Widget Class
class ChatbotWidget {
    constructor() {
        this.isOpen = false;
        this.cookiesAccepted = false;
        this.hasRecentConversation = false;
        this.messages = [];
        this.currentSessionId = null;
        this.selectedLanguage = null; // Track selected language
        this.uniqueBrowserId = null; // Persistent unique ID per browser
        this.awaitingInitialInquiry = true; // Track if waiting for first message in session
        this.currentTab = null; // Track which tab the chat was opened from
        this.selectedFile = null; // Track selected file for upload
        this.currentTab = null; // Track which tab the chat was opened from
        this.selectedFile = null; // Track selected file for upload
        this.selectedVoiceMessage = null; // Track recorded voice message

        // Cooldown settings
        this.lastMessageTime = 0;
        this.cooldownMs = 1000; // 1 second

        // Awaiting response flag - prevents sending while waiting for response
        this.isAwaitingResponse = false;

        // Webhook configuration - Replace with your n8n webhook URL
        this.webhookUrl = 'https://n8n.tutario.click/webhook/chatbot-hybrid';
        this.sessionRetrievalWebhookUrl = 'https://n8n.tutario.click/webhook/session-retrieval';
        this.chatRetrievalWebhookUrl = 'https://n8n.tutario.click/webhook/chat-retrieval';

        // Language translations
        this.translations = {
            en: {
                selectLanguage: 'Select Language',
                selectLanguageDesc: 'Please choose your preferred language',
                english: 'English',
                german: 'German',
                greeting: 'Sophia',
                greetingDesc: 'Your personal Tutario health expert.',
                askQuestion: 'Ask a question',
                createTicket: 'Create a Ticket',
                bookCall: 'Book a Call',
                home: 'Home',
                chats: 'Chats',
                faq: 'FAQ',
                newChat: 'New Chat',
                continueConversation: 'Continue recent conversation',
                minutesAgo: 'minutes ago',
                typeMessage: 'Type your message...',
                waitingForResponse: 'Waiting for response...',
                autoGreeting: 'Welcome to Tutario! 👋 I am here to help navigate your health insurance needs. What are you looking for right now?',
                option1: 'Switch Private Insurance Tariff',
                option2: 'I am Currently Uninsured',
                option3: 'Need Coverage Abroad',
                option4: 'Private Status in G-KV',
                option5: 'Cheaper Insurance Alternative',
                errorMessage: 'Sorry, chatbot is not available at this moment. Book a meeting or raise a ticket',
                bookMeeting: 'Book a Meeting',
                raiseTicket: 'Raise a Ticket',
                faq1Question: 'What services do you offer?',
                faq1Answer: 'We offer a wide range of health insurance plans including statutory, private, and international health insurance tailored to your needs.',
                faq2Question: 'How can I file a claim?',
                faq2Answer: 'You can file a claim directly through our portal or by contacting our support team via chat or email.',
                faq3Question: 'What are your support hours?',
                faq3Answer: 'Our support team is available Mon-Fri from 9 AM to 6 PM CET. Our chatbot is available 24/7.',
                // Hero section translations
                heroTitle: 'Hello!<br>How can we help?',
                heroSubtitle: 'Ask us anything about your health insurance.',
                // Action card translations
                getQuoteTitle: 'Get a Quote',
                getQuoteDesc: 'Find the perfect plan',
                createTicketTitle: 'Create a Ticket',
                bookMeetingTitle: 'Book a Meeting',
                // Sessions list
                loadingSessions: 'Loading sessions...',
                noConversations: 'No previous conversations found.',
                errorLoadingSessions: 'Error loading sessions. Please try again later.',
                // Cookie consent
                cookieMessage: 'We use cookies to enhance your experience. Do you accept our cookies?',
                acceptCookies: 'Accept',
                declineCookies: 'Decline',
                consentNotice: 'By selecting a language, you consent to the use of cookies for this chat session.'
            },
            de: {
                selectLanguage: 'Sprache wählen',
                selectLanguageDesc: 'Bitte wählen Sie Ihre bevorzugte Sprache',
                english: 'Englisch',
                german: 'Deutsch',
                greeting: 'Sophia',
                greetingDesc: 'Ihre persönliche Tutario Gesundheitsexpertin.',
                askQuestion: 'Eine Frage stellen',
                createTicket: 'Ticket erstellen',
                bookCall: 'Anruf buchen',
                home: 'Startseite',
                chats: 'Chats',
                faq: 'FAQ',
                newChat: 'Neuer Chat',
                continueConversation: 'Letzte Unterhaltung fortsetzen',
                minutesAgo: 'Minuten her',
                typeMessage: 'Geben Sie Ihre Nachricht ein...',
                waitingForResponse: 'Warten auf Antwort...',
                autoGreeting: 'Willkommen bei Tutario! 👋 Ich helfe Ihnen gerne bei Ihren Fragen zur Krankenversicherung. Wonach suchen Sie gerade?',
                option1: 'PKV-Tarifwechsel',
                option2: 'Ich bin derzeit unversichert',
                option3: 'Auslandsversicherung benötigt',
                option4: 'Privatstatus in der GKV',
                option5: 'Günstigere Versicherungsalternative',
                errorMessage: 'Entschuldigung, der Chatbot ist derzeit nicht verfügbar. Buchen Sie ein Meeting oder erstellen Sie ein Ticket',
                bookMeeting: 'Meeting buchen',
                raiseTicket: 'Ticket erstellen',
                faq1Question: 'Welche Dienstleistungen bieten Sie an?',
                faq1Answer: 'Wir bieten eine breite Palette an Krankenversicherungen an, darunter gesetzliche, private und internationale Krankenversicherungen, die auf Ihre Bedürfnisse zugeschnitten sind.',
                faq2Question: 'Wie kann ich einen Antrag einreichen?',
                faq2Answer: 'Sie können einen Antrag direkt über unser Portal einreichen oder unser Support-Team per Chat oder E-Mail kontaktieren.',
                faq3Question: 'Wie sind Ihre Supportzeiten?',
                faq3Answer: 'Unser Support-Team ist von Mo-Fr von 9 bis 18 Uhr MEZ erreichbar. Unser Chatbot ist rund um die Uhr verfügbar.',
                // Hero section translations
                heroTitle: 'Hallo!<br>Wie können wir helfen?',
                heroSubtitle: 'Fragen Sie uns alles zu Ihrer Krankenversicherung.',
                // Action card translations
                getQuoteTitle: 'Angebot erhalten',
                getQuoteDesc: 'Den perfekten Tarif finden',
                createTicketTitle: 'Ticket erstellen',
                bookMeetingTitle: 'Termin buchen',
                // Sessions list
                loadingSessions: 'Sitzungen werden geladen...',
                noConversations: 'Keine früheren Unterhaltungen gefunden.',
                errorLoadingSessions: 'Fehler beim Laden der Sitzungen. Bitte versuchen Sie es später erneut.',
                // Cookie consent
                cookieMessage: 'Wir verwenden Cookies, um Ihre Erfahrung zu verbessern. Akzeptieren Sie unsere Cookies?',
                acceptCookies: 'Akzeptieren',
                declineCookies: 'Ablehnen',
                consentNotice: 'Mit der Auswahl einer Sprache stimmen Sie der Verwendung von Cookies für diese Chat-Sitzung zu.'
            }
        };

        // Initialize hidden date picker
        // Deprecated - using native date input
        // this.initDatePicker();

        this.init();
    }

    init() {
        this.activeInputMode = null; // No input allowed by default until backend sets mode
        this.bindEvents();
        this.checkCookieConsent();
        // Defer loading conversation, language, and unique ID until consent is checked/granted.
        // this.loadRecentConversation(); // Moved to after consent
        // this.loadLanguagePreference(); // Moved to after consent
        // this.loadOrGenerateUniqueId(); // Moved to after consent
        // this.updateUILanguage(); // Moved to after consent
        // this.autoOpenChatbot(); // Moved to after consent

        // Initial state: Show language launcher (since chat is closed)
        this.toggleLanguageLauncher(true);
    }

    // initDatePicker deprecated and removed

    loadOrGenerateUniqueId() {
        // Try to load existing unique ID from localStorage
        let uniqueId = localStorage.getItem('chatbot-unique-id');

        // If none exists, generate a new one and save it
        if (!uniqueId) {
            uniqueId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('chatbot-unique-id', uniqueId);
        }

        this.uniqueBrowserId = uniqueId;
        return uniqueId;
    }

    autoOpenChatbot() {
        // Auto-open chatbot after 1.5 seconds, regardless of cookie consent
        setTimeout(() => {
            if (!this.isOpen) {
                this.toggleChat();
            } else {
            }
        }, 1500); // 1.5 seconds delay
    }

    loadLanguagePreference() {
        const savedLanguage = localStorage.getItem('chatbot-language');
        if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'de')) {
            this.selectedLanguage = savedLanguage;
        } else {
            // Default to English if no valid language is saved
            this.selectedLanguage = 'en';
        }
    }

    saveLanguagePreference(language) {
        // Ensure language is valid ('en' or 'de')
        if (language !== 'en' && language !== 'de') {
            console.warn('Invalid language:', language, 'defaulting to en');
            language = 'en';
        }
        this.selectedLanguage = language;
        localStorage.setItem('chatbot-language', language);
        this.updateUILanguage();
    }

    updateUILanguage() {
        // Default to English if no language is selected
        if (!this.selectedLanguage) {
            this.selectedLanguage = 'en';
        }

        const t = this.translations[this.selectedLanguage];
        if (!t) {
            console.warn('Invalid language translations, defaulting to English');
            this.selectedLanguage = 'en';
            return;
        }

        // Update header
        const headerTitle = document.querySelector('.greeting-text h3');
        const headerDesc = document.querySelector('.greeting-text p');
        if (headerTitle) headerTitle.textContent = t.greeting;
        if (headerDesc) headerDesc.textContent = t.greetingDesc;

        // Update profile status in header
        const profileStatus = document.querySelector('.profile-status');
        if (profileStatus) profileStatus.textContent = t.greetingDesc;

        // Update top action buttons
        const createTicketBtn = document.querySelector('#chatbot-create-ticket span:last-child');
        const bookCallBtn = document.querySelector('#chatbot-book-call span:last-child');
        if (createTicketBtn) createTicketBtn.textContent = t.createTicket;
        if (bookCallBtn) bookCallBtn.textContent = t.bookCall;

        // Update buttons
        const askQuestionBtn = document.querySelector('#chatbot-ask-question span');
        const newChatBtn = document.querySelector('#chatbot-new-chat span');
        if (askQuestionBtn) askQuestionBtn.textContent = t.askQuestion;
        if (newChatBtn) newChatBtn.textContent = t.newChat;

        // Update navigation
        const navHome = document.querySelector('#nav-home span');
        const navChats = document.querySelector('#nav-chats span');
        const navFaq = document.querySelector('#nav-faq span');
        if (navHome) navHome.textContent = t.home;
        if (navChats) navChats.textContent = t.chats;
        if (navFaq) navFaq.textContent = t.faq || 'FAQ';

        // Update input placeholders
        const chatInput = document.getElementById('chatbot-chat-input');
        const chatsInput = document.getElementById('chats-chat-input');
        if (chatInput) chatInput.placeholder = t.typeMessage;
        if (chatsInput) chatsInput.placeholder = t.typeMessage;

        // Update continue conversation button if visible
        const continueBtn = document.querySelector('#chatbot-continue-conversation .conversation-preview h4');
        if (continueBtn) {
            continueBtn.textContent = t.continueConversation;
        }

        // Update FAQ questions and answers
        const faq1Question = document.querySelector('[data-faq-question="1"]');
        const faq1Answer = document.querySelector('[data-faq-answer="1"]');
        const faq2Question = document.querySelector('[data-faq-question="2"]');
        const faq2Answer = document.querySelector('[data-faq-answer="2"]');
        const faq3Question = document.querySelector('[data-faq-question="3"]');
        const faq3Answer = document.querySelector('[data-faq-answer="3"]');

        if (faq1Question) faq1Question.textContent = t.faq1Question;
        if (faq1Answer) faq1Answer.textContent = t.faq1Answer;
        if (faq2Question) faq2Question.textContent = t.faq2Question;
        if (faq2Answer) faq2Answer.textContent = t.faq2Answer;
        if (faq3Question) faq3Question.textContent = t.faq3Question;
        if (faq3Answer) faq3Answer.textContent = t.faq3Answer;

        // Update Hero Section
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        if (heroTitle) heroTitle.innerHTML = t.heroTitle;
        if (heroSubtitle) heroSubtitle.textContent = t.heroSubtitle;

        // Update Action Cards
        const actionCards = document.querySelectorAll('.action-card');
        // Only one main action card now
        if (actionCards.length >= 1) {
            // Card 1: Get Quote
            const card1Title = actionCards[0].querySelector('.action-card-title');
            const card1Desc = actionCards[0].querySelector('.action-card-desc');
            if (card1Title) card1Title.textContent = t.getQuoteTitle;
            if (card1Desc) card1Desc.textContent = t.getQuoteDesc;
        }

        // Update Small Action Cards
        const createTicketCard = document.getElementById('create-ticker-btn');
        const bookMeetingCard = document.getElementById('book-meeting-btn');

        if (createTicketCard) {
            const title = createTicketCard.querySelector('.action-card-title-small');
            if (title) title.textContent = t.createTicketTitle;
        }

        if (bookMeetingCard) {
            const title = bookMeetingCard.querySelector('.action-card-title-small');
            if (title) title.textContent = t.bookMeetingTitle;
        }

        // Update Sessions List
        const sessionsLoading = document.querySelector('#sessions-loading span');
        const sessionsEmpty = document.querySelector('#sessions-empty p');
        const sessionsError = document.querySelector('#sessions-error p');
        if (sessionsLoading) sessionsLoading.textContent = t.loadingSessions;
        if (sessionsEmpty) sessionsEmpty.textContent = t.noConversations;
        if (sessionsError) sessionsError.textContent = t.errorLoadingSessions;

        // Update Cookie Consent
        const cookieMessage = document.querySelector('#chatbot-cookie-consent .cookie-content p');
        const acceptBtn = document.getElementById('chatbot-accept-cookies');
        const declineBtn = document.getElementById('chatbot-decline-cookies');
        if (cookieMessage) cookieMessage.textContent = t.cookieMessage;
        if (acceptBtn) acceptBtn.textContent = t.acceptCookies;
        if (declineBtn) declineBtn.textContent = t.declineCookies;

        // Update Language Modal consent notice
        const consentNotice = document.querySelector('.consent-notice');
        if (consentNotice) consentNotice.textContent = t.consentNotice;

        // Update header language flag
        this.updateHeaderLanguageFlag();
    }

    showLanguageModal() {
        const chatPopup = document.getElementById('chatbot-chat-popup');

        // Create language modal if it doesn't exist
        let languageModal = document.getElementById('language-modal');
        if (!languageModal) {
            languageModal = document.createElement('div');
            languageModal.id = 'language-modal';
            languageModal.className = 'language-modal';

            const t = this.translations.en; // Default to English for modal

            languageModal.innerHTML = `
                        <h2>${t.selectLanguage}</h2>
                        <p>${t.selectLanguageDesc}</p>
                        <div class="language-buttons">
                            <button class="language-btn" data-lang="en">
                                <span class="language-flag">🇬🇧</span>
                                <span>English</span>
                            </button>
                            <button class="language-btn" data-lang="de">
                                <span class="language-flag">🇩🇪</span>
                                <span>Deutsch</span>
                            </button>
                        </div>
                        <p class="privacy-notice">By selecting a language, you consent to our use of cookies to enhance your experience.</p>
                    `;

            chatPopup.appendChild(languageModal);

            // Add event listeners to language buttons
            const languageButtons = languageModal.querySelectorAll('.language-btn');
            languageButtons.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const lang = e.currentTarget.getAttribute('data-lang');
                    this.selectLanguage(lang);
                });
            });
        }

        languageModal.classList.remove('hidden');
    }

    hideLanguageModal() {
        const languageModal = document.getElementById('language-modal');
        if (languageModal) {
            languageModal.classList.add('hidden');
        }
    }

    selectLanguage(language) {

        // Text says "By selecting a language you consent...", so we must enforce that.
        if (!this.cookiesAccepted) {
            this.acceptCookies();
        }

        this.saveLanguagePreference(language);

        // Update the header language flag
        this.updateHeaderLanguageFlag();

        // Generate a new session ID when language is selected to ensure fresh session
        this.generateNewSessionId();

        this.hideLanguageModal();

        // Always start a new chat when language is changed
        const currentTab = document.querySelector('.tab-content.active');
        if (currentTab && currentTab.id === 'home-tab') {
            this.startChat();
        } else {
            this.startChatsChat();
        }
    }

    updateHeaderLanguageFlag() {
        const langElement = document.querySelector('.current-lang-text');
        if (langElement) {
            langElement.textContent = this.selectedLanguage === 'de' ? 'DE' : 'EN';
        }
    }

    bindEvents() {
        // Chat button toggle
        const chatButton = document.getElementById('chatbot-chat-button');
        const chatPopup = document.getElementById('chatbot-chat-popup');
        const closeButton = document.getElementById('chatbot-close-chat');
        const backButton = document.getElementById('chatbot-back-button');

        if (chatButton) {
            // Click event for desktop
            chatButton.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleChat();
            });

            // Touch event for better mobile responsiveness
            let touchStartTime = 0;
            chatButton.addEventListener('touchstart', (e) => {
                touchStartTime = Date.now();
            }, { passive: true });

            chatButton.addEventListener('touchend', (e) => {
                // Only trigger if it's a quick tap (not a long press or scroll)
                const touchDuration = Date.now() - touchStartTime;
                if (touchDuration < 300) {
                    e.preventDefault();
                    e.stopPropagation();
                    this.toggleChat();
                }
            });
        }
        if (closeButton) {
            closeButton.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.closeChat();
            });
        }
        if (backButton) {
            backButton.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.goBack();
            });
        }

        // Language switch button in header
        const languageSwitchBtn = document.getElementById('chatbot-language-switch');
        if (languageSwitchBtn) {
            languageSwitchBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.showLanguageModal();
            });
        }

        // Language Launcher Buttons (Floating)
        const launcherBtns = document.querySelectorAll('.launcher-btn');
        launcherBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const lang = btn.getAttribute('data-lang');

                // Select language
                this.selectLanguage(lang);

                // Open chat
                if (!this.isOpen) {
                    this.toggleChat();
                }
            });
        });

        // Option buttons
        const askQuestionBtn = document.getElementById('chatbot-ask-question');
        const continueConversationBtn = document.getElementById('chatbot-continue-conversation');
        const newChatBtn = document.getElementById('chatbot-new-chat');

        if (askQuestionBtn) {
            askQuestionBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.startChat();
            });
        }
        if (continueConversationBtn) {
            continueConversationBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.continueConversation();
            });
        }
        if (newChatBtn) {
            newChatBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.startNewChat();
            });
        }

        // Top action buttons
        const createTicketBtn = document.getElementById('chatbot-create-ticket');
        const bookCallBtn = document.getElementById('chatbot-book-call');

        if (createTicketBtn) {
            createTicketBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.handleCreateTicket();
            });
        }
        if (bookCallBtn) {
            bookCallBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.handleBookCall();
            });
        }

        // New small action card buttons
        const createTickerBtnSmall = document.getElementById('create-ticker-btn');
        const bookMeetingBtnSmall = document.getElementById('book-meeting-btn');

        if (createTickerBtnSmall) {
            createTickerBtnSmall.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.handleCreateTicket();
            });
        }
        if (bookMeetingBtnSmall) {
            bookMeetingBtnSmall.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.handleBookCall();
            });
        }

        // Chat interface
        const sendButton = document.getElementById('chatbot-send-button');
        const chatInput = document.getElementById('chatbot-chat-input');

        if (sendButton) {
            sendButton.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.sendMessage();
            });
        }
        if (chatInput) {
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.sendMessage();
                }
            });
        }

        // Chats tab chat interface
        const chatsSendButton = document.getElementById('chats-send-button');
        const chatsInput = document.getElementById('chats-chat-input');

        if (chatsSendButton) {
            chatsSendButton.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.sendChatsMessage();
            });
        }
        if (chatsInput) {
            chatsInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.sendChatsMessage();
                }
            });
        }

        // Navigation buttons
        const navHome = document.getElementById('nav-home');
        const navChats = document.getElementById('nav-chats');

        if (navHome) {
            navHome.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.switchTab('home');
            });
        }
        if (navChats) {
            navChats.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.switchTab('chats');
            });
        }

        const navFaq = document.getElementById('nav-faq');
        if (navFaq) {
            navFaq.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.switchTab('faq');
            });
        }

        // FAQ Item toggle
        const faqQuestions = document.querySelectorAll('.faq-question');
        faqQuestions.forEach(question => {
            question.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const item = question.parentElement;
                // Close other items
                document.querySelectorAll('.faq-item').forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                // Toggle current item
                item.classList.toggle('active');
            });
        });

        // Scroll to bottom buttons
        const scrollToBottomBtn = document.getElementById('chatbot-scroll-to-bottom');
        const chatsScrollToBottomBtn = document.getElementById('chats-scroll-to-bottom');

        // Scroll to top buttons
        const scrollToTopBtn = document.getElementById('chatbot-scroll-to-top');
        const chatsScrollToTopBtn = document.getElementById('chats-scroll-to-top');

        if (scrollToBottomBtn) {
            scrollToBottomBtn.addEventListener('click', () => this.scrollToBottom('chatbot-chat-messages'));
        }
        if (chatsScrollToBottomBtn) {
            chatsScrollToBottomBtn.addEventListener('click', () => this.scrollToBottom('chats-chat-messages'));
        }
        if (scrollToTopBtn) {
            scrollToTopBtn.addEventListener('click', () => this.scrollToTop('chatbot-chat-messages'));
        }
        if (chatsScrollToTopBtn) {
            chatsScrollToTopBtn.addEventListener('click', () => this.scrollToTop('chats-chat-messages'));
        }

        // Setup scroll listeners for chat messages
        const chatMessages = document.getElementById('chatbot-chat-messages');
        const chatsMessages = document.getElementById('chats-chat-messages');

        if (chatMessages) {
            chatMessages.addEventListener('scroll', () => this.handleScroll('chatbot-chat-messages', 'chatbot-scroll-to-bottom', 'chatbot-scroll-to-top'));
        }
        if (chatsMessages) {
            chatsMessages.addEventListener('scroll', () => this.handleScroll('chats-chat-messages', 'chats-scroll-to-bottom', 'chats-scroll-to-top'));
        }

        // Cookie consent - use inline onclick handlers for maximum reliability
        const self = this;

        // Function to setup cookie button listeners
        const setupCookieButtons = () => {
            const acceptCookies = document.getElementById('chatbot-accept-cookies');
            const declineCookies = document.getElementById('chatbot-decline-cookies');

            if (acceptCookies) {
                acceptCookies.onclick = function (e) {
                    if (e) {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                    self.acceptCookies();
                    return false;
                };
                // Also add event listener as backup
                acceptCookies.addEventListener('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    self.acceptCookies();
                    return false;
                }, true);
            }

            if (declineCookies) {
                declineCookies.onclick = function (e) {
                    if (e) {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                    self.declineCookies();
                    return false;
                };
                // Also add event listener as backup
                declineCookies.addEventListener('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    self.declineCookies();
                    return false;
                }, true);
            }
        };

        // Setup immediately
        setupCookieButtons();

        // Also setup after a short delay to ensure DOM is ready
        setTimeout(setupCookieButtons, 500);

        // Close chat when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isOpen && chatPopup && chatButton) {
                if (!chatPopup.contains(e.target) && !chatButton.contains(e.target)) {
                    this.closeChat();
                }
            }
        });

        // ==========================================
        // ACCESSIBILITY: Keyboard Navigation
        // ==========================================

        // Escape key to close widget
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                e.preventDefault();
                this.closeChat();
                // Return focus to chat button
                if (chatButton) chatButton.focus();
            }
        });

        // Focus trap inside popup when open
        if (chatPopup) {
            chatPopup.addEventListener('keydown', (e) => {
                if (e.key === 'Tab') {
                    const focusableElements = chatPopup.querySelectorAll(
                        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                    );
                    const firstElement = focusableElements[0];
                    const lastElement = focusableElements[focusableElements.length - 1];

                    if (e.shiftKey && document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    } else if (!e.shiftKey && document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            });
        }

        // ==========================================
        // MOBILE: Swipe Gestures
        // ==========================================

        let touchStartX = 0;
        let touchStartY = 0;
        let touchEndX = 0;
        let touchEndY = 0;

        const handleSwipeGesture = () => {
            const deltaX = touchEndX - touchStartX;
            const deltaY = touchEndY - touchStartY;
            const minSwipeDistance = 80;

            // Only trigger if horizontal swipe is dominant
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
                if (deltaX > 0) {
                    // Swipe right - go back
                    const homeChatInterface = document.getElementById('chatbot-chat-interface');
                    const chatsChatInterface = document.getElementById('chats-chat-interface');

                    if ((homeChatInterface && homeChatInterface.style.display !== 'none') ||
                        (chatsChatInterface && chatsChatInterface.style.display !== 'none')) {
                        this.goBack();
                    }
                }
            }
        };

        // Add touch listeners to chat interfaces
        const chatContainers = [
            document.getElementById('chatbot-chat-interface'),
            document.getElementById('chats-chat-interface')
        ];

        chatContainers.forEach(container => {
            if (container) {
                container.addEventListener('touchstart', (e) => {
                    touchStartX = e.changedTouches[0].screenX;
                    touchStartY = e.changedTouches[0].screenY;
                }, { passive: true });

                container.addEventListener('touchend', (e) => {
                    touchEndX = e.changedTouches[0].screenX;
                    touchEndY = e.changedTouches[0].screenY;
                    handleSwipeGesture();
                }, { passive: true });
            }
        });

        // ==========================================
        // PULL TO REFRESH: Chats Tab
        // ==========================================

        let pullStartY = 0;
        let isPulling = false;
        const pullThreshold = 80;

        const chatsContent = document.querySelector('.chats-content');
        if (chatsContent) {
            chatsContent.addEventListener('touchstart', (e) => {
                if (chatsContent.scrollTop === 0) {
                    pullStartY = e.touches[0].clientY;
                    isPulling = true;
                }
            }, { passive: true });

            chatsContent.addEventListener('touchmove', (e) => {
                if (!isPulling) return;
                const currentY = e.touches[0].clientY;
                const pullDistance = currentY - pullStartY;

                if (pullDistance > 0 && pullDistance < pullThreshold * 2) {
                    // Visual feedback could be added here
                }
            }, { passive: true });

            chatsContent.addEventListener('touchend', (e) => {
                if (!isPulling) return;
                const pullDistance = e.changedTouches[0].clientY - pullStartY;

                if (pullDistance > pullThreshold) {
                    this.fetchSessions();
                }

                isPulling = false;
            }, { passive: true });
        }

        // ==========================================
        // ADD ARIA ATTRIBUTES
        // ==========================================

        if (chatPopup) {
            chatPopup.setAttribute('role', 'dialog');
            chatPopup.setAttribute('aria-modal', 'true');
            chatPopup.setAttribute('aria-label', 'Chat with Sophia');
        }

        if (chatMessages) {
            chatMessages.setAttribute('role', 'log');
            chatMessages.setAttribute('aria-live', 'polite');
            chatMessages.setAttribute('aria-label', 'Chat messages');
        }

        if (chatsMessages) {
            chatsMessages.setAttribute('role', 'log');
            chatsMessages.setAttribute('aria-live', 'polite');
            chatsMessages.setAttribute('aria-label', 'Chat history');
        }

        // ==========================================
        // FILE UPLOAD HANDLERS
        // ==========================================

        // Home tab file upload
        const chatbotAttachBtn = document.getElementById('chatbot-attachment-btn');
        const chatbotFileInput = document.getElementById('chatbot-file-input');
        const chatbotFilePreview = document.getElementById('chatbot-file-preview');
        const chatbotFileName = document.getElementById('chatbot-file-name');
        const chatbotRemoveFile = document.getElementById('chatbot-remove-file');

        if (chatbotAttachBtn && chatbotFileInput) {
            chatbotAttachBtn.addEventListener('click', () => chatbotFileInput.click());

            chatbotFileInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    this.selectedFile = file;
                    chatbotFileName.textContent = file.name;
                    chatbotFilePreview.style.display = 'flex';
                    this.showToast(`File selected: ${file.name}`);
                }
            });
        }

        if (chatbotRemoveFile) {
            chatbotRemoveFile.addEventListener('click', () => {
                this.selectedFile = null;
                chatbotFileInput.value = '';
                chatbotFilePreview.style.display = 'none';
            });
        }

        // Chats tab file upload
        const chatsAttachBtn = document.getElementById('chats-attachment-btn');
        const chatsFileInput = document.getElementById('chats-file-input');
        const chatsFilePreview = document.getElementById('chats-file-preview');
        const chatsFileName = document.getElementById('chats-file-name');
        const chatsRemoveFile = document.getElementById('chats-remove-file');

        if (chatsAttachBtn && chatsFileInput) {
            chatsAttachBtn.addEventListener('click', () => chatsFileInput.click());

            chatsFileInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    this.selectedFile = file;
                    chatsFileName.textContent = file.name;
                    chatsFilePreview.style.display = 'flex';
                    this.showToast(`File selected: ${file.name}`);
                }
            });
        }

        if (chatsRemoveFile) {
            chatsRemoveFile.addEventListener('click', () => {
                this.selectedFile = null;
                chatsFileInput.value = '';
                chatsFilePreview.style.display = 'none';
            });
        }

        // ==========================================
        // VOICE RECORDING HANDLERS
        // ==========================================

        this.mediaRecorder = null;
        this.audioChunks = [];
        this.recordingInterval = null;
        this.recordingSeconds = 0;

        const setupVoiceRecording = (voiceBtn, timerEl, inputEl) => {
            if (!voiceBtn) return;

            let currentStream = null;
            let isRecording = false;

            voiceBtn.addEventListener('click', async () => {

                if (isRecording && this.mediaRecorder && this.mediaRecorder.state === 'recording') {
                    // Stop recording
                    this.mediaRecorder.stop();
                    voiceBtn.classList.remove('recording');
                    timerEl.classList.remove('visible');
                    clearInterval(this.recordingInterval);
                    // Do NOT show input immediately, wait for onstop to handle "staged" state
                    isRecording = false;
                } else {
                    // Start recording
                    try {
                        // Check if getUserMedia is supported
                        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                            this.showToast('Voice recording is not supported in this browser');
                            console.error('getUserMedia not supported');
                            return;
                        }

                        // Request microphone access - this should trigger the browser dialog
                        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

                        currentStream = stream;
                        this.mediaRecorder = new MediaRecorder(stream);
                        this.audioChunks = [];

                        this.mediaRecorder.ondataavailable = (e) => {
                            this.audioChunks.push(e.data);
                        };

                        this.mediaRecorder.onstop = () => {
                            const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
                            this.selectedVoiceMessage = audioBlob;

                            if (currentStream) {
                                currentStream.getTracks().forEach(track => track.stop());
                                currentStream = null;
                            }
                            this.showToast('Voice message recorded - click send to send it');

                            // BLOCK INPUT and SHOW STAGED STATE
                            inputEl.style.display = 'block';
                            inputEl.disabled = true;
                            inputEl.value = '';
                            inputEl.placeholder = '🎤 Voice message recorded (Click Send)';
                            inputEl.classList.add('voice-staged');
                        };

                        this.mediaRecorder.start();
                        isRecording = true;
                        voiceBtn.classList.add('recording');
                        inputEl.style.display = 'none';

                        // Timer
                        this.recordingSeconds = 0;
                        timerEl.textContent = '0:00';
                        timerEl.classList.add('visible');

                        this.recordingInterval = setInterval(() => {
                            this.recordingSeconds++;
                            const mins = Math.floor(this.recordingSeconds / 60);
                            const secs = this.recordingSeconds % 60;
                            timerEl.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
                        }, 1000);

                        this.showToast('Recording... Click again to stop');

                    } catch (err) {
                        console.error('Microphone error:', err);
                        console.error('Error name:', err.name);
                        console.error('Error message:', err.message);

                        if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
                            this.showToast('Microphone permission denied. Please click the lock icon in your browser address bar and allow microphone access, then refresh.');
                        } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
                            this.showToast('No microphone found. Please connect a microphone and try again.');
                        } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
                            this.showToast('Microphone is in use by another application. Please close other apps using the microphone.');
                        } else if (err.name === 'OverconstrainedError') {
                            this.showToast('Microphone constraints could not be satisfied.');
                        } else if (err.name === 'TypeError') {
                            this.showToast('Voice recording requires HTTPS or localhost.');
                        } else {
                            this.showToast('Microphone error: ' + err.message);
                        }
                    }
                }
            });

            // Add visual hint
            voiceBtn.setAttribute('title', 'Click to start/stop voice recording');
        };

        // Setup for both tabs
        setupVoiceRecording(
            document.getElementById('chatbot-voice-btn'),
            document.getElementById('chatbot-recording-timer'),
            document.getElementById('chatbot-chat-input')
        );
        setupVoiceRecording(
            document.getElementById('chats-voice-btn'),
            document.getElementById('chats-recording-timer'),
            document.getElementById('chats-chat-input')
        );

        // ==========================================
        // MOBILE: Keyboard Detection & Viewport Handling
        // DISABLED: Per user request - UI should not move when keyboard opens
        // ==========================================

        /* Keyboard detection disabled - uncomment below if needed
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        if (isMobile && window.visualViewport) {
            const widget = document.getElementById('chatbot-widget');

            // Handle visualViewport resize (keyboard open/close)
            window.visualViewport.addEventListener('resize', () => {
                const viewportHeight = window.visualViewport.height;
                const windowHeight = window.innerHeight;
                const keyboardHeight = windowHeight - viewportHeight;

                // Update CSS custom property for keyboard height
                document.documentElement.style.setProperty('--keyboard-height', `${keyboardHeight}px`);

                // Add/remove keyboard-open class
                if (keyboardHeight > 100) {
                    widget.classList.add('keyboard-open');
                } else {
                    widget.classList.remove('keyboard-open');
                }
            });

            // Also handle scroll to keep viewport in sync
            window.visualViewport.addEventListener('scroll', () => {
                document.documentElement.style.setProperty('--viewport-offset-top', `${window.visualViewport.offsetTop}px`);
            });
        }

        // Fallback for iOS: Handle input focus/blur
        const allInputs = document.querySelectorAll('#chatbot-widget input[type="text"], #chatbot-widget textarea');
        allInputs.forEach(input => {
            input.addEventListener('focus', () => {
                const widget = document.getElementById('chatbot-widget');
                if (widget && isMobile) {
                    // Small delay to allow keyboard to appear
                    setTimeout(() => {
                        widget.classList.add('keyboard-open');
                        // Scroll input into view
                        input.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }, 300);
                }
            });

            input.addEventListener('blur', () => {
                const widget = document.getElementById('chatbot-widget');
                if (widget) {
                    // Small delay to allow keyboard to close
                    setTimeout(() => {
                        widget.classList.remove('keyboard-open');
                        document.documentElement.style.setProperty('--keyboard-height', '0px');
                    }, 100);
                }
            });
        });
        */
    }

    toggleChat() {
        // Check cookie consent. 
        const consent = localStorage.getItem('chatbot-cookie-consent');

        if (consent === 'accepted') {
            this.cookiesAccepted = true;
            if (!this.featuresInitialized) {
                this.loadAfterConsent();
            }
        } else if (!consent) {
            this.showCookieConsent();
        }

        this.isOpen = !this.isOpen;
        const chatPopup = document.getElementById('chatbot-chat-popup');

        if (this.isOpen) {
            chatPopup.classList.add('active');
            chatPopup.style.display = 'flex';

            // Hide launcher when open
            this.toggleLanguageLauncher(false);

            // Show language modal if no language selected on chat open
            if (!this.selectedLanguage) {
                this.showLanguageModal();
            }

            // Force open Home Tab
            this.switchTab('home');

            // Wait for DOM to be ready, then scroll to top immediately
            requestAnimationFrame(() => {
                const chatMessages = document.getElementById('chatbot-chat-messages');
                const chatsMessages = document.getElementById('chats-chat-messages');

                if (chatMessages) {
                    chatMessages.scrollTop = 0; // Immediate jump
                }
                if (chatsMessages) {
                    chatsMessages.scrollTop = 0; // Immediate jump
                }

                this.hideScrollButton('chatbot-scroll-to-bottom');
                this.hideScrollButton('chats-scroll-to-bottom');

                // Disable inputs until backend enables them
                this.disableInputsUntilBackend();
            });
        } else {
            chatPopup.classList.remove('active');
            setTimeout(() => {
                chatPopup.style.display = 'none';
            }, 300);
        }
    }

    closeChat() {
        this.isOpen = false;
        const chatPopup = document.getElementById('chatbot-chat-popup');
        if (chatPopup) {
            chatPopup.classList.remove('active');
            setTimeout(() => {
                if (!this.isOpen) chatPopup.style.display = 'none';
            }, 300); // Wait for transition
        }

        // Show launcher when closed
        this.toggleLanguageLauncher(true);
    }

    // Share message helper - can be called from message bubbles
    shareMessage(messageText) {
        const t = this.translations[this.selectedLanguage || 'en'];
        this.shareContent(t.greeting || 'Sophia', messageText);
    }

    startChat(isNewChat = true) {
        // Show language modal if no language selected
        if (!this.selectedLanguage) {
            this.showLanguageModal();
            return;
        }

        const initialOptions = document.getElementById('chatbot-initial-options');
        const chatInterface = document.getElementById('chatbot-chat-interface');
        const topActionButtons = document.querySelector('.top-action-buttons');
        const backButton = document.getElementById('chatbot-back-button');

        const heroSection = document.querySelector('.hero-section');
        if (heroSection) heroSection.style.display = 'none'; // Hide Hero in Chat

        initialOptions.style.display = 'none';
        chatInterface.style.display = 'flex';
        this.toggleNavigation(false); // Hide Navigation in chat mode
        if (topActionButtons) topActionButtons.style.display = 'none'; // Hide top buttons
        if (backButton) backButton.classList.remove('hidden'); // Show back button

        // Store which tab we came from
        this.currentTab = 'home';

        // Generate NEW session ID for new chats
        if (isNewChat) {
            this.generateNewSessionId();
            this.awaitingInitialInquiry = true; // Reset for new chat
            this.messages = []; // Clear previous messages
            localStorage.removeItem('chatbot-messages'); // Clear stored messages
            document.getElementById('chatbot-chat-messages').innerHTML = ''; // Clear UI
        }

        // Wait for layout to stabilize
        setTimeout(() => {
            const chatMessages = document.getElementById('chatbot-chat-messages');

            // Only scroll to top for NEW chats
            if (isNewChat && chatMessages) {
                chatMessages.scrollTop = 0; // Immediate jump to top
            } else if (chatMessages) {
                // For continuing conversations, ensure we start at the bottom
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }

            // Send greeting AFTER scrolling logic
            if (isNewChat) {
                this.sendAutoGreeting();
            }

            this.hideScrollButton('chatbot-scroll-to-bottom');
        }, 100);

        // Focus on input
        setTimeout(() => {
            document.getElementById('chatbot-chat-input').focus();
        }, 150);
    }

    continueConversation() {
        this.startChat(false); // Don't generate new session
        this.loadPreviousMessages();

        // If no previous messages, send auto greeting with NEW session
        if (!this.getStoredMessages() || this.getStoredMessages().length === 0) {
            this.generateNewSessionId(); // NEW session if no messages found
            this.sendAutoGreeting();
        }
        // Otherwise, keep the existing session ID from localStorage
    }

    startNewChat() {
        // Switch to Chats tab and start new chat
        this.switchTab('chats');
        this.startChatsChat();
    }

    startChatsChat() {
        // Show language modal if no language selected
        if (!this.selectedLanguage) {
            this.showLanguageModal();
            return;
        }

        const chatsContent = document.querySelector('.chats-content');
        const chatsInterface = document.getElementById('chats-chat-interface');
        const backButton = document.getElementById('chatbot-back-button');

        chatsContent.style.display = 'none';
        chatsInterface.style.display = 'flex';
        this.toggleNavigation(false); // Hide Navigation in chat mode
        if (backButton) {
            backButton.classList.remove('hidden'); // Show back button
            // Ensure it stays visible even if tab switch check runs later
            setTimeout(() => {
                if (backButton && chatsInterface && chatsInterface.style.display !== 'none') {
                    backButton.classList.remove('hidden');
                }
            }, 250);
        }

        // Set currentTab to indicate we're in a new chat (not viewing sessions list)
        this.currentTab = 'chats-new';

        // Generate NEW session ID
        this.generateNewSessionId();
        this.awaitingInitialInquiry = true; // Reset for new chat
        this.messages = []; // Clear previous messages
        localStorage.removeItem('chatbot-messages'); // Clear stored messages
        document.getElementById('chats-chat-messages').innerHTML = ''; // Clear UI

        // Add spacer div to push messages to bottom
        const spacer = document.createElement('div');
        spacer.className = 'message-spacer';
        document.getElementById('chats-chat-messages').appendChild(spacer);

        // Wait for layout to stabilize, then scroll to top BEFORE greeting
        setTimeout(() => {
            const chatsMessages = document.getElementById('chats-chat-messages');
            if (chatsMessages) {
                chatsMessages.scrollTop = 0; // Immediate jump to top
            }

            // Send greeting AFTER scrolling to top
            this.sendAutoGreetingToChats();
            this.hideScrollButton('chats-scroll-to-bottom');
        }, 100);

        // Focus on input
        setTimeout(() => {
            document.getElementById('chats-chat-input').focus();
        }, 150);
    }

    goBack() {
        const backButton = document.getElementById('chatbot-back-button');

        // Check actual DOM state, not just currentTab
        const homeChatInterface = document.getElementById('chatbot-chat-interface');
        const homeInitialOptions = document.getElementById('chatbot-initial-options');
        const chatsChatInterface = document.getElementById('chats-chat-interface');
        const chatsContent = document.querySelector('.chats-content');

        const isHomeChatVisible = homeChatInterface && (
            homeChatInterface.style.display !== 'none' &&
            window.getComputedStyle(homeChatInterface).display !== 'none'
        );
        const isChatsChatVisible = chatsChatInterface && (
            chatsChatInterface.style.display !== 'none' &&
            window.getComputedStyle(chatsChatInterface).display !== 'none'
        );

        if (isHomeChatVisible || this.currentTab === 'home') {
            // Go back to home initial view
            const topActionButtons = document.querySelector('.top-action-buttons');

            if (homeChatInterface) homeChatInterface.style.display = 'none';
            if (homeInitialOptions) homeInitialOptions.style.display = 'flex';
            const heroSection = document.querySelector('.hero-section');
            if (heroSection) heroSection.style.display = 'block'; // Restore Hero
            if (topActionButtons) topActionButtons.style.display = 'flex';
            if (backButton) backButton.classList.add('hidden');
            this.toggleNavigation(true); // Show Navigation
            this.currentTab = 'home';
        } else if (isChatsChatVisible || this.currentTab === 'chats-history' || this.currentTab === 'chats-new') {
            // Go back to chats initial view (sessions list) from either chat history or new chat
            if (chatsChatInterface) chatsChatInterface.style.display = 'none';
            if (chatsContent) chatsContent.style.display = 'flex';
            if (backButton) backButton.classList.add('hidden');

            this.toggleNavigation(true); // Show Navigation
            // Reset currentTab to 'chats' to indicate we're back at the sessions list
            this.currentTab = 'chats';

            // Refresh sessions list
            this.fetchSessions();
        } else if (this.currentTab === 'chats') {
            // Already at chats list, do nothing (shouldn't happen but handle gracefully)
        } else {
            console.warn('goBack() called with unexpected currentTab:', this.currentTab);
        }
    }

    // Scroll to top of chat messages - immediate jump only
    scrollToTop(containerId) {
        const container = document.getElementById(containerId);
        if (container) {
            container.scrollTop = 0; // Immediate jump, no smooth scroll
        }
    }

    // Scroll to bottom of chat messages
    scrollToBottom(containerId) {
        const container = document.getElementById(containerId);
        if (container) {
            container.scrollTo({
                top: container.scrollHeight,
                behavior: 'smooth'
            });
        }
    }

    // Handle scroll event to show/hide scroll-to-bottom button
    handleScroll(containerId, buttonId, topButtonId) {
        const container = document.getElementById(containerId);
        const button = document.getElementById(buttonId);
        const topButton = document.getElementById(topButtonId);

        if (!container || !button) return;

        // Calculate if user is near the bottom (within 100px)
        const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 100;

        // Show button if not at bottom and has content to scroll
        if (!isNearBottom && container.scrollHeight > container.clientHeight) {
            this.showScrollButton(buttonId);
        } else {
            this.hideScrollButton(buttonId);
        }

        // Show scroll to top button if user has scrolled down
        if (container.scrollTop > 100) {
            this.showScrollButton(topButtonId);
        } else {
            this.hideScrollButton(topButtonId);
        }
    }

    // Show scroll-to-bottom button
    showScrollButton(buttonId) {
        const button = document.getElementById(buttonId);
        if (button) {
            button.classList.add('visible');
        }
    }

    // Hide scroll-to-bottom button
    hideScrollButton(buttonId) {
        const button = document.getElementById(buttonId);
        if (button) {
            button.classList.remove('visible');
        }
    }

    async sendChatsMessage() {
        return this._handleSendMessage(true);
    }

    async sendAutoGreetingToChats() {
        const lang = this.selectedLanguage || 'en';
        const t = this.translations[lang];
        const greetingMessage = t.autoGreeting;

        // Add a small delay to make it feel natural
        setTimeout(() => {
            // Pass false to prevent scrolling to bottom (keep at top for new chat)
            this.addChatsGreetingMessageWithButtons(greetingMessage, 'assistant', false);
        }, 500);
    }

    async sendAutoGreeting() {
        const lang = this.selectedLanguage || 'en';
        const t = this.translations[lang];
        const greetingMessage = t.autoGreeting;

        // Add a small delay to make it feel natural
        setTimeout(() => {
            // Pass false to prevent scrolling to bottom (keep at top for new chat)
            this.addGreetingMessageWithButtons(greetingMessage, 'assistant', false);
        }, 500);
    }

    async _handleSendMessage(isChatsTab) {
        if (!this.cookiesAccepted) {
            this.showCookieConsent();
            this.showToast('Please accept cookies to send a message.');
            return;
        }

        // Block input when inputMode is null (waiting for backend to allow input)
        if (!this.activeInputMode) {
            this.showToast('Please wait for a prompt before sending a message.');
            return;
        }

        if (this.isAwaitingResponse) {
            this.showToast('Please wait for a response before sending another message.');
            return;
        }

        const inputId = isChatsTab ? 'chats-chat-input' : 'chatbot-chat-input';
        const input = document.getElementById(inputId);
        let message = input.value.trim();

        // Format date if input type is date
        if (input.type === 'date' && message) {
            const date = new Date(message);
            message = date.toLocaleDateString('de-DE', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
        }

        const hasFile = this.selectedFile !== null;
        const hasVoice = this.selectedVoiceMessage !== null;

        if (!message && !hasFile && !hasVoice) return;

        this.isAwaitingResponse = true;

        const now = Date.now();
        if (now - this.lastMessageTime < this.cooldownMs) {
            const remaining = Math.ceil((this.cooldownMs - (now - this.lastMessageTime)) / 1000);
            this.showToast(`Please wait ${remaining}s before sending another message.`);
            this.isAwaitingResponse = false;
            return;
        }
        this.lastMessageTime = now;

        let fileUrl = null;
        let voiceUrl = null;
        let mediaHTML = '';

        if (hasFile) {
            fileUrl = URL.createObjectURL(this.selectedFile);
            mediaHTML += this.generateFilePreviewHTML(this.selectedFile, fileUrl);
        }
        if (hasVoice) {
            voiceUrl = URL.createObjectURL(this.selectedVoiceMessage);
            mediaHTML += this.generateVoicePreviewHTML(this.selectedVoiceMessage, voiceUrl);
        }

        const displayContent = message ? `${mediaHTML}<p>${this.escapeHtml(message)}</p>` : mediaHTML;

        if (isChatsTab) {
            this.addChatsMessageWithHTML(displayContent, 'user');
        } else {
            this.addMessageWithHTML(displayContent, 'user');
        }

        input.value = '';

        const fileToSend = this.selectedFile;
        const voiceToSend = this.selectedVoiceMessage;

        if (hasFile) this.clearSelectedFile(isChatsTab);
        if (hasVoice) this.clearSelectedVoice();

        this.setInputDisabled(true, isChatsTab);

        if (isChatsTab) {
            this.showChatsTypingIndicator();
        } else {
            this.showTypingIndicator();
        }

        try {
            let response;
            if (fileToSend || voiceToSend) {
                response = await this.sendToWebhookWithMedia(message, fileToSend, voiceToSend);
            } else {
                response = await this.sendToWebhook(message, false);
            }

            // Reset input appearance before applying new mode
            input.type = 'text';
            input.removeAttribute('min');
            input.removeAttribute('max');
            input.removeAttribute('maxLength');
            input.removeAttribute('pattern');
            input.inputMode = 'text';

            const inputContainer = input.closest('.chat-input-container');
            if (inputContainer) {
                inputContainer.classList.remove('currency-mode');
                inputContainer.classList.remove('digit-mode');
            }

            // Reset input mode to null (input blocked until backend sets mode)
            this.activeInputMode = null;
            input.disabled = true;
            input.placeholder = this.translations[this.selectedLanguage || 'en'].waitingForResponse || 'Waiting for response...';

            if (isChatsTab) {
                this.hideChatsTypingIndicator();
            } else {
                this.hideTypingIndicator();
            }

            // Use centralized updateInputMode function to apply the new input mode
            if (response.inputMode !== undefined) {
                this.updateInputMode(response.inputMode, isChatsTab);
            }

            if (response.replies && response.replies.length > 0) {
                await this.displayMultipleReplies(response.replies, response.buttons, isChatsTab, response.inputMode);
            } else {
                if (typeof response === 'object' && response.text) {
                    if (isChatsTab) {
                        this.addChatsMessageWithButtons(response.text, 'assistant', response.buttons);
                    } else {
                        this.addMessageWithButtons(response.text, 'assistant', response.buttons);
                    }
                } else {
                    if (isChatsTab) {
                        this.addChatsMessage(response, 'assistant');
                    } else {
                        this.addMessage(response, 'assistant');
                    }
                }
            }

            this.setInputDisabled(false, isChatsTab);

        } catch (error) {
            console.error('Webhook error:', error);
            await this._retryWebhook(message, fileToSend, voiceToSend, isChatsTab, false);
        }
    }

    async _retryWebhook(message, fileToSend, voiceToSend, isChatsTab, isButton = false) {
        let retries = 0;
        const maxRetries = 2;
        const retryInterval = 1000;

        const retry = async () => {
            try {
                let response;
                if (fileToSend || voiceToSend) {
                    response = await this.sendToWebhookWithMedia(message, fileToSend, voiceToSend);
                } else {
                    response = await this.sendToWebhook(message, isButton);
                }

                if (isChatsTab) {
                    this.hideChatsTypingIndicator();
                } else {
                    this.hideTypingIndicator();
                }

                if (response.replies && response.replies.length > 0) {
                    await this.displayMultipleReplies(response.replies, response.buttons, isChatsTab, response.inputMode);
                } else {
                    if (typeof response === 'object' && response.text) {
                        if (isChatsTab) {
                            this.addChatsMessageWithButtons(response.text, 'assistant', response.buttons);
                        } else {
                            this.addMessageWithButtons(response.text, 'assistant', response.buttons);
                        }
                    } else {
                        if (isChatsTab) {
                            this.addChatsMessage(response, 'assistant');
                        } else {
                            this.addMessage(response, 'assistant');
                        }
                    }

                    // Update input mode if not using displayMultipleReplies
                    if (response.inputMode !== undefined) {
                        this.updateInputMode(response.inputMode, isChatsTab);
                    }
                }
                this.setInputDisabled(false, isChatsTab);
                return true;
            } catch (retryError) {
                retries++;
                if (retries < maxRetries) {
                    await new Promise(resolve => setTimeout(resolve, retryInterval));
                    return retry();
                } else {
                    console.error('Webhook error after retries:', retryError);
                    if (isChatsTab) {
                        this.hideChatsTypingIndicator();
                    } else {
                        this.hideTypingIndicator();
                    }
                    this.setInputDisabled(false, isChatsTab);
                    this.showErrorWithActions(isChatsTab);
                    return false;
                }
            }
        };
        await retry();
    }

    async _handleResponseButtonClick(selectedOption, isChatsTab) {
        if (this.isAwaitingResponse) {
            this.showToast('Please wait for a response before sending another message.');
            return;
        }
        this.isAwaitingResponse = true;
        this.setInputDisabled(true, isChatsTab);

        if (isChatsTab) {
            this.addChatsMessage(selectedOption, 'user');
            const greetingButtons = document.querySelectorAll('#chats-chat-messages .greeting-response-btn');
            greetingButtons.forEach(button => button.style.display = 'none');
            this.showChatsTypingIndicator();
        } else {
            this.addMessage(selectedOption, 'user');
            const greetingButtons = document.querySelectorAll('#chatbot-chat-messages .greeting-response-btn');
            greetingButtons.forEach(button => button.style.display = 'none');
            this.showTypingIndicator();
        }

        try {
            const response = await this.sendToWebhook(selectedOption, true);

            if (isChatsTab) {
                this.hideChatsTypingIndicator();
            } else {
                this.hideTypingIndicator();
            }

            // Use centralized updateInputMode function to apply the input mode
            if (response.inputMode !== undefined) {
                this.updateInputMode(response.inputMode, isChatsTab);
            }

            if (response.replies && response.replies.length > 0) {
                await this.displayMultipleReplies(response.replies, response.buttons, isChatsTab, response.inputMode);
            } else {
                if (typeof response === 'object' && response.text) {
                    if (isChatsTab) {
                        this.addChatsMessageWithButtons(response.text, 'assistant', response.buttons);
                    } else {
                        this.addMessageWithButtons(response.text, 'assistant', response.buttons);
                    }
                } else {
                    if (isChatsTab) {
                        this.addChatsMessage(response, 'assistant');
                    } else {
                        this.addMessage(response, 'assistant');
                    }
                }
            }
            this.setInputDisabled(false, isChatsTab);

        } catch (error) {
            console.error('Webhook error:', error);
            await this._retryWebhook(selectedOption, null, null, isChatsTab, true);
        }
    }

    _addGreetingWithButtons(text, sender, scrollToBottom = true, isChatsTab) {
        const lang = this.selectedLanguage || 'en';
        const t = this.translations[lang];
        const containerId = isChatsTab ? 'chats-chat-messages' : 'chatbot-chat-messages';
        const messagesContainer = document.getElementById(containerId);
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;

        const bubble = document.createElement('div');
        bubble.className = 'message-bubble';
        bubble.innerHTML = this.formatMarkdownAndHTML(text);

        const buttonsContainer = document.createElement('div');
        buttonsContainer.className = 'greeting-response-buttons';

        const responseOptions = [
            t.option1,
            t.option2,
            t.option3,
            t.option4,
            t.option5
        ];

        responseOptions.forEach(option => {
            const button = document.createElement('button');
            button.className = 'greeting-response-btn';

            if (typeof option === 'object' && option !== null && option.action === 'link' && option.url) {
                button.textContent = option.text || option.url;
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    window.open(option.url, '_blank');
                });
            } else {
                const text = typeof option === 'string' ? option : (option.text || JSON.stringify(option));
                button.textContent = text;
                button.addEventListener('click', () => {
                    this._handleResponseButtonClick(text, isChatsTab);
                });
            }
            buttonsContainer.appendChild(button);
        });

        const time = document.createElement('div');
        time.className = 'message-time';
        time.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        messageDiv.appendChild(bubble);
        messageDiv.appendChild(buttonsContainer);
        messageDiv.appendChild(time);
        messagesContainer.appendChild(messageDiv);

        if (scrollToBottom) {
            time.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        this.messages.push({ text, sender, timestamp: new Date() });
        this.saveMessages();
    }

    async sendMessage() {
        return this._handleSendMessage(false);
    }

    async sendToWebhook(message, isButton = false) {
        if (!this.webhookUrl) {
            throw new Error('Webhook URL not configured');
        }

        // Ensure language is set, default to English if not selected
        // Double-check localStorage in case selectedLanguage is out of sync
        const savedLanguage = localStorage.getItem('chatbot-language');
        if (!this.selectedLanguage && savedLanguage && (savedLanguage === 'en' || savedLanguage === 'de')) {
            this.selectedLanguage = savedLanguage;
        }

        // Force language to be valid - ensure it's either 'en' or 'de', default to 'en'
        let language = this.selectedLanguage;
        if (!language || (language !== 'en' && language !== 'de')) {
            console.warn('Invalid or missing language, forcing to English. Current value:', language);
            language = 'en';
            this.selectedLanguage = 'en';
            localStorage.setItem('chatbot-language', 'en');
        }

        // Ensure language is exactly 'en' or 'de' (no whitespace, lowercase)
        language = String(language).trim().toLowerCase();
        if (language !== 'en' && language !== 'de') {
            console.error('Language validation failed, forcing to English. Was:', language);
            language = 'en';
        }

        const sessionId = this.getSessionId();
        const currentTime = new Date().toISOString();

        // Try sending language in multiple formats for maximum compatibility
        const languageFullName = language === 'en' ? 'English' : 'German';

        const payload = {
            message: message,
            timestamp: currentTime,
            sessionId: sessionId,
            uniqueId: this.getUniqueId(),
            language: language, // Use selected language or default to English - MUST be 'en' or 'de'
            languageName: languageFullName, // Also send full language name in case webhook expects it
            awaiting_initial_inquiry: this.awaitingInitialInquiry, // Add inquiry status
            is_button: isButton, // True if user clicked a button, false if typed free text
            input_mode: this.activeInputMode || 'text' // Send the mode of the input used for this message
        };

        // Final validation - ensure language is exactly 'en' or 'de'
        if (payload.language !== 'en' && payload.language !== 'de') {
            console.error('CRITICAL: Invalid language in payload! Forcing to English. Was:', payload.language);
            payload.language = 'en';
        }

        // Set to false after first message is sent

        this.awaitingInitialInquiry = false;

        let response;
        try {
            response = await fetch(this.webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            // Check if it's a network error
            if (error.name === 'TypeError' && error.message.includes('fetch')) {
                throw new Error('Network error: Unable to reach the server');
            }
            throw error;
        }

        const data = await response.json();

        // Log the actual reply text to see what language it's in
        if (data.reply) {
        }

        // Handle various n8n response formats
        let replies = [];
        let responseButtons = null;
        let inputMode = null; // New field for input control

        // Check if response is an array (your current n8n format)
        if (Array.isArray(data) && data.length > 0) {
            // Process all items in the array
            data.forEach(item => {
                const replyText = item.reply ||
                    item.message ||
                    item.response ||
                    item.text ||
                    item.content;
                if (replyText) {
                    replies.push(replyText);
                }
                // Get buttons from the first item
                if (!responseButtons) {
                    responseButtons = item.buttons || null;
                }
                if (!responseButtons) {
                    responseButtons = item.buttons || null;
                }
                // Get input mode from the first item
                if (!inputMode) {
                    inputMode = item.input_key || item.input_mode || item.inputType || null;
                }
            });
        }
        // Check if response is a direct object
        else if (typeof data === 'object' && data !== null) {
            // Check for multiple reply fields (reply, reply1, reply2, etc.)
            const replyKeys = Object.keys(data).filter(key =>
                key.startsWith('reply') &&
                (key === 'reply' || /^reply\d+$/.test(key))
            );

            if (replyKeys.length > 0) {
                // Sort keys to maintain order (reply, reply1, reply2, etc.)
                replyKeys.sort((a, b) => {
                    // Handle 'reply' as the first item
                    if (a === 'reply') return -1;
                    if (b === 'reply') return 1;

                    // Extract numbers from reply1, reply2, etc.
                    const numA = parseInt(a.replace('reply', '')) || 0;
                    const numB = parseInt(b.replace('reply', '')) || 0;

                    // If both have numbers, sort by number
                    if (numA > 0 && numB > 0) {
                        return numA - numB;
                    }

                    // If one has a number and the other doesn't, number comes after 'reply'
                    if (numA > 0 && numB === 0) return 1;
                    if (numB > 0 && numA === 0) return -1;

                    return 0;
                });

                replyKeys.forEach(key => {
                    if (data[key]) {
                        replies.push(data[key]);
                    }
                });
            } else {
                // Fallback to single reply fields
                const replyText = data.reply ||
                    data.message ||
                    data.response ||
                    data.text ||
                    data.content;
                if (replyText) {
                    replies.push(replyText);
                }
            }

            responseButtons = data.buttons || null;
            inputMode = data.input_key || data.input_mode || data.inputType || null;
        }
        // Check if response is a string
        else if (typeof data === 'string') {
            replies.push(data);
        }

        if (replies.length > 0) {
            // Return all replies and buttons
            return {
                replies: replies,
                buttons: responseButtons,
                inputMode: inputMode
            };
        } else {
            console.warn('Unexpected n8n response format:', data);
            return {
                replies: ['I received your message but couldn\'t process the response properly.'],
                buttons: null
            };
        }
    }

    // Send message with file/voice attachment to webhook using FormData
    async sendToWebhookWithMedia(message, file = null, voiceBlob = null) {
        if (!this.webhookUrl) {
            throw new Error('Webhook URL not configured');
        }

        // Language handling (same as sendToWebhook)
        const savedLanguage = localStorage.getItem('chatbot-language');
        if (!this.selectedLanguage && savedLanguage && (savedLanguage === 'en' || savedLanguage === 'de')) {
            this.selectedLanguage = savedLanguage;
        }

        let language = this.selectedLanguage;
        if (!language || (language !== 'en' && language !== 'de')) {
            language = 'en';
            this.selectedLanguage = 'en';
            localStorage.setItem('chatbot-language', 'en');
        }
        language = String(language).trim().toLowerCase();
        if (language !== 'en' && language !== 'de') {
            language = 'en';
        }

        const sessionId = this.getSessionId();
        const currentTime = new Date().toISOString();
        const languageFullName = language === 'en' ? 'English' : 'German';

        // Create FormData for multipart upload
        const formData = new FormData();
        formData.append('message', message || '');
        formData.append('timestamp', currentTime);
        formData.append('sessionId', sessionId);
        formData.append('uniqueId', this.getUniqueId());
        formData.append('language', language);
        formData.append('languageName', languageFullName);
        formData.append('awaiting_initial_inquiry', this.awaitingInitialInquiry);

        // Add file if present
        if (file) {
            formData.append('file', file, file.name);
            formData.append('fileType', file.type);
            formData.append('fileName', file.name);
            formData.append('hasFile', 'true');
        }

        // Add voice recording if present
        if (voiceBlob) {
            const voiceFileName = `voice_message_${Date.now()}.webm`;
            formData.append('voice', voiceBlob, voiceFileName);
            formData.append('voiceType', voiceBlob.type || 'audio/webm');
            formData.append('voiceName', voiceFileName);
            formData.append('hasVoice', 'true');
        }

        // Set to false after first message is sent
        this.awaitingInitialInquiry = false;

        let response;
        try {
            response = await fetch(this.webhookUrl, {
                method: 'POST',
                // Don't set Content-Type header - browser will set it with boundary for FormData
                body: formData
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            if (error.name === 'TypeError' && error.message.includes('fetch')) {
                throw new Error('Network error: Unable to reach the server');
            }
            throw error;
        }

        const data = await response.json();

        let replies = [];
        let responseButtons = null;
        let inputMode = null;

        if (Array.isArray(data) && data.length > 0) {
            data.forEach(item => {
                const replyText = item.reply || item.message || item.response || item.text || item.content;
                if (replyText) {
                    replies.push(replyText);
                }
                if (!responseButtons) {
                    responseButtons = item.buttons || null;
                }
                if (!inputMode) {
                    inputMode = item.input_key || item.input_mode || item.inputType || null;
                }
            });
        } else if (typeof data === 'object' && data !== null) {
            const replyKeys = Object.keys(data).filter(key =>
                key.startsWith('reply') && (key === 'reply' || /^reply\d+$/.test(key))
            );

            if (replyKeys.length > 0) {
                replyKeys.sort((a, b) => {
                    if (a === 'reply') return -1;
                    if (b === 'reply') return 1;
                    const numA = parseInt(a.replace('reply', '')) || 0;
                    const numB = parseInt(b.replace('reply', '')) || 0;
                    return numA - numB;
                });
                replyKeys.forEach(key => {
                    if (data[key]) {
                        replies.push(data[key]);
                    }
                });
            } else {
                const replyText = data.reply || data.message || data.response || data.text || data.content;
                if (replyText) {
                    replies.push(replyText);
                }
            }
            responseButtons = data.buttons || null;
            inputMode = data.input_key || data.input_mode || data.inputType || null;
        } else if (typeof data === 'string') {
            replies.push(data);
        }

        if (replies.length > 0) {
            return { replies: replies, buttons: responseButtons, inputMode: inputMode };
        } else {
            console.warn('Unexpected n8n response format:', data);
            return { replies: ['I received your message but couldn\'t process the response properly.'], buttons: null };
        }
    }

    // Helper to clear selected file UI
    clearSelectedFile(isChatsTab = false) {
        this.selectedFile = null;
        if (isChatsTab) {
            const chatsFileInput = document.getElementById('chats-file-input');
            const chatsFilePreview = document.getElementById('chats-file-preview');
            if (chatsFileInput) chatsFileInput.value = '';
            if (chatsFilePreview) chatsFilePreview.style.display = 'none';
        } else {
            const chatbotFileInput = document.getElementById('chatbot-file-input');
            const chatbotFilePreview = document.getElementById('chatbot-file-preview');
            if (chatbotFileInput) chatbotFileInput.value = '';
            if (chatbotFilePreview) chatbotFilePreview.style.display = 'none';
        }
    }

    // Helper to clear selected voice message
    clearSelectedVoice() {
        this.selectedVoiceMessage = null;

        // Reset inputs in both tabs - but respect inputMode state
        ['chatbot-chat-input', 'chats-chat-input'].forEach(inputId => {
            const input = document.getElementById(inputId);
            if (input) {
                input.value = '';
                input.classList.remove('voice-staged');
                input.style.display = 'block';

                // Only enable if there's an active input mode
                if (this.activeInputMode) {
                    input.disabled = false;
                    input.placeholder = this.translations[this.selectedLanguage || 'en'].typeMessage;
                } else {
                    input.disabled = true;
                    input.placeholder = this.translations[this.selectedLanguage || 'en'].waitingForResponse || 'Waiting for response...';
                }
            }
        });

        // Reset timers
        ['chatbot-recording-timer', 'chats-recording-timer'].forEach(timerId => {
            const timer = document.getElementById(timerId);
            if (timer) timer.classList.remove('visible');
        });
    }

    // Disable all inputs until backend sets an inputMode
    disableInputsUntilBackend() {
        this.activeInputMode = null;
        ['chatbot-chat-input', 'chats-chat-input'].forEach(inputId => {
            const input = document.getElementById(inputId);
            if (input) {
                input.disabled = true;
                input.placeholder = this.translations[this.selectedLanguage || 'en'].waitingForResponse || 'Waiting for response...';

                // Hide the entire input bar
                const inputContainer = input.closest('.chat-input-container');
                if (inputContainer) {
                    inputContainer.style.display = 'none';
                }
            }
        });
    }

    // Enable inputs and show the input bar
    enableInputBar() {
        ['chatbot-chat-input', 'chats-chat-input'].forEach(inputId => {
            const input = document.getElementById(inputId);
            if (input) {
                input.disabled = false;

                // Show the entire input bar
                const inputContainer = input.closest('.chat-input-container');
                if (inputContainer) {
                    inputContainer.style.display = '';
                }
            }
        });
    }

    // Toggle Language Launcher Visibility
    toggleLanguageLauncher(show) {
        const launcher = document.getElementById('chatbot-language-launcher');
        if (launcher) {
            if (show) {
                launcher.classList.add('visible');
            } else {
                launcher.classList.remove('visible');
            }
        }
    }

    // Format file size for display
    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    }

    // Generate HTML for file attachment preview
    generateFilePreviewHTML(file, fileUrl) {
        const isImage = file.type.startsWith('image/');
        const isAudio = file.type.startsWith('audio/');
        const isPDF = file.type === 'application/pdf';
        const isVideo = file.type.startsWith('video/');

        if (isImage) {
            return `
                        <div class="message-attachment">
                            <img src="${fileUrl}" alt="${file.name}" class="attachment-image" 
                                 onclick="window.open('${fileUrl}', '_blank')" title="Click to view full size" />
                        </div>
                    `;
        } else if (isAudio) {
            return `
                        <div class="message-attachment">
                            <audio controls class="attachment-audio" src="${fileUrl}"></audio>
                        </div>
                    `;
        } else if (isVideo) {
            return `
                        <div class="message-attachment">
                            <video controls style="max-width: 100%; border-radius: 12px;" src="${fileUrl}"></video>
                        </div>
                    `;
        } else {
            // Generic file attachment
            const fileIcon = isPDF ?
                `<svg viewBox="0 0 24 24"><path d="M14 2H6C4.9 2 4 2.9 4 4v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm-1 2l5 5h-5V4zM9 13h6v2H9v-2zm0 4h6v2H9v-2z"/></svg>` :
                `<svg viewBox="0 0 24 24"><path d="M14 2H6C4.9 2 4 2.9 4 4v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm-1 2l5 5h-5V4z"/></svg>`;

            return `
                        <div class="message-attachment">
                            <a href="${fileUrl}" download="${file.name}" class="file-attachment">
                                <div class="file-icon">${fileIcon}</div>
                                <div class="file-info">
                                    <div class="file-name">${file.name}</div>
                                    <div class="file-size">${this.formatFileSize(file.size)}</div>
                                </div>
                                <div class="file-download">
                                    <svg viewBox="0 0 24 24"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
                                </div>
                            </a>
                        </div>
                    `;
        }
    }

    // Generate HTML for voice message preview
    generateVoicePreviewHTML(voiceBlob, voiceUrl) {
        return `
                    <div class="message-attachment">
                        <div class="voice-attachment">
                            <div class="voice-icon">
                                <svg viewBox="0 0 24 24"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm-1-9c0-.55.45-1 1-1s1 .45 1 1v6c0 .55-.45 1-1 1s-1-.45-1-1V5z"/><path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/></svg>
                            </div>
                            <div class="voice-player">
                                <audio controls src="${voiceUrl}" style="width: 100%; height: 32px;" 
                                    onerror="this.style.display='none'; this.parentElement.innerHTML='<span style=\'font-size:13px; opacity:0.8;\'>Voice Message</span>';">
                                </audio>
                            </div>
                        </div>
                    </div>
                `;
    }

    // Generate a NEW session ID
    generateNewSessionId() {
        // Generate clean session ID
        const cleanSessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);

        // Generate full session ID in format: user_[uniqueId]/session_[timestamp]_[random]
        const uniqueId = this.getUniqueId();
        const fullSessionId = `${uniqueId}/${cleanSessionId}`;

        // Store both formats
        this.currentSessionId = fullSessionId; // Store full format for webhook compatibility
        localStorage.setItem('chatbot-session-id', fullSessionId);
        localStorage.setItem('chatbot-session-id-clean', cleanSessionId); // Store clean format for display

        return fullSessionId;
    }

    // Get current session ID (returns full format for webhook compatibility)
    getSessionId() {
        if (!this.currentSessionId) {
            // If no current session, try to load from localStorage
            this.currentSessionId = localStorage.getItem('chatbot-session-id');

            // If we have a clean session ID but not full format, construct it
            if (!this.currentSessionId) {
                const cleanSessionId = localStorage.getItem('chatbot-session-id-clean');
                if (cleanSessionId) {
                    const uniqueId = this.getUniqueId();
                    this.currentSessionId = `${uniqueId}/${cleanSessionId}`;
                    localStorage.setItem('chatbot-session-id', this.currentSessionId);
                }
            }

            // If still nothing, generate new one
            if (!this.currentSessionId) {
                this.generateNewSessionId();
            }
        }

        // Ensure it's in full format (user_id/session_id)
        if (this.currentSessionId && !this.currentSessionId.includes('/')) {
            // It's a clean session ID, convert to full format
            const uniqueId = this.getUniqueId();
            this.currentSessionId = `${uniqueId}/${this.currentSessionId}`;
            localStorage.setItem('chatbot-session-id', this.currentSessionId);
        }

        return this.currentSessionId;
    }

    getUniqueId() {
        // If unique ID doesn't exist, generate it
        if (!this.uniqueBrowserId) {
            this.loadOrGenerateUniqueId();
        }
        // Return the persistent unique ID for this browser
        return this.uniqueBrowserId;
    }

    addMessage(text, sender, timestamp = null) {
        const messagesContainer = document.getElementById('chatbot-chat-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;

        const bubble = document.createElement('div');
        bubble.className = 'message-bubble';
        // Format markdown and HTML (including tables)
        bubble.innerHTML = this.formatMarkdownAndHTML(text);

        const time = document.createElement('div');
        time.className = 'message-time';

        // Use provided timestamp or current time
        const messageDate = timestamp ? new Date(timestamp) : new Date();
        // Check if date is valid
        const validDate = !isNaN(messageDate.getTime()) ? messageDate : new Date();

        time.textContent = validDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        messageDiv.appendChild(bubble);
        messageDiv.appendChild(time);
        messagesContainer.appendChild(messageDiv);

        // Scroll to bottom to show the full message
        setTimeout(() => {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }, 50);

        // Store message (only if new)
        if (!timestamp) {
            this.messages.push({ text, sender, timestamp: validDate });
            this.saveMessages();
        }
    }

    // Escape HTML to prevent XSS
    escapeHtml(text) {
        if (!text || typeof text !== 'string') return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Add message with raw HTML content (for media attachments)
    addMessageWithHTML(htmlContent, sender, timestamp = null) {
        const messagesContainer = document.getElementById('chatbot-chat-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;

        const bubble = document.createElement('div');
        bubble.className = 'message-bubble';
        bubble.innerHTML = htmlContent;

        const time = document.createElement('div');
        time.className = 'message-time';

        const messageDate = timestamp ? new Date(timestamp) : new Date();
        const validDate = !isNaN(messageDate.getTime()) ? messageDate : new Date();
        time.textContent = validDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        messageDiv.appendChild(bubble);
        messageDiv.appendChild(time);
        messagesContainer.appendChild(messageDiv);

        // Scroll to bottom to show the full message
        setTimeout(() => {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }, 50);

        if (!timestamp) {
            this.messages.push({ text: '[Media attachment]', sender, timestamp: validDate });
            this.saveMessages();
        }
    }

    // Add message with raw HTML content to Chats tab
    addChatsMessageWithHTML(htmlContent, sender, timestamp = null) {
        const messagesContainer = document.getElementById('chats-chat-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;

        const bubble = document.createElement('div');
        bubble.className = 'message-bubble';
        bubble.innerHTML = htmlContent;

        const time = document.createElement('div');
        time.className = 'message-time';

        const messageDate = timestamp ? new Date(timestamp) : new Date();
        const validDate = !isNaN(messageDate.getTime()) ? messageDate : new Date();
        time.textContent = validDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        messageDiv.appendChild(bubble);
        messageDiv.appendChild(time);
        messagesContainer.appendChild(messageDiv);

        // Scroll to bottom to show the full message
        setTimeout(() => {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }, 50);

        if (!timestamp) {
            this.messages.push({ text: '[Media attachment]', sender, timestamp: validDate });
            this.saveMessages();
        }
    }

    addMessageWithButtons(text, sender, buttonOptions = null, timestamp = null) {
        const messagesContainer = document.getElementById('chatbot-chat-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;

        // Only create bubble if there's actual text content
        if (text && text.trim()) {
            const bubble = document.createElement('div');
            bubble.className = 'message-bubble';
            // Format markdown and HTML (including tables)
            bubble.innerHTML = this.formatMarkdownAndHTML(text);
            messageDiv.appendChild(bubble);
        }

        // Add response buttons if provided
        if (buttonOptions && buttonOptions.length > 0) {
            const buttonsContainer = document.createElement('div');
            buttonsContainer.className = 'greeting-response-buttons';

            buttonOptions.forEach(option => {
                const button = document.createElement('button');
                button.className = 'greeting-response-btn';

                // Check if option is a link button object (supports both schemas)
                // Schema 1: { action: 'link', url: '...', text: '...' }
                // Schema 2: { label: '...', url: '...' }
                const isLink = (option.action === 'link' && option.url) || (option.url && option.label);

                if (typeof option === 'object' && option !== null && isLink) {
                    const url = option.url;
                    const text = option.label || option.text || option.url;

                    button.textContent = text;

                    button.addEventListener('click', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        window.open(url, '_blank');
                    });
                } else if (typeof option === 'object' && option !== null && option.action === 'date_picker') {
                    // Date Picker Button
                    const text = option.label || option.text || 'Select Date';
                    button.textContent = text;
                    button.addEventListener('click', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (this.dateInput) {
                            // Show picker
                            if ('showPicker' in HTMLInputElement.prototype) {
                                this.dateInput.showPicker();
                            } else {
                                this.dateInput.click();
                                this.dateInput.focus();
                            }
                        }
                    });
                } else if (typeof option === 'object' && option !== null && option.action === 'number_input') {
                    // Number Input Button
                    const text = option.label || option.text || 'Enter Number';
                    button.textContent = text;
                    button.addEventListener('click', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        // Focus the existing input and change type
                        const input = document.getElementById('chatbot-chat-input');
                        if (input) {
                            input.type = 'number';
                            input.placeholder = '0.00';
                            input.focus();

                            // Add currency mode styling
                            const inputContainer = input.closest('.chat-input-container');
                            if (inputContainer) {
                                inputContainer.classList.add('currency-mode');
                            }
                        }
                    });
                } else if (typeof option === 'object' && option !== null && option.action === 'digit_input') {
                    // Single Digit Input Button
                    const text = option.label || option.text || 'Enter Digit';
                    button.textContent = text;
                    button.addEventListener('click', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        const input = document.getElementById('chatbot-chat-input');
                        if (input) {
                            input.type = 'text';
                            input.inputMode = 'numeric';
                            input.pattern = '[0-9]';
                            input.maxLength = 1;
                            input.placeholder = '0';
                            input.focus();

                            const inputContainer = input.closest('.chat-input-container');
                            if (inputContainer) {
                                inputContainer.classList.add('digit-mode');
                            }
                        }
                    });
                } else {
                    // Standard text button
                    const text = typeof option === 'string' ? option : (option.text || JSON.stringify(option));
                    button.textContent = text;
                    button.addEventListener('click', () => {
                        this.handleResponseButtonClick(text);
                    });
                }

                buttonsContainer.appendChild(button);
            });

            messageDiv.appendChild(buttonsContainer);
        }

        const time = document.createElement('div');
        time.className = 'message-time';

        // Use provided timestamp or current time
        const messageDate = timestamp ? new Date(timestamp) : new Date();
        // Check if date is valid
        const validDate = !isNaN(messageDate.getTime()) ? messageDate : new Date();

        time.textContent = validDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        messageDiv.appendChild(time);
        messagesContainer.appendChild(messageDiv);

        // Scroll to bottom to show the full message with buttons
        setTimeout(() => {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }, 50);

        // Store message (only if new)
        if (!timestamp) {
            this.messages.push({ text, sender, timestamp: validDate });
            this.saveMessages();
        }
    }

    // Keep the original greeting method with hardcoded buttons
    addGreetingMessageWithButtons(text, sender, scrollToBottom = true) {
        this._addGreetingWithButtons(text, sender, scrollToBottom, false);
    }

    showErrorWithActions(isChatsTab = false) {
        // Use selected language or default to English
        const lang = this.selectedLanguage || 'en';
        const t = this.translations[lang];

        // Determine which messages container to use
        const messagesContainer = isChatsTab
            ? document.getElementById('chats-chat-messages')
            : document.getElementById('chatbot-chat-messages');

        if (!messagesContainer) {
            console.error('Messages container not found');
            return;
        }

        const messageDiv = document.createElement('div');
        messageDiv.className = 'message assistant';

        const bubble = document.createElement('div');
        bubble.className = 'message-bubble';
        bubble.textContent = t.errorMessage;

        // Add error action buttons
        const buttonsContainer = document.createElement('div');
        buttonsContainer.className = 'error-action-buttons';

        const actionOptions = [
            t.bookMeeting,
            t.raiseTicket
        ];

        actionOptions.forEach(option => {
            const button = document.createElement('button');
            button.className = 'error-action-btn';
            button.textContent = option;
            button.addEventListener('click', () => {
                this.handleErrorActionClick(option);
            });
            buttonsContainer.appendChild(button);
        });

        const time = document.createElement('div');
        time.className = 'message-time';
        time.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        messageDiv.appendChild(bubble);
        messageDiv.appendChild(buttonsContainer);
        messageDiv.appendChild(time);
        messagesContainer.appendChild(messageDiv);

        // Scroll to start of new message
        messageDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        // Store message
        this.messages.push({ text: t.errorMessage, sender: 'assistant', timestamp: new Date() });
        this.saveMessages();
    }

    handleErrorActionClick(selectedAction) {
        const lang = this.selectedLanguage || 'en';
        const t = this.translations[lang];
        if (selectedAction === t.bookMeeting || selectedAction === "Book a Meeting") {
            // You can replace this with your actual meeting booking URL
            window.open('https://meetings-eu1.hubspot.com/alexander-suck', '_blank');
        } else if (selectedAction === t.raiseTicket || selectedAction === "Raise a Ticket") {
            // You can replace this with your actual ticket system URL
            window.open('https://your-support-system.com/create-ticket', '_blank');
        }
    }

    handleCreateTicket() {
        // You can replace this with your actual ticket system URL
        window.open('https://your-support-system.com/create-ticket', '_blank');
    }

    handleBookCall() {
        // You can replace this with your actual meeting booking URL
        window.open('https://meetings-eu1.hubspot.com/alexander-suck', '_blank');
    }

    // Chats Tab Helper Methods
    addChatsMessage(text, sender, timestamp = null) {
        const messagesContainer = document.getElementById('chats-chat-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;

        const bubble = document.createElement('div');
        bubble.className = 'message-bubble';
        // Format markdown and HTML (including tables)
        bubble.innerHTML = this.formatMarkdownAndHTML(text);

        const time = document.createElement('div');
        time.className = 'message-time';

        // Use provided timestamp or current time
        const messageDate = timestamp ? new Date(timestamp) : new Date();
        // Check if date is valid
        const validDate = !isNaN(messageDate.getTime()) ? messageDate : new Date();

        time.textContent = validDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        messageDiv.appendChild(bubble);
        messageDiv.appendChild(time);
        messagesContainer.appendChild(messageDiv);

        // Scroll to bottom to show the full message
        setTimeout(() => {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }, 50);

        // Store message (only if new)
        if (!timestamp) {
            this.messages.push({ text, sender, timestamp: validDate });
            this.saveMessages();
        }
    }

    addChatsMessageWithButtons(text, sender, buttonOptions = null, timestamp = null) {
        const messagesContainer = document.getElementById('chats-chat-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;

        // Only create bubble if there's actual text content
        if (text && text.trim()) {
            const bubble = document.createElement('div');
            bubble.className = 'message-bubble';
            // Format markdown and HTML (including tables)
            bubble.innerHTML = this.formatMarkdownAndHTML(text);
            messageDiv.appendChild(bubble);
        }

        // Add response buttons if provided
        if (buttonOptions && buttonOptions.length > 0) {
            const buttonsContainer = document.createElement('div');
            buttonsContainer.className = 'greeting-response-buttons';

            buttonOptions.forEach(option => {
                const button = document.createElement('button');
                button.className = 'greeting-response-btn';

                // Check if option is a link button object (supports both schemas)
                // Schema 1: { action: 'link', url: '...', text: '...' }
                // Schema 2: { label: '...', url: '...' }
                const isLink = (option.action === 'link' && option.url) || (option.url && option.label);

                if (typeof option === 'object' && option !== null && isLink) {
                    const url = option.url;
                    const text = option.label || option.text || option.url;

                    button.textContent = text;

                    button.addEventListener('click', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        window.open(url, '_blank');
                    });
                } else if (typeof option === 'object' && option !== null && option.action === 'date_picker') {
                    // Date Picker Button
                    const text = option.label || option.text || 'Select Date';
                    button.textContent = text;
                    button.addEventListener('click', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (this.dateInput) {
                            // Show picker
                            if ('showPicker' in HTMLInputElement.prototype) {
                                this.dateInput.showPicker();
                            } else {
                                this.dateInput.click();
                                this.dateInput.focus();
                            }
                        }
                    });
                } else if (typeof option === 'object' && option !== null && option.action === 'number_input') {
                    // Number Input Button
                    const text = option.label || option.text || 'Enter Number';
                    button.textContent = text;
                    button.addEventListener('click', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        // Focus the existing input and change type
                        const input = document.getElementById('chats-chat-input');
                        if (input) {
                            input.type = 'number';
                            input.placeholder = '0.00';
                            input.focus();

                            // Add currency mode styling
                            const inputContainer = input.closest('.chat-input-container');
                            if (inputContainer) {
                                inputContainer.classList.add('currency-mode');
                            }
                        }
                    });
                } else if (typeof option === 'object' && option !== null && option.action === 'digit_input') {
                    // Single Digit Input Button
                    const text = option.label || option.text || 'Enter Digit';
                    button.textContent = text;
                    button.addEventListener('click', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        const input = document.getElementById('chats-chat-input');
                        if (input) {
                            input.type = 'text';
                            input.inputMode = 'numeric';
                            input.pattern = '[0-9]';
                            input.maxLength = 1;
                            input.placeholder = '0';
                            input.focus();

                            const inputContainer = input.closest('.chat-input-container');
                            if (inputContainer) {
                                inputContainer.classList.add('digit-mode');
                            }
                        }
                    });
                } else {
                    // Standard text button
                    const text = typeof option === 'string' ? option : (option.text || JSON.stringify(option));
                    button.textContent = text;
                    button.addEventListener('click', () => {
                        this.handleChatsResponseButtonClick(text);
                    });
                }

                buttonsContainer.appendChild(button);
            });

            messageDiv.appendChild(buttonsContainer);
        }

        const time = document.createElement('div');
        time.className = 'message-time';

        // Use provided timestamp or current time
        const messageDate = timestamp ? new Date(timestamp) : new Date();
        // Check if date is valid
        const validDate = !isNaN(messageDate.getTime()) ? messageDate : new Date();

        time.textContent = validDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        messageDiv.appendChild(time);
        messagesContainer.appendChild(messageDiv);

        // Scroll to bottom to show the full message with buttons
        setTimeout(() => {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }, 50);

        // Store message (only if new)
        if (!timestamp) {
            this.messages.push({ text, sender, timestamp: validDate });
            this.saveMessages();
        }
    }

    addChatsGreetingMessageWithButtons(text, sender, scrollToBottom = true) {
        this._addGreetingWithButtons(text, sender, scrollToBottom, true);
    }

    handleChatsResponseButtonClick(selectedOption) {
        this._handleResponseButtonClick(selectedOption, true);
    }

    showChatsTypingIndicator() {
        const messagesContainer = document.getElementById('chats-chat-messages');
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message assistant';
        typingDiv.id = 'chats-typing-indicator';

        typingDiv.innerHTML = `
                    <div class="typing-indicator">
                        <div class="typing-dot"></div>
                        <div class="typing-dot"></div>
                        <div class="typing-dot"></div>
                    </div>
                `;

        messagesContainer.appendChild(typingDiv);
        // Smooth scroll to bottom to show typing indicator
        setTimeout(() => {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }, 50);
    }

    hideChatsTypingIndicator() {
        const typingIndicator = document.getElementById('chats-typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    // Multiple Replies Handler
    async displayMultipleReplies(replies, buttons, isChatsTab = false, inputMode = null) {
        if (!replies || replies.length === 0) return;

        // Display first reply immediately
        const firstReply = replies[0];
        if (isChatsTab) {
            this.addChatsMessage(firstReply, 'assistant');
        } else {
            this.addMessage(firstReply, 'assistant');
        }

        // If there are more replies, display them one by one with delay
        if (replies.length > 1) {
            for (let i = 1; i < replies.length; i++) {
                await this.delay(1500); // 1.5 second delay between replies

                if (isChatsTab) {
                    this.addChatsMessage(replies[i], 'assistant');
                } else {
                    this.addMessage(replies[i], 'assistant');
                }
            }
        }

        // Add buttons to the last message if provided
        if (buttons && buttons.length > 0) {
            await this.delay(500); // Small delay before showing buttons

            if (isChatsTab) {
                this.addChatsMessageWithButtons('', 'assistant', buttons);
            } else {
                this.addMessageWithButtons('', 'assistant', buttons);
            }
        }

        // CRITICAL: Update input mode AFTER displaying all replies
        // This ensures the input mode reflects the LATEST request from backend
        if (inputMode !== null) {
            this.updateInputMode(inputMode, isChatsTab);
        }
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Centralized Input Mode Update
    // This ensures input mode is always properly reset and applied
    updateInputMode(inputMode, isChatsTab = false) {
        const inputId = isChatsTab ? 'chats-chat-input' : 'chatbot-chat-input';
        const input = document.getElementById(inputId);

        if (!input) return;

        // First, reset ALL previous input mode configurations
        input.type = 'text';
        input.removeAttribute('min');
        input.removeAttribute('max');
        input.removeAttribute('maxLength');
        input.removeAttribute('pattern');
        input.inputMode = 'text';

        const inputContainer = input.closest('.chat-input-container');
        if (inputContainer) {
            inputContainer.classList.remove('currency-mode');
            inputContainer.classList.remove('digit-mode');
        }

        // Update the active input mode state
        this.activeInputMode = inputMode || null;

        // Enable or disable input based on inputMode
        if (this.activeInputMode) {
            this.enableInputBar();
            input.disabled = false;
            input.placeholder = this.translations[this.selectedLanguage || 'en'].typeMessage;
        } else {
            this.disableInputsUntilBackend();
            return; // No need to apply input mode if null
        }

        // Apply the specific input mode configuration
        if (inputMode === 'number' || inputMode === 'currency') {
            input.type = 'number';
            input.placeholder = '0.00';
            input.focus();
            if (inputContainer) {
                inputContainer.classList.add('currency-mode');
            }
        } else if (inputMode === 'digit') {
            // Single digit input mode (0-9)
            input.type = 'text';
            input.inputMode = 'numeric';
            input.pattern = '[0-9]';
            input.maxLength = 1;
            input.placeholder = '0';
            input.focus();
            if (inputContainer) {
                inputContainer.classList.add('digit-mode');
            }
        } else if (inputMode === 'date' || inputMode === 'date_past' || inputMode === 'date_future') {
            input.type = 'date';
            const today = new Date().toISOString().split('T')[0];
            if (inputMode === 'date_past') {
                input.max = today;
            } else if (inputMode === 'date_future') {
                input.min = today;
            }
            input.focus();
        } else if (inputMode === 'text') {
            // Text mode - already reset above, just set placeholder and focus
            input.placeholder = this.translations[this.selectedLanguage || 'en'].typeMessage;
            input.focus();
        }
    }

    handleResponseButtonClick(selectedOption) {
        this._handleResponseButtonClick(selectedOption, false);
    }

    // This method is no longer needed as we use webhook responses
    // addBotResponse method removed - responses now come from n8n webhook

    showTypingIndicator() {
        const messagesContainer = document.getElementById('chatbot-chat-messages');
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message assistant';
        typingDiv.id = 'chatbot-typing-indicator';

        typingDiv.innerHTML = `
                    <div class="typing-indicator">
                        <div class="typing-dot"></div>
                        <div class="typing-dot"></div>
                        <div class="typing-dot"></div>
                    </div>
                `;

        messagesContainer.appendChild(typingDiv);
        // Smooth scroll to bottom to show typing indicator
        setTimeout(() => {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }, 50);
    }

    hideTypingIndicator() {
        const typingIndicator = document.getElementById('chatbot-typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    // Disable/Enable input controls while waiting for response
    setInputDisabled(disabled, isChatsTab = false) {
        this.isAwaitingResponse = disabled;

        // Home tab elements
        const homeInput = document.getElementById('chatbot-chat-input');
        const homeSendButton = document.getElementById('chatbot-send-button');

        // Chats tab elements
        const chatsInput = document.getElementById('chats-chat-input');
        const chatsSendButton = document.getElementById('chats-send-button');

        if (isChatsTab) {
            if (chatsInput) {
                chatsInput.disabled = disabled;
                chatsInput.style.opacity = disabled ? '0.6' : '1';
            }
            if (chatsSendButton) {
                chatsSendButton.disabled = disabled;
                chatsSendButton.style.opacity = disabled ? '0.6' : '1';
                chatsSendButton.style.cursor = disabled ? 'not-allowed' : 'pointer';
            }
        } else {
            if (homeInput) {
                homeInput.disabled = disabled;
                homeInput.style.opacity = disabled ? '0.6' : '1';
            }
            if (homeSendButton) {
                homeSendButton.disabled = disabled;
                homeSendButton.style.opacity = disabled ? '0.6' : '1';
                homeSendButton.style.cursor = disabled ? 'not-allowed' : 'pointer';
            }
        }
    }

    // Cookie Consent Methods
    checkCookieConsent() {
        const hubspotOptOut = document.cookie.includes("__hs_opt_out=true");
        const consent = localStorage.getItem("chatbot-cookie-consent");

        if (hubspotOptOut) {
            // User declined HubSpot cookies
            this.cookiesAccepted = false;
            this.hideCookieConsent();
        } else if (document.cookie.includes("__hs_opt_out=false") || !hubspotOptOut) {
            // User accepted HubSpot cookies
            this.cookiesAccepted = true;
            this.hideCookieConsent();
        } else if (consent === "accepted") {
            this.cookiesAccepted = true;
            this.hideCookieConsent();
        } else if (consent === "declined") {
            this.cookiesAccepted = false;
            this.hideCookieConsent();
        } else {
            this.showCookieConsent();
        }
    }
    showCookieConsent() {
        const cookieConsent = document.getElementById('chatbot-cookie-consent');
        if (cookieConsent) {
            cookieConsent.classList.add('show');
            // Re-setup button listeners when consent is shown
            const self = this;
            setTimeout(() => {
                const acceptCookies = document.getElementById('chatbot-accept-cookies');
                const declineCookies = document.getElementById('chatbot-decline-cookies');

                if (acceptCookies) {
                    acceptCookies.onclick = function (e) {
                        if (e) {
                            e.preventDefault();
                            e.stopPropagation();
                        }
                        self.acceptCookies();
                        return false;
                    };
                }

                if (declineCookies) {
                    declineCookies.onclick = function (e) {
                        if (e) {
                            e.preventDefault();
                            e.stopPropagation();
                        }
                        self.declineCookies();
                        return false;
                    };
                }
            }, 100);
        }
    }

    hideCookieConsent() {
        const cookieConsent = document.getElementById('chatbot-cookie-consent');
        cookieConsent.classList.remove('show');
    }

    loadAfterConsent() {
        if (!this.featuresInitialized) {
            this.featuresInitialized = true;
            this.loadRecentConversation();
            this.loadLanguagePreference();
            this.loadOrGenerateUniqueId();
            this.updateUILanguage();
            this.autoOpenChatbot();
        }
    }

    acceptCookies() {
        this.cookiesAccepted = true;
        localStorage.setItem('chatbot-cookie-consent', 'accepted');
        this.hideCookieConsent();

        // Initialize features that require consent
        this.loadAfterConsent();

        // Open chat if not open
        if (!this.isOpen) {
            this.toggleChat();
        }
    }

    declineCookies() {
        this.cookiesAccepted = false;
        localStorage.setItem('chatbot-cookie-consent', 'declined');
        this.hideCookieConsent();

        // STRICT GDPR Cleanup
        localStorage.removeItem('chatbot-unique-id');
        // Optional: clear messages or keep them for session only? 
        // Plan said "Remove any existing IDs".
        // We do NOT call loadAfterConsent().
    }

    // Recent Conversation Methods
    loadRecentConversation() {
        const messages = this.getStoredMessages();
        if (messages && messages.length > 0) {
            this.hasRecentConversation = true;
            this.showContinueConversation();
        }
    }

    showContinueConversation() {
        if (this.cookiesAccepted && this.hasRecentConversation) {
            const continueBtn = document.getElementById('chatbot-continue-conversation');
            continueBtn.style.display = 'block';
        }
    }

    loadPreviousMessages() {
        const messages = this.getStoredMessages();
        if (messages) {
            const messagesContainer = document.getElementById('chatbot-chat-messages');
            messagesContainer.innerHTML = '';

            messages.forEach(msg => {
                this.addMessage(msg.text, msg.sender, msg.timestamp);
            });
        }
    }

    saveMessages() {
        localStorage.setItem('chatbot-messages', JSON.stringify(this.messages));
    }

    getStoredMessages() {
        const stored = localStorage.getItem('chatbot-messages');
        return stored ? JSON.parse(stored) : null;
    }

    // Session and Chat Retrieval Methods
    async fetchSessions() {
        if (!this.cookiesAccepted) {
            return;
        }
        if (!this.sessionRetrievalWebhookUrl) {
            console.error('Session retrieval webhook URL not configured');
            return;
        }

        const sessionsList = document.getElementById('sessions-list');
        const sessionsLoading = document.getElementById('sessions-loading');
        const sessionsEmpty = document.getElementById('sessions-empty');
        const sessionsError = document.getElementById('sessions-error');

        // Show loading state
        if (sessionsList) sessionsList.style.display = 'none';
        if (sessionsEmpty) sessionsEmpty.style.display = 'none';
        if (sessionsError) sessionsError.style.display = 'none';
        if (sessionsLoading) sessionsLoading.style.display = 'flex';

        try {
            // Ensure unique ID exists (getUniqueId will generate it if needed)
            const uniqueId = this.getUniqueId();

            if (!uniqueId) {
                console.error('Failed to generate unique ID');
                throw new Error('Unable to generate unique ID. Please refresh the page.');
            }

            const payload = {
                uniqueId: uniqueId
            };

            const response = await fetch(this.sessionRetrievalWebhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error response:', errorText);
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
            }

            const sessions = await response.json();

            // Log each session's uniqueId to verify they match
            // (debug logging removed for production)

            // Hide loading state
            if (sessionsLoading) sessionsLoading.style.display = 'none';

            // Handle different response formats
            let sessionsArray = sessions;
            if (!Array.isArray(sessions)) {
                // If response is an object with a sessions property
                if (sessions && sessions.sessions && Array.isArray(sessions.sessions)) {
                    sessionsArray = sessions.sessions;
                } else if (sessions && sessions.data && Array.isArray(sessions.data)) {
                    sessionsArray = sessions.data;
                } else {
                    console.warn('Unexpected response format:', sessions);
                    sessionsArray = [];
                }
            }

            if (Array.isArray(sessionsArray) && sessionsArray.length > 0) {
                // Filter sessions to only show those that match the current uniqueId
                const currentUniqueId = this.getUniqueId();
                const filteredSessions = sessionsArray.filter(session => {
                    // Check if full_session_id starts with current uniqueId
                    if (session.full_session_id) {
                        return session.full_session_id.startsWith(currentUniqueId + '/');
                    }
                    // If no full_session_id, we can't verify, so exclude it for safety
                    console.warn('Session missing full_session_id, excluding:', session);
                    return false;
                });

                if (filteredSessions.length > 0) {
                    this.displaySessions(filteredSessions);
                } else {
                    if (sessionsEmpty) sessionsEmpty.style.display = 'flex';
                }
            } else {
                // Show empty state
                if (sessionsEmpty) sessionsEmpty.style.display = 'flex';
            }
        } catch (error) {
            console.error('Error fetching sessions:', error);
            console.error('Error details:', error.message, error.stack);
            if (sessionsLoading) sessionsLoading.style.display = 'none';
            if (sessionsEmpty) sessionsEmpty.style.display = 'none';
            if (sessionsError) {
                sessionsError.style.display = 'flex';
                const errorText = sessionsError.querySelector('p');
                if (errorText) {
                    errorText.textContent = `Error loading sessions: ${error.message}. Please try again later.`;
                }
            }
        }
    }

    async displaySessions(sessions) {
        const sessionsList = document.getElementById('sessions-list');
        if (!sessionsList) {
            console.error('sessions-list element not found!');
            return;
        }

        sessionsList.innerHTML = '';

        if (!Array.isArray(sessions) || sessions.length === 0) {
            console.warn('No sessions to display');
            return;
        }

        // First, create all previews immediately with placeholder titles
        const previewElements = [];
        sessions.forEach((session, index) => {
            const preview = document.createElement('div');
            preview.className = 'session-preview';
            preview.dataset.sessionId = session.full_session_id || session.clean_session_id;

            // Use full_session_id if available, otherwise construct it
            const sessionIdToLoad = session.full_session_id || session.clean_session_id;

            // Parse the last message preview to extract response_text
            let previewText = 'No messages';
            try {
                if (session.last_message_preview) {
                    // Check if it's a JSON string
                    let messageData = session.last_message_preview;
                    // Remove any markdown code block markers (```json\n or just json\n)
                    messageData = messageData.replace(/^```json\n/, '').replace(/^json\n/, '').replace(/```$/, '');
                    messageData = messageData.trim();

                    if (messageData.startsWith('{')) {
                        const parsed = JSON.parse(messageData);
                        // Try to extract response_text field if it exists
                        previewText = parsed.response_text || JSON.stringify(parsed);
                    } else {
                        previewText = messageData;
                    }
                }
            } catch (e) {
                console.error('Error parsing preview:', e, 'Raw data:', session.last_message_preview);
                previewText = session.last_message_preview || 'No messages';
            }
            // Strip markdown from preview text and truncate
            previewText = this.stripMarkdown(previewText);
            const truncatedPreview = previewText.length > 60 ? previewText.substring(0, 60) + '...' : previewText;

            // Create title element that we'll update later
            const titleElement = document.createElement('div');
            titleElement.className = 'session-preview-title';
            titleElement.textContent = 'Loading...';

            preview.innerHTML = `
                        <div class="session-preview-header">
                           
                        </div>
                       
                        <div class="session-preview-text">${this.escapeHtml(truncatedPreview)}</div>
                        <div class="session-preview-time">
                            
                            ${this.formatTimestamp(session.timestamp || session.created_at || session.last_active_id)}
                        </div>
                    `;

            // Insert title element
            const header = preview.querySelector('.session-preview-header');
            if (header) {
                header.appendChild(titleElement);
            }

            preview.addEventListener('click', () => {
                this.loadSessionChat(sessionIdToLoad);
            });

            sessionsList.appendChild(preview);
            previewElements.push({ element: preview, titleElement, sessionId: sessionIdToLoad });
        });

        // Show sessions immediately
        sessionsList.style.display = 'flex';

        // Now fetch first messages asynchronously and update titles
        previewElements.forEach(async ({ titleElement, sessionId }) => {
            try {
                const firstMessage = await this.getFirstUserMessage(sessionId);
                if (firstMessage && titleElement) {
                    const truncatedTitle = firstMessage.length > 40 ? firstMessage.substring(0, 40) + '...' : firstMessage;
                    titleElement.textContent = this.escapeHtml(truncatedTitle);
                } else if (titleElement) {
                    titleElement.textContent = 'New Conversation';
                }
            } catch (e) {
                console.error('Error fetching first message:', e);
                if (titleElement) {
                    titleElement.textContent = 'New Conversation';
                }
            }
        });

    }

    async getFirstUserMessage(sessionId) {
        if (!this.chatRetrievalWebhookUrl) {
            return null;
        }

        try {
            const payload = {
                sessionId: sessionId,
                uniqueId: this.getUniqueId(),
                timestamp: new Date().toISOString()
            };

            const response = await fetch(this.chatRetrievalWebhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                return null;
            }

            const chatMessages = await response.json();

            if (Array.isArray(chatMessages) && chatMessages.length > 0) {
                // Sort by sequence_id to get messages in order
                const sortedMessages = chatMessages.sort((a, b) => {
                    return (a.sequence_id || 0) - (b.sequence_id || 0);
                });

                // Find the first user message
                for (const msg of sortedMessages) {
                    if (msg.sender === 'human' || msg.sender === 'user') {
                        let messageText = msg.message_text || '';

                        // Extract actual user message from "Input:\nUser's Latest Message :[message]"
                        if (messageText.includes("User's Latest Message :")) {
                            const lastOccurrenceIndex = messageText.lastIndexOf("User's Latest Message :");
                            if (lastOccurrenceIndex !== -1) {
                                const textAfterLastOccurrence = messageText.substring(lastOccurrenceIndex + "User's Latest Message :".length);
                                const lines = textAfterLastOccurrence.split('\n');
                                if (lines.length > 0) {
                                    messageText = lines[0].trim();
                                }
                            }
                        } else if (messageText.startsWith('Input:\n')) {
                            // Skip pure metadata messages
                            continue;
                        }

                        if (messageText && messageText.trim()) {
                            return this.stripMarkdown(messageText);
                        }
                    }
                }
            }

            return null;
        } catch (error) {
            console.error('Error fetching first user message:', error);
            return null;
        }
    }

    async loadSessionChat(sessionId) {
        if (!this.chatRetrievalWebhookUrl) {
            console.error('Chat retrieval webhook URL not configured');
            return;
        }

        // Hide sessions list and show chat interface
        const chatsContent = document.querySelector('.chats-content');
        const chatsInterface = document.getElementById('chats-chat-interface');
        const backButton = document.getElementById('chatbot-back-button');

        if (chatsContent) chatsContent.style.display = 'none';
        if (chatsInterface) chatsInterface.style.display = 'flex';
        this.toggleNavigation(false); // Hide Navigation in chat mode
        if (backButton) {
            backButton.classList.remove('hidden');
            // Ensure it stays visible even if tab switch check runs later
            setTimeout(() => {
                if (backButton && chatsInterface && chatsInterface.style.display !== 'none') {
                    backButton.classList.remove('hidden');
                }
            }, 250);
        }

        // Set currentTab to indicate we're viewing a chat history
        this.currentTab = 'chats-history';

        // Store the full session ID for this chat session
        // If sessionId is just clean_session_id, we need to construct full_session_id
        let fullSessionId = sessionId;
        if (!sessionId.includes('/')) {
            // It's a clean_session_id, construct full_session_id
            fullSessionId = `${this.getUniqueId()}/${sessionId}`;
        }

        // Set current session ID (store the full format)
        this.currentSessionId = fullSessionId;
        localStorage.setItem('chatbot-session-id', fullSessionId);

        // Clear previous messages
        const messagesContainer = document.getElementById('chats-chat-messages');
        if (messagesContainer) messagesContainer.innerHTML = '';
        this.messages = [];

        // Show loading indicator
        this.showChatsTypingIndicator();

        try {
            const payload = {
                sessionId: fullSessionId,
                uniqueId: this.getUniqueId(),
                timestamp: new Date().toISOString()
            };

            const response = await fetch(this.chatRetrievalWebhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const chatMessages = await response.json();

            this.hideChatsTypingIndicator();

            if (Array.isArray(chatMessages) && chatMessages.length > 0) {
                // Sort by sequence_id if available
                const sortedMessages = chatMessages.sort((a, b) => {
                    return (a.sequence_id || 0) - (b.sequence_id || 0);
                });

                // Remove duplicate messages (same message_text and sender)
                const seenMessages = new Set();
                const uniqueMessages = sortedMessages.filter(msg => {
                    const key = `${msg.sender}_${msg.message_text}`;
                    if (seenMessages.has(key)) {
                        return false;
                    }
                    seenMessages.add(key);
                    return true;
                });

                // Display messages
                uniqueMessages.forEach(msg => {
                    this.displayChatMessage(msg);
                });

                // Scroll to bottom after loading
                setTimeout(() => {
                    const container = document.getElementById('chats-chat-messages');
                    if (container) {
                        container.scrollTop = container.scrollHeight;
                    }
                }, 100);
            }
        } catch (error) {
            console.error('Error fetching chat messages:', error);
            this.hideChatsTypingIndicator();
            this.addChatsMessage('Error loading chat messages. Please try again.', 'assistant');
        }
    }

    displayChatMessage(msg) {
        let messageText = msg.message_text || '';
        const sender = msg.sender === 'human' ? 'user' : 'assistant';

        // Handle human messages - robustly clean up verbose prefixes
        if (sender === 'user' || msg.sender === 'human') {
            let cleaned = messageText;

            // Specific known prefixes to strip
            const prefixes = [
                "Input:",
                "User's Latest Message :",
                "User's Latest Message:",
                "Latest Message:",
                "Latest Message"
            ];

            // Recursively strip prefixes until none remain
            let foundPrefix = true;
            while (foundPrefix) {
                foundPrefix = false;
                cleaned = cleaned.trim();
                for (const prefix of prefixes) {
                    if (cleaned.startsWith(prefix) || cleaned.toLowerCase().startsWith(prefix.toLowerCase())) {
                        cleaned = cleaned.substring(prefix.length).trim();
                        foundPrefix = true;
                    }
                }
            }

            // Check for and strip trailing metadata blocks
            const metadataIndicators = [
                'Target Language:',
                'Primary Language:',
                'Current Time:',
                '## '
            ];

            for (const indicator of metadataIndicators) {
                // Check for indicator preceded by newline
                const newlineIdx = cleaned.indexOf('\n' + indicator);
                if (newlineIdx !== -1) {
                    cleaned = cleaned.substring(0, newlineIdx).trim();
                } else {
                    // Also check if it's strictly at the start (rare but possible if message is empty)
                    if (cleaned.startsWith(indicator)) {
                        cleaned = '';
                    }
                }
            }

            messageText = cleaned;

            if (!messageText) {
                return;
            }
        }

        // Handle AI messages
        if (sender === 'assistant' || msg.sender === 'ai') {
            // Check if message contains JSON (may be in markdown code blocks or plain)
            let cleanedText = messageText;

            // Remove markdown code block markers (```json\n...```)
            cleanedText = cleanedText.replace(/^```json\n/, '').replace(/\n```$/, '');

            // Check if message is JSON
            if (cleanedText.includes('json\n')) {
                try {
                    // Find the JSON part (everything after "json\n")
                    const jsonIndex = cleanedText.indexOf('json\n');
                    let jsonStr = cleanedText.substring(jsonIndex + 5).trim(); // Skip "json\n"
                    // Remove trailing backticks if present
                    jsonStr = jsonStr.replace(/```$/, '').trim();

                    // Try to parse the JSON
                    const parsed = JSON.parse(jsonStr);

                    // Use response_text if available
                    if (parsed.response_text) {
                        messageText = parsed.response_text;
                    } else {
                        // Use text before JSON if response_text not found
                        const textBeforeJson = messageText.substring(0, jsonIndex).trim();
                        if (textBeforeJson) {
                            messageText = textBeforeJson;
                        }
                    }
                } catch (e) {
                    console.error('Error parsing message JSON:', e);
                    // If JSON parsing fails, try to use text before "json\n"
                    const jsonIndex = messageText.indexOf('json\n');
                    if (jsonIndex > 0) {
                        messageText = messageText.substring(0, jsonIndex).trim();
                    }
                }
            } else if (cleanedText.trim().startsWith('{')) {
                // Try to parse as direct JSON (no "json\n" prefix)
                try {
                    const parsed = JSON.parse(cleanedText);
                    if (parsed.response_text) {
                        messageText = parsed.response_text;
                    }
                } catch (e) {
                    console.error('Error parsing direct JSON:', e);
                    // Keep original message if parsing fails
                }
            }
            // If no JSON, use message as-is (already plain text)
        }

        // Skip empty messages
        if (!messageText || messageText.trim() === '') {
            return;
        }

        // Add message to chat (formatMarkdownAndHTML will be called by addChatsMessage)
        // Extract timestamp from message object (support timestamp or created_at)
        const timestamp = msg.timestamp || msg.created_at || null;
        this.addChatsMessage(messageText, sender, timestamp);
    }

    formatMarkdownAndHTML(text) {
        if (!text || typeof text !== 'string') return '';

        // Convert markdown links to clickable HTML links
        // [link text](url) -> <a href="url" target="_blank" rel="noopener noreferrer">link text</a>
        let formatted = text;

        // 1. Handle code blocks (triple backticks)
        formatted = formatted.replace(/```(\w*)([\s\S]*?)```/g, '<pre><code class="language-$1">$2</code></pre>');

        // 2. Handle inline code (single backticks)
        formatted = formatted.replace(/`([^`]+)`/g, '<code>$1</code>');

        // 3. Handle bold (**text**)
        formatted = formatted.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

        // 4. Handle italic (*text*)
        formatted = formatted.replace(/\*([^*]+)\*/g, '<em>$1</em>');

        // 5. Handle links [text](url)
        formatted = formatted.replace(/\[([^\]]+)\]\(([^\)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

        return formatted;
    }

    stripMarkdown(text) {
        // Keep this for preview text that should be plain
        if (!text || typeof text !== 'string') return text;
        return text
            .replace(/\*\*(.*?)\*\*/g, '$1')
            .replace(/\*(.*?)\*/g, '$1')
            .replace(/_(.*?)_/g, '$1')
            .replace(/~~(.*?)~~/g, '$1')
            .replace(/`(.*?)`/g, '$1')
            .replace(/#{1,6}\s+/g, '')
            .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
            .trim();
    }

    formatTimestamp(activeId) {
        // Debug logging
        // console.log('formatTimestamp input:', activeId, typeof activeId);

        // Handle null, undefined, or invalid values
        if (!activeId || activeId === null || activeId === undefined) {
            return 'Recently';
        }

        let timestamp = null;

        // Try to parse the input
        if (typeof activeId === 'number') {
            timestamp = activeId;
        } else if (typeof activeId === 'string') {
            // Try parsing as number first
            const numId = parseInt(activeId);
            // Check if it's a likely timestamp (e.g. not a small integer ID like 1054)
            if (!isNaN(numId) && numId > 0 && numId > 1000000000) {
                timestamp = numId;
            } else {
                // Try parsing as date string
                const date = new Date(activeId);
                if (!isNaN(date.getTime()) && date.getTime() > 0) {
                    timestamp = date.getTime();
                }
            }
        }

        if (!timestamp) {
            // console.log('Could not parse timestamp from:', activeId);
            return 'Recently';
        }

        // Calculate relative time
        const now = new Date().getTime();
        const diff = now - timestamp;

        // console.log('Time diff (ms):', diff, 'Calculated from:', timestamp, 'Now:', now);

        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (seconds < 60) {
            return 'Just now';
        } else if (minutes < 60) {
            return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
        } else if (hours < 24) {
            return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
        } else if (days < 7) {
            return `${days} day${days !== 1 ? 's' : ''} ago`;
        } else {
            // Fallback to date for older items
            return new Date(timestamp).toLocaleDateString();
        }
    }

    // Navigation Methods
    toggleNavigation(show) {
        const nav = document.querySelector('.chatbot-navigation');
        if (nav) {
            nav.style.display = show ? 'flex' : 'none';
        }
    }

    switchTab(tabName) {
        this.toggleNavigation(true); // Always show nav when switching tabs

        // Get current state
        const homeChatInterface = document.getElementById('chatbot-chat-interface');
        const chatsChatInterface = document.getElementById('chats-chat-interface');

        // Check if chat interfaces are visible
        const isHomeChatVisible = homeChatInterface && (
            homeChatInterface.style.display !== 'none' &&
            window.getComputedStyle(homeChatInterface).display !== 'none'
        );
        const isChatsChatVisible = chatsChatInterface && (
            chatsChatInterface.style.display !== 'none' &&
            window.getComputedStyle(chatsChatInterface).display !== 'none'
        );

        // Case 1: Switching to home tab
        if (tabName === 'home') {
            // Always ensure home chat interface is hidden and home main view is shown
            const homeChatInterface = document.getElementById('chatbot-chat-interface');
            const homeInitialOptions = document.getElementById('chatbot-initial-options');
            const topActionButtons = document.querySelector('.top-action-buttons');
            const backButton = document.getElementById('chatbot-back-button');

            if (isHomeChatVisible) {
                // Force home main view to be shown
                const heroSection = document.querySelector('.hero-section');
                if (homeChatInterface) homeChatInterface.style.display = 'none';
                if (homeInitialOptions) homeInitialOptions.style.display = 'flex';
                if (heroSection) heroSection.style.display = 'block'; // Show Hero on Home
                if (topActionButtons) topActionButtons.style.display = 'flex';
                if (backButton) backButton.classList.add('hidden');
                this.currentTab = 'home';
            } else {
                // Still ensure home main view is visible (in case it's hidden)
                if (homeChatInterface) homeChatInterface.style.display = 'none';
                if (homeInitialOptions) homeInitialOptions.style.display = 'flex';
                if (topActionButtons) topActionButtons.style.display = 'flex';
                if (backButton) backButton.classList.add('hidden');
            }
            // Always continue to switch tabs
        }

        // Case 2: Switching to chats tab
        if (tabName === 'chats') {
            // Always show main chats page (sessions list) when switching to chats tab
            const chatsContent = document.querySelector('.chats-content');
            const chatsInterface = document.getElementById('chats-chat-interface');
            const backButton = document.getElementById('chatbot-back-button');

            // Ensure chats main view is shown and chat interface is hidden
            if (chatsInterface) chatsInterface.style.display = 'none';
            if (chatsContent) chatsContent.style.display = 'flex';
            if (backButton) backButton.classList.add('hidden');

            // Reset currentTab to 'chats' to indicate we're on main chats page
            this.currentTab = 'chats';

            // Fetch sessions to refresh the list
            this.fetchSessions();

            // Always continue to switch tabs
        }

        // Case 3: Switching to faq tab
        if (tabName === 'faq') {
            this.currentTab = 'faq';
            const backButton = document.getElementById('chatbot-back-button');
            if (backButton) backButton.classList.add('hidden');
        }

        // Always perform tab switching (even if goBack was called)
        // Use a small delay if goBack was called to ensure DOM updates complete
        const performTabSwitch = () => {
            // Remove active class from all nav buttons
            document.querySelectorAll('.nav-button').forEach(btn => {
                btn.classList.remove('active');
            });

            // Hide all tab content
            document.querySelectorAll('.tab-content').forEach(tab => {
                tab.classList.remove('active');
            });

            // Show selected tab
            const selectedTab = document.getElementById(`${tabName}-tab`);
            const selectedNav = document.getElementById(`nav-${tabName}`);

            if (selectedTab && selectedNav) {
                selectedTab.classList.add('active');
                selectedNav.classList.add('active');
            } else {
                console.error('Tab elements not found:', { selectedTab: !!selectedTab, selectedNav: !!selectedNav });
            }

            // After tab switch, ensure back button visibility is correct based on actual state
            // Use a longer delay to ensure any conversation opening has completed
            setTimeout(() => {
                const backButton = document.getElementById('chatbot-back-button');
                if (!backButton) return;

                const homeChatInterface = document.getElementById('chatbot-chat-interface');
                const chatsChatInterface = document.getElementById('chats-chat-interface');

                const isHomeChatVisible = homeChatInterface && (
                    homeChatInterface.style.display !== 'none' &&
                    window.getComputedStyle(homeChatInterface).display !== 'none'
                );
                const isChatsChatVisible = chatsChatInterface && (
                    chatsChatInterface.style.display !== 'none' &&
                    window.getComputedStyle(chatsChatInterface).display !== 'none'
                );

                // Show back button if we're in any chat interface
                if (isHomeChatVisible || isChatsChatVisible) {
                    backButton.classList.remove('hidden');
                } else {
                    // Only hide if we're definitely on a main view AND currentTab indicates we should be on main view
                    const homeInitialOptions = document.getElementById('chatbot-initial-options');
                    const chatsContent = document.querySelector('.chats-content');
                    const isHomeMain = homeInitialOptions && (
                        homeInitialOptions.style.display !== 'none' &&
                        window.getComputedStyle(homeInitialOptions).display !== 'none'
                    );
                    const isChatsMain = chatsContent && (
                        chatsContent.style.display !== 'none' &&
                        window.getComputedStyle(chatsContent).display !== 'none'
                    );

                    // Only hide back button if:
                    // 1. We're on a main view AND
                    // 2. currentTab indicates we should be on main view (not 'chats-history' or 'chats-new')
                    const shouldBeOnMainView = this.currentTab === 'home' || this.currentTab === 'chats' || this.currentTab === 'faq';

                    if ((isHomeMain || isChatsMain || this.currentTab === 'faq') && shouldBeOnMainView) {
                        backButton.classList.add('hidden');
                    }
                    // Else: Don't change back button state if transitioning
                }
            }, 250);
        };

        // If we manually reset views above, wait a bit for DOM updates, otherwise switch immediately
        if (tabName === 'home' && isHomeChatVisible) {
            setTimeout(performTabSwitch, 100);
        } else {
            performTabSwitch();
        }

        // Update currentTab to reflect the active tab after switching
        // Use setTimeout to check state after DOM updates
        setTimeout(() => {
            if (tabName === 'home') {
                // Check if we're actually on home main view (not in chat)
                const homeChatInterface = document.getElementById('chatbot-chat-interface');
                const homeInitialOptions = document.getElementById('chatbot-initial-options');
                const isHomeMain = homeInitialOptions && (
                    homeInitialOptions.style.display !== 'none' &&
                    window.getComputedStyle(homeInitialOptions).display !== 'none'
                );
                if (isHomeMain) {
                    this.currentTab = 'home';
                }
                // If in home chat, currentTab stays as 'home' (which is correct for goBack to work)
            } else if (tabName === 'chats') {
                // Check if we're actually on chats main view (sessions list, not in chat)
                const chatsChatInterface = document.getElementById('chats-chat-interface');
                const chatsContent = document.querySelector('.chats-content');
                const isChatsMain = chatsContent && (
                    chatsContent.style.display !== 'none' &&
                    window.getComputedStyle(chatsContent).display !== 'none'
                );
                if (isChatsMain) {
                    this.currentTab = 'chats';
                }
                // If in chats chat, currentTab should be 'chats-history' or 'chats-new' (set by loadSessionChat/startChatsChat)
            }
        }, 50);

        // Show/hide top action buttons only on home tab initial view
        const topActionButtons = document.querySelector('.top-action-buttons');
        const initialOptions = document.getElementById('chatbot-initial-options');
        const chatInterface = document.getElementById('chatbot-chat-interface');

        if (tabName === 'home' && topActionButtons) {
            // Show buttons only if initial options are visible (not in chat mode)
            if (initialOptions && initialOptions.style.display !== 'none') {
                topActionButtons.style.display = 'flex';
            } else {
                topActionButtons.style.display = 'none';
            }
        } else if (topActionButtons) {
            topActionButtons.style.display = 'none';
        }

        // Sessions are already fetched when switching to chats tab (see Case 2 above)
    }
}
// --- Session ID setup ---
function getSessionId() {
    // Try to load existing session ID from localStorage
    let sessionId = localStorage.getItem("chatbot-session-id");

    // If none exists, generate a new one
    if (!sessionId) {
        sessionId = crypto.randomUUID(); // built-in UUID generator
        localStorage.setItem("chatbot-session-id", sessionId);
    }

    return sessionId;
}

// Example: assign to a global variable when chatbot starts
const CHATBOT_SESSION_ID = getSessionId();

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.chatbot = new ChatbotWidget();
});
