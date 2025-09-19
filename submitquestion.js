const sampleQuestions = [
  // ===== Maths (10 Questions) =====

  {
    text: "400 से 500 के बीच की ऐसी संख्या लिखिए जिसके इकाई का अंक 3 और दहाई का अंक 5 हो।",
    options: ["453", "435", "523", "345"],
    correctAnswer: "453"
  },
  {
    text: "मैं 2 अंकों की संख्या हूँ। मेरे अंकों का योगफल 7 है। मैं कौन-सी संख्या हूँ?",
    options: ["25", "43", "34", "61"],
    correctAnswer: "34"
  },
  {
    text: "एक रेलगाड़ी में 623 लोग थे। पटना रेलवे स्टेशन पर 262 लोग उतर गए। अब कितने लोग रह गए?",
    options: ["361", "380", "451", "300"],
    correctAnswer: "361"
  },
  {
    text: "एक विद्यालय में 1234 बच्चे थे। इनमें से 239 बच्चे दूसरे विद्यालय में चले गए। अब कितने बच्चे स्कूल में हैं?",
    options: ["995", "1005", "1095", "999"],
    correctAnswer: "995"
  },
  {
    text: "पानी की टंकी बनाने के लिए 6228 ईंटें चाहिए। हरजीराम ने पहले 2315 ईंटें मंगवाई। अब उसे कितनी ईंटें और मंगवानी पड़ेंगी?",
    options: ["3913", "4000", "3900", "4013"],
    correctAnswer: "3913"
  },
  {
    text: "गीता के पास 3880 मोती हैं। उसकी बहन श्यामा भी बाजार से 1015 मोती लाई। किसके पास अधिक मोती हैं और कितने अधिक?",
    options: [
      "गीता के पास 2865 अधिक",
      "श्यामा के पास 2865 अधिक",
      "गीता के पास 1015 अधिक",
      "गीता के पास 2865 कम"
    ],
    correctAnswer: "गीता के पास 2865 अधिक"
  },
  {
    text: "रूपडीह गाँव में कुल 4236 विद्यार्थी हैं। यदि इनमें से छात्रों की संख्या 2965 हो, तो छात्राओं की संख्या कितनी होगी?",
    options: ["1271", "1200", "1300", "1261"],
    correctAnswer: "1271"
  },
  {
    text: "पिपरा गाँव में पुल निर्माण में 2900 बोरे सीमेंट की जरूरत है। इनमें से 1099 बोरे आ गए। अब और कितने बोरे चाहिए?",
    options: ["1811", "1801", "1799", "2001"],
    correctAnswer: "1811"
  },
  {
    text: "एक अभयारण्य में कुछ हिरण थे। वहाँ 2320 हिरण और लाए गए। अब उनकी संख्या 7563 हो गई। पहले वहाँ कितने हिरण थे?",
    options: ["5243", "5223", "5343", "5000"],
    correctAnswer: "5243"
  },
  {
    text: "एक टेलीविजन व रेडियो का मूल्य 9875 रुपये है। यदि रेडियो का मूल्य 1899 रुपये है, तो टेलीविजन का मूल्य कितना होगा?",
    options: ["7976", "8000", "7500", "7975"],
    correctAnswer: "7976"
  },
    {
    text: "'दिन' का विलोम शब्द क्या है?",
    options: ["रात", "शाम", "उजाला", "सवेरा"],
    correctAnswer: "रात"
  },
  {
    text: "'पढ़ना' का समानार्थी शब्द कौन सा है?",
    options: ["लिखना", "रटना", "अध्ययन", "बोलना"],
    correctAnswer: "अध्ययन"
  },
  {
    text: "'पेड़' का बहुवचन क्या है?",
    options: ["पेड़ें", "पेड़ो", "पेड़", "पेड़ोँ"],
    correctAnswer: "पेड़"
  },
  {
    text: "'राम स्कूल जाता है।' इस वाक्य में कर्ता कौन है?",
    options: ["स्कूल", "जाता", "है", "राम"],
    correctAnswer: "राम"
  },
  {
    text: "'खुश' का विलोम शब्द कौन सा है?",
    options: ["हँसना", "रोना", "उदास", "अच्छा"],
    correctAnswer: "उदास"
  },
  {
    text: "'जल' का पर्यायवाची शब्द कौन सा है?",
    options: ["पानी", "नदी", "समुंदर", "गीला"],
    correctAnswer: "पानी"
  },
  {
    text: "'नीला' शब्द कौन-सा शब्द भेद है?",
    options: ["संज्ञा", "विशेषण", "क्रिया", "सर्वनाम"],
    correctAnswer: "विशेषण"
  },
  {
    text: "'फल खाना' में 'खाना' कौन सा शब्द भेद है?",
    options: ["संज्ञा", "क्रिया", "विशेषण", "सर्वनाम"],
    correctAnswer: "क्रिया"
  },
  {
    text: "'गाय दूध देती है।' वाक्य में 'दूध' कौन सा शब्द भेद है?",
    options: ["संज्ञा", "क्रिया", "सर्वनाम", "विशेषण"],
    correctAnswer: "संज्ञा"
  },
  {
    text: "'किताब पढ़ो' किस प्रकार का वाक्य है?",
    options: ["प्रश्नवाचक", "आज्ञावाचक", "विधानवाचक", "विस्मयादिबोधक"],
    correctAnswer: "आज्ञावाचक"
  },
    {
    text: "Translate into English: 'मैं स्कूल जा रहा हूँ।'",
    options: ["I am playing.", "I am going to school.", "I am eating food.", "I am reading a book."],
    correctAnswer: "I am going to school."
  },
  {
    text: "Translate into Hindi: 'This is my book.'",
    options: ["यह मेरी पेंसिल है।", "यह मेरी किताब है।", "यह मेरा बैग है।", "यह मेरी कॉपी है।"],
    correctAnswer: "यह मेरी किताब है।"
  },
  {
    text: "Translate into English: 'वह खेल रहा है।'",
    options: ["He is running.", "He is playing.", "He is sleeping.", "He is dancing."],
    correctAnswer: "He is playing."
  },
  {
    text: "Translate into Hindi: 'I like milk.'",
    options: ["मुझे फल पसंद हैं।", "मुझे खेल पसंद है।", "मुझे दूध पसंद है।", "मुझे किताबें पसंद हैं।"],
    correctAnswer: "मुझे दूध पसंद है।"
  },
  {
    text: "Translate into English: 'सूरज चमक रहा है।'",
    options: ["The sun is shining.", "The moon is shining.", "The sun is setting.", "The sky is blue."],
    correctAnswer: "The sun is shining."
  },
  {
    text: "Translate into Hindi: 'We are friends.'",
    options: ["हम पढ़ रहे हैं।", "हम दोस्त हैं।", "हम खेल रहे हैं।", "हम खा रहे हैं।"],
    correctAnswer: "हम दोस्त हैं।"
  },
  {
    text: "Translate into English: 'यह मेरी पेंसिल है।'",
    options: ["This is my pen.", "This is my book.", "This is my pencil.", "This is my bag."],
    correctAnswer: "This is my pencil."
  },
  {
    text: "Translate into Hindi: 'She is dancing.'",
    options: ["वह पढ़ रही है।", "वह गा रही है।", "वह नाच रही है।", "वह दौड़ रही है।"],
    correctAnswer: "वह नाच रही है।"
  },
  {
    text: "Translate into English: 'पापा ऑफिस जा रहे हैं।'",
    options: ["Father is coming home.", "Father is eating food.", "Father is going to the office.", "Father is watching TV."],
    correctAnswer: "Father is going to the office."
  },
  {
    text: "Translate into Hindi: 'The cat is on the mat.'",
    options: ["कुत्ता चटाई पर है।", "बिल्ली चटाई पर है।", "बिल्ली कुर्सी पर है।", "कुत्ता मेज पर है।"],
    correctAnswer: "बिल्ली चटाई पर है।"
  }
];

module.exports = sampleQuestions;
