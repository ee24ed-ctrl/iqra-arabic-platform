(function (window) {
  'use strict';

  var VOCAB_BANK = [
    { word: 'مغامرة', meaning: 'تجربة مثيرة وجريئة مليئة بالتحديات', wrong: ['نوم عميق وطويل', 'عمل روتيني ممل'] },
    { word: 'الشجاعة', meaning: 'الإقدام والثبات عند مواجهة الصعاب', wrong: ['الخوف والتردد الشديد', 'الهروب من المسؤولية'] },
    { word: 'التسامح', meaning: 'العفو والصفح عند المقدرة', wrong: ['الغضب والانتقام', 'الخصام الدائم'] },
    { word: 'القناعة', meaning: 'الرضا بما قسمه الله وعدم الطمع', wrong: ['الجشع وحب التملك', 'السخط والتذمر'] },
    { word: 'الوفاء', meaning: 'الإخلاص وحفظ العهد والجميل', wrong: ['الغدر ونكران الجميل', 'الإهمال والنسيان'] },
    { word: 'التعاون', meaning: 'العمل المشترك ومساعدة الآخرين', wrong: ['الأنانية والانفراد', 'التكاسل والتأخير'] },
    { word: 'الفضول', meaning: 'حب الاستطلاع والرغبة في المعرفة', wrong: ['اللامبالاة التامة', 'النسيان السريع'] },
    { word: 'البديهة', meaning: 'سرعة الفهم والتصرف الذكي', wrong: ['البطء في التفكير', 'التسرع دون وعي'] },
    { word: 'الفضيلة', meaning: 'الخلق الحسن والسلوك القويم', wrong: ['السلوك السيئ', 'الكذب والخداع'] },
    { word: 'العواقب', meaning: 'النتائج التي تترتب على الأفعال', wrong: ['البدايات الأولى', 'الأحلام العابرة'] },
    { word: 'الطموح', meaning: 'التطلع إلى الأفضل والنجاح', wrong: ['اليأس والاستسلام', 'الكسل والخمول'] },
    { word: 'الأمانة', meaning: 'حفظ الحقوق وأداؤها لأصحابها', wrong: ['الخيانة والتفريط', 'التبذير والإسراف'] },
    { word: 'الصدق', meaning: 'قول الحقيقة ومطابقة الكلام للواقع', wrong: ['الكذب والتزييف', 'المراوغة والخداع'] },
    { word: 'الإصرار', meaning: 'العزيمة القوية وعدم الاستسلام', wrong: ['التراجع السريع', 'التردد والضعف'] },
    { word: 'التواضع', meaning: 'احترام الناس وعدم التكبر عليهم', wrong: ['الغرور والتعالي', 'الاستهزاء بالآخرين'] },
    { word: 'الذكاء', meaning: 'القدرة على الفهم وحل المشكلات', wrong: ['الغفلة وعدم الانتباه', 'الجهل والتقليد'] },
    { word: 'الحكمة', meaning: 'وضع الشيء في موضعه الصحيح', wrong: ['الطيش والتهور', 'العناد بلا دليل'] },
    { word: 'المثابرة', meaning: 'المداومة على العمل والاجتهاد', wrong: ['الانقطاع والتوقف', 'إضاعة الوقت'] }
  ];

  var ORDER_SENTENCES_BANK = [
    'تُعَلِّمُنَا الْقِصَصُ الْهَادِفَةُ الصِّدْقَ وَالشَّجَاعَةَ وَالتَّعَاوُنَ',
    'يَقْرَأُ الطَّالِبُ صَفَحَاتِ الْكِتَابِ بِتَرْكِيزٍ وَاسْتِمْتَاعٍ',
    'الْقَنَاعَةُ كَنْزٌ لَا يَفْنَى وَالطَّمَعُ يُضِيعُ النِّعَمَ',
    'بِالتَّعَاوُنِ وَالْإِصْرَارِ نَتَغَلَّبُ عَلَى جَمِيعِ الصِّعَابِ',
    'حِفْظُ الْأَمَانَةِ وَالْوَفَاءُ بِالْعَهْدِ مِنْ أَجْمَلِ الْأَخْلَاقِ',
    'التَّسَامُحُ يَنْشُرُ الْمَحَبَّةَ وَالسَّلَامَ بَيْنَ النَّاسِ',
    'التَّفْكِيرُ النَّقْدِيُّ يُسَاعِدُنَا عَلَى حَلِّ الْمُشْكِلَاتِ بِذَكَاءٍ',
    'الْقِرَاءَةُ الْيَوْمِيَّةُ تَزِيدُ الْمَعْرِفَةَ وَتُنَمِّي الْخَيَالَ',
    'الْعَائِلَةُ وَالصَّدَاقَةُ الصَّادِقَةُ أَعْظَمُ كُنُوزِ الْحَيَاةِ',
    'مَنْ جَدَّ وَاجْتَهَدَ حَصَدَ ثِمَارَ النَّجَاحِ وَالتَّفَوُّقِ'
  ];

  function splitWords(sentence) {
    return (sentence || '')
      .replace(/[،.؟!«»:؛()]/g, '')
      .trim()
      .split(/\s+/)
      .filter(Boolean);
  }

  function shuffleWords(words, seed) {
    var arr = words.slice();
    for (var i = arr.length - 1; i > 0; i--) {
      var j = (seed * 13 + i * 7) % (i + 1);
      var tmp = arr[i];
      arr[i] = arr[j];
      arr[j] = tmp;
    }
    if (arr.join(' ') === words.join(' ') && arr.length > 1) {
      var t = arr[0];
      arr[0] = arr[arr.length - 1];
      arr[arr.length - 1] = t;
    }
    return arr;
  }

  function build30Quiz(book) {
    var title = book.title || 'القصة';
    var text = (book.storyText || '').replace(/\s+/g, ' ').trim();
    var sentences = text
      .split(/[.!؟\n]+/)
      .map(function (s) { return s.trim(); })
      .filter(function (s) { return s.length > 18; });

    var firstSent = sentences[0] || ('تدور أحداث قصة ' + title + ' في إطار تربوي ممتع.');
    var secondSent = sentences[1] || ('يتعلم القارئ من قصة ' + title + ' قيماً تربوية وأخلاقية مهمة.');
    var thirdSent = sentences[2] || ('القصة مناسبة لطلاب المرحلة الابتدائية وتنمي مهارات الفهم القرائي.');
    var pageCount = (book.pageImages && book.pageImages.length) ? book.pageImages.length : (book.pageCount || 1);

    // 1. 10 Multiple Choice Questions (اختيار من متعدد)
    var mcqs = [
      {
        q: 'ما عنوان القصة التي قرأتها؟',
        options: [title, 'رحلة إلى القمر البعيد', 'مغامرة في أعماق البحار'],
        correct: 0
      },
      {
        q: 'ما الفكرة الأساسية التي تدور حولها قصة «' + title + '»؟',
        options: [
          firstSent.slice(0, 95) + (firstSent.length > 95 ? '...' : ''),
          'تعليم قواعد الرياضيات والحساب فقط',
          'وصف خرائط الطقس والمناخ'
        ],
        correct: 0
      },
      {
        q: 'أيّ العبارات الآتية توافق أحداث القصة ومعناها العام؟',
        options: [
          secondSent.slice(0, 95) + (secondSent.length > 95 ? '...' : ''),
          'لم يحدث أي تغيير أو تعلم في نهاية القصة',
          'تشجع القصة على إهمال القراءة والتعلم'
        ],
        correct: 0
      },
      {
        q: 'ما الفئة العمرية المناسبة لهذه القصة في المنصة؟',
        options: ['طلاب المرحلة الابتدائية (٨ – ١٢ سنة)', 'طلاب المرحلة الجامعية فقط', 'الأطفال دون سن الثالثة فقط'],
        correct: 0
      },
      {
        q: 'كم عدد صفحات هذه النسخة المصورة من القصة؟',
        options: [pageCount + ' صفحة', (pageCount + 35) + ' صفحة', 'نصف صفحة فقط'],
        correct: 0
      },
      {
        q: 'ما الهدف التربوي الرئيس من قراءة قصة «' + title + '»؟',
        options: [
          'تنمية الفهم القرائي واستخلاص القيم الإيجابية',
          'تضييع الوقت دون تفكير',
          'الاستغناء عن فهم المعاني'
        ],
        correct: 0
      },
      {
        q: 'كيف يتصرف البطل الحكيم عند مواجهة مشكلة في القصة؟',
        options: [
          'يفكر بهدوء ويتمسك بالقيم والأخلاق الحميدة',
          'يستسلم فوراً دون محاولة',
          'يتجاهل نصائح الآخرين تماماً'
        ],
        correct: 0
      },
      {
        q: 'ما الشعور أو الدرس الذي تتركه القصة في نفس القارئ؟',
        options: [
          thirdSent.slice(0, 95) + (thirdSent.length > 95 ? '...' : ''),
          'التشجيع على الكسل والغضب',
          'عدم الاهتمام بالآخرين'
        ],
        correct: 0
      },
      {
        q: 'لماذا يُفضّل قراءة القصة صفحة بصفحة بتأنٍّ؟',
        options: [
          'لفهم تسلسل الأحداث والربط بين السبب والنتيجة',
          'لإنهاء القصة دون قراءة الكلمات',
          'لتجاهل الصور والمعاني'
        ],
        correct: 0
      },
      {
        q: 'إذا طُلب منك اقتراح وصف مختصر لقصة «' + title + '»، فأي وصف هو الأدق؟',
        options: [
          'قصة تربوية ممتعة تنمي الفهم القرائي والخيال',
          'كتاب في الكيمياء العضوية المتقدمة',
          'دليل صيانة الأجهزة الإلكترونية'
        ],
        correct: 0
      }
    ];

    if (book.quiz && book.quiz.q) {
      mcqs[1] = {
        q: book.quiz.q,
        options: book.quiz.options,
        correct: book.quiz.correct || 0
      };
    }

    // 2. 10 Vocabulary Questions (معاني الكلمات)
    var matchedVocab = VOCAB_BANK.filter(function (v) {
      return text.indexOf(v.word) !== -1 || title.indexOf(v.word) !== -1;
    });
    var remainingVocab = VOCAB_BANK.filter(function (v) {
      return matchedVocab.indexOf(v) === -1;
    });
    var vocabPool = matchedVocab.concat(remainingVocab).slice(0, 10);

    var vocab = vocabPool.map(function (v) {
      return {
        word: v.word,
        q: 'ما معنى كلمة «' + v.word + '» في سياق القصص والقراءة؟',
        options: [v.meaning, v.wrong[0], v.wrong[1]],
        correct: 0
      };
    });

    // 3. 10 Ordering Questions (الترتيب)
    var storyOrderSentences = sentences
      .map(function (s) {
        var w = splitWords(s);
        return (w.length >= 4 && w.length <= 8) ? w.join(' ') : '';
      })
      .filter(Boolean);

    var orderPool = storyOrderSentences.concat(ORDER_SENTENCES_BANK);
    var uniqueOrder = [];
    for (var i = 0; i < orderPool.length && uniqueOrder.length < 10; i++) {
      if (uniqueOrder.indexOf(orderPool[i]) === -1) {
        uniqueOrder.push(orderPool[i]);
      }
    }

    var orders = uniqueOrder.map(function (sent, idx) {
      var words = splitWords(sent);
      return {
        q: 'رتب الكلمات التالية لتكوين جملة مفيدة مرتبطة بالقصة:',
        answer: words.join(' '),
        words: words,
        shuffled: shuffleWords(words, idx + 3)
      };
    });

    return {
      mcqs: mcqs,
      vocab: vocab,
      orders: orders,
      total: 30
    };
  }

  window.IREAD_STORY_QUIZ = {
    build30Quiz: build30Quiz
  };
})(window);
