/* ==========================================================================
   SCRIPT.JS - XỬ LÝ TƯƠNG TÁC JAVASCRIPT THUẦN (VANILLA JS)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // ------------------------------------------------------------------------
  // 1. XỬ LÝ KHỞI TẠO BỘ LẮNG NGHE SỰ KIỆN (EVENT LISTENERS)
  // ------------------------------------------------------------------------
  initHeaderScroll();
  initMobileMenu();
  initScrollSpy();
  initBackToTop();
  initScrollReveal();
  initProjectModal();
  initContactForm();
});

/* --------------------------------------------------------------------------
   2. HIỆU ỨNG THANH NAV THAY ĐỔI KHI CUỘN TRANG (STICKY HEADER)
   -------------------------------------------------------------------------- */
function initHeaderScroll() {
  const header = document.querySelector(".header");
  if (!header) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}

/* --------------------------------------------------------------------------
   3. XỬ LÝ MENU MOBILE (HAMBURGER TOGGLE)
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  if (!hamburger || !navMenu) return;

  // Toggle bật/tắt menu
  hamburger.addEventListener("click", () => {
    const isOpen = hamburger.classList.contains("active");
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
    hamburger.setAttribute("aria-expanded", !isOpen);
  });

  // Tự động đóng menu khi click vào một link chuyển hướng
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
      hamburger.setAttribute("aria-expanded", "false");
    });
  });
}

/* --------------------------------------------------------------------------
   4. TỰ ĐỘNG ĐỔI TRẠNG THÁI ACTIVE CỦA MENU KHI CUỘN TRANG (SCROLLSPY)
   -------------------------------------------------------------------------- */
