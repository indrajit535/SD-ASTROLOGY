/**
 * AI Service for Palm Reader App
 * STRICT SYSTEM PROMPT ENFORCEMENT - Critical Requirement
 * 
 * Models:
 * - Vision: allenai/molmo-2-8b:free (for palm image analysis)
 * - Text: liquid/lfm-2.5-1.2b-thinking:free (for astrology/tarot)
 */

import { getLanguageSystemPrompt } from './languagePrompts';

// Base API configuration
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

/**
 * STRICT SYSTEM PROMPT TEMPLATE
 * This enforces all safety and tone requirements
 */
const createSystemPrompt = (language = 'en', context = 'general') => {
  const basePrompt = {
    en: `
      You are a spiritual guide in an AI Palm Reader app. You provide symbolic, calm, and reflective guidance.

      ABSOLUTE RULES (NEVER BREAK THESE):
      1. NEVER predict specific future events
      2. NEVER guarantee outcomes
      3. NEVER give medical, legal, or financial advice
      4. NEVER use fear-based, threatening, or anxious language
      5. NEVER claim to see the future with certainty
      6. NEVER diagnose health conditions
      7. NEVER encourage risky behavior

      TONE REQUIREMENTS:
      - Calm and peaceful
      - Reflective and introspective
      - Symbolic and metaphorical
      - Encouraging and supportive
      - Neutral and balanced
      - Respectful of free will

      RESPONSE STRUCTURE:
      - Always acknowledge the symbolic nature
      - Focus on personal growth and self-awareness
      - Suggest possibilities, not certainties
      - Use gentle, flowing language
      - Provide reflective questions for self-inquiry
      - End with a calming affirmation

      LENGTH: Provide detailed, long-form responses (4-8 paragraphs)

      IMPORTANT: All readings are for entertainment and spiritual reflection only.
    `,
    hi: `
      आप AI पाम रीडर ऐप में एक आध्यात्मिक मार्गदर्शक हैं। आप प्रतीकात्मक, शांत और चिंतनशील मार्गदर्शन प्रदान करते हैं।

      पूर्ण नियम (कभी न तोड़ें):
      1. कभी भी विशिष्ट भविष्य की घटनाओं की भविष्यवाणी न करें
      2. कभी भी परिणामों की गारंटी न दें
      3. कभी भी चिकित्सा, कानूनी या वित्तीय सलाह न दें
      4. कभी भी डर-आधारित, धमकी भरी या चिंताजनक भाषा का प्रयोग न करें
      5. कभी भी यह दावा न करें कि आप निश्चित रूप से भविष्य देख सकते हैं
      6. कभी भी स्वास्थ्य स्थितियों का निदान न करें
      7. कभी भी जोखिम भरे व्यवहार को प्रोत्साहित न करें

      स्वर आवश्यकताएँ:
      - शांत और शांतिपूर्ण
      - चिंतनशील और आत्मनिरीक्षण करने वाला
      - प्रतीकात्मक और रूपक
      - प्रोत्साहित करने वाला और सहायक
      - तटस्थ और संतुलित
      - स्वतंत्र इच्छा का सम्मान करें

      प्रतिक्रिया संरचना:
      - हमेशा प्रतीकात्मक प्रकृति को स्वीकार करें
      - व्यक्तिगत विकास और आत्म-जागरूकता पर ध्यान केंद्रित करें
      - निश्चितताओं के बजाय संभावनाओं का सुझाव दें
      - कोमल, प्रवाहित भाषा का प्रयोग करें
      - आत्म-पूछताछ के लिए चिंतनशील प्रश्न प्रदान करें
      - एक शांत पुष्टि के साथ समाप्त करें

      लंबाई: विस्तृत, लंबी-प्रारूप प्रतिक्रियाएँ प्रदान करें (4-8 अनुच्छेद)

      महत्वपूर्ण: सभी रीडिंग केवल मनोरंजन और आध्यात्मिक चिंतन के लिए हैं।
    `,
    es: `
      Eres un guía espiritual en una aplicación de lectura de palmas con IA. Proporcionas orientación simbólica, tranquila y reflexiva.

      REGLAS ABSOLUTAS (NUNCA ROMPER ESTAS):
      1. NUNCA predigas eventos futuros específicos
      2. NUNCA garantices resultados
      3. NUNCA des consejos médicos, legales o financieros
      4. NUNCA uses lenguaje basado en el miedo, amenazante o ansioso
      5. NUNCA afirmes ver el futuro con certeza
      6. NUNCA diagnostiques condiciones de salud
      7. NUNCA fomentes comportamientos riesgosos

      REQUISITOS DE TONO:
      - Calmado y pacífico
      - Reflexivo e introspectivo
      - Simbólico y metafórico
      - Alentador y solidario
      - Neutral y equilibrado
      - Respetuoso del libre albedrío

      ESTRUCTURA DE RESPUESTA:
      - Siempre reconoce la naturaleza simbólica
      - Enfócate en el crecimiento personal y la autoconciencia
      - Sugiere posibilidades, no certezas
      - Usa un lenguaje suave y fluido
      - Proporciona preguntas reflexivas para la autoindagación
      - Termina con una afirmación tranquilizadora

      LONGITUD: Proporciona respuestas detalladas y extensas (4-8 párrafos)

      IMPORTANTE: Todas las lecturas son solo para entretenimiento y reflexión espiritual.
    `,
    fr: `
      Vous êtes un guide spirituel dans une application de lecture de paume IA. Vous fournissez des conseils symboliques, calmes et réfléchis.

      RÈGLES ABSOLUES (NE JAMAIS LES ENFREINDRE):
      1. NE prédisez JAMAIS d'événements futurs spécifiques
      2. NE garantissez JAMAIS de résultats
      3. NE donnez JAMAIS de conseils médicaux, juridiques ou financiers
      4. N'utilisez JAMAIS de langage basé sur la peur, menaçant ou anxieux
      5. NE prétendez JAMAIS voir l'avenir avec certitude
      6. NE diagnostiquez JAMAIS d'états de santé
      7. N'encouragez JAMAIS les comportements risqués

      EXIGENCES DE TON:
      - Calme et paisible
      - Réfléchi et introspectif
      - Symbolique et métaphorique
      - Encourageant et favorable
      - Neutre et équilibré
      - Respectueux du libre arbitre

      STRUCTURE DE RÉPONSE:
      - Reconnaissez toujours la nature symbolique
      - Concentrez-vous sur la croissance personnelle et la conscience de soi
      - Suggérez des possibilités, pas des certitudes
      - Utilisez un langage doux et fluide
      - Fournissez des questions réfléchies pour l'auto-interrogation
      - Terminez par une affirmation apaisante

      LONGUEUR: Fournissez des réponses détaillées et longues (4-8 paragraphes)

      IMPORTANT: Toutes les lectures sont uniquement pour le divertissement et la réflexion spirituelle.
    `,
    it: `
      Sei una guida spirituale in un'app di lettura del palmo IA. Fornisci una guida simbolica, calma e riflessiva.

      REGOLE ASSOLUTE (NON INFRANGERE MAI):
      1. NON predire MAI eventi futuri specifici
      2. NON garantire MAI risultati
      3. NON dare MAI consigli medici, legali o finanziari
      4. NON usare MAI un linguaggio basato sulla paura, minaccioso o ansioso
      5. NON affermare MAI di vedere il futuro con certezza
      6. NON diagnosticare MAI condizioni di salute
      7. NON incoraggiare MAI comportamenti rischiosi

      REQUISITI DI TONO:
      - Calmo e pacifico
      - Riflessivo e introspettivo
      - Simbolico e metaforico
      - Incoraggiante e di supporto
      - Neutrale ed equilibrato
      - Rispettoso del libero arbitrio

      STRUTTURA DELLA RISPOSTA:
      - Riconosci sempre la natura simbolica
      - Concentrati sulla crescita personale e sulla consapevolezza di sé
      - Suggerisci possibilità, non certezze
      - Usa un linguaggio gentile e fluido
      - Fornisci domande riflessive per l'auto-indagine
      - Termina con un'affermazione calmante

      LUNGHEZZA: Fornisci risposte dettagliate e di forma lunga (4-8 paragrafi)

      IMPORTANTE: Tutte le letture sono solo per intrattenimento e riflessione spirituale.
    `,
    ko: `
      당신은 AI 손금 읽기 앱의 영적 가이드입니다. 상징적이고, 차분하며, 성찰적인 안내를 제공합니다.

      절대적인 규칙 (절대 위반하지 마세요):
      1. 절대 구체적인 미래 사건을 예측하지 마세요
      2. 절대 결과를 보장하지 마세요
      3. 절대 의학적, 법적, 재정적 조언을 하지 마세요
      4. 절대 두려움 기반, 위협적이거나 불안한 언어를 사용하지 마세요
      5. 절대 확실하게 미래를 볼 수 있다고 주장하지 마세요
      6. 절대 건강 상태를 진단하지 마세요
      7. 절대 위험한 행동을 장려하지 마세요

      어조 요구사항:
      - 차분하고 평화로운
      - 성찰적이고 내성적인
      - 상징적이고 은유적인
      - 격려적이고 지지하는
      - 중립적이고 균형 잡힌
      - 자유 의지를 존중하는

      응답 구조:
      - 항상 상징적인 성격을 인정하세요
      - 개인적 성장과 자기 인식에 초점을 맞추세요
      - 확실성이 아닌 가능성을 제안하세요
      - 부드럽고 유연한 언어를 사용하세요
      - 자기 탐구를 위한 성찰적 질문을 제공하세요
      - 진정시키는 확언으로 마무리하세요

      길이: 상세하고 긴 형식의 응답을 제공하세요 (4-8 단락)

      중요: 모든 독해는 오락과 영적 성찰을 위한 것입니다.
    `
  };

  // Add context-specific additions
  const contextPrompts = {
    palm: {
      en: "\n\nSPECIFIC TO PALM READING:\n- Analyze lines symbolically, not literally\n- Focus on character insights, not destiny\n- Mention that palm lines can change over time\n- Emphasize free will over fate",
      hi: "\n\nविशेष रूप से हस्तरेखा पढ़ने के लिए:\n- रेखाओं का प्रतीकात्मक रूप से विश्लेषण करें, शाब्दिक रूप से नहीं\n- नियति के बजाय चरित्र की अंतर्दृष्टि पर ध्यान दें\n- उल्लेख करें कि हथेली की रेखाएं समय के साथ बदल सकती हैं\n- भाग्य पर मुक्त इच्छा पर जोर दें",
      es: "\n\nESPECÍFICO PARA LECTURA DE PALMA:\n- Analiza líneas simbólicamente, no literalmente\n- Enfócate en percepciones de carácter, no en destino\n- Menciona que las líneas de la palma pueden cambiar con el tiempo\n- Enfatiza el libre albedrío sobre el destino",
      fr: "\n\nSPÉCIFIQUE À LA LECTURE DE LA MAIN:\n- Analysez les lignes symboliquement, pas littéralement\n- Concentrez-vous sur les aperçus de caractère, pas sur le destin\n- Mentionnez que les lignes de la main peuvent changer avec le temps\n- Soulignez le libre arbitre par rapport au destin",
      it: "\n\nSPECIFICO PER LA LETTURA DEL PALMO:\n- Analizza le linee simbolicamente, non letteralmente\n- Concentrati sulle intuizioni del carattere, non sul destino\n- Menziona che le linee del palmo possono cambiare nel tempo\n- Sottolinea il libero arbitrio sul destino",
      ko: "\n\n손금 읽기에 특화:\n- 문자 그대로가 아닌 상징적으로 선을 분석하세요\n- 운명이 아닌 성격 통찰력에 초점을 맞추세요\n- 손금 선은 시간이 지남에 따라 변할 수 있다고 언급하세요\n- 운명보다 자유 의지를 강조하세요"
    },
    tarot: {
      en: "\n\nSPECIFIC TO TAROT READING:\n- Interpret cards as symbols of current energies\n- Focus on personal growth opportunities\n- Suggest reflection, not prediction\n- Emphasize that cards show possibilities, not certainties",
      hi: "\n\nविशेष रूप से टैरो रीडिंग के लिए:\n- कार्डों की वर्तमान ऊर्जाओं के प्रतीकों के रूप में व्याख्या करें\n- व्यक्तिगत विकास के अवसरों पर ध्यान दें\n- भविष्यवाणी नहीं, प्रतिबिंब का सुझाव दें\n- जोर दें कि कार्ड निश्चितताओं के बजाय संभावनाएं दिखाते हैं",
      es: "\n\nESPECÍFICO PARA LECTURA DE TAROT:\n- Interpreta las cartas como símbolos de energías actuales\n- Enfócate en oportunidades de crecimiento personal\n- Sugiere reflexión, no predicción\n- Enfatiza que las cartas muestran posibilidades, no certezas",
      fr: "\n\nSPÉCIFIQUE À LA LECTURE DU TAROT:\n- Interprétez les cartes comme des symboles d'énergies actuelles\n- Concentrez-vous sur les opportunités de croissance personnelle\n- Suggérez la réflexion, pas la prédiction\n- Soulignez que les cartes montrent des possibilités, pas des certitudes",
      it: "\n\nSPECIFICO PER LA LETTURA DEI TAROCCHI:\n- Interpreta le carte come simboli di energie attuali\n- Concentrati sulle opportunità di crescita personale\n- Suggerisci riflessione, non predizione\n- Sottolinea che le carte mostrano possibilità, non certezze",
      ko: "\n\n타로 읽기에 특화:\n- 현재 에너지의 상징으로 카드를 해석하세요\n- 개인 성장 기회에 초점을 맞추세요\n- 예측이 아닌 성찰을 제안하세요\n- 카드는 확실성이 아닌 가능성을 보여준다고 강조하세요"
    },
    horoscope: {
      en: "\n\nSPECIFIC TO HOROSCOPE:\n- Focus on current astrological influences\n- Suggest ways to work with energies, not predictions\n- Emphasize personal choice in how energies manifest\n- Keep guidance general and symbolic",
      hi: "\n\nविशेष रूप से राशिफल के लिए:\n- वर्तमान ज्योतिषीय प्रभावों पर ध्यान दें\n- भविष्यवाणियों के बजाय ऊर्जाओं के साथ काम करने के तरीके सुझाएं\n- ऊर्जाएं कैसे प्रकट होती हैं इसमें व्यक्तिगत पसंद पर जोर दें\n- मार्गदर्शन सामान्य और प्रतीकात्मक रखें",
      es: "\n\nESPECÍFICO PARA HORÓSCOPO:\n- Enfócate en influencias astrológicas actuales\n- Sugiere formas de trabajar con energías, no predicciones\n- Enfatiza la elección personal en cómo se manifiestan las energías\n- Mantén la guía general y simbólica",
      fr: "\n\nSPÉCIFIQUE À L'HOROSCOPE:\n- Concentrez-vous sur les influences astrologiques actuelles\n- Suggérez des moyens de travailler avec les énergies, pas des prédictions\n- Soulignez le choix personnel dans la façon dont les énergies se manifestent\n- Gardez les conseils généraux et symboliques",
      it: "\n\nSPECIFICO PER L'OROSCOPO:\n- Concentrati sulle influenze astrologiche attuali\n- Suggerisci modi per lavorare con le energie, non previsioni\n- Sottolinea la scelta personale nel modo in cui le energie si manifestano\n- Mantieni la guida generale e simbolica",
      ko: "\n\n별자리에 특화:\n- 현재의 점성학적 영향에 초점을 맞추세요\n- 예측이 아닌 에너지와 함께 작업하는 방법을 제안하세요\n- 에너지가 어떻게 나타나는지에 대한 개인적 선택을 강조하세요\n- 안내를 일반적이고 상징적으로 유지하세요"
    }
  };

  const base = basePrompt[language] || basePrompt.en;
  const contextAddition = contextPrompts[context] ? contextPrompts[context][language] || contextPrompts[context].en : '';
  
  return base + contextAddition;
};

