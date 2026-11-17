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
      '/المكتبة/', '/الأنشطة/', '/المكافآت/', '/القصة-الأسبوعية/', '/اختبار-القصة/', '/المعلم/',
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
        '<a href="' + prefix + 'بوابة-الطالب/index.html#home" class="iread-role-opt active" data-student-tab="home"><span class="iread-opt-ico">🏠</span><span>الصفحة الرئيسية</span></a>' +
        '<a href="' + prefix + 'بوابة-الطالب/index.html#challenge" class="iread-role-opt" data-student-tab="challenge"><span class="iread-opt-ico">🏁</span><span>تحدي القراءة</span></a>' +
        '<a href="' + prefix + 'بوابة-الطالب/index.html#tasks" class="iread-role-opt" data-student-tab="tasks"><span class="iread-opt-ico">📋</span><span>المهام الأسبوعية</span></a>' +
        '<a href="' + prefix + 'بوابة-الطالب/index.html#games" class="iread-role-opt" data-student-tab="games"><span class="iread-opt-ico">🎮</span><span>الألعاب التفاعلية</span></a>' +
        '<a href="' + prefix + 'بوابة-الطالب/index.html#badges" class="iread-role-opt" data-student-tab="badges"><span class="iread-opt-ico">🏅</span><span>إنجازاتي</span></a>'
      );
    }
    if (role === 'teacher') {
      return (
        '<a href="' + prefix + 'بوابة-المعلم/index.html#home" class="iread-role-opt active" data-teacher-tab="home"><span class="iread-opt-ico">🏠</span><span>الصفحة الرئيسية للمعلم</span></a>' +
        '<a href="' + prefix + 'بوابة-المعلم/index.html#students" class="iread-role-opt" data-teacher-tab="students"><span class="iread-opt-ico">👨‍🎓</span><span>إدارة الطلاب والفصول</span></a>' +
        '<a href="' + prefix + 'بوابة-المعلم/index.html#weekly-story" class="iread-role-opt" data-teacher-tab="weekly-story"><span class="iread-opt-ico">📖</span><span>تحدي القصص الأسبوعي</span></a>' +
        '<a href="' + prefix + 'بوابة-المعلم/index.html#participation-report" class="iread-role-opt" data-teacher-tab="participation-report"><span class="iread-opt-ico">📊</span><span>تقارير الطلاب ونسب المشاركة</span></a>' +
        '<a href="' + prefix + 'بوابة-المعلم/index.html#badges-admin" class="iread-role-opt" data-teacher-tab="badges-admin"><span class="iread-opt-ico">🏅</span><span>إدارة الأوسمة والإنجازات</span></a>'
      );
    }
    // admin, supervisor, or general_supervisor: only their own dashboard sections
    var myHome = prefix + (ROLE_HOMES[role] || 'لوحة-الإدارة/index.html?role=' + role);
    return (
      '<a href="' + myHome + '" class="iread-role-opt active"><span class="iread-opt-ico">🏠</span><span>لوحة المتابعة الرئيسية</span></a>' +
      '<a href="' + myHome + '#adminKpis" class="iread-role-opt"><span class="iread-opt-ico">📊</span><span>مؤشرات الأداء والإحصاءات</span></a>' +
      '<a href="' + myHome + '#usersTableBody" class="iread-role-opt"><span class="iread-opt-ico">👥</span><span>سجل الحسابات والمدارس</span></a>' +
      '<a href="' + myHome + '#supNoteForm" class="iread-role-opt"><span class="iread-opt-ico">📝</span><span>التوصيات والتقارير</span></a>'
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
      '.iread-menu-backdrop {' +
      '  position: fixed; inset: 0; background: rgba(6, 40, 90, 0.45);' +
      '  backdrop-filter: blur(2px); -webkit-backdrop-filter: blur(2px);' +
      '  z-index: 10001; opacity: 0; visibility: hidden; pointer-events: none;' +
      '  transition: opacity 0.25s ease;' +
      '}' +
      '.iread-menu-backdrop.is-open {' +
      '  opacity: 1; visibility: visible; pointer-events: auto;' +
      '}' +
      '.iread-slide-menu {' +
      '  position: fixed; top: 0; right: 0; width: 300px; max-width: 86vw;' +
      '  height: 100vh; height: 100dvh; background: #ffffff;' +
      '  border-radius: 22px 0 0 22px; border-left: 2px solid #d5e6f8;' +
      '  box-shadow: -12px 0 40px rgba(6, 40, 90, 0.22); padding: 16px 14px;' +
      '  z-index: 10002; overflow-y: auto; display: flex; flex-direction: column;' +
      '  transform: translateX(100%); visibility: hidden; pointer-events: none;' +
      '  transition: transform 0.28s cubic-bezier(0.22, 1, 0.36, 1), visibility 0.28s;' +
      '}' +
      '.iread-slide-menu.is-open {' +
      '  transform: translateX(0); visibility: visible; pointer-events: auto;' +
      '}' +
      '.iread-opt-ico {' +
      '  width: 32px; height: 32px; border-radius: 10px; background: #eff6ff;' +
      '  display: inline-flex; align-items: center; justify-content: center;' +
      '  font-size: 1rem; flex-shrink: 0;' +
      '}' +
      '.iread-role-opt.active .iread-opt-ico { background: #1668e3; color: #fff; }' +
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
      '.iread-action-pop {' +
      '  position: absolute; top: 54px; left: 0; width: 340px; max-width: calc(100vw - 24px);' +
      '  background: #ffffff; border-radius: 20px; border: 1.5px solid #d5e6f8;' +
      '  box-shadow: 0 20px 48px rgba(8, 45, 102, 0.2); padding: 14px; z-index: 1005;' +
      '  display: none; direction: rtl; text-align: right; max-height: 75vh; overflow-y: auto;' +
      '}' +
      '.iread-action-pop.is-open { display: block; }' +
      '.iread-pop-header {' +
      '  display: flex; align-items: center; justify-content: space-between; gap: 8px;' +
      '  padding-bottom: 10px; margin-bottom: 10px; border-bottom: 1.5px solid #e5effb;' +
      '}' +
      '.iread-pop-title { font-weight: 900; font-size: 0.96rem; color: #082f68; }' +
      '.iread-pop-action { background: #eff6ff; border: 1px solid #bfdbfe; color: #1d4ed8; border-radius: 999px; padding: 4px 10px; font-size: 0.74rem; font-weight: 800; cursor: pointer; font-family: inherit; }' +
      '.iread-pop-action:hover { background: #dbeafe; }' +
      '.iread-pop-list { display: flex; flex-direction: column; gap: 8px; max-height: 290px; overflow-y: auto; }' +
      '.iread-pop-item {' +
      '  display: flex; align-items: flex-start; gap: 10px; padding: 10px 12px; border-radius: 14px;' +
      '  background: #f8fbff; border: 1px solid #e2ecf8; text-decoration: none; color: #0f172a;' +
      '  transition: background 0.15s, border-color 0.15s; cursor: pointer;' +
      '}' +
      '.iread-pop-item:hover { background: #eff6ff; border-color: #93c5fd; text-decoration: none; }' +
      '.iread-pop-item.is-unread { background: #fffbeb; border-color: #fde68a; }' +
      '.iread-pop-ico { width: 34px; height: 34px; border-radius: 10px; background: #e0f2fe; display: inline-flex; align-items: center; justify-content: center; font-size: 1.05rem; flex-shrink: 0; }' +
      '.iread-search-input { width: 100%; height: 42px; border-radius: 999px; border: 1.5px solid #bfdbfe; background: #f8fbff; padding: 0 16px; font-family: inherit; font-size: 0.9rem; font-weight: 700; color: #082f68; outline: none; margin-bottom: 10px; }' +
      '.iread-search-input:focus { border-color: #1668e3; background: #fff; box-shadow: 0 0 0 3px rgba(22,104,227,0.12); }' +
      '.iread-pop-form { display: flex; gap: 6px; margin-top: 10px; padding-top: 10px; border-top: 1px solid #e5effb; }' +
      '.iread-pop-form input { flex: 1; height: 38px; border-radius: 999px; border: 1.5px solid #cbd5e1; padding: 0 12px; font-family: inherit; font-size: 0.84rem; font-weight: 700; outline: none; }' +
      '.iread-pop-form button { height: 38px; border-radius: 999px; border: none; background: #1668e3; color: #fff; padding: 0 14px; font-family: inherit; font-size: 0.82rem; font-weight: 800; cursor: pointer; flex-shrink: 0; }' +
      '.iread-badge-orange.is-hidden { display: none; }' +
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
      '  .iread-action-pop { left: 4px; right: 4px; width: auto; max-width: none; top: 50px; }' +
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

          '<button type="button" id="ireadMessagesBtn" class="iread-circle-btn" title="الرسائل والمهام" aria-label="الرسائل" aria-expanded="false">' +
            '<span id="ireadMsgBadge" class="iread-badge-orange">0</span>' +
            '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round">' +
              '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>' +
              '<line x1="9" y1="10" x2="15" y2="10"/>' +
              '<line x1="9" y1="14" x2="13" y2="14"/>' +
            '</svg>' +
          '</button>' +

          '<button type="button" id="ireadNotifBtn" class="iread-circle-btn" title="التنبيهات" aria-label="التنبيهات" aria-expanded="false">' +
            '<span id="ireadNotifBadge" class="iread-badge-orange">0</span>' +
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

        '<!-- Right-to-Left Off-Canvas Slide Drawer -->' +
        '<div id="ireadMenuBackdrop" class="iread-menu-backdrop"></div>' +
        '<nav id="ireadGlobalSlideMenu" class="iread-slide-menu" aria-label="قائمة خدمات الموقع">' +
          '<div style="display:flex;align-items:center;justify-content:space-between;padding:10px 12px;margin-bottom:10px;background:linear-gradient(135deg,#06285a,#0d52b8);border-radius:14px;color:#fff;">' +
            '<div>' +
              '<div style="font-size:0.92rem;font-weight:900;">خدمات المنصة</div>' +
              '<div style="font-size:0.74rem;font-weight:800;color:#fde047;">🔒 ' + roleLabel + ' • ' + cleanName + '</div>' +
            '</div>' +
            '<button type="button" id="ireadCloseDrawerBtn" aria-label="إغلاق القائمة" style="width:32px;height:32px;border-radius:50%;border:none;background:rgba(255,255,255,0.2);color:#fff;font-weight:900;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;">✕</button>' +
          '</div>' +
          '<div style="display:flex;flex-direction:column;gap:4px;flex:1;">' +
            buildRoleSpecificMenuItems(role, prefix) +
          '</div>' +
          '<div style="height:1px;background:#dce9f8;margin:10px 0;"></div>' +
          '<button type="button" id="ireadMenuLogoutAction" class="iread-role-opt" style="background:#fef2f2;color:#dc2626;justify-content:center;font-weight:900;">' +
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

        '<!-- Search Popover -->' +
        '<div id="ireadSearchPop" class="iread-action-pop" role="dialog" aria-label="البحث السريع">' +
          '<div class="iread-pop-header">' +
            '<span class="iread-pop-title">🔍 البحث السريع في المنصة</span>' +
            '<button type="button" class="iread-pop-action" data-close-pop="ireadSearchPop">إغلاق</button>' +
          '</div>' +
          '<input type="search" id="ireadQuickSearchInput" class="iread-search-input" placeholder="ابحث عن مهارة، قصة، أو قسم..." autocomplete="off">' +
          '<div id="ireadSearchResults" class="iread-pop-list"></div>' +
        '</div>' +

        '<!-- Messages Popover -->' +
        '<div id="ireadMessagesPop" class="iread-action-pop" role="dialog" aria-label="الرسائل والتواصل">' +
          '<div class="iread-pop-header">' +
            '<span class="iread-pop-title">💬 الرسائل والتواصل</span>' +
            '<button type="button" id="ireadMarkMsgsReadBtn" class="iread-pop-action">تحديد كمقروء</button>' +
          '</div>' +
          '<div id="ireadMessagesList" class="iread-pop-list"></div>' +
          '<form id="ireadQuickMsgForm" class="iread-pop-form">' +
            '<input type="text" id="ireadQuickMsgInput" placeholder="' + (role === 'student' ? 'أرسل رسالة لمعلمك...' : 'أرسل توجيهاً أو رسالة للطلاب...') + '" required>' +
            '<button type="submit">إرسال</button>' +
          '</form>' +
        '</div>' +

        '<!-- Notifications Popover -->' +
        '<div id="ireadNotifPop" class="iread-action-pop" role="dialog" aria-label="التنبيهات">' +
          '<div class="iread-pop-header">' +
            '<span class="iread-pop-title">🔔 التنبيهات والإشعارات</span>' +
            '<button type="button" id="ireadMarkNotifsReadBtn" class="iread-pop-action">تحديد الكل كمقروء</button>' +
          '</div>' +
          '<div id="ireadNotifList" class="iread-pop-list"></div>' +
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
    var menuBackdrop = document.getElementById('ireadMenuBackdrop');
    var closeDrawerBtn = document.getElementById('ireadCloseDrawerBtn');
    var userPill = document.getElementById('ireadUserPill');
    var rolePop = document.getElementById('ireadRoleSwitcherPop');
    var topLogoutBtn = document.getElementById('ireadTopLogoutBtn');
    var menuLogoutBtn = document.getElementById('ireadMenuLogoutAction');
    var cardLogoutBtn = document.getElementById('ireadCardLogoutAction');

    function setDrawerOpen(open) {
      slideMenu.classList.toggle('is-open', open);
      if (menuBackdrop) menuBackdrop.classList.toggle('is-open', open);
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    }

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
      setDrawerOpen(!slideMenu.classList.contains('is-open'));
    });

    if (menuBackdrop) menuBackdrop.addEventListener('click', function () { setDrawerOpen(false); });
    if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', function () { setDrawerOpen(false); });

    userPill.addEventListener('click', function (e) {
      e.stopPropagation();
      setDrawerOpen(false);
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
          setDrawerOpen(false);
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
          setDrawerOpen(false);
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
        setDrawerOpen(false);
        rolePop.classList.remove('is-open');
        closeAllActionPops();
      }
    });

    // =====================================================================
    // ACTIVE HEADER ACTIONS: Search, Messages, Notifications
    // =====================================================================
    var searchBtn = document.getElementById('ireadSearchBtn');
    var messagesBtn = document.getElementById('ireadMessagesBtn');
    var notifBtn = document.getElementById('ireadNotifBtn');
    var searchPop = document.getElementById('ireadSearchPop');
    var messagesPop = document.getElementById('ireadMessagesPop');
    var notifPop = document.getElementById('ireadNotifPop');
    var searchInput = document.getElementById('ireadQuickSearchInput');
    var searchResults = document.getElementById('ireadSearchResults');
    var messagesList = document.getElementById('ireadMessagesList');
    var notifList = document.getElementById('ireadNotifList');
    var msgBadge = document.getElementById('ireadMsgBadge');
    var notifBadge = document.getElementById('ireadNotifBadge');
    var quickMsgForm = document.getElementById('ireadQuickMsgForm');
    var quickMsgInput = document.getElementById('ireadQuickMsgInput');
    var markMsgsReadBtn = document.getElementById('ireadMarkMsgsReadBtn');
    var markNotifsReadBtn = document.getElementById('ireadMarkNotifsReadBtn');

    function closeAllActionPops(exceptEl) {
      [searchPop, messagesPop, notifPop, rolePop].forEach(function (el) {
        if (el && el !== exceptEl) el.classList.remove('is-open');
      });
      if (messagesBtn) messagesBtn.setAttribute('aria-expanded', messagesPop && messagesPop.classList.contains('is-open') ? 'true' : 'false');
      if (notifBtn) notifBtn.setAttribute('aria-expanded', notifPop && notifPop.classList.contains('is-open') ? 'true' : 'false');
    }

    function escapeHtml(str) {
      return String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    function getMessagesData() {
      var stored = [];
      try { stored = JSON.parse(localStorage.getItem('iread_messages_v1') || '[]'); } catch (e) { stored = []; }
      if (!Array.isArray(stored) || !stored.length) {
        stored = role === 'student'
          ? [
              { id: 'm1', from: 'معلم اللغة العربية', text: 'أهلاً بك! لا تنسَ التدريب على المهارة اليومية في الألعاب التفاعلية.', time: 'اليوم', unread: true },
              { id: 'm2', from: 'إدارة المنصة', text: 'اقرأ قصة جديدة في تحدي القراءة وأجب عن أسئلتها لكسب النجوم والإشارات.', time: 'اليوم', unread: true }
            ]
          : [
              { id: 'm1', from: 'إدارة المدرسة', text: 'تم تحديث قائمة المهارات التأسيسية والأنشطة العشوائية لجميع الفصول.', time: 'اليوم', unread: true },
              { id: 'm2', from: 'متابعة الطلاب', text: 'يمكنك إسناد المهارات وتكليفات القراءة مباشرة من صفحة إدارة الطلاب والفصول.', time: 'اليوم', unread: false }
            ];
        try { localStorage.setItem('iread_messages_v1', JSON.stringify(stored)); } catch (e) {}
      }
      return stored;
    }

    function getNotifsData() {
      var readIds = [];
      try { readIds = JSON.parse(localStorage.getItem('iread_notif_read_v1') || '[]'); } catch (e) { readIds = []; }
      var items = [];
      var S = window.IREAD_SKILLS;
      if (S && typeof S.getGlobalAssignedSkill === 'function' && typeof S.getAllSkills === 'function') {
        var gid = S.getGlobalAssignedSkill();
        var sk = S.getAllSkills().find(function (x) { return x.id === gid; });
        if (sk) {
          items.push({
            id: 'n_daily_' + gid,
            icon: '🎮',
            title: 'مهارة اليوم: ' + sk.title,
            sub: 'تحدٍ تفاعلي جاهز للتدريب الآن',
            href: prefix + 'الأنشطة/index.html?id=' + encodeURIComponent(sk.id)
          });
        }
      }
      if (role === 'student') {
        items.push({
          id: 'n_challenge',
          icon: '🏁',
          title: 'تحدي القراءة',
          sub: 'تصفح القصص وابدأ القراءة والاختبار',
          href: prefix + 'بوابة-الطالب/index.html#challenge'
        });
        items.push({
          id: 'n_badges',
          icon: '🏅',
          title: 'إشارات الإنجاز (100 إشارة)',
          sub: 'تابع الإشارات التي حصلت عليها',
          href: prefix + 'بوابة-الطالب/index.html#badges'
        });
      } else if (role === 'teacher') {
        items.push({
          id: 'n_teacher_assign',
          icon: '👩‍🏫',
          title: 'إسناد المهارات للطلاب',
          sub: 'إدارة الفصول وتكليفات القراءة اليومية',
          href: prefix + 'بوابة-المعلم/index.html#students'
        });
      } else {
        items.push({
          id: 'n_admin_dash',
          icon: '🏫',
          title: 'لوحة متابعة المدرسة',
          sub: 'عرض التقارير والإحصائيات الشاملة',
          href: prefix + 'لوحة-الإدارة/index.html'
        });
      }
      items.forEach(function (it) { it.unread = readIds.indexOf(it.id) === -1; });
      return items;
    }

    function updateHeaderBadges() {
      var msgs = getMessagesData();
      var unreadMsgs = msgs.filter(function (m) { return m.unread; }).length;
      if (msgBadge) {
        msgBadge.textContent = String(unreadMsgs);
        msgBadge.classList.toggle('is-hidden', unreadMsgs === 0);
      }
      var notifs = getNotifsData();
      var unreadNotifs = notifs.filter(function (n) { return n.unread; }).length;
      if (notifBadge) {
        notifBadge.textContent = String(unreadNotifs);
        notifBadge.classList.toggle('is-hidden', unreadNotifs === 0);
      }
    }

    function renderMessagesPop() {
      if (!messagesList) return;
      var msgs = getMessagesData();
      messagesList.innerHTML = msgs.slice().reverse().map(function (m) {
        return '<div class="iread-pop-item ' + (m.unread ? 'is-unread' : '') + '">' +
          '<span class="iread-pop-ico">💬</span>' +
          '<div style="min-width:0;flex:1;">' +
            '<div style="display:flex;justify-content:space-between;gap:6px;font-size:0.8rem;font-weight:900;color:#082f68;">' +
              '<span>' + escapeHtml(m.from) + '</span>' +
              '<span style="color:#64748b;font-weight:700;">' + escapeHtml(m.time || 'الآن') + '</span>' +
            '</div>' +
            '<div style="font-size:0.82rem;font-weight:700;color:#334155;margin-top:2px;line-height:1.5;">' + escapeHtml(m.text) + '</div>' +
          '</div>' +
        '</div>';
      }).join('');
      updateHeaderBadges();
    }

    function renderNotifsPop() {
      if (!notifList) return;
      var notifs = getNotifsData();
      notifList.innerHTML = notifs.map(function (n) {
        return '<a href="' + n.href + '" class="iread-pop-item ' + (n.unread ? 'is-unread' : '') + '" data-notif-id="' + n.id + '">' +
          '<span class="iread-pop-ico">' + n.icon + '</span>' +
          '<div style="min-width:0;flex:1;">' +
            '<div style="font-size:0.84rem;font-weight:900;color:#082f68;">' + escapeHtml(n.title) + '</div>' +
            '<div style="font-size:0.78rem;font-weight:700;color:#475569;margin-top:2px;">' + escapeHtml(n.sub) + '</div>' +
          '</div>' +
        '</a>';
      }).join('');
      updateHeaderBadges();
    }

    function renderSearchResults(q) {
      if (!searchResults) return;
      var term = String(q || '').trim().toLowerCase();
      var results = [];

      var quickPages = role === 'student'
        ? [
            { icon: '🏠', title: 'الصفحة الرئيسية للطالب', sub: 'معلومات الطالب ومذكرة المهام اليومية', href: prefix + 'بوابة-الطالب/index.html#home' },
            { icon: '🏁', title: 'تحدي القراءة', sub: 'جميع القصص والكتب المقروءة', href: prefix + 'بوابة-الطالب/index.html#challenge' },
            { icon: '🎮', title: 'ألعاب تفاعلية', sub: 'تدريب عشوائي على المهارات التأسيسية', href: prefix + 'بوابة-الطالب/index.html#games' },
            { icon: '🏅', title: 'إنجازات وإشارات', sub: 'لوحة الـ 100 إشارة', href: prefix + 'بوابة-الطالب/index.html#badges' }
          ]
        : [
            { icon: '👩‍🏫', title: 'إدارة الطلاب والفصول', sub: 'إسناد المهارات وتكليفات القراءة', href: prefix + 'بوابة-المعلم/index.html#students' },
            { icon: '📊', title: 'تقرير نسب المشاركة', sub: 'متابعة تفاعل الطلاب', href: prefix + 'بوابة-المعلم/index.html#participation-report' },
            { icon: '🏅', title: 'إدارة الأوسمة والإنجازات', sub: 'منح الأوسمة للطلاب', href: prefix + 'بوابة-المعلم/index.html#badges-admin' }
          ];

      quickPages.forEach(function (p) {
        if (!term || p.title.toLowerCase().indexOf(term) !== -1 || p.sub.toLowerCase().indexOf(term) !== -1) {
          results.push(p);
        }
      });

      var S = window.IREAD_SKILLS;
      if (S && typeof S.getAllSkills === 'function') {
        S.getAllSkills().forEach(function (sk) {
          if (!term || sk.title.toLowerCase().indexOf(term) !== -1 || (sk.cat || '').toLowerCase().indexOf(term) !== -1) {
            results.push({
              icon: '🎯',
              title: sk.title,
              sub: sk.cat || 'مهارة تأسيسية',
              href: prefix + 'الأنشطة/index.html?id=' + encodeURIComponent(sk.id)
            });
          }
        });
      }

      if (window.IREAD_KIDZZ_STORIES && Array.isArray(window.IREAD_KIDZZ_STORIES)) {
        window.IREAD_KIDZZ_STORIES.forEach(function (st) {
          if (term && (st.title || '').toLowerCase().indexOf(term) !== -1) {
            results.push({
              icon: '📖',
              title: st.title,
              sub: 'قصة في تحدي القراءة',
              href: prefix + 'اختبار-القصة/index.html?bookId=' + encodeURIComponent(st.id)
            });
          }
        });
      }

      if (!results.length) {
        searchResults.innerHTML = '<div style="text-align:center;padding:16px;color:#64748b;font-size:0.85rem;font-weight:700;">لا توجد نتائج مطابقة لـ «' + escapeHtml(q) + '»</div>';
        return;
      }

      searchResults.innerHTML = results.slice(0, 12).map(function (r) {
        return '<a href="' + r.href + '" class="iread-pop-item">' +
          '<span class="iread-pop-ico">' + r.icon + '</span>' +
          '<div style="min-width:0;flex:1;">' +
            '<div style="font-size:0.84rem;font-weight:900;color:#082f68;">' + escapeHtml(r.title) + '</div>' +
            '<div style="font-size:0.76rem;font-weight:700;color:#64748b;">' + escapeHtml(r.sub) + '</div>' +
          '</div>' +
        '</a>';
      }).join('');
    }

    if (searchBtn && searchPop) {
      searchBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        setDrawerOpen(false);
        var willOpen = !searchPop.classList.contains('is-open');
        closeAllActionPops(willOpen ? searchPop : null);
        searchPop.classList.toggle('is-open', willOpen);
        if (willOpen) {
          renderSearchResults(searchInput ? searchInput.value : '');
          if (searchInput) setTimeout(function () { searchInput.focus(); }, 40);
        }
      });
    }

    if (searchInput) {
      searchInput.addEventListener('input', function () {
        renderSearchResults(searchInput.value);
      });
    }

    if (messagesBtn && messagesPop) {
      messagesBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        setDrawerOpen(false);
        var willOpen = !messagesPop.classList.contains('is-open');
        closeAllActionPops(willOpen ? messagesPop : null);
        messagesPop.classList.toggle('is-open', willOpen);
        if (willOpen) renderMessagesPop();
        messagesBtn.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
      });
    }

    if (notifBtn && notifPop) {
      notifBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        setDrawerOpen(false);
        var willOpen = !notifPop.classList.contains('is-open');
        closeAllActionPops(willOpen ? notifPop : null);
        notifPop.classList.toggle('is-open', willOpen);
        if (willOpen) renderNotifsPop();
        notifBtn.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
      });
    }

    if (quickMsgForm && quickMsgInput) {
      quickMsgForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var txt = quickMsgInput.value.trim();
        if (!txt) return;
        var msgs = getMessagesData();
        msgs.push({
          id: 'm_' + Date.now(),
          from: cleanName,
          text: txt,
          time: 'الآن',
          unread: false
        });
        try { localStorage.setItem('iread_messages_v1', JSON.stringify(msgs)); } catch (err) {}
        quickMsgInput.value = '';
        renderMessagesPop();
      });
    }

    if (markMsgsReadBtn) {
      markMsgsReadBtn.addEventListener('click', function () {
        var msgs = getMessagesData().map(function (m) { m.unread = false; return m; });
        try { localStorage.setItem('iread_messages_v1', JSON.stringify(msgs)); } catch (err) {}
        renderMessagesPop();
      });
    }

    if (markNotifsReadBtn) {
      markNotifsReadBtn.addEventListener('click', function () {
        var ids = getNotifsData().map(function (n) { return n.id; });
        try { localStorage.setItem('iread_notif_read_v1', JSON.stringify(ids)); } catch (err) {}
        renderNotifsPop();
      });
    }

    header.querySelectorAll('[data-close-pop]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var el = document.getElementById(btn.getAttribute('data-close-pop'));
        if (el) el.classList.remove('is-open');
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        setDrawerOpen(false);
        closeAllActionPops();
      }
    });

    updateHeaderBadges();
  }

  window.IREAD_ROLE_AVATARS = ROLE_AVATARS;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildTopBar);
  } else {
    buildTopBar();
  }
})(window, document);