function initScrollSpy() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  if (!sections.length || !navLinks.length) return;

  window.addEventListener("scroll", () => {
    let currentSectionId = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;

      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSectionId}`) {
        link.classList.add("active");
      }
    });
  });
}

/* --------------------------------------------------------------------------
   5. NÚT QUAY LẠI ĐẦU TRANG (BACK TO TOP BUTTON)
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const backToTopBtn = document.querySelector(".back-to-top");
  if (!backToTopBtn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add("show");
    } else {
      backToTopBtn.classList.remove("show");
    }
  });

  backToTopBtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

/* --------------------------------------------------------------------------
   6. HIỆU ỨNG XUẤT HIỆN KHI CUỘN (SCROLL REVEAL ANIMATION)
   -------------------------------------------------------------------------- */
function initScrollReveal() {
  const revealElements = document.querySelectorAll(".reveal");

  if (!revealElements.length) return;

  const observerOptions = {
    root: null,
    threshold: 0.15, // Đạt 15% diện tích sẽ kích hoạt hiệu ứng
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        obs.unobserve(entry.target); // Chỉ chạy hiệu ứng 1 lần
      }
    });
  }, observerOptions);

  revealElements.forEach((el) => observer.observe(el));
}

/* --------------------------------------------------------------------------
   7. CỬA SỔ MODAL XEM CHI TIẾT DỰ ÁN
   -------------------------------------------------------------------------- */
const projectsData = {
  1: {
    title: "Website Doanh Nghiệp Premium",
    category: "Thiết Kế Web & UX/UI",
    description: "Giải pháp xây dựng website doanh nghiệp chuẩn SEO, giao diện sang trọng, tốc độ phản hồi cực nhanh dưới 1s. Hệ thống tối ưu hóa hoàn toàn cho mọi kích thước màn hình thiết bị.",
    features: [
      "Tối ưu tốc độ tải trang (PageSpeed Performance 98+)",
      "Chuẩn hóa cấu trúc dữ liệu SEO Google",
      "Giao diện hiện đại, nâng tầm giá trị thương hiệu",
      "Bảo mật đa lớp & Tương thích di động"
    ]
  },
  2: {
    title: "Ứng Dụng Web & Di Động",
    category: "Phát Triển Phần Mềm",
    description: "Phát triển hệ thống web ứng dụng tương tác cao, thiết kế bảng điều khiển Dashboard hiện đại, hỗ trợ quản lý quy trình làm việc và tự động hóa thao tác người dùng.",
    features: [
      "Kiến trúc Code sạch, dễ dàng nâng cấp mở rộng",
      "Giao diện người dùng (UI) trực quan, dễ thao tác",
      "Xử lý dữ liệu thời gian thực nhanh chóng",
      "Tích hợp API và dịch vụ thanh toán linh hoạt"
    ]
  },
  3: {
    title: "Xây Dựng Thương Hiệu Số",
    category: "Digital Branding",
    description: "Chiến lược tư vấn toàn diện bộ nhận diện thương hiệu trực tuyến: thiết kế Logo, màu sắc chủ đạo, thiết kế UX/UI sản phẩm và tối ưu hóa trải nghiệm khách hàng.",
    features: [
      "Bộ cẩm nang thương hiệu (Brand Guideline) chi tiết",
      "Thiết kế UI/UX độc quyền chuẩn UX Research",
      "Tối ưu tỷ lệ chuyển đổi (CRO) trên website",
      "Chiến lược tiếp thị số gắn kết người dùng"
    ]
  }
};

function initProjectModal() {
  const modalOverlay = document.getElementById("projectModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalBody = document.getElementById("modalBody");
  const modalCloseBtn = document.getElementById("modalCloseBtn");
  const modalDismissBtn = document.getElementById("modalDismissBtn");
  const projectButtons = document.querySelectorAll(".btn-view-project");

  if (!modalOverlay) return;

  // Hàm mở modal
  const openModal = (projectId) => {
    const data = projectsData[projectId];
    if (!data) return;

    modalTitle.textContent = data.title;
    modalBody.innerHTML = `
      <p style="margin-bottom: 16px; font-weight: 600; color: var(--primary);">${data.category}</p>
      <p style="margin-bottom: 20px;">${data.description}</p>
      <h4 style="font-weight: 700; color: var(--text-main); margin-bottom: 12px;">Tính năng nổi bật:</h4>
      <ul style="list-style-type: disc; padding-left: 20px; line-height: 1.8;">
        ${data.features.map(f => `<li>${f}</li>`).join('')}
      </ul>
    `;

    modalOverlay.classList.add("active");
    document.body.style.overflow = "hidden"; // Khóa cuộn trang khi mở modal
  };

  // Hàm đóng modal
  const closeModal = () => {
    modalOverlay.classList.remove("active");
    document.body.style.overflow = ""; // Mở lại cuộn trang
  };

  // Lắng nghe nút xem dự án
  projectButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      openModal(id);
    });
  });

  // Lắng nghe sự kiện đóng modal
  if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeModal);
  if (modalDismissBtn) modalDismissBtn.addEventListener("click", closeModal);

  // Đóng modal khi click ra lớp nền mờ bên ngoài
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  // Đóng modal khi nhấn phím ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalOverlay.classList.contains("active")) {
      closeModal();
    }
  });
}

/* --------------------------------------------------------------------------
   8. XỬ LÝ FORM LIÊN HỆ & THÔNG BÁO (FORM VALIDATION & TOAST)
   -------------------------------------------------------------------------- */
function initContactForm() {
  const contactForm = document.getElementById("contactForm");
  const toast = document.getElementById("toastNotification");

  if (!contactForm) return;

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");

    // Kiểm tra tính hợp lệ cơ bản
    if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
      showToast("⚠️ Vui lòng điền đầy đủ các thông tin bắt buộc!");
      return;
    }

    // Giả lập trạng thái gửi tin nhắn
    const submitBtn = contactForm.querySelector("button[type='submit']");
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "⏳ Đang gửi...";
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      contactForm.reset(); // Xóa form sau khi gửi thành công
      showToast("🎉 Cảm ơn bạn! Tin nhắn đã được gửi thành công.");
    }, 1200);
  });
}

// Hàm hiển thị Toast thông báo
function showToast(message) {
  const toast = document.getElementById("toastNotification");
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3500);
}
