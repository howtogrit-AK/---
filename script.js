// 모바일 메뉴 토글
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // 메뉴 링크 클릭 시 메뉴 닫기
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
}

// 스크롤 시 네비게이션 스타일 변경
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// 스크롤 애니메이션 (Intersection Observer)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// 관찰할 요소들
const animateElements = document.querySelectorAll('.service-card, .why-us-card, .testimonial-card, .team-card, .about-text, .about-stats, .program-card');

animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// 폼 제출 처리
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // 폼 데이터 가져오기
        const formData = {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            service: document.getElementById('service').value,
            message: document.getElementById('message').value
        };
        
        // 실제 환경에서는 서버로 데이터 전송
        console.log('상담 신청 정보:', formData);
        
        // 사용자에게 알림 (실제 환경에서는 서버 응답에 따라 처리)
        alert('상담 신청이 완료되었습니다.\n빠른 시일 내에 연락드리겠습니다.');
        
        // 폼 초기화
        contactForm.reset();
    });
}

// 부드러운 스크롤 (브라우저 기본 스크롤이 작동하지 않는 경우 대비)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '#home') {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            return;
        }
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const offsetTop = target.offsetTop - 80; // 네비게이션 높이 고려
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// 숫자 카운트 애니메이션 (통계)
const animateCounter = (element, target, duration = 2000, emoji = '') => {
    let start = 0;
    const increment = target / (duration / 16);
    
    const updateCounter = () => {
        start += increment;
        if (start < target) {
            element.textContent = emoji + Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = emoji + target;
        }
    };
    
    updateCounter();
};

// 통계 숫자 애니메이션
const statNumbers = document.querySelectorAll('.stat-number');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            const text = entry.target.textContent.trim();
            // 이모지와 숫자 분리
            const emojiMatch = text.match(/^[\p{Emoji}\s]+/u);
            const numberMatch = text.match(/\d+/);
            const emoji = emojiMatch ? emojiMatch[0].trim() + ' ' : '';
            const target = numberMatch ? parseInt(numberMatch[0]) : parseInt(text);
            
            if (!isNaN(target)) {
                entry.target.textContent = emoji + '0';
                const originalEmoji = emoji;
                animateCounter(entry.target, target, 2000, originalEmoji);
                entry.target.dataset.animated = 'true';
            }
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => {
    statsObserver.observe(stat);
});

// 페이지 로드 시 히어로 애니메이션
window.addEventListener('load', () => {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateY(0)';
    }
});

// 키보드 접근성 개선
document.addEventListener('keydown', (e) => {
    // ESC 키로 모바일 메뉴 닫기
    if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        if (menuToggle) {
            menuToggle.classList.remove('active');
        }
    }
});

// 터치 디바이스에서 호버 효과 제거 (접근성)
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
}

// 리사이즈 시 모바일 메뉴 닫기
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (window.innerWidth > 768 && navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            if (menuToggle) {
                menuToggle.classList.remove('active');
            }
        }
    }, 250);
});