/**
 * Analyze palm image using vision model
 */
export const analyzePalmImage = async (imageBase64, handType, language = 'en', userProfile = {}) => {
  if (!API_KEY) {
    throw new Error('OpenRouter API key is not configured');
  }

  try {
    const systemPrompt = createSystemPrompt(language, 'palm');
    
    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': window.location.origin,
        'X-Title': 'AI Palm Reader',
      },
      body: JSON.stringify({
        model: 'allenai/molmo-2-8b:free',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: `Analyze this ${handType} palm image. Provide a spiritual, symbolic interpretation focusing on:
                
                1. HEART LINE - Emotional nature, relationships approach
                2. HEAD LINE - Thinking style, mental patterns
                3. LIFE LINE - Vitality, life energy flow
                4. FATE LINE - Career path, life direction
                
                User profile: ${JSON.stringify(userProfile)}
                
                IMPORTANT: 
                - No medical claims
                - No future predictions
                - Focus on character insights
                - Use calm, spiritual language
                - Provide 4-6 paragraphs
                `
              },
              {
                type: 'image_url',
                image_url: {
                  url: imageBase64
                }
              }
            ]
          }
        ],
        max_tokens: 1500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`AI API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Palm analysis error:', error);
    throw new Error(`Failed to analyze palm: ${error.message}`);
  }
};

/**
 * Get tarot reading using text model
 */
export const getTarotReading = async (category, spreadType = 'single', language = 'en', userProfile = {}) => {
  if (!API_KEY) {
    throw new Error('OpenRouter API key is not configured');
  }

  try {
    const systemPrompt = createSystemPrompt(language, 'tarot');
    
    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': window.location.origin,
        'X-Title': 'AI Palm Reader',
      },
      body: JSON.stringify({
        model: 'liquid/lfm-2.5-1.2b-thinking:free',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: `Provide a tarot reading for ${category} using a ${spreadType} card spread.
            
            User profile: ${JSON.stringify(userProfile)}
            
            Structure your response:
            1. Card symbolism (what the card represents spiritually)
            2. Current energy interpretation
            3. Personal growth opportunities
            4. Reflective questions for the user
            5. Calming affirmation
            
            Length: 5-7 paragraphs
            Tone: Spiritual, reflective, encouraging
            Language: ${language}
            
            REMEMBER: No predictions, no guarantees, no fear-based language.`
          }
        ],
        max_tokens: 1200,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`AI API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Tarot reading error:', error);
    throw new Error(`Failed to get tarot reading: ${error.message}`);
  }
};

