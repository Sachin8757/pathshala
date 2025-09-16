const sampleQuestions = [
  // ===== English (10 Questions) =====
  {
    text: "Write a short paragraph on 'My Favourite Festival'.",
    options: [
      "Diwali is my favourite festival because we light diyas and burn crackers.",
      "Holi is my favourite festival because we play with colors.",
      "Christmas is my favourite festival because we decorate a tree.",
      "Eid is my favourite festival because we prepare special food."
    ],
    correctAnswer: "Diwali is my favourite festival because we light diyas and burn crackers."
  },
  {
    text: "Fill in the blank: I ____ (go) to school every morning.",
    options: ["go", "went", "gone", "going"],
    correctAnswer: "go"
  },
  {
    text: "Identify the part of speech of the word 'singing' in the sentence: She is singing beautifully.",
    options: ["Noun", "Verb", "Adjective", "Adverb"],
    correctAnswer: "Verb"
  },
  {
    text: "Choose the correct plural form of 'Box'.",
    options: ["Boxs", "Boxes", "Boxies", "Boxen"],
    correctAnswer: "Boxes"
  },
  {
    text: "Change into negative: He is playing cricket.",
    options: ["He playing not cricket.", "He not is playing cricket.", "He is not playing cricket.", "He is no playing cricket."],
    correctAnswer: "He is not playing cricket."
  },
  {
    text: "Rearrange to form a meaningful sentence: park / children / the / are / playing / in",
    options: ["The park is playing in children.", "Children are playing in the park.", "In the park are children playing.", "Playing are children in the park."],
    correctAnswer: "Children are playing in the park."
  },
  {
    text: "Choose the correct article: I saw ___ elephant in the zoo.",
    options: ["a", "an", "the", "no article"],
    correctAnswer: "an"
  },
  {
    text: "Letter Writing: Write a letter to your friend telling him/her about your new school.",
    options: [
      "The letter should have proper format, greeting, body and closing.",
      "Just mention name of school only.",
      "No need to write complete letter, just one line is enough.",
      "Write about any random topic."
    ],
    correctAnswer: "The letter should have proper format, greeting, body and closing."
  },
  {
    text: "Choose the synonym of 'Big'.",
    options: ["Small", "Large", "Tiny", "Little"],
    correctAnswer: "Large"
  },
  {
    text: "Correct the spelling: Frend",
    options: ["Frand", "Friend", "Freind", "Frent"],
    correctAnswer: "Friend"
  },

  // ===== Hindi (10 Questions) =====
  {
    text: "‘अच्छा’ शब्द का विलोम चुनिए।",
    options: ["बुरा", "मीठा", "दिन", "खुश"],
    correctAnswer: "बुरा"
  },
  {
    text: "‘विद्यालय’ शब्द से वाक्य चुनिए।",
    options: ["विद्यालय जा रहा हूँ।", "मैं खाना खा रहा हूँ।", "आसमान नीला है।", "पानी ठंडा है।"],
    correctAnswer: "विद्यालय जा रहा हूँ।"
  },
  {
    text: "रिक्त स्थान भरिए: गीता ____ (पढ़ना) रही है।",
    options: ["पढ़", "पढ़ता", "पढ़ती", "पढ़ी"],
    correctAnswer: "पढ़"
  },
  {
    text: "संधि विच्छेद कीजिए: रामायण",
    options: ["राम+अयन", "र+अमायण", "राम+आयन", "रा+मायण"],
    correctAnswer: "राम+आयन"
  },
  {
    text: "‘बड़ा’ शब्द का पर्यायवाची चुनिए।",
    options: ["छोटा", "विशाल", "पतला", "लंबा"],
    correctAnswer: "विशाल"
  },
  {
    text: "‘प’ से शुरू होने वाला सही शब्द चुनिए।",
    options: ["पानी", "किताब", "फल", "घर"],
    correctAnswer: "पानी"
  },
  {
    text: "वाक्य में क्रिया पहचानिए: मोहन खेत में काम कर रहा है।",
    options: ["मोहन", "खेत", "काम", "कर रहा है"],
    correctAnswer: "कर रहा है"
  },
  {
    text: "‘मेहनत का फल मीठा होता है’ अनुच्छेद का मुख्य विचार क्या है?",
    options: ["मेहनत का कोई महत्व नहीं है।", "मेहनत करने से सफलता मिलती है।", "मेहनत करने से दुख मिलता है।", "मेहनत बेकार है।"],
    correctAnswer: "मेहनत करने से सफलता मिलती है।"
  },
  {
    text: "‘भी’ अव्यय से सही वाक्य चुनिए।",
    options: ["वह भी आ रहा है।", "वह जा है।", "मैं घर।", "हम खेल रहे।"],
    correctAnswer: "वह भी आ रहा है।"
  },
  {
    text: "रिक्त स्थान भरिए: ____ मेरा दोस्त है।",
    options: ["तू", "यह", "मैं", "कौन"],
    correctAnswer: "यह"
  },

  // ===== Math (10 Questions) =====
  {
    text: "Solve: 345 + 768",
    options: ["1013", "1103", "1113", "1123"],
    correctAnswer: "1113"
  },
  {
    text: "Solve: 902 – 587",
    options: ["315", "325", "335", "345"],
    correctAnswer: "315"
  },
  {
    text: "Solve: 236 × 8",
    options: ["1868", "1888", "1896", "1904"],
    correctAnswer: "1888"
  },
  {
    text: "Solve: 945 ÷ 9",
    options: ["95", "100", "105", "110"],
    correctAnswer: "105"
  },
  {
    text: "Place value of 6 in 46,235 is:",
    options: ["6", "60", "600", "6000"],
    correctAnswer: "6000"
  },
  {
    text: "Perimeter of rectangle with length=15 cm and breadth=10 cm:",
    options: ["30 cm", "40 cm", "50 cm", "60 cm"],
    correctAnswer: "50 cm"
  },
  {
    text: "Convert 2500 m to km.",
    options: ["2 km 50 m", "2 km 500 m", "25 km", "250 km"],
    correctAnswer: "2 km 500 m"
  },
  {
    text: "Sum of first 10 natural numbers:",
    options: ["45", "50", "55", "60"],
    correctAnswer: "55"
  },
  {
    text: "A shopkeeper sells 325 pencils in 1 day. Pencils sold in 15 days:",
    options: ["4725", "4825", "4900", "5000"],
    correctAnswer: "4875"
  },
  {
    text: "Cost of 1 chair is ₹750. Cost of 12 chairs:",
    options: ["₹8500", "₹8800", "₹8900", "₹9000"],
    correctAnswer: "₹9000"
  }
];

module.exports = sampleQuestions;
