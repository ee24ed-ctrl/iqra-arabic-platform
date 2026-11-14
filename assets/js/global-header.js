(function (window, document) {
  'use strict';

  if (window.__IREAD_GLOBAL_HEADER_LOADED__) return;
  window.__IREAD_GLOBAL_HEADER_LOADED__ = true;

  // Distinct illustrated SVG data-URI avatars for Student, Teacher, Principal (Admin), and Supervisor
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
        '<path d="M18 80 Q22 54 40 54 Q58 54 62 80 Z" fill="#0d52b8"/>' +
        '<path d="M33 54 L40 68 L47 54 Z" fill="#ffffff"/>' +
        '<rect x="35" y="45" width="10" height="11" rx="4" fill="#f6ad55"/>' +
        '<circle cx="40" cy="34" r="14" fill="#fbd38d"/>' +
        '<path d="M24 30 Q26 15 40 15 Q54 15 56 30 Q48 21 32 23 Z" fill="#1e293b"/>' +
        '<rect x="29" y="30" width="9" height="6" rx="2" fill="none" stroke="#06285a" stroke-width="2"/>' +
        '<rect x="42" y="30" width="9" height="6" rx="2" fill="none" stroke="#06285a" stroke-width="2"/>' +
        '<line x1="38" y1="33" x2="42" y2="33" stroke="#06285a" stroke-width="2"/>' +
        '<path d="M36 41 Q40 44 44 41" fill="none" stroke="#06285a" stroke-width="2" stroke-linecap="round"/>' +
      '</svg>'
    ),
    admin: 'data:image/svg+xml;utf8,' + encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">' +
        '<circle cx="40" cy="40" r="40" fill="#dbeafe"/>' +
        '<path d="M16 80 Q20 53 40 53 Q60 53 64 80 Z" fill="#06285a"/>' +
        '<path d="M35 54 L40 72 L45 54 Z" fill="#eab308"/>' +
        '<rect x="35" y="45" width="10" height="10" rx="4" fill="#f6ad55"/>' +
        '<circle cx="40" cy="34" r="14" fill="#fbd38d"/>' +
        '<path d="M23 32 Q26 13 40 13 Q54 13 57 32 L54 22 Q40 18 26 22 Z" fill="#ffffff"/>' +
        '<rect x="27" y="16" width="26" height="4" rx="2" fill="#1e293b"/>' +
        '<circle cx="35" cy="34" r="1.8" fill="#06285a"/>' +
        '<circle cx="45" cy="34" r="1.8" fill="#06285a"/>' +
        '<path d="M34 40 Q40 43 46 40" fill="none" stroke="#1e293b" stroke-width="2.2" stroke-linecap="round"/>' +
      '</svg>'
    ),
    supervisor: 'data:image/svg+xml;utf8,' + encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">' +
        '<circle cx="40" cy="40" r="40" fill="#d1fae5"/>' +
        '<path d="M17 80 Q21 54 40 54 Q59 54 63 80 Z" fill="#0f766e"/>' +
        '<path d="M34 54 L40 70 L46 54 Z" fill="#fef08a"/>' +
        '<rect x="35" y="45" width="10" height="10" rx="4" fill="#f6ad55"/>' +
        '<circle cx="40" cy="34" r="14" fill="#fde68a"/>' +
        '<path d="M25 29 Q28 15 40 15 Q52 15 55 29 Q45 21 25 29 Z" fill="#064e3b"/>' +
        '<circle cx="35" cy="34" r="1.8" fill="#064e3b"/>' +
        '<circle cx="45" cy="34" r="1.8" fill="#064e3b"/>' +
        '<path d="M35 41 Q40 44 45 41" fill="none" stroke="#064e3b" stroke-width="2" stroke-linecap="round"/>' +
        '<circle cx="54" cy="64" r="5" fill="#eab308"/>' +
      '</svg>'
    ),
    general_supervisor: 'data:image/svg+xml;utf8,' + encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">' +
        '<circle cx="40" cy="40" r="40" fill="#fef3c7"/>' +
        '<path d="M16 80 Q20 53 40 53 Q60 53 64 80 Z" fill="#082f68"/>' +
        '<path d="M28 55 L40 75 L52 55" fill="none" stroke="#eab308" stroke-width="3.5"/>' +
        '<rect x="35" y="45" width="10" height="10" rx="4" fill="#f6ad55"/>' +
        '<circle cx="40" cy="34" r="14" fill="#fbd38d"/>' +
        '<path d="M24 30 Q27 14 40 14 Q53 14 56 30 Q44 20 24 30 Z" fill="#06285a"/>' +
        '<circle cx="35" cy="34" r="1.8" fill="#06285a"/>' +
        '<circle cx="45" cy="34" r="1.8" fill="#06285a"/>' +
        '<path d="M35 41 Q40 44 45 41" fill="none" stroke="#06285a" stroke-width="2" stroke-linecap="round"/>' +
      '</svg>'
    )
  };

  var ROLE_LABELS = {
    student: 'طالب',
    teacher: 'معلم',
    admin: 'مدير المدرسة',
    supervisor: 'مشرف تربوي',
    general_supervisor: 'مشرف عام'
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

  function resolveActiveUser() {
    var A = window.IREAD_AUTH;
    var u = A && A.getCurrentUser ? A.getCurrentUser() : null;
    if (!u) {
      try {
        var raw = localStorage.getItem('iread_current_user_v1');
        if (raw) u = JSON.parse(raw);
      } catch (e) {}
    }
    var path = decodeURIComponent(window.location.pathname || '');
    var qRole = (new URLSearchParams(window.location.search)).get('role');
    if (qRole && ROLE_LABELS[qRole]) {
      return {
        role: qRole,
        name: qRole === 'admin' ? 'أ. خالد المنصور'
          : qRole === 'supervisor' ? 'د. عبدالله السالم'
          : qRole === 'general_supervisor' ? 'د. فهد العتيبي'
          : (u ? u.name : 'سارة أحمد')
      };
    }
    if (u && u.role) return u;
    if (path.indexOf('بوابة-المعلم') !== -1 || path.indexOf('/المعلم') !== -1) {
      return { role: 'teacher', name: 'أ. مريم العلي' };
    }
    if (path.indexOf('لوحة-الإدارة') !== -1) {
      return { role: 'admin', name: 'أ. خالد المنصور' };
    }
    return {
      role: 'student',
      name: localStorage.getItem('iread_selected_student_name') || 'سارة أحمد'
    };
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
      '  position: absolute; top: 54px; right: 0; width: 270px; background: #ffffff;' +
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
      '  position: absolute; top: 54px; left: 0; width: 245px; background: #ffffff;' +
      '  border-radius: 20px; border: 1.5px solid #d5e6f8;' +
      '  box-shadow: 0 18px 44px rgba(8, 45, 102, 0.18); padding: 10px; z-index: 1000;' +
      '  display: none; direction: rtl; text-align: right;' +
      '}' +
      '.iread-role-switcher-pop.is-open { display: block; }' +
      '.iread-role-opt {' +
      '  width: 100%; border: none; background: transparent; padding: 9px 12px;' +
      '  border-radius: 12px; display: flex; align-items: center; gap: 10px; text-decoration: none;' +
      '  font-family: inherit; font-size: 0.9rem; font-weight: 800; color: #082f68; cursor: pointer;' +
      '}' +
      '.iread-role-opt:hover, .iread-role-opt.active { background: #e5effb; color: #0d52b8; }' +
      /* Mobile adjustments so nothing is ever cut off on narrow phones (320px - 480px) */
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

    injectHeaderStyles();

    var prefix = detectBasePrefix();
    var user = resolveActiveUser();
    var role = user.role || 'student';
    var avatarSrc = ROLE_AVATARS[role] || ROLE_AVATARS.student;
    var roleLabel = ROLE_LABELS[role] || 'طالب';
    var cleanName = (user.name || 'سارة أحمد').replace(/\s*\(.*?\)\s*/g, '');

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
          '<!-- Search Button -->' +
          '<button type="button" id="ireadSearchBtn" class="iread-circle-btn" title="بحث سريع" aria-label="بحث">' +
            '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' +
              '<circle cx="11" cy="11" r="7"/>' +
              '<line x1="20" y1="20" x2="16.2" y2="16.2"/>' +
            '</svg>' +
          '</button>' +

          '<!-- Messages Button with 23 badge -->' +
          '<button type="button" id="ireadMessagesBtn" class="iread-circle-btn" title="الرسائل والمهام" aria-label="الرسائل">' +
            '<span class="iread-badge-orange">23</span>' +
            '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round">' +
              '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>' +
              '<line x1="9" y1="10" x2="15" y2="10"/>' +
              '<line x1="9" y1="14" x2="13" y2="14"/>' +
            '</svg>' +
          '</button>' +

          '<!-- Notifications Bell with 3 badge -->' +
          '<button type="button" id="ireadNotifBtn" class="iread-circle-btn" title="التنبيهات" aria-label="التنبيهات">' +
            '<span class="iread-badge-orange">3</span>' +
            '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round">' +
              '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>' +
              '<path d="M13.73 21a2 2 0 0 1-3.46 0"/>' +
            '</svg>' +
          '</button>' +

          '<!-- User Greeting Pill with Role-Specific Avatar -->' +
          '<div id="ireadUserPill" class="iread-user-pill" role="button" tabindex="0" title="تغيير الصفة (طالب / معلم / مدير / مشرف)">' +
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

        '<!-- Right Slide-down Menu (تظهر عند الضغط وتختفي عند الضغط مرة أخرى) -->' +
        '<nav id="ireadGlobalSlideMenu" class="iread-slide-menu" aria-label="قائمة الطالب">' +
          '<div style="display:flex;align-items:center;justify-content:space-between;padding:8px 12px;margin-bottom:6px;background:#f2f7fd;border-radius:12px;">' +
            '<span style="font-size:0.86rem;font-weight:900;color:#082f68;">قائمة الطالب السريعة</span>' +
            '<span style="font-size:0.75rem;font-weight:800;color:#1668e3;">' + roleLabel + '</span>' +
          '</div>' +
          '<div style="display:flex;flex-direction:column;gap:4px;">' +
            '<a href="' + prefix + 'بوابة-الطالب/index.html#home" class="iread-role-opt active" data-student-tab="home"><span style="color:#ee6b1e;font-weight:900;">(١)</span><span>الصفحة الرئيسية</span></a>' +
            '<a href="' + prefix + 'بوابة-الطالب/index.html#challenge" class="iread-role-opt" data-student-tab="challenge"><span style="color:#ee6b1e;font-weight:900;">(٢)</span><span>تحدي القراءة</span></a>' +
            '<a href="' + prefix + 'بوابة-الطالب/index.html#tasks" class="iread-role-opt" data-student-tab="tasks"><span style="color:#ee6b1e;font-weight:900;">(٣)</span><span>المهام</span></a>' +
            '<a href="' + prefix + 'بوابة-الطالب/index.html#badges" class="iread-role-opt" data-student-tab="badges"><span style="color:#ee6b1e;font-weight:900;">(٤)</span><span>إنجازات وإشارات</span></a>' +
            '<a href="' + prefix + 'بوابة-الطالب/index.html#games" class="iread-role-opt" data-student-tab="games"><span style="color:#ee6b1e;font-weight:900;">(٥)</span><span>ألعاب تفاعلية</span></a>' +
          '</div>' +
          '<div style="height:1px;background:#dce9f8;margin:8px 0;"></div>' +
          '<div style="display:flex;flex-direction:column;gap:4px;">' +
            '<a href="' + prefix + 'بوابة-المعلم/index.html" class="iread-role-opt"><span>👩‍🏫</span><span>بوابة المعلم</span></a>' +
            '<a href="' + prefix + 'لوحة-الإدارة/index.html?role=admin" class="iread-role-opt"><span>🏫</span><span>صفحة المدير</span></a>' +
            '<a href="' + prefix + 'لوحة-الإدارة/index.html?role=supervisor" class="iread-role-opt"><span>🧭</span><span>صفحة المشرف التربوي</span></a>' +
            '<a href="' + prefix + 'لوحة-الإدارة/index.html?role=general_supervisor" class="iread-role-opt"><span>🏛️</span><span>صفحة المشرف العام</span></a>' +
            '<a href="' + prefix + 'home.html" class="iread-role-opt"><span>🌐</span><span>واجهة المنصة العامة</span></a>' +
          '</div>' +
        '</nav>' +

        '<!-- Role & Avatar Switcher Popover -->' +
        '<div id="ireadRoleSwitcherPop" class="iread-role-switcher-pop">' +
          '<div style="font-size:0.76rem;font-weight:900;color:#5b7496;padding:4px 8px 6px;">تغيير الصفة (تتغير الصورة تلقائياً):</div>' +
          '<button type="button" class="iread-role-opt" data-switch-role="student" data-switch-name="سارة أحمد">' +
            '<img src="' + ROLE_AVATARS.student + '" style="width:28px;height:28px;border-radius:50%;"><span>طالب (سارة أحمد)</span>' +
          '</button>' +
          '<button type="button" class="iread-role-opt" data-switch-role="teacher" data-switch-name="أ. مريم العلي">' +
            '<img src="' + ROLE_AVATARS.teacher + '" style="width:28px;height:28px;border-radius:50%;"><span>معلم (أ. مريم العلي)</span>' +
          '</button>' +
          '<button type="button" class="iread-role-opt" data-switch-role="admin" data-switch-name="أ. خالد المنصور">' +
            '<img src="' + ROLE_AVATARS.admin + '" style="width:28px;height:28px;border-radius:50%;"><span>مدير (أ. خالد المنصور)</span>' +
          '</button>' +
          '<button type="button" class="iread-role-opt" data-switch-role="supervisor" data-switch-name="د. عبدالله السالم">' +
            '<img src="' + ROLE_AVATARS.supervisor + '" style="width:28px;height:28px;border-radius:50%;"><span>مشرف تربوي (د. عبدالله)</span>' +
          '</button>' +
          '<button type="button" class="iread-role-opt" data-switch-role="general_supervisor" data-switch-name="د. فهد العتيبي">' +
            '<img src="' + ROLE_AVATARS.general_supervisor + '" style="width:28px;height:28px;border-radius:50%;"><span>مشرف عام (د. فهد)</span>' +
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

    // Role switcher items update avatar + name immediately
    var switchBtns = rolePop.querySelectorAll('[data-switch-role]');
    switchBtns.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var newRole = btn.getAttribute('data-switch-role');
        var newName = btn.getAttribute('data-switch-name');
        document.getElementById('ireadTopUserName').textContent = newName;
        document.getElementById('ireadTopUserAvatar').src = ROLE_AVATARS[newRole] || ROLE_AVATARS.student;
        if (window.IREAD_AUTH && window.IREAD_AUTH.quickDemoLogin) {
          window.IREAD_AUTH.quickDemoLogin(newRole);
        } else {
          localStorage.setItem('iread_current_user_v1', JSON.stringify({ role: newRole, name: newName }));
        }
        rolePop.classList.remove('is-open');
      });
    });

    // If on Student Page, clicking (١)..(٥) in the global menu directly switches the active student tab
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

    window.addEventListener('hashchange', function () {
      var h = (window.location.hash || '').replace(/^#/, '').trim();
      if (h) activateStudentTabOnPage(h, true);
    });

    var initialHash = (window.location.hash || '').replace(/^#/, '').trim();
    if (initialHash) {
      setTimeout(function () { activateStudentTabOnPage(initialHash, false); }, 50);
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
