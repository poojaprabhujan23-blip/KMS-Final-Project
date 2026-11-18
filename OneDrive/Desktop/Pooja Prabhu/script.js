/**
 * Pooja Prabhu - Developer Portfolio JavaScript
 * Accessible interactions, theme toggling, project filtering,
 * modals, ATS plain-text copy & mailto dispatch.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. Theme Management (Light / Dark)
  // --------------------------------------------------------------------------
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const htmlRoot = document.documentElement;

  // Retrieve saved theme or default to 'dark' (Deep Blue & Cyan)
  const savedTheme = localStorage.getItem('pooja_portfolio_theme') || 'dark';
  setTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      setTheme(newTheme);
      showToast(`Switched to ${newTheme === 'dark' ? 'Dark Navy' : 'Light'} theme`);
    });
  }

  function setTheme(theme) {
    htmlRoot.setAttribute('data-theme', theme);
    localStorage.setItem('pooja_portfolio_theme', theme);
    if (themeToggleBtn) {
      themeToggleBtn.setAttribute('title', `Switch to ${theme === 'light' ? 'dark' : 'light'} theme`);
    }
  }

  // --------------------------------------------------------------------------
  // 2. Mobile Drawer Navigation
  // --------------------------------------------------------------------------
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileOverlay = document.getElementById('mobile-overlay');
  const mobileLinks = document.querySelectorAll('.mobile-link');
  const mobileResumeBtn = document.getElementById('mobile-resume-btn');

  function openMobileMenu() {
    if (!mobileNav || !mobileOverlay || !mobileMenuBtn) return;
    mobileNav.classList.add('open');
    mobileOverlay.classList.add('active');
    mobileMenuBtn.classList.add('active');
    mobileMenuBtn.setAttribute('aria-expanded', 'true');
    mobileNav.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    if (!mobileNav || !mobileOverlay || !mobileMenuBtn) return;
    mobileNav.classList.remove('open');
    mobileOverlay.classList.remove('active');
    mobileMenuBtn.classList.remove('active');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    mobileNav.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = mobileNav.classList.contains('open');
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', closeMobileMenu);
  }

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  if (mobileResumeBtn) {
    mobileResumeBtn.addEventListener('click', () => {
      closeMobileMenu();
      openModal(resumeModal);
    });
  }

  // --------------------------------------------------------------------------
  // 3. ScrollSpy for Active Desktop Nav Link
  // --------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('.desktop-nav .nav-link');

  function highlightNavOnScroll() {
    const scrollPosition = window.scrollY + 140;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        desktopNavLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNavOnScroll, { passive: true });

  // --------------------------------------------------------------------------
  // 4. Project Filtering Tabs
  // --------------------------------------------------------------------------
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Set active button
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category') || '';
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.style.display = 'block';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // --------------------------------------------------------------------------
  // 5. Modals Management (ATS Resume & KMS Architecture)
  // --------------------------------------------------------------------------
  const resumeModal = document.getElementById('resume-modal');
  const openResumeBtn = document.getElementById('open-resume-btn');
  const heroResumeTrigger = document.getElementById('hero-resume-trigger');
  const closeResumeBtn = document.getElementById('close-resume-btn');
  const printResumeBtn = document.getElementById('print-resume-btn');
  const copyAtsTextBtn = document.getElementById('copy-ats-text-btn');
  const copyAtsLabel = document.getElementById('copy-ats-label');

  const archModal = document.getElementById('arch-modal');
  const kmsDetailsBtn = document.getElementById('kms-details-btn');
  const closeArchBtn = document.getElementById('close-arch-btn');

  function openModal(modal) {
    if (!modal) return;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Focus close button or first focusable element
    const closeBtn = modal.querySelector('.modal-close-btn');
    if (closeBtn) closeBtn.focus();
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Resume Modal Triggers
  if (openResumeBtn) {
    openResumeBtn.addEventListener('click', () => openModal(resumeModal));
  }
  if (heroResumeTrigger) {
    heroResumeTrigger.addEventListener('click', () => openModal(resumeModal));
  }
  if (closeResumeBtn) {
    closeResumeBtn.addEventListener('click', () => closeModal(resumeModal));
  }

  // KMS Architecture Modal Triggers
  if (kmsDetailsBtn) {
    kmsDetailsBtn.addEventListener('click', () => openModal(archModal));
  }
  if (closeArchBtn) {
    closeArchBtn.addEventListener('click', () => closeModal(archModal));
  }

  // Close modals on clicking outside dialog
  [resumeModal, archModal].forEach(modal => {
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          closeModal(modal);
        }
      });
    }
  });

  // Close modals on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal(resumeModal);
      closeModal(archModal);
      closeMobileMenu();
    }
  });

  // Print / Save PDF Resume (Single-Column ATS standard)
  if (printResumeBtn) {
    printResumeBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // Copy Plain Text ATS Resume (Designed for ATS form pasting & AI scrapers)
  if (copyAtsTextBtn) {
    copyAtsTextBtn.addEventListener('click', async () => {
      const atsPlainText = `POOJA PRABHU
Udupi, Karnataka, India | poojaprabhu.mca.2026@pim.ac.in | linkedin.com/in/Pooja Prabhu | github.com/poojaprabhujan23-blip

SUMMARY
First-year Master of Computer Applications (MCA) student at Poornaprajna Institute of Management (PIM) with a solid computational and mathematical background (Bachelor of Science in Computer Science, 9.55 CGPA). Skilled in foundational programming (C, C++, Python), modern full-stack web development (HTML, CSS, JavaScript, React.js, Node.js), and database systems (MySQL, MongoDB). Dedicated to solving real-world challenges, continuous technical learning, and producing maintainable, scalable software solutions.

EDUCATION
Master of Computer Applications (MCA) | 2026 – 2028
Poornaprajna Institute of Management (PIM), Udupi, Karnataka, India
Status: Pursuing | Specialization: Computer Applications
Relevant Coursework: Advanced Database Management Systems (DBMS), Software Architecture, Data Structures and Algorithms (DSA), Web Technologies.

Bachelor of Science (BSc) | 2023 – 2026
Poornaprajna College (PPC), Udupi, Karnataka, India
Status: Completed | Specialization: Computer Science
Cumulative Grade Point Average (CGPA): 9.55 / 10.0 | Academic Excellence Award

SKILLS
- Core Programming Languages: C (Intermediate), C++ (Intermediate), Python (Intermediate), Java (Basic), JavaScript (Basic), R (Basic)
- Web Development & Markup: HyperText Markup Language (HTML) (Intermediate), Cascading Style Sheets (CSS) (Basic), Structured Query Language (SQL) (Basic)
- Frameworks & Libraries: React.js, Node.js, Express.js, Representational State Transfer (REST APIs)
- Database Management Systems (DBMS): MySQL (Basic), MongoDB (Basic)
- Development Tools & Environments: Visual Studio Code (Intermediate), GitHub (Basic), Postman (Basic), Google Antigravity (Basic), Jupyter Notebook (Basic)
- Data Science & Analytics: NumPy (Basic), Pandas (Basic)
- Cloud Platforms & Deployment: Vercel (Basic), GitHub Pages (Basic), Google Cloud (Basic)
- Core Computer Science Methodologies: Data Structures and Algorithms (DSA), Object-Oriented Programming (OOP), User Interface and User Experience (UI/UX) Design, Problem Solving, Testing and Debugging, Responsive Web Design

EXPERIENCE
Full Stack Developer Intern | 2026
EvolveTech | Karnataka, India
- Collaborated on end-to-end full stack web applications integrating frontend and backend logic.
- Participated in RESTful API integration, code reviews, and Git version control practices.
- Enhanced understanding of responsive design patterns and cross-browser testing.

Volunteer | 2024 – Present
Youth Red Cross | Udupi, Karnataka, India
- Participated in community health outreach programs, social welfare initiatives, and volunteer coordination.
- Strengthened team communication, civic responsibility, and collaborative leadership skills.

PROJECTS
Knowledge Management System (KMS) | Status: Completed
Technology Stack: MongoDB, Express.js, React.js, Node.js (MERN Stack)
- Architected a centralized knowledge management platform to simplify the process of creating, storing, organizing, searching, and sharing digital information assets.
- Addressed fragmented traditional information storage by creating secure document uploads, structured categorization, and fast search retrieval mechanisms.
- Engineered responsive user interfaces with React.js and connected modular backend REST API endpoints using Express.js and Node.js.
- Utilized MongoDB for flexible schema document persistence and metadata tracking, improving knowledge accessibility and overall team productivity.

CERTIFICATIONS
- Certificate in Adobe Photoshop: Issued by Poornaprajna College (2025). Trained in digital graphics manipulation, asset preparation for user interfaces, and visual composition.

HONORS & ACHIEVEMENTS
- Academic Excellence Recognition: Conferred by Poornaprajna College (2026) for exceptional scholastic performance (9.55 CGPA) in Bachelor of Science in Computer Science.

LANGUAGES
English (Fluent), Kannada (Native), Hindi (Proficient), Konkani (Conversational)`;

      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(atsPlainText);
        } else {
          const tempTextArea = document.createElement('textarea');
          tempTextArea.value = atsPlainText;
          document.body.appendChild(tempTextArea);
          tempTextArea.select();
          document.execCommand('copy');
          document.body.removeChild(tempTextArea);
        }
        if (copyAtsLabel) {
          copyAtsLabel.textContent = 'Copied Plain Text!';
          setTimeout(() => {
            copyAtsLabel.textContent = 'Copy Plain Text';
          }, 2500);
        }
        showToast('ATS Plain-Text Resume copied to clipboard!');
      } catch (err) {
        showToast('Failed to copy. You can highlight and copy the text manually.');
      }
    });
  }

  // --------------------------------------------------------------------------
  // 6. Copy Email to Clipboard
  // --------------------------------------------------------------------------
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const copyBtnLabel = document.getElementById('copy-btn-label');
  const emailAddress = 'poojaprabhu.mca.2026@pim.ac.in';

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', async () => {
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(emailAddress);
        } else {
          const tempInput = document.createElement('input');
          tempInput.value = emailAddress;
          document.body.appendChild(tempInput);
          tempInput.select();
          document.execCommand('copy');
          document.body.removeChild(tempInput);
        }
        
        if (copyBtnLabel) {
          copyBtnLabel.textContent = 'Copied!';
          setTimeout(() => {
            copyBtnLabel.textContent = 'Copy Email';
          }, 2000);
        }
        showToast('Email copied to clipboard: ' + emailAddress);
      } catch (err) {
        showToast('Email: ' + emailAddress);
      }
    });
  }

  // --------------------------------------------------------------------------
  // 7. Interactive Contact Form with Mailto Dispatch
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('sender-name');
      const emailInput = document.getElementById('sender-email');
      const subjectInput = document.getElementById('email-subject');
      const messageInput = document.getElementById('email-message');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const subject = subjectInput ? subjectInput.value.trim() : 'Inquiry for Pooja Prabhu';
      const message = messageInput ? messageInput.value.trim() : '';

      if (!name || !email || !message) {
        showToast('Please fill in all required fields.');
        return;
      }

      const bodyText = `Hi Pooja,\n\n${message}\n\n---\nFrom: ${name}\nReply to: ${email}`;
      const mailtoUrl = `mailto:${encodeURIComponent(emailAddress)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;

      // Launch email client
      window.location.href = mailtoUrl;

      showToast('Opening your email client to dispatch the message...');
      contactForm.reset();
    });
  }

  // --------------------------------------------------------------------------
  // 8. Dynamic Copyright Year
  // --------------------------------------------------------------------------
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // --------------------------------------------------------------------------
  // 9. Toast Notification Helper
  // --------------------------------------------------------------------------
  function showToast(message) {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      <span>${escapeHtml(message)}</span>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.3s ease-out';
      setTimeout(() => {
        if (toast.parentElement) {
          toast.parentElement.removeChild(toast);
        }
      }, 300);
    }, 3500);
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

});
