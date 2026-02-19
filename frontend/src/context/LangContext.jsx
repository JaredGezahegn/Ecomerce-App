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
        
        // Search and Filter
        'search.placeholder': 'Search products...',
        'search.filters': 'Filters',
        'search.category': 'Category',
        'search.allCategories': 'All Categories',
        'search.electronics': 'Electronics',
        'search.groceries': 'Groceries',
        'search.clothing': 'Clothing',
        'search.beauty': 'Beauty',
        'search.sortBy': 'Sort By',
        'search.default': 'Default',
        'search.priceLowHigh': 'Price: Low to High',
        'search.priceHighLow': 'Price: High to Low',
        'search.nameAZ': 'Name: A-Z',
        'search.rating': 'Rating',
        'search.reset': 'Reset',
        
        // Authentication
        'auth.login': 'Login',
        'auth.signup': 'Sign Up',
        'auth.logout': 'Logout',
        'auth.profile': 'Profile',
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

        // About Page
        'about.title': 'About Us',
        'about.subtitle': 'Your trusted partner for quality products and exceptional service',
        'about.subtitle2': 'At SHOPPIT, we believe shopping should be more than just a transaction. It\'s about discovering products that enhance your lifestyle, backed by a team that genuinely cares about your satisfaction.',
        'about.subtitle3': 'We carefully curate our selection to bring you the best brands and products across multiple categories. From the latest electronics to everyday essentials, we\'re committed to offering quality, value, and convenience in every purchase.',
        'about.mission.title': 'Our Mission',
        'about.mission.description': 'We are committed to providing high-quality products at affordable prices while delivering exceptional customer service. Our goal is to make online shopping convenient, secure, and enjoyable for everyone.',
        'about.features.shipping.title': 'Fast Shipping',
        'about.features.shipping.description': 'Quick and reliable delivery to your doorstep',
        'about.features.quality.title': 'Quality Products',
        'about.features.quality.description': 'Carefully selected items from trusted brands',
        'about.features.support.title': '24/7 Support',
        'about.features.support.description': 'Always here to help with your questions',
        'about.team.title': 'Meet Our Team',
        'about.team.description': 'Passionate professionals dedicated to your satisfaction',
        'about.team.ceo': 'Chief Executive Officer',
        'about.team.cto': 'Chief Technology Officer',
        'about.team.frontend': 'Frontend Developer',
        'about.team.backend': 'Backend Django Developer',
        'about.team.marketing': 'Marketing Director',
        'about.values.title': 'Our Values',
        'about.values.customer.title': 'Customer First',
        'about.values.customer.description': 'Your satisfaction is our top priority',
        'about.values.sustainability.title': 'Sustainability',
        'about.values.sustainability.description': 'Committed to environmental responsibility',
        'about.values.innovation.title': 'Innovation',
        'about.values.innovation.description': 'Constantly improving our services',
        'about.values.integrity.title': 'Integrity',
        'about.values.integrity.description': 'Honest and transparent in all we do',

        // Contact Page
        'contact.title': 'Get in Touch',
        'contact.subtitle': 'We\'d love to hear from you. Send us a message and we\'ll respond as soon as possible.',
        'contact.form.title': 'Send us a Message',
        'contact.form.description': 'Fill out the form below and we\'ll get back to you within 24 hours.',
        'contact.form.name': 'Full Name',
        'contact.form.namePlaceholder': 'Enter your full name',
        'contact.form.email': 'Email Address',
        'contact.form.emailPlaceholder': 'Enter your email address',
        'contact.form.subject': 'Subject',
        'contact.form.subjectPlaceholder': 'What is this about?',
        'contact.form.message': 'Message',
        'contact.form.messagePlaceholder': 'Tell us how we can help you...',
        'contact.form.send': 'Send Message',
        'contact.form.sending': 'Sending...',
        'contact.form.success': 'Thank you! Your message has been sent successfully.',
        'contact.info.title': 'Contact Information',
        'contact.info.description': 'Get in touch with us through any of these channels.',
        'contact.info.address.title': 'Our Address',
        'contact.info.address.value': '123 Commerce Street, Addis Ababa, Ethiopia',
        'contact.info.phone.title': 'Phone Number',
        'contact.info.phone.value': '+251 11 123 4567',
        'contact.info.email.title': 'Email Address',
        'contact.info.email.value': 'info@shoppit.com',
        'contact.info.hours.title': 'Business Hours',
        'contact.info.hours.value': 'Mon - Fri: 9:00 AM - 6:00 PM',
        'contact.social.title': 'Follow Us',

        // Profile Page
        'profile.notLoggedIn': 'Not Logged In',
        'profile.pleaseLogin': 'Please log in to view your profile',
        'profile.personalInfo': 'Personal Information',
        'profile.orders': 'Orders',
        'profile.reviews': 'Reviews',
        'profile.wishlist': 'Wishlist',
        'profile.myOrders': 'My Orders',
        'profile.addresses': 'Addresses',
        'profile.settings': 'Settings',
        'profile.security.title': 'Account Security',
        'profile.security.password': 'Password',
        'profile.security.passwordDesc': 'Keep your account secure with a strong password',
        'profile.security.changePassword': 'Change Password',
        'profile.security.twoFactor': 'Two-Factor Authentication',
        'profile.security.twoFactorDesc': 'Add an extra layer of security to your account',
        'profile.security.enable': 'Enable 2FA',
      },
      am: {
        // Navigation
        'nav.home': 'ቤት',
        'nav.products': 'ምርቶች',
        'nav.cart': 'ጋሪ',
        'nav.about': 'ስለ\u00A0እኛ',
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
        
        // Search and Filter
        'search.placeholder': 'ምርቶችን ይፈልጉ...',
        'search.filters': 'ማጣሪያዎች',
        'search.category': 'ምድብ',
        'search.allCategories': 'ሁሉም ምድቦች',
        'search.electronics': 'ኤሌክትሮኒክስ',
        'search.groceries': 'ግሮሰሪዎች',
        'search.clothing': 'ልብስ',
        'search.beauty': 'ውበት',
        'search.sortBy': 'ደርድር በ',
        'search.default': 'ነባሪ',
        'search.priceLowHigh': 'ዋጋ: ዝቅተኛ ወደ ከፍተኛ',
        'search.priceHighLow': 'ዋጋ: ከፍተኛ ወደ ዝቅተኛ',
        'search.nameAZ': 'ስም: ሀ-ፐ',
        'search.rating': 'ደረጃ',
        'search.reset': 'ዳግም አስጀምር',
        
        // Authentication
        'auth.login': 'ግባ',
        'auth.signup': 'ተመዝገብ',
        'auth.logout': 'ውጣ',
        'auth.profile': 'መገለጫ',
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

        // About Page
        'about.title': 'ስለ እኛ',
        'about.subtitle': 'ለጥራት ምርቶች እና ልዩ አገልግሎት የታመነ አጋርዎ',
        'about.customers': 'ደስተኛ ደንበኞች',
        'about.products': 'ምርቶች',
        'about.years': 'ዓመታት ልምድ',
        'about.mission.title': 'የእኛ ተልእኮ',
        'about.mission.description': 'በተመጣጣኝ ዋጋ ከፍተኛ ጥራት ያላቸውን ምርቶች በማቅረብ ልዩ የደንበኛ አገልግሎት ለመስጠት ቆርጠናል። የእኛ ግብ የመስመር ላይ ግዢን ለሁሉም ሰው ምቹ፣ ደህንነቱ የተጠበቀ እና አስደሳች ማድረግ ነው።',
        'about.features.shipping.title': 'ፈጣን ማጓጓዣ',
        'about.features.shipping.description': 'ወደ ቤትዎ በፍጥነት እና በታማኝነት ማድረስ',
        'about.features.quality.title': 'ጥራት ያላቸው ምርቶች',
        'about.features.quality.description': 'ከታመኑ ብራንዶች በጥንቃቄ የተመረጡ እቃዎች',
        'about.features.support.title': '24/7 ድጋፍ',
        'about.features.support.description': 'ለጥያቄዎችዎ ሁልጊዜ እዚህ ነን',
        'about.team.title': 'ቡድናችንን ያውቁ',
        'about.team.description': 'ለእርስዎ እርካታ የተወሰኑ ፍቅረኛ ባለሙያዎች',
        'about.team.ceo': 'ዋና ሥራ አስፈፃሚ',
        'about.team.cto': 'ዋና ቴክኖሎጂ ኃላፊ',
        'about.team.frontend': 'የፊት ጫፍ ገንቢ',
        'about.team.backend': 'የኋላ ጫፍ ዳንጎ ገንቢ',
        'about.team.marketing': 'የማርኬቲንግ ዳይሬክተር',
        'about.values.title': 'የእኛ እሴቶች',
        'about.values.customer.title': 'ደንበኛ በመጀመሪያ',
        'about.values.customer.description': 'የእርስዎ እርካታ የእኛ ቅድሚያ ነው',
        'about.values.sustainability.title': 'ዘላቂነት',
        'about.values.sustainability.description': 'ለአካባቢ ኃላፊነት ቆርጠናል',
        'about.values.innovation.title': 'ፈጠራ',
        'about.values.innovation.description': 'አገልግሎታችንን በቀጣይነት እያሻሻልን',
        'about.values.integrity.title': 'ታማኝነት',
        'about.values.integrity.description': 'በምናደርገው ሁሉ ሐቀኛ እና ግልጽ',

        // Contact Page
        'contact.title': 'ያግኙን',
        'contact.subtitle': 'ከእርስዎ መስማት እንወዳለን። መልእክት ይላኩልን እና በተቻለ ፍጥነት እንመልሳለን።',
        'contact.form.title': 'መልእክት ይላኩልን',
        'contact.form.description': 'ከታች ያለውን ቅጽ ይሙሉ እና በ24 ሰዓት ውስጥ እንመልሳለን።',
        'contact.form.name': 'ሙሉ ስም',
        'contact.form.namePlaceholder': 'ሙሉ ስምዎን ያስገቡ',
        'contact.form.email': 'ኢሜይል አድራሻ',
        'contact.form.emailPlaceholder': 'ኢሜይል አድራሻዎን ያስገቡ',
        'contact.form.subject': 'ርዕስ',
        'contact.form.subjectPlaceholder': 'ይህ ስለ ምን ነው?',
        'contact.form.message': 'መልእክት',
        'contact.form.messagePlaceholder': 'እንዴት ልንረዳዎ እንደምንችል ይንገሩን...',
        'contact.form.send': 'መልእክት ላክ',
        'contact.form.sending': 'በመላክ ላይ...',
        'contact.form.success': 'አመሰግናለሁ! መልእክትዎ በተሳካ ሁኔታ ተልኳል።',
        'contact.info.title': 'የመገናኛ መረጃ',
        'contact.info.description': 'በእነዚህ ማናቸውም መንገዶች ያግኙን።',
        'contact.info.address.title': 'የእኛ አድራሻ',
        'contact.info.address.value': '123 የንግድ ጎዳና፣ አዲስ አበባ፣ ኢትዮጵያ',
        'contact.info.phone.title': 'ስልክ ቁጥር',
        'contact.info.phone.value': '+251 11 123 4567',
        'contact.info.email.title': 'ኢሜይል አድራሻ',
        'contact.info.email.value': 'info@shoppit.com',
        'contact.info.hours.title': 'የስራ ሰዓት',
        'contact.info.hours.value': 'ሰኞ - አርብ: 9:00 ጠዋት - 6:00 ምሽት',
        'contact.social.title': 'ይከተሉን',

        // Profile Page
        'profile.notLoggedIn': 'አልገቡም',
        'profile.pleaseLogin': 'እባክዎ መገለጫዎን ለማየት ይግቡ',
        'profile.personalInfo': 'የግል መረጃ',
        'profile.orders': 'ትዕዛዞች',
        'profile.reviews': 'ግምገማዎች',
        'profile.wishlist': 'የምኞት ዝርዝር',
        'profile.myOrders': 'የእኔ ትዕዛዞች',
        'profile.addresses': 'አድራሻዎች',
        'profile.settings': 'ቅንብሮች',
        'profile.security.title': 'የመለያ ደህንነት',
        'profile.security.password': 'የይለፍ ቃል',
        'profile.security.passwordDesc': 'መለያዎን በጠንካራ የይለፍ ቃል ደህንነቱን ይጠብቁ',
        'profile.security.changePassword': 'የይለፍ ቃል ይቀይሩ',
        'profile.security.twoFactor': 'ባለሁለት ደረጃ ማረጋገጫ',
        'profile.security.twoFactorDesc': 'ለመለያዎ ተጨማሪ የደህንነት ሽፋን ይጨምሩ',
        'profile.security.enable': '2FA አንቃ',
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