document.addEventListener('DOMContentLoaded', () => {
  // ===== Menu mobile =====
  const menuBtn = document.querySelector('.mobile-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');

  const setMenuState = (isOpen) => {
    mobileMenu?.classList.toggle('open', isOpen);
    menuBtn?.setAttribute('aria-expanded', String(isOpen));
  };

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      setMenuState(!mobileMenu.classList.contains('open'));
    });

    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setMenuState(false));
    });

    document.addEventListener('click', (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      const clickedInsideMenu = mobileMenu.contains(target);
      const clickedToggle = menuBtn.contains(target);
      if (!clickedInsideMenu && !clickedToggle) setMenuState(false);
    });
  }

  // ===== FAQ accordion =====
  document.querySelectorAll('.faq-item').forEach((item) => {
    const button = item.querySelector('.faq-question');
    if (button) {
      button.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item').forEach((entry) => entry.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
      });
    }
  });

  // ===== Form kontak ke WhatsApp =====
  const form = document.querySelector('#contact-form');
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const service = form.service.value;
      const message = form.message.value.trim();

      if (!name || !message) {
        alert('Mohon isi nama dan pesan terlebih dahulu.');
        return;
      }

      const text = [
        'Halo TugasIn Aja, saya ingin bertanya/order.',
        '',
        `Nama: ${name}`,
        email ? `Email: ${email}` : '',
        service ? `Layanan: ${service}` : '',
        '',
        'Pesan:',
        message,
      ].filter(Boolean).join('\n');

      window.open(`https://wa.me/6283866273495?text=${encodeURIComponent(text)}`, '_blank');
    });
  }
});
