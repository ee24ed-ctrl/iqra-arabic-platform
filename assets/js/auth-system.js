(function (window) {
  'use strict';

  var USERS_KEY = 'iread_users_v1';
  var SESSION_KEY = 'iread_current_user_v1';
  var CUSTOM_STUDENTS_KEY = 'iread_custom_students_v1';
  var SUP_NOTES_KEY = 'iread_supervisor_notes_v1';

  var ROLE_META = {
    student: { label: 'طالب', icon: '🎓', color: '#f59e0b', home: 'بوابة-الطالب/index.html' },
    teacher: { label: 'معلم', icon: '👩‍🏫', color: '#2563eb', home: 'بوابة-المعلم/index.html' },
    admin: { label: 'مدير المدرسة', icon: '🏫', color: '#7c3aed', home: 'لوحة-الإدارة/index.html?role=admin' },
    supervisor: { label: 'مشرف تربوي', icon: '🧭', color: '#059669', home: 'لوحة-الإدارة/index.html?role=supervisor' },
    general_supervisor: { label: 'مشرف عام', icon: '🏛️', color: '#0f766e', home: 'لوحة-الإدارة/index.html?role=general_supervisor' }
  };

  var CLASS_GRADES = ['الصف الأول', 'الصف الثاني', 'الصف الثالث', 'الصف الرابع', 'الصف الخامس', 'الصف السادس'];
  var CLASS_SECTIONS = ['أ', 'ب', 'ج'];

  var SUPABASE_URL = 'https://lxhopgrkmzdsjtzxcfuk.supabase.co';
  var SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx4aG9wZ3JrbXpkc2p0enhjZnVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg1NjEwODIsImV4cCI6MjA5NDEzNzA4Mn0.uw42L4ZgUnHCmEIwF9exCrG2IxVquNYKJRpjNMJw9uc';
  var DUMMY_IDS = { stu_1: 1, stu_2: 1, stu_3: 1, stu_4: 1, stu_5: 1, tch_1: 1 };
  var SERVER_DB = null;

  var DEFAULT_USERS = [
    { id: 'adm_1', role: 'admin', name: 'أ. خالد المنصور (مدير المدرسة)', username: 'admin1', email: 'principal@school.edu', pass: '1234', school: 'مدرسة الساحل الأهلية', jobTitle: 'مدير المدرسة', active: true, createdAt: '2026-10-01' },
    { id: 'sup_1', role: 'supervisor', name: 'د. عبدالله السالم (مشرف تربوي)', username: 'sup1', email: 'supervisor@edu.gov', pass: '1234', school: 'إدارة التعليم – مكتب الإشراف', sector: 'الإشراف التربوي – اللغة العربية', active: true, createdAt: '2026-10-01' },
    { id: 'gsup_1', role: 'general_supervisor', name: 'د. فهد العتيبي (المشرف العام)', username: 'gsup1', email: 'general@edu.gov', pass: '1234', school: 'الإدارة العامة للتعليم', sector: 'الإشراف العام على المنصة والمدارس', active: true, createdAt: '2026-10-01' }
  ];

  // Real School Roster: مدرسة الساحل الأهلية (4 Teachers + 61 Students, login by National ID/Iqama & password 123456)
  var SAHIL_ROSTER_GROUPS = [
    {
      teacher: { id: 'tch_islam', name: 'أ. إسلام السعيد', username: 'islam', grade: 'الصف الأول', section: 'أ', classes: 'الصف الأول الابتدائي / أ' },
      students: [
        ['1197111352', 'إلياس عادل إبراهيم العسيري'],
        ['1196046096', 'أنس عبد الله محمد الحضرمي'],
        ['2491328510', 'خالد وليد عبدالخالق حسين'],
        ['1195059231', 'راشد إسماعيل إبراهيم شعبي'],
        ['2491053985', 'رواد رامي رسمى بركه'],
        ['1197244195', 'رواد عبد الكريم عواض العتيبي'],
        ['1196384091', 'سلطان عبد الله نافع السلمي'],
        ['1195243215', 'طلال عادل داود كلنتن'],
        ['1196355943', 'عبد العزيز سعيد محمد الجهني'],
        ['2492571589', 'عبد الله محمد وسيم عيسى'],
        ['1197009531', 'فهد عبد الله فيصل البلول'],
        ['1192511671', 'فهد علي عبدالله العمري'],
        ['2491480543', 'محمد عبد الله حسن الحبشي'],
        ['1192778684', 'ناصر عبد الرحيم محمد الزهراني'],
        ['2503750578', 'عبد الله محمد كمال أبو جامع'],
        ['1212559569', 'محمد على عبد الله غبرا']
      ]
    },
    {
      teacher: { id: 'tch_ahmed_gamal', name: 'أ. أحمد جمال', username: 'ahmed_gamal', grade: 'الصف الأول', section: 'ب', classes: 'الصف الأول الابتدائي / ب' },
      students: [
        ['2538617651', 'تمام إبراهيم سعيد باعوضة'],
        ['1197531617', 'خالد ياسر خالد السوداني'],
        ['1192657862', 'رواف عبد الله محمد البقمي'],
        ['1193694732', 'ريان أحمد عبد الله السفري'],
        ['2490972524', 'سعد أحمد محمود الحريري'],
        ['1194607766', 'سعود صقر قريش علي الغامدي'],
        ['1193478193', 'سلطان طارق محمد الجفري'],
        ['1196596694', 'عبدالله أحمد صالح الغامدي'],
        ['1198213587', 'عبد الله إسماعيل عبد الله الغامدي'],
        ['1197943853', 'فارس خالد موسى الظاهري'],
        ['1196274748', 'فهد شرف عبد الرحمن الشريف'],
        ['1195915614', 'محمد فهد علي العمري'],
        ['3194783423', 'نواف عبده صالح ناجي']
      ]
    },
    {
      teacher: { id: 'tch_ahmed_fahmy', name: 'أ. أحمد فهمي', username: 'ahmed_fahmy', grade: 'الصف الثاني', section: 'أ', classes: 'الصف الثاني / أ' },
      students: [
        ['1192988473', 'أحمد سعيد ظافر العمري'],
        ['2480254438', 'آدم حمزه عبد الرؤوف عيسى'],
        ['1190436640', 'ثامر سعد ثامر الغالبي'],
        ['2472361621', 'جواد جهاد محمد الحسين'],
        ['2465939037', 'فيصل احمد بشير مسعود'],
        ['1192108767', 'احمد علي احمد الهلالي'],
        ['1194976781', 'مشاري عبدالله محمد المري'],
        ['1190716454', 'المؤيد مهند شاكر جلال'],
        ['1191728888', 'محمد عبد الله سعد العمري'],
        ['1189605460', 'عمار عبد الرحمن مبارك السفري'],
        ['4643322497', 'تركي عبدالملك محمد الأحمدي'],
        ['1194750517', 'أحمد عبدالعزيز عبد الله الحربي'],
        ['1192280392', 'عبد الرحمن أحمد سعيد الغامدي'],
        ['1192650750', 'عبد العزيز أحمد عبد العزيز آل الشيخ']
      ]
    },
    {
      teacher: { id: 'tch_mahmoud_awny', name: 'أ. محمود عوني', username: 'mahmoud_awny', grade: 'الصف الثاني', section: 'ب', classes: 'الصف الثاني / ب' },
      students: [
        ['1194881825', 'اديب عادل محمد الغامدي'],
        ['4797697341', 'ارام غزوان محمد النونو'],
        ['1191394111', 'ايوب شادي فوزي السليماني'],
        ['1186872964', 'تركي عزام عوض الله الخديدي'],
        ['1191369634', 'سلطان محمد علي عريبي'],
        ['1191369592', 'عبدالله محمد علي عريبي'],
        ['1192385084', 'فارس ابراهيم عبيد السيد'],
        ['1192134045', 'هشام محمد خالد التويم'],
        ['2461691848', 'ياس وجيه رجب ساعي'],
        ['1191440286', 'ريان عبدالله إبراهيم الشبرمي'],
        ['1193314703', 'محمد مهدي عامر الذويبي'],
        ['1190041697', 'سلمان عادل محمد المحمادي'],
        ['1194763072', 'عبد العزيز فهد محمد العمودي'],
        ['1194029466', 'راشد محمد راشد الشبرمي'],
        ['1194847602', 'وابل سراج عمر السيد'],
        ['1191999786', 'بتال محمد عبيد الحربي'],
        ['1193359526', 'محسن عبد الله عبد العالي الشريف'],
        ['1191778016', 'زياد غرم الله سعيد الغامدى']
      ]
    },
    {
      teacher: { id: 'tch_nasser_abdelhamid', name: 'أ. ناصر عبد الحميد', username: 'nasser_abdelhamid', grade: 'الصف الثالث', section: 'أ', classes: 'الصف الثالث / أ' },
      students: [
        ['1188446437', 'مالك غسان فهد السلمي'],
        ['2459299943', 'محمد أحمد سعيد باسلامة'],
        ['1186230833', 'وليد خالد محمد عسيري'],
        ['1186203434', 'عاقل صلاح عاقل العتيبي'],
        ['1190166494', 'فارس وسام أحمد العمري'],
        ['1185502018', 'طلال سالم سلمان الحريصي'],
        ['1190157196', 'إياد إسماعيل عبد الله الغامدي'],
        ['3194785501', 'صالح عبده صالح ناجي'],
        ['2461659126', 'حسن سعيد حسن باخشوين'],
        ['1191652922', 'فايز فهد منصور الحارثي'],
        ['2464387436', 'كنان محمد أنس كرزون'],
        ['1191406220', 'تركي فيصل عبدالعزيز الزهراني'],
        ['1185825823', 'فيصل خالد موسى الظاهري'],
        ['1189849720', 'مشعل أحمد عصام الرحبي'],
        ['1188450140', 'أحمد سمير أحمد الصاعدي'],
        ['1186574180', 'محمد عبدالله محمد البقمي'],
        ['1186671572', 'باسل عبد الرحمن ساعد المحمدي'],
        ['1187350960', 'سيف أحمد محمد زقزوق'],
        ['2454257243', 'بدر عابد حزام هزاع'],
        ['1189103557', 'عبد الرحمن مراد سالم الغامدي'],
        ['1189547910', 'خالد عادل موسى الكحيلي']
      ]
    },
    {
      teacher: { id: 'tch_mohamed_moselhy', name: 'أ. محمد المصيلحي', username: 'mohamed_moselhy', grade: 'الصف الثالث', section: 'ب', classes: 'الصف الثالث / ب' },
      students: [
        ['1189904657', 'معن صالح طارق باعزيز'],
        ['1184644407', 'تركي عادل عواد العويضي'],
        ['1186633606', 'وليد مصطفى حامد الهندي'],
        ['1187003270', 'عبد المجيد محمد مطر الصحفي'],
        ['1189083007', 'مؤيد معتز مرعي العليان'],
        ['1188453672', 'فهد محمد عثمان الحربي'],
        ['1189661687', 'خالد محمد رأفت مداح'],
        ['1187085251', 'محمد أحمد مرعي العمري'],
        ['1186863591', 'فهد عبد العزيز شعلان القرني'],
        ['1188307886', 'رياض خالد أحمد الزهراني'],
        ['1190170660', 'يزيد أحمد علي النافعي'],
        ['2469767491', 'يوسف عبد العظيم درويش ضباب'],
        ['1188483729', 'بدر محمد عبد العزيز الصعب'],
        ['1189196171', 'جسار أحمد يحى البارقي'],
        ['1189694423', 'عبد الرحمن أحمد سعيد الوادعي'],
        ['1183357738', 'محمد علي محمد القحطاني'],
        ['1186011761', 'عبد العزيز صقر قريش الغامدي'],
        ['1190822997', 'بتال محمد سعيد الشهري'],
        ['1186313571', 'سلطان عبدالله فيصل عصابي'],
        ['1188095168', 'علي عبدالإله علي الغامدي'],
        ['1188471237', 'أبي إبراهيم محمد النبراوي'],
        ['1186596506', 'إبراهيم عادل إبراهيم العسيري']
      ]
    },
    {
      teacher: { id: 'tch_mohamed_ismail', name: 'أ. محمد إسماعيل', username: 'mohamed_ismail', grade: 'الصف الثالث', section: 'ج', classes: 'الصف الثالث / ج' },
      students: []
    },
    {
      teacher: { id: 'tch_mohamed_lotfy', name: 'أ. محمد لطفي', username: 'mohamed_lotfy', grade: 'الصف الرابع', section: 'ب', classes: 'الصف الرابع (ب، ج) و الخامس (أ، ب)' },
      students: [
        ['1188135519', 'خالد وليد عبدالله المطوع'],
        ['1183107182', 'ريان خالد ابن عبدالله الغامدي'],
        ['1182049427', 'زياد امجد حسن الطويرش'],
        ['1184318556', 'سلطان طلال أحمد جيلانى'],
        ['2437673268', 'عبدالرحمن عبدالعظيم درويش ضباب'],
        ['1181172642', 'عمر ابراهيم عبده المسعري'],
        ['1181270875', 'فيصل خالد سعود الحربي'],
        ['1183125473', 'فيصل فهد علي العمرى'],
        ['1186263263', 'محمد طارق محمد حريش'],
        ['4855006393', 'حمزة ظافر علي صيفان'],
        ['2461763837', 'مراد جهاد محمد حسين'],
        ['1186245898', 'هاشم سراج نزار كمال'],
        ['1185443924', 'طلال محمد رأفت مداح'],
        ['1187773989', 'معتز عبد الرحمن عواض المالكي'],
        ['1180758474', 'أمير عمر محمد الحكمي'],
        ['1184258257', 'صالح محمد صالح الغامدي'],
        ['1194338883', 'محمد جمعان عبدالرحمن الغامدي'],
        ['1183070802', 'هتان شجاع عيضه الحارثي'],
        ['1179946585', 'الوليد علي متعب الغامدي'],
        ['1184060943', 'عمار عبدالله علي الغامدي']
      ]
    },
    {
      teacher: { id: 'tch_mohamed_lotfy', name: 'أ. محمد لطفي', username: 'mohamed_lotfy', grade: 'الصف الرابع', section: 'ج', classes: 'الصف الرابع (ب، ج) و الخامس (أ، ب)' },
      students: [
        ['2446003267', 'يونس هاشم محسن الجيلاني'],
        ['1183148269', 'سيف خالد وليد القبلان'],
        ['1181107853', 'عبدالله عبدالرحمن عبدالله الحازمي'],
        ['1183466521', 'عماد عبدالله عيد الرشيدي'],
        ['1183971074', 'عمر سراج محمدموفق كردي'],
        ['1195268162', 'محمد صالح محمد القرني'],
        ['1177387741', 'محمد عبدالله البقمي'],
        ['2439140100', 'يزيد حمزه عبد الرؤوف عيسى'],
        ['1184223335', 'شاكر عادل علي الغامدي'],
        ['1182345635', 'مجدي مصطفى مجدي بخيت'],
        ['1184484820', 'مشعل بن عبدالله سعد القحطاني'],
        ['2447846243', 'يامن محمد أنس كرزون'],
        ['1184608528', 'أحمد عبدالرحمن محمد الخضيري'],
        ['1183497310', 'أيمن أحمد فرحة الغامدي'],
        ['1182665453', 'تركي محمد احمد مسفر الغامدي'],
        ['1182058642', 'سعد ناصر سعد الغامدي'],
        ['1187611692', 'سلمان إسماعيل إبراهيم شعبي'],
        ['1185288626', 'عبد الله احمد مفرح الغامدي'],
        ['1182029254', 'عبد الله عادل عبيدي الزهراني'],
        ['1182776466', 'عبد الملك عبد الله محمد الصحفي'],
        ['1186949713', 'عمر أيمن عمر المخزومي'],
        ['1184221453', 'محمد ابراهيم محمد العثيمين'],
        ['1184314654', 'حامد عبد الله عبد العالي الشريف'],
        ['1182930089', 'أحمد عبد الرحمن أحمد الفرساني'],
        ['1181016989', 'فيصل خالد حميدان الجهني'],
        ['1185734538', 'محمد جهاد اسماعيل الجهني'],
        ['1185520325', 'نايف ناصر سعيد القحطاني'],
        ['1188376204', 'جاسر عادل عبد المجيد عبد الواسع'],
        ['1185140546', 'كنان مروان أحمد جابر الجهني'],
        ['1180893892', 'يوسف عبد الله محمد بافرط']
      ]
    },
    {
      teacher: { id: 'tch_mohamed_lotfy', name: 'أ. محمد لطفي', username: 'mohamed_lotfy', grade: 'الصف الخامس', section: 'أ', classes: 'الصف الرابع (ب، ج) و الخامس (أ، ب)' },
      students: [
        ['1176955225', 'جاسر محمد مطر الجحدلى'],
        ['1181238260', 'حسام صالح بن احمد الغامدي'],
        ['1178618698', 'عبدالله هاني محمد الغامدي'],
        ['1178628416', 'علي ماجد بن علي آل خثيم'],
        ['1176568184', 'عمر مناور عاقل العتيبي'],
        ['1179212269', 'فارس سالم عبدالغني الزمزمي'],
        ['1181699933', 'محمد سلطان حامد المطيري'],
        ['1179231749', 'نايف محمد علي السرحاني'],
        ['1177257571', 'إبراهيم عبدالله عيد الرشيدي'],
        ['1178917785', 'سعود سلطان عبدالمعطي حامد'],
        ['1177745716', 'سعود فيصل عبدالعزيز الزهراني'],
        ['1178508204', 'عبدالله احمد علي الغامدي'],
        ['1180373464', 'عمار صلاح عمر عماري'],
        ['1179852411', 'عمر سمير احمد الصاعدي'],
        ['1179838576', 'حسام احمد عقيل الزهراني'],
        ['2426940959', 'ريان علي صالح عمر'],
        ['1171961988', 'عبدالعزيز فضل عباس الشيخ'],
        ['1177145396', 'محمد حبيب محمد عمري'],
        ['1189256603', 'محمد مخلد نوار العتيبي'],
        ['2415468889', 'معاذ طارق أحمد الحاج'],
        ['3943092753', 'أغيد عمار شيخ حسن'],
        ['1176442224', 'بسام أحمد هبيد الزايدي'],
        ['2457077630', 'سلطان أحمد محمود الحريري']
      ]
    },
    {
      teacher: { id: 'tch_mohamed_lotfy', name: 'أ. محمد لطفي', username: 'mohamed_lotfy', grade: 'الصف الخامس', section: 'ب', classes: 'الصف الرابع (ب، ج) و الخامس (أ، ب)' },
      students: [
        ['1175056074', 'زياد عبدالله سعيد القرني'],
        ['1181864628', 'سلطان سليمان محمد السريحي'],
        ['1180219824', 'عبدالرحمن شرف عبدالرحمن الشريف'],
        ['1179472822', 'عبدالله فارس مصلح الفارسي'],
        ['1179352016', 'علي فيصل علي حترش'],
        ['1179109358', 'محمد عبدالمحسن حضاض السلمي'],
        ['1182036820', 'مهند احمد مرعي العمري'],
        ['1181136118', 'نادر سامر عبدالعزيز منصور'],
        ['1178740641', 'عبد الإله عبد الله سعيد الزهراني'],
        ['1177764899', 'سعد صالح سعد الغامدي'],
        ['1180416370', 'فواز تركي مرزوق العتيبي'],
        ['1179544976', 'عدي عادل محمد الغامدي'],
        ['1178885917', 'منصور يوسف القرني'],
        ['1175892718', 'فيصل باسم عطا الله البقي'],
        ['1178869127', 'أنس طارق محمد الغامدي'],
        ['1176040788', 'سعود زيدان سعود المطيري'],
        ['0160235518', 'عبدالعزيز فيصل محمد العولقي'],
        ['1174819670', 'يوسف ماجد صلاح الجهني'],
        ['1181324458', 'عمر طالع دخيل الله الغانمي'],
        ['2553495199', 'قيس أحمد عادل الخطيب']
      ]
    },
    {
      teacher: { id: 'tch_ahmed_abdullah', name: 'أ. أحمد عبد الله', username: 'ahmed_abdullah', grade: 'الصف الخامس', section: 'ج', classes: 'الصف الخامس (ج) و السادس (أ، ب، ج)' },
      students: [
        ['1180893586', 'عدنان حاتم نوري الجاوي'],
        ['2433221237', 'عبدالعزيز ممدوح عبدالله البعسي'],
        ['1174538155', 'إلياس إبراهيم سعيد الزهراني'],
        ['1178767826', 'أسر فيصل أحمد المالكي'],
        ['1181531714', 'بدر ماجد أيمن الجهني'],
        ['1180192658', 'حسام عبد الله عواد الثقفي'],
        ['2425347677', 'حسن محسن حسن الحبشي'],
        ['1187922537', 'زايد شجاع عاطي الحربي'],
        ['1178094213', 'سعود عبد الله خضر الغامدي'],
        ['1171827718', 'سلطان سعد محمد الدوسري'],
        ['1178568430', 'عبد العزيز بسام عويض البيضاني'],
        ['2424471320', 'عمر محمد وسيم عيسى'],
        ['1180110940', 'محمد سليمان عساف العساف'],
        ['1178109722', 'البراء فيصل جميل سرور الحارثي'],
        ['1179869852', 'تميم هلال صامل صالح السواط'],
        ['1187548787', 'سامي صلاح محمد الغامدي'],
        ['1176146874', 'محمد مساعد محمد الدوسري'],
        ['2429167865', 'نواف محمد علي عيدي'],
        ['1175947371', 'عمر هيثم أحمد الشريف'],
        ['1180110676', 'معاذ سليمان عساف العساف'],
        ['1179730948', 'محمد حمدان حامد السفري']
      ]
    },
    {
      teacher: { id: 'tch_ahmed_abdullah', name: 'أ. أحمد عبد الله', username: 'ahmed_abdullah', grade: 'الصف السادس', section: 'أ', classes: 'الصف الخامس (ج) و السادس (أ، ب، ج)' },
      students: [
        ['1174677516', 'أنس احمد علي الغامدي'],
        ['1175480316', 'سعود محمد مطر الصحفي'],
        ['1175965233', 'عبدالمحسن ماجد بن صالح الجطيلي'],
        ['1174447068', 'محمد مراد سالم الغامدي'],
        ['1172375949', 'معاذ موسى مهنا العجلاني'],
        ['1172142240', 'يزن سعيد حسين القحطاني'],
        ['2418757221', 'يوسف محمد محمود الشرفا'],
        ['1172453670', 'محمد فواز مساعد النافعي'],
        ['1172776245', 'سعود محمد أحمد الغامدي'],
        ['1179231731', 'علي محمد علي السرحاني'],
        ['1172630004', 'يوسف فيصل محمد نواوي'],
        ['1176272258', 'هادي أمجد هادي مدخلي'],
        ['1175646320', 'فهد خلف شحاذة العنزي'],
        ['1175444056', 'إلياس ماجد عبد الله الجعيد'],
        ['1173669787', 'عبد الله فهد حمد الجلسي'],
        ['1173972892', 'فراس نايف سلطان كلكتاوي'],
        ['2419275967', 'محمد نايف سالم باوزير'],
        ['1172092791', 'عبدالعزيز ابراهيم عبدالله الثمالي'],
        ['1172808287', 'محمد عبدالرحمن محمد الخضيري'],
        ['1170861288', 'تركي احمد محمد الشهراني'],
        ['1176900957', 'عبد الله عبد العزيز غداف العمري']
      ]
    },
    {
      teacher: { id: 'tch_ahmed_abdullah', name: 'أ. أحمد عبد الله', username: 'ahmed_abdullah', grade: 'الصف السادس', section: 'ب', classes: 'الصف الخامس (ج) و السادس (أ، ب، ج)' },
      students: [
        ['1177388020', 'ابراهيم محمد ابن رشيد الدوسري'],
        ['1173184647', 'البراء عبدالله احمد الغامدي'],
        ['1174073468', 'فواز طارق معيض الشمراني'],
        ['1175534708', 'فيصل بندر عبدالله القحطاني'],
        ['1174235331', 'محمد مازن محمد الخطابي'],
        ['1175554151', 'معاذ مهدى عامر الذويبي'],
        ['1174274512', 'مهند عبداللطيف محمد الغامدي'],
        ['1173780279', 'ماجد محمد عائض القحطاني'],
        ['1176266839', 'مشاري تركي عبد الله الدوسري'],
        ['2393170275', 'زيد حمزه عبد الرؤوف عيسى'],
        ['1172727214', 'فارس فهد عبدالله السليماني'],
        ['4448841124', 'يوسف محمود خالد كوثر'],
        ['1176370060', 'عزام ايمن فهد السليماني'],
        ['1173968635', 'محمد عبدالله محمد المري'],
        ['1172419663', 'وسام أسعد سعيد الغامدي'],
        ['2627439959', 'مراد محسن حسن على'],
        ['1169707609', 'محمد عبد الله محمد الصحفي'],
        ['1172037267', 'هتان أحمد ناجي الحمدي']
      ]
    },
    {
      teacher: { id: 'tch_ahmed_abdullah', name: 'أ. أحمد عبد الله', username: 'ahmed_abdullah', grade: 'الصف السادس', section: 'ج', classes: 'الصف الخامس (ج) و السادس (أ، ب، ج)' },
      students: [
        ['2454046208', 'أحمد ماجد علي عوض'],
        ['1174463842', 'الياس محمد عبدالله الحربي'],
        ['1171979170', 'خالد محمد مديني البارقي'],
        ['1174244093', 'سعد فهد سعد الزهراني'],
        ['1172506204', 'سعود احمد يحيى المالكي'],
        ['1174619740', 'عبد العزيز سلطان عبد العزيز الحارثي'],
        ['1172288753', 'محمد سعيد محمد الصقور'],
        ['1219109582', 'اصيل حسن صديق أحمد'],
        ['1177910708', 'مؤيد أسامة أحمد الشيخي'],
        ['2553495181', 'أسامة أحمد عادل الخطيب'],
        ['1171523051', 'مشعل فهد أحمد باجابر'],
        ['1168390209', 'فيصل هاني فيصل الرتوعي'],
        ['1173432558', 'مؤيد عبد الرحمن نامي السلمي'],
        ['1175434305', 'جراح سعيد عبد الله الربيعي'],
        ['1174246916', 'حسن علي عبدالله بكر باجابر'],
        ['1173539915', 'سعود فهد علي عطيه الله الظاهري'],
        ['1174899615', 'عزام محمد عبدالله صالح الصيخان']
      ]
    }
  ];

  (function appendRosterToDefaultUsers() {
    var seq = 101;
    SAHIL_ROSTER_GROUPS.forEach(function (grp) {
      var t = grp.teacher;
      if (!DEFAULT_USERS.some(function (u) { return u.id === t.id; })) {
        DEFAULT_USERS.push({
          id: t.id,
          role: 'teacher',
          name: t.name,
          username: t.username,
          email: t.username + '@sahil.edu.sa',
          pass: '123456',
          school: 'مدرسة الساحل الأهلية',
          subject: 'اللغة العربية',
          classes: t.classes,
          active: true,
          createdAt: '2026-11-16'
        });
      }
      grp.students.forEach(function (pair) {
        var nid = pair[0];
        var sname = pair[1];
        DEFAULT_USERS.push({
          id: 'stu_' + nid,
          numericId: seq++,
          nationalId: nid,
          role: 'student',
          name: sname,
          username: nid,
          email: nid + '@sahil.edu.sa',
          pass: '123456',
          school: 'مدرسة الساحل الأهلية',
          grade: t.grade,
          section: t.section,
          level: 'المستوى (ز)',
          assignedTeacherId: t.id,
          assignedTeacherName: t.name,
          active: true,
          createdAt: '2026-11-16'
        });
      });
    });
  })();

  // Purge legacy dummy accounts & stale student names from browser cache
  (function purgeDummyStorage() {
    try {
      var cur = JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
      if (cur && DUMMY_IDS[cur.id]) {
        localStorage.removeItem(SESSION_KEY);
      }
      var selName = localStorage.getItem('iread_selected_student_name');
      if (selName === 'يوسف طارق' || selName === 'سارة أحمد' || selName === 'عمر خالد' || selName === 'ليلى محمود' || selName === 'نور الهدى') {
        localStorage.removeItem('iread_selected_student_name');
        localStorage.removeItem('iread_selected_student_id');
      }
    } catch (e) {}
  })();

  function loadUsers() {
    if (SERVER_DB && Array.isArray(SERVER_DB.users) && SERVER_DB.users.length) {
      return SERVER_DB.users.filter(function (u) { return !DUMMY_IDS[u.id]; });
    }
    try {
      var raw = localStorage.getItem(USERS_KEY);
      if (raw) {
        var arr = JSON.parse(raw);
        if (Array.isArray(arr) && arr.length) {
          arr = arr.filter(function (u) { return !DUMMY_IDS[u.id]; });
          DEFAULT_USERS.forEach(function (defU) {
            if (!arr.some(function (u) { return u.id === defU.id || u.username === defU.username; })) {
              arr.push(defU);
            }
          });
          arr.forEach(function (u) {
            if (u.school && u.school.indexOf('الأمل') !== -1) {
              u.school = 'مدرسة الساحل الأهلية';
            }
          });
          return arr;
        }
      }
    } catch (e) {}
    return DEFAULT_USERS.slice();
  }

  function pushDbToServer(dbObj) {
    if (!dbObj || typeof fetch !== 'function') return;
    try {
      fetch(SUPABASE_URL + '/rest/v1/system_settings?on_conflict=id', {
        method: 'POST',
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: 'Bearer ' + SUPABASE_KEY,
          'Content-Type': 'application/json',
          Prefer: 'resolution=merge-duplicates,return=minimal'
        },
        body: JSON.stringify({
          id: 'iread_db_v1',
          app_name: 'منصة أقرأ بالعربية - قاعدة البيانات',
          school_name: 'مدرسة الساحل الأهلية',
          classification_thresholds: dbObj
        })
      }).catch(function () {});
    } catch (e) {}
  }

  function syncFromServer() {
    if (typeof fetch !== 'function') return Promise.resolve(null);
    return fetch(SUPABASE_URL + '/rest/v1/system_settings?id=eq.iread_db_v1&select=classification_thresholds', {
      cache: 'no-store',
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: 'Bearer ' + SUPABASE_KEY
      }
    }).then(function (r) {
      if (!r.ok) throw new Error('supabase status ' + r.status);
      return r.json();
    }).then(function (rows) {
      var db = rows && rows[0] && rows[0].classification_thresholds;
      if (db && Array.isArray(db.users) && db.users.length) {
        SERVER_DB = db;
        localStorage.removeItem(USERS_KEY);
        // Refresh active user from external DB if logged in
        var cur = getCurrentUser();
        if (cur && cur.id) {
          var fresh = db.users.find(function (u) { return u.id === cur.id; });
          if (fresh) setCurrentUser(fresh);
        }
        try { window.dispatchEvent(new CustomEvent('iread:db-synced', { detail: db })); } catch (ev) {}
        return db;
      }
      return null;
    }).catch(function () {
      // Fallback to server-hosted JSON database
      return fetch('/assets/data/users-db.json?t=' + Date.now(), { cache: 'no-store' })
        .then(function (r) { return r.ok ? r.json() : null; })
        .then(function (db) {
          if (db && Array.isArray(db.users)) {
            SERVER_DB = db;
            try { window.dispatchEvent(new CustomEvent('iread:db-synced', { detail: db })); } catch (ev) {}
          }
          return db;
        }).catch(function () { return null; });
    });
  }

  var readyPromise = syncFromServer();

  function saveUsers(users) {
    var cleanUsers = (users || []).filter(function (u) { return !DUMMY_IDS[u.id]; });
    if (!SERVER_DB) {
      SERVER_DB = { version: '2026-11-16.2', users: cleanUsers, skillProgress: {}, bookProgress: {}, studentStats: {}, appSettings: {} };
    } else {
      SERVER_DB.users = cleanUsers;
    }
    pushDbToServer(SERVER_DB);
    var customStudents = cleanUsers.filter(function (u) {
      return u.role === 'student';
    }).map(function (u) {
      return { id: u.numericId, name: u.name, grade: u.grade || 'الصف الأول', level: u.level || 'المستوى (ز)', school: u.school || '' };
    });
    localStorage.setItem(CUSTOM_STUDENTS_KEY, JSON.stringify(customStudents));
  }

  function syncStudentSession(user) {
    if (!user || user.role !== 'student') return;
    localStorage.setItem('iread_selected_student_id', String(user.numericId || 4));
    localStorage.setItem('iread_selected_student_name', user.name);
    localStorage.setItem('iread_selected_student_level', user.level || 'المستوى (ز)');
  }

  function getCurrentUser() {
    try {
      var raw = localStorage.getItem(SESSION_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function setCurrentUser(user) {
    if (!user) {
      localStorage.removeItem(SESSION_KEY);
      return;
    }
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    if (user.role === 'student') syncStudentSession(user);
  }

  function registerUser(payload) {
    var users = loadUsers();
    var uname = (payload.username || '').trim().toLowerCase();
    var email = (payload.email || '').trim().toLowerCase();
    if (!payload.name || !uname || !payload.pass) {
      return { ok: false, error: 'يرجى تعبئة الاسم واسم المستخدم وكلمة المرور.' };
    }
    var exists = users.some(function (u) {
      return u.username.toLowerCase() === uname || (email && u.email && u.email.toLowerCase() === email);
    });
    if (exists) {
      return { ok: false, error: 'اسم المستخدم أو البريد الإلكتروني مسجل مسبقاً.' };
    }

    var nextNumericId = null;
    if (payload.role === 'student') {
      var maxId = users.reduce(function (m, u) { return Math.max(m, Number(u.numericId || 0)); }, 5);
      nextNumericId = maxId + 1;
    }

    var newUser = {
      id: (payload.role || 'stu').slice(0, 4) + '_' + Date.now(),
      numericId: nextNumericId,
      role: payload.role || 'student',
      name: payload.name.trim(),
      username: uname,
      email: email || (uname + '@school.edu'),
      pass: payload.pass,
      school: (payload.school || 'مدارس الساحل الأهلية').trim(),
      grade: payload.grade || 'الصف الأول',
      section: payload.section || 'أ',
      level: payload.level || 'المستوى (ز)',
      subject: payload.subject || 'اللغة العربية',
      classes: payload.classes || 'جميع الصفوف',
      jobTitle: payload.jobTitle || 'مدير المدرسة',
      sector: payload.sector || 'الإشراف التربوي',
      assignedTeacherId: payload.assignedTeacherId || '',
      assignedTeacherName: payload.assignedTeacherName || '',
      active: true,
      createdAt: new Date().toLocaleDateString('ar-SA')
    };

    users.push(newUser);
    saveUsers(users);
    if (!payload.skipAutoLogin) {
      setCurrentUser(newUser);
    }
    return { ok: true, user: newUser };
  }

  function normalizeDigits(str) {
    return String(str || '').replace(/[٠-٩]/g, function (d) {
      return String('٠١٢٣٤٥٦٧٨٩'.indexOf(d));
    }).replace(/[۰-۹]/g, function (d) {
      return String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d));
    });
  }

  function loginUser(identifier, password, roleFilter) {
    var users = loadUsers();
    var key = normalizeDigits((identifier || '').trim()).toLowerCase();
    var passNorm = normalizeDigits((password || '').trim());
    var user = users.find(function (u) {
      var cleanName = (u.name || '').replace(/^أ\.\s*/, '').trim().toLowerCase();
      var matchId = u.username.toLowerCase() === key ||
        (u.nationalId && u.nationalId.toLowerCase() === key) ||
        (u.email && u.email.toLowerCase() === key) ||
        (u.name && u.name.toLowerCase() === key) ||
        (cleanName && cleanName === key);
      var matchRole = !roleFilter || roleFilter === 'all' || u.role === roleFilter;
      return matchId && matchRole && u.pass === passNorm;
    });
    // If user typed a username and selected a role on login screen with default pass 1234, allow role-based demo entry seamlessly
    if (!user && roleFilter && roleFilter !== 'all' && password === '1234') {
      user = users.find(function (u) { return u.role === roleFilter && u.active; });
    }
    if (!user) {
      return { ok: false, error: 'بيانات الدخول غير صحيحة. تأكد من اسم المستخدم وكلمة المرور.' };
    }
    if (!user.active) {
      return { ok: false, error: 'تم إيقاف هذا الحساب مؤقتاً من قِبل الإدارة المدرسية.' };
    }
    setCurrentUser(user);
    return { ok: true, user: user };
  }

  function quickDemoLogin(role) {
    var users = loadUsers();
    var user = users.find(function (u) { return u.role === role && u.active; });
    if (user) {
      setCurrentUser(user);
      return { ok: true, user: user };
    }
    return { ok: false, error: 'لا يوجد حساب تجريبي مفعل لهذا الدور.' };
  }

  function logout() {
    setCurrentUser(null);
  }

  function toggleUserStatus(userId) {
    var users = loadUsers();
    users = users.map(function (u) {
      if (u.id === userId) u.active = !u.active;
      return u;
    });
    saveUsers(users);
    return users;
  }

  function deleteUser(userId) {
    var users = loadUsers().filter(function (u) { return u.id !== userId; });
    saveUsers(users);
    return users;
  }

  function assignStudentToTeacher(studentId, teacherId) {
    var users = loadUsers();
    var teacher = users.find(function (u) { return u.id === teacherId && u.role === 'teacher'; });
    var updatedStudent = null;
    users = users.map(function (u) {
      if (u.id === studentId && u.role === 'student') {
        u.assignedTeacherId = teacher ? teacher.id : '';
        u.assignedTeacherName = teacher ? teacher.name : '';
        updatedStudent = u;
      }
      return u;
    });
    if (!updatedStudent || !teacher) {
      return { ok: false, error: 'تعذر العثور على الطالب أو المعلم المحدد.' };
    }
    saveUsers(users);
    return { ok: true, student: updatedStudent, teacher: teacher };
  }

  function getSupervisorNotes() {
    try {
      return JSON.parse(localStorage.getItem(SUP_NOTES_KEY) || '[]');
    } catch (e) {
      return [];
    }
  }

  function addSupervisorNote(author, roleLabel, text) {
    var list = getSupervisorNotes();
    list.unshift({
      id: Date.now(),
      author: author,
      roleLabel: roleLabel,
      text: text,
      date: new Date().toLocaleDateString('ar-SA')
    });
    localStorage.setItem(SUP_NOTES_KEY, JSON.stringify(list));
    return list;
  }

  function renderAuthBanner(containerSelector, basePrefix) {
    var el = document.querySelector(containerSelector);
    if (!el) return;
    var prefix = basePrefix || '';
    var u = getCurrentUser();
    if (!u) {
      el.innerHTML =
        '<div style="background:#eef2ff;border:1px solid #c7d2fe;border-radius:12px;padding:10px 16px;display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:10px;direction:rtl;">' +
          '<span style="font-weight:700;color:#1e3a8a;">🔒 الجلسة محمية: يرجى تسجيل الدخول للوصول إلى صفحتك</span>' +
          '<div style="display:flex;gap:8px;flex-wrap:wrap;">' +
            '<a href="' + prefix + 'index.html?skipIntro=1" class="btn btn-primary btn-sm font-weight-bold">تسجيل الدخول</a>' +
          '</div>' +
        '</div>';
      return;
    }
    var meta = ROLE_META[u.role] || ROLE_META.student;
    el.innerHTML =
      '<div style="background:#f0fdf4;border:1px solid #86efac;border-radius:12px;padding:10px 16px;display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:10px;direction:rtl;">' +
        '<div>' +
          '<span style="background:' + meta.color + ';color:#fff;padding:3px 10px;border-radius:999px;font-size:12px;font-weight:800;margin-left:8px;">' + meta.icon + ' ' + meta.label + '</span>' +
          '<strong style="color:#0f172a;">مرحباً، ' + u.name + '</strong>' +
          '<small class="text-muted mr-2">(' + (u.school || '') + ')</small>' +
        '</div>' +
        '<div style="display:flex;gap:8px;flex-wrap:wrap;">' +
          '<a href="' + prefix + meta.home + '" class="btn btn-success btn-sm font-weight-bold">صفحتي</a>' +
          '<button type="button" id="ireadLogoutBtn" class="btn btn-outline-danger btn-sm font-weight-bold">تسجيل الخروج</button>' +
        '</div>' +
      '</div>';
    var btn = document.getElementById('ireadLogoutBtn');
    if (btn) {
      btn.addEventListener('click', function () {
        logout();
        window.location.href = prefix + 'index.html?skipIntro=1';
      });
    }
  }

  window.IREAD_AUTH = {
    ROLE_META: ROLE_META,
    CLASS_GRADES: CLASS_GRADES,
    CLASS_SECTIONS: CLASS_SECTIONS,
    ready: readyPromise,
    syncFromServer: syncFromServer,
    loadUsers: loadUsers,
    registerUser: registerUser,
    loginUser: loginUser,
    quickDemoLogin: quickDemoLogin,
    logout: logout,
    getCurrentUser: getCurrentUser,
    toggleUserStatus: toggleUserStatus,
    deleteUser: deleteUser,
    assignStudentToTeacher: assignStudentToTeacher,
    getSupervisorNotes: getSupervisorNotes,
    addSupervisorNote: addSupervisorNote,
    renderAuthBanner: renderAuthBanner
  };
})(window);
