import { createContext, useContext, useState, useEffect } from 'react';

const LangContext = createContext();

export const useLang = () => {
  const context = useContext(LangContext);
  if (!context) {
    throw new Error('useLang must be used within a LangProvider');
  }
  return context;
};

export const LangProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Force Amharic as default and clear any existing English preference
    const stored = localStorage.getItem('language');
    if (!stored || stored === 'en') {
      localStorage.setItem('language', 'am');
      return 'am';
    }
    return stored;
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'am' : 'en');
  };

  const t = (key) => {
    const translations = {
      en: {
        // Navigation
        'nav.home': 'Home',
        'nav.products': 'Products',
        'nav.cart': 'Cart',
        'nav.about': 'About',
        'nav.contact': 'Contact',
        'brand.name': 'SHOPPIT',
        
        // Cart
        'cart.empty': 'Your cart is empty',
        'cart.emptyDesc': 'Add some products to get started!',
        'cart.title': 'Shopping Cart',
        'cart.subtotal': 'Subtotal',
        'cart.tax': 'Tax',
        'cart.total': 'Total',
        'cart.checkout': 'Proceed to Checkout',
        'cart.remove': 'Remove',
        'cart.summary': 'Cart Summary',
        
        // Product
        'product.addToCart': 'Add to Cart',
        'product.addedToCart': 'Added to Cart',
        'product.outOfStock': 'Out of Stock',
        'product.inStock': 'In Stock',
        'product.price': 'Price',
        'product.description': 'Description',
        'product.reviews': 'Reviews',
        'product.rating': 'Rating',
        'product.brand': 'Brand',
        'product.category': 'Category',
        'product.similar': 'Similar Products',
        'product.quantity': 'Quantity',
        
        // Homepage
        'home.title': 'Welcome to SHOPPIT',
        'home.subtitle': 'Discover amazing products at great prices',
        'home.featured': 'Featured Products',
        'home.categories': 'Shop by Category',
        'home.viewAll': 'View All Products',
        
        // Footer
        'footer.about': 'About Us',
        'footer.contact': 'Contact',
        'footer.privacy': 'Privacy Policy',
        'footer.terms': 'Terms of Service',
        'footer.followUs': 'Follow Us',
        'footer.rights': 'All rights reserved',
        
        // Common
        'common.loading': 'Loading...',
        'common.error': 'Something went wrong',
        'common.retry': 'Try Again',
        'common.search': 'Search',
        'common.filter': 'Filter',
        'common.sort': 'Sort',
        'common.save': 'Save',
        'common.cancel': 'Cancel',
        'common.edit': 'Edit',
        'common.delete': 'Delete',
        'common.view': 'View',
        
        // Authentication
        'auth.login': 'Login',
        'auth.signup': 'Sign Up',
        'auth.logout': 'Logout',
        'auth.username': 'Username',
        'auth.email': 'Email',
        'auth.password': 'Password',
        'auth.confirmPassword': 'Confirm Password',
        'auth.firstName': 'First Name',
        'auth.lastName': 'Last Name',
        'auth.phone': 'Phone Number',
        'auth.city': 'City',
        'auth.state': 'State',
        'auth.address': 'Address',
        'auth.noAccount': "Don't have an account?",
        'auth.hasAccount': 'Already have an account?',
        'auth.forgotPassword': 'Forgot Password?',
        'auth.loginSuccess': 'Login successful!',
        'auth.signupSuccess': 'Account created successfully!',
        'auth.loginFailed': 'Login failed. Please check your credentials.',
        'auth.signupFailed': 'Signup failed. Please try again.',
        'auth.passwordMismatch': 'Passwords do not match',
        'auth.welcome': 'Welcome back!',
      },
      am: {
        // Navigation
        'nav.home': 'ቤት',
        'nav.products': 'ምርቶች',
        'nav.cart': 'ጋሪ',
        'nav.about': 'ስለ እኛ',
        'nav.contact': 'ያግኙን',
        'brand.name': 'ባለ ሱቅ',
        
        // Cart
        'cart.empty': 'የእርስዎ ጋሪ ባዶ ነው',
        'cart.emptyDesc': 'ምርቶችን ለመጀመር ይጨምሩ!',
        'cart.title': 'የግዢ ጋሪ',
        'cart.subtotal': 'ንዑስ ድምር',
        'cart.tax': 'ታክስ',
        'cart.total': 'ድምር',
        'cart.checkout': 'ወደ ክፍያ ይሂዱ',
        'cart.remove': 'አስወግድ',
        'cart.summary': 'የጋሪ ማጠቃለያ',
        
        // Product
        'product.addToCart': 'ወደ ጋሪ ጨምር',
        'product.addedToCart': 'ወደ ጋሪ ተጨምሯል',
        'product.outOfStock': 'አልተገኘም',
        'product.inStock': 'በመጋዘን ውስጥ',
        'product.price': 'ዋጋ',
        'product.description': 'መግለጫ',
        'product.reviews': 'ግምገማዎች',
        'product.rating': 'ደረጃ',
        'product.brand': 'ብራንድ',
        'product.category': 'ምድብ',
        'product.similar': 'ተመሳሳይ ምርቶች',
        'product.quantity': 'መጠን',
        
        // Homepage
        'home.title': 'ወደ ባለ ሱቅ እንኳን በደህና መጡ',
        'home.subtitle': 'በጥሩ ዋጋ አስደናቂ ምርቶችን ያግኙ',
        'home.featured': 'ተመራጭ ምርቶች',
        'home.categories': 'በምድብ ይግዙ',
        'home.viewAll': 'ሁሉንም ምርቶች ይመልከቱ',
        
        // Footer
        'footer.about': 'ስለ እኛ',
        'footer.contact': 'ያግኙን',
        'footer.privacy': 'የግላዊነት ፖሊሲ',
        'footer.terms': 'የአገልግሎት ውል',
        'footer.followUs': 'ይከተሉን',
        'footer.rights': 'ሁሉም መብቶች የተጠበቁ ናቸው',
        
        // Common
        'common.loading': 'በመጫን ላይ...',
        'common.error': 'የሆነ ችግር ተፈጥሯል',
        'common.retry': 'እንደገና ይሞክሩ',
        'common.search': 'ይፈልጉ',
        'common.filter': 'ያጣሩ',
        'common.sort': 'ይደርዱ',
        'common.save': 'ያስቀምጡ',
        'common.cancel': 'ይሰርዙ',
        'common.edit': 'ያርትዑ',
        'common.delete': 'ይሰርዙ',
        'common.view': 'ይመልከቱ',
        
        // Authentication
        'auth.login': 'ግባ',
        'auth.signup': 'ተመዝገብ',
        'auth.logout': 'ውጣ',
        'auth.username': 'የተጠቃሚ ስም',
        'auth.email': 'ኢሜይል',
        'auth.password': 'የይለፍ ቃል',
        'auth.confirmPassword': 'የይለፍ ቃል አረጋግጥ',
        'auth.firstName': 'ስም',
        'auth.lastName': 'የአባት ስም',
        'auth.phone': 'ስልክ ቁጥር',
        'auth.city': 'ከተማ',
        'auth.state': 'ክልል',
        'auth.address': 'አድራሻ',
        'auth.noAccount': 'መለያ የለዎትም?',
        'auth.hasAccount': 'መለያ አለዎት?',
        'auth.forgotPassword': 'የይለፍ ቃል ረሱ?',
        'auth.loginSuccess': 'በተሳካ ሁኔታ ገብተዋል!',
        'auth.signupSuccess': 'መለያ በተሳካ ሁኔታ ተፈጥሯል!',
        'auth.loginFailed': 'መግባት አልተሳካም። እባክዎ መረጃዎን ያረጋግጡ።',
        'auth.signupFailed': 'ምዝገባ አልተሳካም። እባክዎ እንደገና ይሞክሩ።',
        'auth.passwordMismatch': 'የይለፍ ቃሎች አይዛመዱም',
        'auth.welcome': 'እንኳን ደህና መጡ!',
      }
    };

    return translations[language]?.[key] || key;
  };

  return (
    <LangContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LangContext.Provider>
  );
};