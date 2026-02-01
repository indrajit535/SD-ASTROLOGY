import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLanguage } from '../store/slices/languageSlice';
import GlassCard from '../components/Common/GlassCard';
import GradientButton from '../components/Common/GradientButton';
import { colors } from '../theme/colors';
import { languages } from '../constants/languages';
import palmLogo from '../assets/images/palm-logo.svg';

const LanguageSelection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Try to get previously selected language from localStorage
    const savedLang = localStorage.getItem('app_language');
    if (savedLang && languages[savedLang]) {
      setSelectedLanguage(savedLang);
    }
  }, []);

  const handleLanguageSelect = (langCode) => {
    setSelectedLanguage(langCode);
    // Add selection animation
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleContinue = () => {
    if (selectedLanguage) {
      // Save to localStorage
      localStorage.setItem('app_language', selectedLanguage);
      
      // Update Redux store
      dispatch(setLanguage(selectedLanguage));
      
      // Navigate to onboarding
      navigate('/onboarding');
    }
  };

  const getLanguageText = (key) => {
    const texts = {
      title: {
        en: 'Choose Your Language',
        hi: 'अपनी भाषा चुनें',
        es: 'Elige tu idioma',
        fr: 'Choisissez votre langue',
        it: 'Scegli la tua lingua',
        ko: '언어를 선택하세요',
      },
      continue: {
        en: 'Continue',
        hi: 'जारी रखें',
        es: 'Continuar',
        fr: 'Continuer',
        it: 'Continua',
        ko: '계속',
      },
      subtitle: {
        en: 'Select language for your spiritual journey',
        hi: 'अपनी आध्यात्मिक यात्रा के लिए भाषा चुनें',
        es: 'Selecciona el idioma para tu viaje espiritual',
        fr: 'Sélectionnez la langue pour votre voyage spirituel',
        it: 'Seleziona la lingua per il tuo viaggio spirituale',
        ko: '영적 여정을 위한 언어를 선택하세요',
      },
    };
    
    return texts[key]?.[selectedLanguage] || texts[key]?.en;
  };

  return (
    <div style={styles.container}>
      {/* Animated cosmic background */}
      <div style={styles.background} />
      
      <GlassCard style={styles.card}>
        {/* App Logo */}
        <div style={styles.logoContainer}>
          <div style={styles.logoCircle}>
            <img 
              src={palmLogo} 
              alt="Palm Reader Logo" 
              style={styles.logo}
            />
          </div>
          <h1 style={styles.appTitle}>🔮 AI Palm Reader</h1>
          <p style={styles.appSubtitle}>
            {getLanguageText('subtitle')}
          </p>
        </div>

        {/* Language Selection */}
        <div style={styles.languageSection}>
          <h2 style={styles.sectionTitle}>
            {getLanguageText('title')}
          </h2>
          
          <div style={styles.languageGrid}>
            {Object.entries(languages).map(([code, lang]) => (
              <button
                key={code}
                onClick={() => handleLanguageSelect(code)}
                style={{
                  ...styles.languageButton,
                  ...(selectedLanguage === code ? styles.selectedButton : {}),
                  transform: isAnimating && selectedLanguage === code ? 'scale(0.95)' : 'scale(1)',
                }}
                className="language-button"
              >
                <div style={styles.flagContainer}>
                  <span style={styles.flag}>{lang.flag}</span>
                </div>
                <div style={styles.languageInfo}>
                  <span style={styles.languageName}>
                    {lang.nativeName}
                  </span>
                  <span style={styles.languageNameEn}>
                    {lang.name}
                  </span>
                </div>
                {selectedLanguage === code && (
                  <div style={styles.selectedIndicator}>
                    <div style={styles.selectedDot} />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Continue Button */}
        <div style={styles.buttonContainer}>
          <GradientButton
            onClick={handleContinue}
            disabled={!selectedLanguage}
            fullWidth
            style={styles.continueButton}
          >
            {getLanguageText('continue')} →
          </GradientButton>
        </div>

        {/* Subtle disclaimer */}
        <p style={styles.disclaimer}>
          {selectedLanguage === 'hi' 
            ? 'ध्यान दें: यह ऐप केवल मनोरंजन और आध्यात्मिक प्रतिबिंब के लिए है। भविष्यवाणियों की गारंटी नहीं है।'
            : 'Note: This app is for entertainment and spiritual reflection only. No predictions are guaranteed.'}
        </p>
      </GlassCard>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    position: 'relative',
    overflow: 'hidden',
  },
  background: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: colors.gradients.cosmic,
    zIndex: -1,
  },
  card: {
    width: '100%',
    maxWidth: '450px',
    padding: '30px 24px',
    borderRadius: '32px',
    position: 'relative',
    zIndex: 1,
  },
  logoContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '32px',
  },
  logoCircle: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    background: colors.gradients.primary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px',
    boxShadow: `0 0 40px ${colors.accent.neonBlue}40`,
  },
  logo: {
    width: '60px',
    height: '60px',
    filter: 'brightness(0) invert(1)',
  },
  appTitle: {
    fontSize: '28px',
    fontWeight: '800',
    background: colors.gradients.primary,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: '0 0 8px 0',
    textAlign: 'center',
  },
  appSubtitle: {
    fontSize: '16px',
    color: colors.text.tertiary,
    textAlign: 'center',
    margin: 0,
    lineHeight: 1.5,
  },
  languageSection: {
    marginBottom: '32px',
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: '24px',
    textAlign: 'center',
  },
  languageGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '12px',
  },
  languageButton: {
    display: 'flex',
    alignItems: 'center',
    padding: '16px',
    background: 'rgba(255, 255, 255, 0.05)',
    border: `1px solid ${colors.glass.border}`,
    borderRadius: '20px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    position: 'relative',
    textAlign: 'left',
    outline: 'none',
  },
  selectedButton: {
    background: 'rgba(59, 130, 246, 0.15)',
    border: `2px solid ${colors.accent.neonBlue}`,
    boxShadow: `0 0 20px ${colors.accent.neonBlue}40`,
    transform: 'translateY(-2px)',
  },
  flagContainer: {
    marginRight: '12px',
  },
  flag: {
    fontSize: '28px',
  },
  languageInfo: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  languageName: {
    fontSize: '16px',
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: '2px',
  },
  languageNameEn: {
    fontSize: '12px',
    color: colors.text.tertiary,
  },
  selectedIndicator: {
    position: 'absolute',
    top: '-6px',
    right: '-6px',
    width: '24px',
    height: '24px',
    background: colors.gradients.primary,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: `0 2px 8px ${colors.accent.neonBlue}80`,
  },
  selectedDot: {
    width: '8px',
    height: '8px',
    background: colors.text.primary,
    borderRadius: '50%',
  },
  buttonContainer: {
    marginBottom: '24px',
  },
  continueButton: {
    height: '56px',
    fontSize: '18px',
    fontWeight: '600',
    borderRadius: '28px',
  },
  disclaimer: {
    fontSize: '12px',
    color: colors.text.muted,
    textAlign: 'center',
    lineHeight: 1.5,
    padding: '0 16px',
    margin: 0,
  },
};

// Add hover effects via CSS
const buttonHoverStyles = `
  .language-button:hover {
    background: rgba(255, 255, 255, 0.1) !important;
    border-color: ${colors.accent.cyan} !important;
    transform: translateY(-2px) !important;
  }
  
  .language-button:active {
    transform: scale(0.98) !important;
  }
`;

// Add styles to document
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = buttonHoverStyles;
  document.head.appendChild(styleElement);
}

export default LanguageSelection;