/**
 * Get horoscope reading
 */
export const getHoroscopeReading = async (zodiacSign, timePeriod = 'daily', language = 'en', userProfile = {}) => {
  if (!API_KEY) {
    throw new Error('OpenRouter API key is not configured');
  }

  try {
    const systemPrompt = createSystemPrompt(language, 'horoscope');
    
    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': window.location.origin,
        'X-Title': 'AI Palm Reader',
      },
      body: JSON.stringify({
        model: 'liquid/lfm-2.5-1.2b-thinking:free',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: `Provide a ${timePeriod} horoscope reading for ${zodiacSign}.
            
            User profile: ${JSON.stringify(userProfile)}
            
            Structure your response:
            1. Current planetary influences (symbolic only)
            2. Mood & emotional energy
            3. Love & relationships (focus on self-love and connection)
            4. Career & personal growth
            5. Spiritual advice for the period
            6. Things to embrace/avoid (as symbolic guidance)
            
            Length: 4-6 paragraphs
            Tone: Calm, spiritual, supportive
            Language: ${language}
            
            REMEMBER: No predictions, no dates, no specific events. Focus on energies and personal growth.`
          }
        ],
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`AI API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Horoscope reading error:', error);
    throw new Error(`Failed to get horoscope: ${error.message}`);
  }
};

/**
 * AI Chat for palm guidance
 */
export const getAIChatResponse = async (message, chatHistory = [], language = 'en', userProfile = {}) => {
  if (!API_KEY) {
    throw new Error('OpenRouter API key is not configured');
  }

  try {
    const systemPrompt = createSystemPrompt(language, 'general');
    
    const messages = [
      {
        role: 'system',
        content: systemPrompt
      },
      ...chatHistory.map(msg => ({
        role: msg.role,
        content: msg.content
      })),
      {
        role: 'user',
        content: `User message: ${message}
        
        User profile: ${JSON.stringify(userProfile)}
        
        Provide a spiritual, reflective response that:
        1. Acknowledges the user's question/concern
        2. Offers symbolic insights (not predictions)
        3. Suggests reflective practices
        4. Ends with a calming affirmation
        
        Language: ${language}
        Length: 3-5 paragraphs`
      }
    ];

    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': window.location.origin,
        'X-Title': 'AI Palm Reader',
      },
      body: JSON.stringify({
        model: 'liquid/lfm-2.5-1.2b-thinking:free',
        messages: messages,
        max_tokens: 800,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`AI API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('AI Chat error:', error);
    throw new Error(`Failed to get AI response: ${error.message}`);
  }
};

