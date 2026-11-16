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

  var DEFAULT_USERS = [
    { id: 'stu_1', numericId: 1, role: 'student', name: 'سارة أحمد', username: 'sara', email: 'sara@school.edu', pass: '1234', school: 'مدارس الساحل الأهلية', grade: 'الصف الأول', section: 'أ', level: 'المستوى (ز)', assignedTeacherId: 'tch_1', assignedTeacherName: 'أ. مريم العلي', active: true, createdAt: '2026-10-01' },
    { id: 'stu_2', numericId: 2, role: 'student', name: 'عمر خالد', username: 'omar', email: 'omar@school.edu', pass: '1234', school: 'مدارس الساحل الأهلية', grade: 'الصف الثاني', section: 'ب', level: 'المستوى (ز)', assignedTeacherId: 'tch_1', assignedTeacherName: 'أ. مريم العلي', active: true, createdAt: '2026-10-01' },
    { id: 'stu_3', numericId: 3, role: 'student', name: 'ليلى محمود', username: 'layla', email: 'layla@school.edu', pass: '1234', school: 'مدارس الساحل الأهلية', grade: 'الصف الثالث', section: 'ج', level: 'المستوى (ز)', assignedTeacherId: 'tch_1', assignedTeacherName: 'أ. مريم العلي', active: true, createdAt: '2026-10-01' },
    { id: 'stu_4', numericId: 4, role: 'student', name: 'يوسف طارق', username: 'yusuf', email: 'yusuf@school.edu', pass: '1234', school: 'مدارس الساحل الأهلية', grade: 'الصف الرابع', section: 'أ', level: 'المستوى (ز)', assignedTeacherId: 'tch_1', assignedTeacherName: 'أ. مريم العلي', active: true, createdAt: '2026-10-01' },
    { id: 'stu_5', numericId: 5, role: 'student', name: 'نور الهدى', username: 'noor', email: 'noor@school.edu', pass: '1234', school: 'مدارس الساحل الأهلية', grade: 'الصف الخامس', section: 'ب', level: 'المستوى (ز)', assignedTeacherId: 'tch_1', assignedTeacherName: 'أ. مريم العلي', active: true, createdAt: '2026-10-01' },
    { id: 'tch_1', role: 'teacher', name: 'أ. مريم العلي', username: 'teacher1', email: 'mariam@school.edu', pass: '1234', school: 'مدارس الساحل الأهلية', subject: 'اللغة العربية', classes: 'الصف الأول – السادس (أ، ب، ج)', active: true, createdAt: '2026-10-01' },
    { id: 'adm_1', role: 'admin', name: 'أ. خالد المنصور (مدير المدرسة)', username: 'admin1', email: 'principal@school.edu', pass: '1234', school: 'مدارس الساحل الأهلية', jobTitle: 'مدير المدرسة', active: true, createdAt: '2026-10-01' },
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
    }
  ];

  (function appendRosterToDefaultUsers() {
    var seq = 101;
    SAHIL_ROSTER_GROUPS.forEach(function (grp) {
      var t = grp.teacher;
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

  function loadUsers() {
    try {
      var raw = localStorage.getItem(USERS_KEY);
      if (raw) {
        var arr = JSON.parse(raw);
        if (Array.isArray(arr) && arr.length) {
          var changed = false;
          // Ensure all DEFAULT_USERS (including general_supervisor, teachers, and real student IDs) exist
          DEFAULT_USERS.forEach(function (defU) {
            if (!arr.some(function (u) { return u.id === defU.id || u.username === defU.username; })) {
              arr.push(defU);
              changed = true;
            }
          });
          // Migrate legacy "مدرسة الأمل" school names to "مدرسة الساحل الأهلية"
          arr.forEach(function (u) {
            if (u.school && u.school.indexOf('الأمل') !== -1) {
              u.school = 'مدرسة الساحل الأهلية';
              changed = true;
            }
          });
          if (changed) {
            localStorage.setItem(USERS_KEY, JSON.stringify(arr));
          }
          try {
            var curRaw = localStorage.getItem(SESSION_KEY);
            if (curRaw && curRaw.indexOf('الأمل') !== -1) {
              var curObj = JSON.parse(curRaw);
              if (curObj && curObj.school && curObj.school.indexOf('الأمل') !== -1) {
                curObj.school = 'مدرسة الساحل الأهلية';
                localStorage.setItem(SESSION_KEY, JSON.stringify(curObj));
              }
            }
            var tRaw = localStorage.getItem('iread_teacher_profile_v1');
            if (tRaw && tRaw.indexOf('الأمل') !== -1) {
              var tObj = JSON.parse(tRaw);
              if (tObj && tObj.school && tObj.school.indexOf('الأمل') !== -1) {
                tObj.school = 'مدرسة الساحل الأهلية';
                localStorage.setItem('iread_teacher_profile_v1', JSON.stringify(tObj));
              }
            }
          } catch (me) {}
          return arr;
        }
      }
    } catch (e) {}
    localStorage.setItem(USERS_KEY, JSON.stringify(DEFAULT_USERS));
    return DEFAULT_USERS.slice();
  }

  function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    var customStudents = users.filter(function (u) {
      return u.role === 'student' && Number(u.numericId) > 5;
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
