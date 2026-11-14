(function ($) {
  'use strict';

  $(function () {
    $('.navbar-toggler').on('click', function () {
      var target = $(this).attr('data-target');
      if (target) $(target).toggleClass('show');
    });

    $('.stat-number[data-target]').each(function () {
      var $el = $(this);
      var target = parseInt($el.attr('data-target'), 10);
      var prefix = $el.attr('data-prefix') || '';
      if (isNaN(target)) return;
      $({ val: 0 }).animate(
        { val: target },
        {
          duration: 1200,
          easing: 'swing',
          step: function () {
            $el.text(prefix + Math.floor(this.val).toLocaleString('en-US'));
          },
          complete: function () {
            $el.text(prefix + target.toLocaleString('en-US'));
          },
        }
      );
    });

    var $blogSearch = $('#blogSearchInput');
    var $blogItems = $('.blog-post-item');
    if ($blogSearch.length && $blogItems.length) {
      $blogSearch.on('input', function () {
        var q = ($(this).val() || '').trim().toLowerCase();
        $blogItems.each(function () {
          var text = $(this).text().toLowerCase();
          $(this).toggle(!q || text.indexOf(q) !== -1);
        });
      });
    }

    $('#loadMoreBtn').on('click', function () {
      $('.blog-post-item.d-none').removeClass('d-none');
      $(this).text('تم عرض جميع المقالات').prop('disabled', true);
    });

    $('#newsletterForm').on('submit', function (e) {
      e.preventDefault();
      var email = ($('#newsletterEmail').val() || '').trim();
      var $msg = $('#newsletterMsg');
      if (!email) {
        $msg.removeClass('text-success').addClass('text-warning').text('يرجى إدخال بريد إلكتروني صحيح.');
        return;
      }
      $msg.removeClass('text-warning').addClass('text-success').text('تم تسجيل اشتراكك محلياً بنجاح: ' + email);
      $('#newsletterEmail').val('');
    });

    $('#contactForm').on('submit', function (e) {
      e.preventDefault();
      var name = ($('#contactName').val() || '').trim();
      var $status = $('#contactStatus');
      $status
        .removeClass('d-none alert-danger')
        .addClass('alert-success')
        .text('شكراً لتواصلك' + (name ? ' يا ' + name : '') + '، تم حفظ رسالتك محلياً بنجاح.');
      this.reset();
    });
  });
})(window.jQuery);