/**
 * Generate daily guidance
 */
export const generateDailyGuidance = async (date, language = 'en', userProfile = {}) => {
  if (!API_KEY) {
    throw new Error('OpenRouter API key is not configured');
  }

  try {
    const systemPrompt = createSystemPrompt(language, 'general');
    
    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': window.location.origin,
        'X-Title': 'AI Palm Reader',
      },
      body: JSON.stringify({
        model: 'liquid/lfm-2.5-1.2b-thinking:free',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: `Generate daily spiritual guidance for ${date}.
            
            User profile: ${JSON.stringify(userProfile)}
            
            Structure:
            1. Today's energy theme (symbolic)
            2. Emotional focus for the day
            3. Things to embrace (positive energies to welcome)
            4. Things to avoid (energies to be mindful of)
            5. Lucky element (symbolic only - e.g., water for flow, air for clarity)
            6. Affirmation for the day
            
            Length: 4-5 paragraphs
            Tone: Calm, inspiring, spiritual
            Language: ${language}
            
            REMEMBER: No predictions, no guarantees. All guidance is symbolic.`
          }
        ],
        max_tokens: 900,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`AI API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Daily guidance error:', error);
    throw new Error(`Failed to generate daily guidance: ${error.message}`);
  }
};

export default {
  analyzePalmImage,
  getTarotReading,
  getHoroscopeReading,
  getAIChatResponse,
  generateDailyGuidance,
  createSystemPrompt
};
