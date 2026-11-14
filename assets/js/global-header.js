/**
 * ============================================================================
 * IREAD ARABIC - UNIFIED GLOBAL TOP BAR & ROLE PRIVACY GUARD
 * شريط علوي موحد بخصوصية تامة لكل دور (طالب / معلم / مدير / مشرف تربوي / مشرف عام)
 * ============================================================================
 */
(function (window, document) {
  'use strict';

  var ROLE_AVATARS = {
    student: 'data:image/svg+xml;utf8,' + encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">' +
      '<circle cx="40" cy="40" r="40" fill="#dbeafe"/>' +
      '<circle cx="40" cy="74" r="26" fill="#dc2626"/>' +
      '<path d="M26 56 Q40 66 54 56 L58 80 L22 80 Z" fill="#1d4ed8"/>' +
      '<rect x="34" y="45" width="12" height="12" rx="5" fill="#fbd38d"/>' +
      '<path d="M21 36 Q20 16 40 16 Q60 16 59 36 L57 52 Q40 48 23 52 Z" fill="#4c1d95"/>' +
      '<circle cx="40" cy="35" r="14" fill="#fde68a"/>' +
      '<path d="M25 31 Q33 18 48 22 Q55 25 55 33 Q43 26 25 31 Z" fill="#5b21b6"/>' +
      '<rect x="33" y="13" width="14" height="5" rx="2.5" fill="#ec4899"/>' +
      '<circle cx="35" cy="35" r="1.8" fill="#1e293b"/>' +
      '<circle cx="45" cy="35" r="1.8" fill="#1e293b"/>' +
      '<path d="M36 41 Q40 44 44 41" fill="none" stroke="#dc2626" stroke-width="2" stroke-linecap="round"/>' +
      '</svg>'
    ),
    teacher: 'data:image/svg+xml;utf8,' + encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">' +
      '<circle cx="40" cy="40" r="40" fill="#e0f2fe"/>' +
      '<circle cx="40" cy="75" r="27" fill="#0d52b8"/>' +
      '<path d="M32 54 L40 68 L48 54" fill="#ffffff"/>' +
      '<rect x="34" y="45" width="12" height="11" rx="5" fill="#fbd38d"/>' +
      '<path d="M22 36 Q22 14 40 14 Q58 14 58 36 L55 54 Q40 50 25 54 Z" fill="#1e3a8a"/>' +
      '<circle cx="40" cy="34" r="13.5" fill="#fde68a"/>' +
      '<rect x="29" y="31" width="9" height="6" rx="2" fill="none" stroke="#082f68" stroke-width="1.8"/>' +
      '<rect x="42" y="31" width="9" height="6" rx="2" fill="none" stroke="#082f68" stroke-width="1.8"/>' +
      '<line x1="38" y1="34" x2="42" y2="34" stroke="#082f68" stroke-width="1.8"/>' +
      '<path d="M36 41 Q40 43.5 44 41" fill="none" stroke="#b91c1c" stroke-width="1.8" stroke-linecap="round"/>' +
      '</svg>'
    ),
    admin: 'data:image/svg+xml;utf8,' + encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">' +
      '<circle cx="40" cy="40" r="40" fill="#dbeafe"/>' +
      '<circle cx="40" cy="76" r="28" fill="#082f68"/>' +
      '<path d="M34 54 L40 72 L46 54 Z" fill="#ffffff"/>' +
      '<path d="M39 56 L41 56 L42 70 L40 73 L38 70 Z" fill="#f3b427"/>' +
      '<rect x="34" y="45" width="12" height="11" rx="5" fill="#f6ad55"/>' +
      '<path d="M23 30 Q25 14 40 14 Q55 14 57 30 L56 46 L24 46 Z" fill="#ffffff"/>' +
      '<rect x="25" y="16" width="30" height="5" rx="2.5" fill="#1e293b"/>' +
      '<circle cx="40" cy="34" r="13.5" fill="#fbd38d"/>' +
      '<path d="M33 41 Q40 44 47 41" fill="none" stroke="#1e293b" stroke-width="2" stroke-linecap="round"/>' +
      '<circle cx="35" cy="33" r="1.8" fill="#082f68"/>' +
      '<circle cx="45" cy="33" r="1.8" fill="#082f68"/>' +
      '</svg>'
    ),
    supervisor: 'data:image/svg+xml;utf8,' + encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">' +
      '<circle cx="40" cy="40" r="40" fill="#e0f2fe"/>' +
      '<circle cx="40" cy="76" r="27" fill="#0f766e"/>' +
      '<path d="M34 54 L40 70 L46 54 Z" fill="#ffffff"/>' +
      '<path d="M39 56 L41 56 L42 69 L38 69 Z" fill="#f3b427"/>' +
      '<rect x="34" y="44" width="12" height="11" rx="5" fill="#fbd38d"/>' +
      '<circle cx="40" cy="33" r="14" fill="#fde68a"/>' +
      '<path d="M26 28 Q28 15 40 15 Q52 15 54 28 Q40 22 26 28 Z" fill="#1e293b"/>' +
      '<rect x="29" y="30" width="9" height="6" rx="2" fill="none" stroke="#0f766e" stroke-width="1.8"/>' +
      '<rect x="42" y="30" width="9" height="6" rx="2" fill="none" stroke="#0f766e" stroke-width="1.8"/>' +
      '<line x1="38" y1="33" x2="42" y2="33" stroke="#0f766e" stroke-width="1.8"/>' +
      '<path d="M35 40 Q40 43 45 40" fill="none" stroke="#0f766e" stroke-width="2" stroke-linecap="round"/>' +
      '</svg>'
    ),
    general_supervisor: 'data:image/svg+xml;utf8,' + encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">' +
      '<circle cx="40" cy="40" r="40" fill="#fef3c7"/>' +
      '<circle cx="40" cy="76" r="28" fill="#082f68"/>' +
      '<path d="M28 54 L40 74 L52 54" fill="none" stroke="#f3b427" stroke-width="3"/>' +
      '<rect x="34" y="44" width="12" height="11" rx="5" fill="#fbd38d"/>' +
      '<path d="M22 30 Q24 13 40 13 Q56 13 58 30 L57 48 L23 48 Z" fill="#ffffff"/>' +
      '<rect x="24" y="15" width="32" height="5.5" rx="2.5" fill="#d97706"/>' +
      '<circle cx="40" cy="34" r="13.5" fill="#fde68a"/>' +
      '<circle cx="35" cy="33" r="1.8" fill="#082f68"/>' +
      '<circle cx="45" cy="33" r="1.8" fill="#082f68"/>' +
      '<path d="M34 40 Q40 43 46 40" fill="none" stroke="#082f68" stroke-width="2" stroke-linecap="round"/>' +
      '</svg>'
    )
  };

  var ROLE_LABELS = {
    student: 'طالب',
    teacher: 'معلم',
    admin: 'مدير مدرسة',
    supervisor: 'مشرف تربوي',
    general_supervisor: 'مشرف عام'
  };

  var ROLE_HOMES = {
    student: 'بوابة-الطالب/index.html',
    teacher: 'بوابة-المعلم/index.html',
    admin: 'لوحة-الإدارة/index.html?role=admin',
    supervisor: 'لوحة-الإدارة/index.html?role=supervisor',
    general_supervisor: 'لوحة-الإدارة/index.html?role=general_supervisor'
  };

  function detectBasePrefix() {
    var path = decodeURIComponent(window.location.pathname || '');
    var subDirs = [
      '/بوابة-الطالب/', '/بوابة-المعلم/', '/لوحة-الإدارة/', '/التسجيل/', '/دخول-مباشر/',
      '/المكتبة/', '/الأنشطة/', '/المكافآت/', '/القصة-الأسبوعية/', '/المعلم/',
      '/المدونة/', '/الاسعار/', '/اتصلوا-بنا/', '/معرض-الصور/', '/test/', '/test-2/'
    ];
    for (var i = 0; i < subDirs.length; i++) {
      if (path.indexOf(subDirs[i]) !== -1) return '../';
    }
    if (path.indexOf('/classes-category/') !== -1 || path.indexOf('/our_product/') !== -1 || path.indexOf('/gallery-category/') !== -1) {
      return '../../';
    }
    return './';
  }

  function getSavedTeacherCustomProfile() {
    try {
      var raw = localStorage.getItem('iread_teacher_profile_v1');
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function resolveActiveUser() {
    var qRole = (new URLSearchParams(window.location.search)).get('role');
    if (qRole && ROLE_LABELS[qRole] && window.IREAD_AUTH && typeof window.IREAD_AUTH.quickDemoLogin === 'function') {
      // Explicit ?role=... query parameter switches the active demo session to that role
      var current = window.IREAD_AUTH.getCurrentUser ? window.IREAD_AUTH.getCurrentUser() : null;
      if (!current || current.role !== qRole) {
        var switched = window.IREAD_AUTH.quickDemoLogin(qRole);
        if (switched && switched.ok && switched.user) {
          return switched.user;
        }
      }
    }

    var A = window.IREAD_AUTH;
    var u = A && A.getCurrentUser ? A.getCurrentUser() : null;
    if (!u) {
      try {
        var raw = localStorage.getItem('iread_current_user_v1');
        if (raw) u = JSON.parse(raw);
      } catch (e) {}
    }

    if (u && u.role && ROLE_LABELS[u.role]) {
      if (u.role === 'teacher') {
        var customT = getSavedTeacherCustomProfile();
        if (customT) {
          if (customT.name) u.name = customT.name;
          if (customT.school) u.school = customT.school;
          if (customT.avatar) u.customAvatar = customT.avatar;
        }
      }
      return u;
    }

    // If no active login session exists yet, initialize based on current entry portal and lock it
    var path = decodeURIComponent(window.location.pathname || '');
    var fallback = {
      role: 'student',
      name: localStorage.getItem('iread_selected_student_name') || 'سارة أحمد',
      school: 'مدارس الساحل الأهلية',
      grade: 'الصف الأول – المستوى (ز)'
    };
    if (path.indexOf('بوابة-المعلم') !== -1 || path.indexOf('/المعلم') !== -1) {
      var tProf = getSavedTeacherCustomProfile() || {};
      fallback = {
        role: 'teacher',
        name: tProf.name || 'أ. مريم العلي',
        school: tProf.school || 'مدارس الساحل الأهلية',
        subject: tProf.subject || 'اللغة العربية',
        customAvatar: tProf.avatar || ''
      };
    } else if (path.indexOf('لوحة-الإدارة') !== -1) {
      var r = (qRole === 'supervisor' || qRole === 'general_supervisor') ? qRole : 'admin';
      fallback = {
        role: r,
        name: r === 'supervisor' ? 'د. عبدالله السالم' : (r === 'general_supervisor' ? 'د. فهد العتيبي' : 'أ. خالد المنصور'),
        school: r === 'admin' ? 'مدارس الساحل الأهلية' : 'إدارة الإشراف التربوي'
      };
    }
    try {
      localStorage.setItem('iread_current_user_v1', JSON.stringify(fallback));
    } catch (e) {}
    return fallback;
  }

  // =====================================================================
  // STRICT ROLE-BASED PRIVACY GUARD (تأمين الخصوصية ومنع التنقل بين الأدوار)
  // =====================================================================
  function enforceRolePrivacyGuard(user, prefix) {
    var role = (user && user.role) || 'student';
    var path = decodeURIComponent(window.location.pathname || '');
    var qRole = (new URLSearchParams(window.location.search)).get('role');

    var isStudentPortal = path.indexOf('بوابة-الطالب') !== -1;
    var isTeacherPortal = path.indexOf('بوابة-المعلم') !== -1 || path.indexOf('/المعلم/') !== -1;
    var isAdminPortal = path.indexOf('لوحة-الإدارة') !== -1;

    var forbidden = false;
    if (role === 'student' && (isTeacherPortal || isAdminPortal)) {
      forbidden = true;
    } else if (role === 'teacher' && (isStudentPortal || isAdminPortal)) {
      forbidden = true;
    } else if ((role === 'admin' || role === 'supervisor' || role === 'general_supervisor') && (isStudentPortal || isTeacherPortal)) {
      forbidden = true;
    } else if (isAdminPortal && (role === 'admin' || role === 'supervisor' || role === 'general_supervisor')) {
      if (qRole && qRole !== role) {
        window.location.replace(prefix + (ROLE_HOMES[role] || 'لوحة-الإدارة/index.html?role=' + role));
        return true;
      }
    }

    if (forbidden) {
      window.location.replace(prefix + (ROLE_HOMES[role] || 'بوابة-الطالب/index.html'));
      return true;
    }
    return false;
  }

  // Scrub any legacy cross-role buttons inside subpage headers/cards so users never see links to other roles
  function scrubCrossRoleDomElements(role) {
    var allLinks = document.querySelectorAll('a[href]');
    allLinks.forEach(function (a) {
      if (a.closest('#ireadGlobalTopbar')) return;
      var href = decodeURIComponent(a.getAttribute('href') || '');
      if (role === 'student') {
        if (href.indexOf('بوابة-المعلم') !== -1 || href.indexOf('لوحة-الإدارة') !== -1 || href.indexOf('/المعلم/') !== -1 || href.indexOf('التسجيل') !== -1 || href.indexOf('دخول-مباشر') !== -1) {
          a.style.display = 'none';
        }
      } else if (role === 'teacher') {
        if (href.indexOf('بوابة-الطالب') !== -1 || href.indexOf('لوحة-الإدارة') !== -1 || href.indexOf('التسجيل') !== -1 || href.indexOf('دخول-مباشر') !== -1) {
          a.style.display = 'none';
        }
      } else if (role === 'admin' || role === 'supervisor' || role === 'general_supervisor') {
        if (href.indexOf('بوابة-الطالب') !== -1 || href.indexOf('بوابة-المعلم') !== -1 || href.indexOf('التسجيل') !== -1 || href.indexOf('دخول-مباشر') !== -1) {
          a.style.display = 'none';
        }
      }
    });
  }

  function buildRoleSpecificMenuItems(role, prefix) {
    if (role === 'student') {
      return (
        '<a href="' + prefix + 'بوابة-الطالب/index.html#home" class="iread-role-opt active" data-student-tab="home"><span style="color:#ee6b1e;font-weight:900;">(١)</span><span>الصفحة الرئيسية</span></a>' +
        '<a href="' + prefix + 'بوابة-الطالب/index.html#challenge" class="iread-role-opt" data-student-tab="challenge"><span style="color:#ee6b1e;font-weight:900;">(٢)</span><span>تحدي القراءة</span></a>' +
        '<a href="' + prefix + 'بوابة-الطالب/index.html#tasks" class="iread-role-opt" data-student-tab="tasks"><span style="color:#ee6b1e;font-weight:900;">(٣)</span><span>المهام</span></a>' +
        '<a href="' + prefix + 'بوابة-الطالب/index.html#badges" class="iread-role-opt" data-student-tab="badges"><span style="color:#ee6b1e;font-weight:900;">(٤)</span><span>إنجازات وإشارات</span></a>' +
        '<a href="' + prefix + 'بوابة-الطالب/index.html#games" class="iread-role-opt" data-student-tab="games"><span style="color:#ee6b1e;font-weight:900;">(٥)</span><span>ألعاب تفاعلية</span></a>'
      );
    }
    if (role === 'teacher') {
      return (
        '<a href="' + prefix + 'بوابة-المعلم/index.html#home" class="iread-role-opt active" data-teacher-tab="home"><span style="color:#ee6b1e;font-weight:900;">(١)</span><span>الصفحة الرئيسية للمعلم</span></a>' +
        '<a href="' + prefix + 'بوابة-المعلم/index.html#students" class="iread-role-opt" data-teacher-tab="students"><span style="color:#ee6b1e;font-weight:900;">(٢)</span><span>إدارة الطلاب</span></a>' +
        '<a href="' + prefix + 'بوابة-المعلم/index.html#weekly-story" class="iread-role-opt" data-teacher-tab="weekly-story"><span style="color:#ee6b1e;font-weight:900;">(٣)</span><span>تحدي قراءة القصص الأسبوعي</span></a>' +
        '<a href="' + prefix + 'بوابة-المعلم/index.html#participation-report" class="iread-role-opt" data-teacher-tab="participation-report"><span style="color:#ee6b1e;font-weight:900;">(٤)</span><span>تقرير عن الطلاب ونسبة مشاركتهم</span></a>' +
        '<a href="' + prefix + 'بوابة-المعلم/index.html#badges-admin" class="iread-role-opt" data-teacher-tab="badges-admin"><span style="color:#ee6b1e;font-weight:900;">(٥)</span><span>إدارة الإشارات والإنجازات للطلاب</span></a>'
      );
    }
    // admin, supervisor, or general_supervisor: only their own dashboard sections
    var myHome = prefix + (ROLE_HOMES[role] || 'لوحة-الإدارة/index.html?role=' + role);
    return (
      '<a href="' + myHome + '" class="iread-role-opt active"><span style="color:#ee6b1e;font-weight:900;">(١)</span><span>لوحة المتابعة الرئيسية</span></a>' +
      '<a href="' + myHome + '#adminKpis" class="iread-role-opt"><span style="color:#ee6b1e;font-weight:900;">(٢)</span><span>مؤشرات الأداء والإحصاءات</span></a>' +
      '<a href="' + myHome + '#usersTableBody" class="iread-role-opt"><span style="color:#ee6b1e;font-weight:900;">(٣)</span><span>سجل الحسابات والمدارس</span></a>' +
      '<a href="' + myHome + '#supNoteForm" class="iread-role-opt"><span style="color:#ee6b1e;font-weight:900;">(٤)</span><span>التوصيات والتقارير</span></a>'
    );
  }

  function injectHeaderStyles() {
    if (document.getElementById('ireadUnifiedHeaderStyles')) return;
    var st = document.createElement('style');
    st.id = 'ireadUnifiedHeaderStyles';
    st.textContent =
      '.iread-unified-topbar {' +
      '  width: 100%; background: #ffffff; border-bottom: 1.5px solid #d5e6f8;' +
      '  padding: 10px 14px; position: sticky; top: 0; z-index: 950;' +
      '  box-shadow: 0 8px 26px rgba(8, 45, 102, 0.08); direction: rtl;' +
      '  font-family: "Cairo", "Tajawal", Tahoma, sans-serif; box-sizing: border-box;' +
      '}' +
      '.iread-topbar-inner {' +
      '  width: 100%; max-width: 1120px; margin: 0 auto; display: flex; align-items: center;' +
      '  justify-content: space-between; gap: 8px; position: relative;' +
      '}' +
      '.iread-circle-btn {' +
      '  width: 42px; height: 42px; border-radius: 50%; border: 1px solid #d8e8fa;' +
      '  background: #f2f7fd; color: #082f68; cursor: pointer; position: relative;' +
      '  display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0;' +
      '  transition: all 0.18s ease; text-decoration: none; padding: 0;' +
      '}' +
      '.iread-circle-btn:hover {' +
      '  background: #e1effd; border-color: #9ec5f8; transform: translateY(-1px);' +
      '}' +
      '.iread-badge-orange {' +
      '  position: absolute; top: -4px; right: -4px; background: #ee6b1e; color: #fff;' +
      '  font-size: 0.68rem; font-weight: 900; min-width: 20px; height: 20px;' +
      '  padding: 0 5px; border-radius: 999px; display: inline-flex;' +
      '  align-items: center; justify-content: center; border: 2px solid #fff;' +
      '  line-height: 1; box-shadow: 0 3px 8px rgba(238, 107, 30, 0.35);' +
      '}' +
      '.iread-left-actions {' +
      '  display: flex; align-items: center; justify-content: flex-end; gap: 8px;' +
      '  flex: 1; min-width: 0;' +
      '}' +
      '.iread-user-pill {' +
      '  height: 44px; border-radius: 999px; background: #f2f7fd; border: 1.5px solid #d5e6f8;' +
      '  padding: 3px 12px 3px 4px; display: inline-flex; align-items: center; gap: 8px;' +
      '  cursor: pointer; position: relative; transition: all 0.18s ease; color: #082f68;' +
      '  min-width: 0; flex-shrink: 1;' +
      '}' +
      '.iread-user-pill:hover { background: #e3effc; border-color: #9ec5f8; }' +
      '.iread-user-greeting {' +
      '  font-size: 0.88rem; font-weight: 800; color: #082f68; white-space: nowrap;' +
      '  overflow: hidden; text-overflow: ellipsis;' +
      '}' +
      '.iread-user-avatar {' +
      '  width: 34px; height: 34px; border-radius: 50%; object-fit: cover;' +
      '  border: 2px solid #ffffff; box-shadow: 0 2px 8px rgba(8, 45, 102, 0.15); flex-shrink: 0;' +
      '}' +
      '.iread-slide-menu {' +
      '  position: absolute; top: 54px; right: 0; width: 290px; background: #ffffff;' +
      '  border-radius: 22px; border: 1.5px solid #d5e6f8;' +
      '  box-shadow: 0 20px 50px rgba(8, 45, 102, 0.22); padding: 12px; z-index: 1000;' +
      '  opacity: 0; visibility: hidden; pointer-events: none;' +
      '  transform: translateY(-8px) scale(0.97); transform-origin: top right;' +
      '  transition: all 0.2s ease;' +
      '}' +
      '.iread-slide-menu.is-open {' +
      '  opacity: 1; visibility: visible; pointer-events: auto; transform: translateY(0) scale(1);' +
      '}' +
      '.iread-role-switcher-pop {' +
      '  position: absolute; top: 54px; left: 0; width: 255px; background: #ffffff;' +
      '  border-radius: 20px; border: 1.5px solid #d5e6f8;' +
      '  box-shadow: 0 18px 44px rgba(8, 45, 102, 0.18); padding: 14px; z-index: 1000;' +
      '  display: none; direction: rtl; text-align: right;' +
      '}' +
      '.iread-role-switcher-pop.is-open { display: block; }' +
      '.iread-role-opt {' +
      '  width: 100%; border: none; background: transparent; padding: 9px 12px;' +
      '  border-radius: 12px; display: flex; align-items: center; gap: 10px; text-decoration: none;' +
      '  font-family: inherit; font-size: 0.9rem; font-weight: 800; color: #082f68; cursor: pointer; text-align: right;' +
      '}' +
      '.iread-role-opt:hover, .iread-role-opt.active { background: #e5effb; color: #0d52b8; }' +
      '@media (max-width: 639px) {' +
      '  .iread-unified-topbar { padding: 8px 8px; }' +
      '  .iread-topbar-inner { gap: 5px; }' +
      '  .iread-circle-btn { width: 34px; height: 34px; }' +
      '  .iread-circle-btn svg { width: 17px; height: 17px; }' +
      '  .iread-badge-orange { font-size: 0.6rem; min-width: 17px; height: 17px; padding: 0 4px; top: -3px; right: -3px; border-width: 1.5px; }' +
      '  .iread-left-actions { gap: 5px; }' +
      '  .iread-user-pill { height: 36px; padding: 2px 8px 2px 3px; gap: 5px; max-width: calc(100vw - 205px); }' +
      '  .iread-user-greeting { font-size: 0.74rem; }' +
      '  .iread-user-avatar { width: 28px; height: 28px; border-width: 1.5px; }' +
      '}';
    document.head.appendChild(st);
  }

  function buildTopBar() {
    // Skip injecting on the root login screen itself
    if (document.getElementById('loginViewForm') && document.getElementById('flashIntroScreen')) return;
    if (document.getElementById('ireadGlobalTopbar')) return;

    var prefix = detectBasePrefix();
    var user = resolveActiveUser();
    if (enforceRolePrivacyGuard(user, prefix)) return;

    var role = user.role || 'student';
    scrubCrossRoleDomElements(role);
    injectHeaderStyles();

    var avatarSrc = user.customAvatar || ROLE_AVATARS[role] || ROLE_AVATARS.student;
    var roleLabel = ROLE_LABELS[role] || 'طالب';
    var cleanName = (user.name || 'سارة أحمد').replace(/\s*\(.*?\)\s*/g, '');
    var schoolName = user.school || 'مدارس الساحل الأهلية';

    var header = document.createElement('div');
    header.id = 'ireadGlobalTopbar';
    header.className = 'iread-unified-topbar no-print';
    header.innerHTML =
      '<div class="iread-topbar-inner">' +
        '<!-- Right: Hamburger Toggle Button (☰) -->' +
        '<button type="button" id="ireadGlobalMenuBtn" class="iread-circle-btn" aria-label="القائمة الرئيسية" aria-expanded="false" title="القائمة">' +
          '<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round">' +
            '<line x1="4" y1="7" x2="20" y2="7"/>' +
            '<line x1="4" y1="12" x2="20" y2="12"/>' +
            '<line x1="4" y1="17" x2="20" y2="17"/>' +
          '</svg>' +
        '</button>' +

        '<!-- Left Group: Search, Messages (23), Notifications (3), User Pill with Role Avatar, Logout -->' +
        '<div class="iread-left-actions">' +
          '<button type="button" id="ireadSearchBtn" class="iread-circle-btn" title="بحث سريع" aria-label="بحث">' +
            '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' +
              '<circle cx="11" cy="11" r="7"/>' +
              '<line x1="20" y1="20" x2="16.2" y2="16.2"/>' +
            '</svg>' +
          '</button>' +

          '<button type="button" id="ireadMessagesBtn" class="iread-circle-btn" title="الرسائل والمهام" aria-label="الرسائل">' +
            '<span class="iread-badge-orange">23</span>' +
            '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round">' +
              '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>' +
              '<line x1="9" y1="10" x2="15" y2="10"/>' +
              '<line x1="9" y1="14" x2="13" y2="14"/>' +
            '</svg>' +
          '</button>' +

          '<button type="button" id="ireadNotifBtn" class="iread-circle-btn" title="التنبيهات" aria-label="التنبيهات">' +
            '<span class="iread-badge-orange">3</span>' +
            '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round">' +
              '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>' +
              '<path d="M13.73 21a2 2 0 0 1-3.46 0"/>' +
            '</svg>' +
          '</button>' +

          '<!-- User Greeting Pill with Role-Specific Avatar (Private Profile Card on click) -->' +
          '<div id="ireadUserPill" class="iread-user-pill" role="button" tabindex="0" title="بطاقة الحساب الشخصي">' +
            '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" style="flex-shrink:0;"><polyline points="6 9 12 15 18 9"/></svg>' +
            '<span class="iread-user-greeting">أهلاً بك، <b id="ireadTopUserName">' + cleanName + '</b></span>' +
            '<img id="ireadTopUserAvatar" class="iread-user-avatar" src="' + avatarSrc + '" alt="' + roleLabel + '">' +
          '</div>' +

          '<!-- Far Left: Logout / Exit Door Button -->' +
          '<a href="' + prefix + 'index.html?skipIntro=1" id="ireadTopLogoutBtn" class="iread-circle-btn" title="تسجيل الخروج" aria-label="تسجيل الخروج">' +
            '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round">' +
              '<path d="M10 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h5"/>' +
              '<polyline points="17 16 21 12 17 8"/>' +
              '<line x1="21" y1="12" x2="9" y2="12"/>' +
            '</svg>' +
          '</a>' +
        '</div>' +

        '<!-- Right Slide-down Menu (خاص بصلاحية المستخدم المسجل فقط دون أي انتقال للأدوار الأخرى) -->' +
        '<nav id="ireadGlobalSlideMenu" class="iread-slide-menu" aria-label="قائمة الحساب">' +
          '<div style="display:flex;align-items:center;justify-content:space-between;padding:8px 12px;margin-bottom:6px;background:#f2f7fd;border-radius:12px;">' +
            '<span style="font-size:0.85rem;font-weight:900;color:#082f68;">القائمة الرئيسية</span>' +
            '<span style="font-size:0.74rem;font-weight:800;color:#1668e3;">🔒 ' + roleLabel + '</span>' +
          '</div>' +
          '<div style="display:flex;flex-direction:column;gap:4px;">' +
            buildRoleSpecificMenuItems(role, prefix) +
          '</div>' +
          '<div style="height:1px;background:#dce9f8;margin:8px 0;"></div>' +
          '<button type="button" id="ireadMenuLogoutAction" class="iread-role-opt" style="color:#dc2626;justify-content:center;">' +
            '<span>🚪</span><span>تسجيل الخروج الآمن</span>' +
          '</button>' +
        '</nav>' +

        '<!-- Read-only Private Account Card (لا يسمح بتبديل الصفة أو الدخول لصفحات الأدوار الأخرى) -->' +
        '<div id="ireadRoleSwitcherPop" class="iread-role-switcher-pop">' +
          '<div style="display:flex;align-items:center;gap:10px;padding-bottom:10px;border-bottom:1px solid #e5effb;margin-bottom:10px;">' +
            '<img id="ireadCardUserAvatar" src="' + avatarSrc + '" style="width:44px;height:44px;border-radius:50%;border:2px solid #0d52b8;flex-shrink:0;object-fit:cover;">' +
            '<div style="min-width:0;">' +
              '<div id="ireadCardUserName" style="font-weight:900;font-size:0.92rem;color:#082f68;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + cleanName + '</div>' +
              '<div style="font-size:0.76rem;font-weight:800;color:#1668e3;">الصفة: ' + roleLabel + '</div>' +
              '<div id="ireadCardUserSchool" style="font-size:0.72rem;color:#5b7496;font-weight:700;">' + schoolName + '</div>' +
            '</div>' +
          '</div>' +
          '<div style="font-size:0.74rem;color:#0f766e;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;padding:6px 10px;margin-bottom:10px;font-weight:800;">' +
            '🔒 الجلسة محمية: صلاحياتك مقتصرة على (' + roleLabel + ') فقط.' +
          '</div>' +
          '<button type="button" id="ireadCardLogoutAction" class="iread-role-opt" style="background:#fef2f2;color:#dc2626;justify-content:center;font-weight:900;">' +
            '<span>🚪</span><span>تسجيل الخروج</span>' +
          '</button>' +
        '</div>' +
      '</div>';

    var mountTarget = document.getElementById('ireadTopBarMount');
    if (mountTarget) {
      mountTarget.appendChild(header);
    } else {
      document.body.insertBefore(header, document.body.firstChild);
    }

    var menuBtn = document.getElementById('ireadGlobalMenuBtn');
    var slideMenu = document.getElementById('ireadGlobalSlideMenu');
    var userPill = document.getElementById('ireadUserPill');
    var rolePop = document.getElementById('ireadRoleSwitcherPop');
    var topLogoutBtn = document.getElementById('ireadTopLogoutBtn');
    var menuLogoutBtn = document.getElementById('ireadMenuLogoutAction');
    var cardLogoutBtn = document.getElementById('ireadCardLogoutAction');

    function performSecureLogout(e) {
      if (e) e.preventDefault();
      if (window.IREAD_AUTH && typeof window.IREAD_AUTH.logout === 'function') {
        window.IREAD_AUTH.logout();
      } else {
        localStorage.removeItem('iread_current_user_v1');
      }
      window.location.href = prefix + 'index.html?skipIntro=1';
    }

    if (topLogoutBtn) topLogoutBtn.addEventListener('click', performSecureLogout);
    if (menuLogoutBtn) menuLogoutBtn.addEventListener('click', performSecureLogout);
    if (cardLogoutBtn) cardLogoutBtn.addEventListener('click', performSecureLogout);

    menuBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      rolePop.classList.remove('is-open');
      var isOpen = slideMenu.classList.contains('is-open');
      slideMenu.classList.toggle('is-open', !isOpen);
      menuBtn.setAttribute('aria-expanded', !isOpen ? 'true' : 'false');
    });

    userPill.addEventListener('click', function (e) {
      e.stopPropagation();
      slideMenu.classList.remove('is-open');
      rolePop.classList.toggle('is-open');
    });

    // Expose live profile updater for Teacher / Student profile edits
    window.updateGlobalTopBarProfile = function (newName, newAvatarSrc, newSchool) {
      if (newName) {
        var tn = document.getElementById('ireadTopUserName');
        var cn = document.getElementById('ireadCardUserName');
        if (tn) tn.textContent = newName;
        if (cn) cn.textContent = newName;
      }
      if (newAvatarSrc) {
        var ta = document.getElementById('ireadTopUserAvatar');
        var ca = document.getElementById('ireadCardUserAvatar');
        if (ta) ta.src = newAvatarSrc;
        if (ca) ca.src = newAvatarSrc;
      }
      if (newSchool) {
        var cs = document.getElementById('ireadCardUserSchool');
        if (cs) cs.textContent = newSchool;
      }
    };

    // Student Page tab switching for (١)..(٥)
    var studentTabLinks = slideMenu.querySelectorAll('[data-student-tab]');

    function activateStudentTabOnPage(tabKey, shouldScroll) {
      if (!tabKey) return false;
      var panelIds = {
        home: 'tabPanelHome',
        challenge: 'tabPanelChallenge',
        tasks: 'tabPanelTasks',
        badges: 'tabPanelBadges',
        games: 'tabPanelGames'
      };
      var targetId = panelIds[tabKey];
      var targetPanel = targetId ? document.getElementById(targetId) : null;
      if (!targetPanel && typeof window.switchStudentTab !== 'function') {
        return false;
      }

      studentTabLinks.forEach(function (l) {
        l.classList.toggle('active', l.getAttribute('data-student-tab') === tabKey);
      });

      if (typeof window.switchStudentTab === 'function') {
        window.switchStudentTab(tabKey);
      } else {
        Object.keys(panelIds).forEach(function (k) {
          var p = document.getElementById(panelIds[k]);
          if (p) p.classList.toggle('is-active', k === tabKey);
        });
      }

      try {
        if (history.replaceState) {
          history.replaceState(null, '', '#' + tabKey);
        }
      } catch (err) {}

      if (shouldScroll && targetPanel) {
        setTimeout(function () {
          try {
            targetPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
          } catch (e) {
            targetPanel.scrollIntoView();
          }
        }, 40);
      }
      return true;
    }

    studentTabLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
        var tabKey = link.getAttribute('data-student-tab');
        if (activateStudentTabOnPage(tabKey, true)) {
          e.preventDefault();
          slideMenu.classList.remove('is-open');
          menuBtn.setAttribute('aria-expanded', 'false');
        }
      });
    });

    // Teacher Page tab switching for (١)..(٥)
    var teacherTabLinks = slideMenu.querySelectorAll('[data-teacher-tab]');

    function activateTeacherTabOnPage(tabKey, shouldScroll) {
      if (!tabKey) return false;
      var panelIds = {
        'home': 'teacherPanelHome',
        'students': 'teacherPanelStudents',
        'weekly-story': 'teacherPanelWeeklyStory',
        'participation-report': 'teacherPanelParticipation',
        'badges-admin': 'teacherPanelBadges'
      };
      var targetId = panelIds[tabKey];
      var targetPanel = targetId ? document.getElementById(targetId) : null;
      if (!targetPanel && typeof window.switchTeacherTab !== 'function') {
        return false;
      }

      teacherTabLinks.forEach(function (l) {
        l.classList.toggle('active', l.getAttribute('data-teacher-tab') === tabKey);
      });

      if (typeof window.switchTeacherTab === 'function') {
        window.switchTeacherTab(tabKey);
      } else {
        Object.keys(panelIds).forEach(function (k) {
          var p = document.getElementById(panelIds[k]);
          if (p) p.classList.toggle('is-active', k === tabKey);
        });
      }

      try {
        if (history.replaceState) {
          history.replaceState(null, '', '#' + tabKey);
        }
      } catch (err) {}

      if (shouldScroll && targetPanel) {
        setTimeout(function () {
          try {
            targetPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
          } catch (e) {
            targetPanel.scrollIntoView();
          }
        }, 40);
      }
      return true;
    }

    teacherTabLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
        var tabKey = link.getAttribute('data-teacher-tab');
        if (activateTeacherTabOnPage(tabKey, true)) {
          e.preventDefault();
          slideMenu.classList.remove('is-open');
          menuBtn.setAttribute('aria-expanded', 'false');
        }
      });
    });

    window.addEventListener('hashchange', function () {
      var h = (window.location.hash || '').replace(/^#/, '').trim();
      if (!h) return;
      if (!activateStudentTabOnPage(h, true)) {
        activateTeacherTabOnPage(h, true);
      }
    });

    var initialHash = (window.location.hash || '').replace(/^#/, '').trim();
    if (initialHash) {
      setTimeout(function () {
        if (!activateStudentTabOnPage(initialHash, false)) {
          activateTeacherTabOnPage(initialHash, false);
        }
      }, 50);
    }

    document.addEventListener('click', function (e) {
      if (!header.contains(e.target)) {
        slideMenu.classList.remove('is-open');
        rolePop.classList.remove('is-open');
      }
    });
  }

  window.IREAD_ROLE_AVATARS = ROLE_AVATARS;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildTopBar);
  } else {
    buildTopBar();
  }
})(window, document);
