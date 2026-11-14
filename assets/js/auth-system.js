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

  var DEFAULT_USERS = [
    { id: 'stu_1', numericId: 1, role: 'student', name: 'سارة أحمد', username: 'sara', email: 'sara@school.edu', pass: '1234', school: 'مدارس الساحل الأهلية', grade: 'الصف الأول', level: 'المستوى (ز)', active: true, createdAt: '2026-10-01' },
    { id: 'stu_2', numericId: 2, role: 'student', name: 'عمر خالد', username: 'omar', email: 'omar@school.edu', pass: '1234', school: 'مدارس الساحل الأهلية', grade: 'الصف الثاني', level: 'المستوى (ز)', active: true, createdAt: '2026-10-01' },
    { id: 'stu_3', numericId: 3, role: 'student', name: 'ليلى محمود', username: 'layla', email: 'layla@school.edu', pass: '1234', school: 'مدارس الساحل الأهلية', grade: 'الصف الثالث', level: 'المستوى (ز)', active: true, createdAt: '2026-10-01' },
    { id: 'stu_4', numericId: 4, role: 'student', name: 'يوسف طارق', username: 'yusuf', email: 'yusuf@school.edu', pass: '1234', school: 'مدارس الساحل الأهلية', grade: 'الصف الرابع', level: 'المستوى (ز)', active: true, createdAt: '2026-10-01' },
    { id: 'stu_5', numericId: 5, role: 'student', name: 'نور الهدى', username: 'noor', email: 'noor@school.edu', pass: '1234', school: 'مدارس الساحل الأهلية', grade: 'الصف الرابع', level: 'المستوى (ز)', active: true, createdAt: '2026-10-01' },
    { id: 'tch_1', role: 'teacher', name: 'أ. مريم العلي', username: 'teacher1', email: 'mariam@school.edu', pass: '1234', school: 'مدارس الساحل الأهلية', subject: 'اللغة العربية', classes: 'الصف الأول – الرابع', active: true, createdAt: '2026-10-01' },
    { id: 'adm_1', role: 'admin', name: 'أ. خالد المنصور (مدير المدرسة)', username: 'admin1', email: 'principal@school.edu', pass: '1234', school: 'مدارس الساحل الأهلية', jobTitle: 'مدير المدرسة', active: true, createdAt: '2026-10-01' },
    { id: 'sup_1', role: 'supervisor', name: 'د. عبدالله السالم (مشرف تربوي)', username: 'sup1', email: 'supervisor@edu.gov', pass: '1234', school: 'إدارة التعليم – مكتب الإشراف', sector: 'الإشراف التربوي – اللغة العربية', active: true, createdAt: '2026-10-01' },
    { id: 'gsup_1', role: 'general_supervisor', name: 'د. فهد العتيبي (المشرف العام)', username: 'gsup1', email: 'general@edu.gov', pass: '1234', school: 'الإدارة العامة للتعليم', sector: 'الإشراف العام على المنصة والمدارس', active: true, createdAt: '2026-10-01' }
  ];

  function loadUsers() {
    try {
      var raw = localStorage.getItem(USERS_KEY);
      if (raw) {
        var arr = JSON.parse(raw);
        if (Array.isArray(arr) && arr.length) {
          // Ensure general_supervisor exists in older saved storage
          if (!arr.some(function (u) { return u.role === 'general_supervisor'; })) {
            arr.push(DEFAULT_USERS[DEFAULT_USERS.length - 1]);
            localStorage.setItem(USERS_KEY, JSON.stringify(arr));
          }
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
      level: payload.level || 'المستوى (ز)',
      subject: payload.subject || 'اللغة العربية',
      classes: payload.classes || 'جميع الصفوف',
      jobTitle: payload.jobTitle || 'مدير المدرسة',
      sector: payload.sector || 'الإشراف التربوي',
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

  function loginUser(identifier, password, roleFilter) {
    var users = loadUsers();
    var key = (identifier || '').trim().toLowerCase();
    var user = users.find(function (u) {
      var matchId = u.username.toLowerCase() === key || (u.email && u.email.toLowerCase() === key) || (u.name && u.name.toLowerCase() === key);
      var matchRole = !roleFilter || roleFilter === 'all' || u.role === roleFilter;
      return matchId && matchRole && u.pass === password;
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
          '<span style="font-weight:700;color:#1e3a8a;">🔐 نظام الحسابات الموحّد: سجّل دخولك (طالب / معلم / مدير / مشرف تربوي / مشرف عام)</span>' +
          '<div style="display:flex;gap:8px;flex-wrap:wrap;">' +
            '<a href="' + prefix + 'index.html?skipIntro=1" class="btn btn-primary btn-sm font-weight-bold">التسجيل / تسجيل الدخول</a>' +
            '<a href="' + prefix + 'لوحة-الإدارة/index.html" class="btn btn-outline-dark btn-sm font-weight-bold">لوحة الإدارة والمشرفين</a>' +
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
          '<a href="' + prefix + 'index.html?skipIntro=1" class="btn btn-outline-primary btn-sm font-weight-bold">تبديل الحساب</a>' +
          '<button type="button" id="ireadLogoutBtn" class="btn btn-outline-danger btn-sm font-weight-bold">خروج</button>' +
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
    loadUsers: loadUsers,
    registerUser: registerUser,
    loginUser: loginUser,
    quickDemoLogin: quickDemoLogin,
    logout: logout,
    getCurrentUser: getCurrentUser,
    toggleUserStatus: toggleUserStatus,
    deleteUser: deleteUser,
    getSupervisorNotes: getSupervisorNotes,
    addSupervisorNote: addSupervisorNote,
    renderAuthBanner: renderAuthBanner
  };
})(window);
