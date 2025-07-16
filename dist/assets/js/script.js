// utils;
const resize = (callback, { callOnInit = true, debounceTime = 15 } = {}) => {
	if (!callback || typeof callback !== "function") return;

	const onResize = debounceTime > 0 ? debounce(debounceTime, () => callback(getWindowSize())) : () => callback(getWindowSize());

	window.addEventListener("resize", onResize);

	if (callOnInit) callback(getWindowSize());

	return () => window.removeEventListener("resize", onResize);
};

const getWindowSize = () => {
	return {
		windowWidth: window.innerWidth,
		windowHeight: window.innerHeight,
	};
};

const debounce = (delay, fn) => {
	let timerId;
	return (...args) => {
		if (timerId) clearTimeout(timerId);
		timerId = setTimeout(() => {
			fn(...args);
			timerId = null;
		}, delay);
	};
};

const handleAnchorLinks = () => {
	const links = document.querySelectorAll('a[href^="#"]');

	links.forEach((link) => {
		link.addEventListener("click", (event) => {
			const targetId = link.getAttribute("href").substring(1);
			const targetElement = document.getElementById(targetId);

			if (!targetElement) return;

			event.preventDefault();
			targetElement.scrollIntoView({ behavior: "smooth" });
		});
	});
};

// burger

const burger = ({ header, burger, menu }) => {
	if (!header || !burger || !menu) return;

	const toggleClasses = () => {
		burger.classList.toggle("active");
		menu.classList.toggle("active");
		document.body.classList.toggle("boby--scroll-lock");
		document.body.classList.toggle("body--overflow");
	};

	const closeMenu = () => {
		burger.classList.remove("active");
		menu.classList.remove("active");
		document.body.classList.remove("boby--scroll-lock");
		document.body.classList.remove("body--overflow");
	};

	burger.addEventListener("click", (event) => {
		event.preventDefault();
		toggleClasses();
		window.scrollTo(0, 0);
	});

	document.addEventListener("click", (event) => {
		const isClickInsideHeader = header.contains(event.target);
		const isMenuActive = menu.classList.contains("active");

		if (!isClickInsideHeader && isMenuActive) {
			closeMenu();
		}
	});

	menu.addEventListener("click", (event) => {
		const target = event.target;
		const isLinkOrButton = target.closest("a, button");
		if (isLinkOrButton) {
			closeMenu();
		}
	});

	resize(({ windowWidth }) => {
		if (windowWidth > 1024) {
			closeMenu();
		}
	});
};

const initBurger = () => {
	const SELECTORS = {
		header: ".js-header",
		burger: ".js-burger",
		menu: ".js-header-nav",
	};

	const header = document.querySelector(SELECTORS.header);
	const burgerTrigger = document.querySelector(SELECTORS.burger);
	const menu = document.querySelector(SELECTORS.menu);

	burger({
		header,
		burger: burgerTrigger,
		menu,
	});
};

// how swiper
let swiperHowInstance = null;

const initHowSwiper = ({ windowWidth }) => {
	const isMobile = windowWidth < 992;
	const swiperSelector = ".js-steps-swiper";

	if (isMobile && !swiperHowInstance) {
		swiperHowInstance = new Swiper(swiperSelector, {
			slidesPerView: 1,
			spaceBetween: 40,
			navigation: {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev",
			},
			breakpoints: {
				768: {
					spaceBetween: 40,
					slidesPerView: 2,
				},
			},
		});
	}

	if (!isMobile && swiperHowInstance) {
		swiperHowInstance.destroy(true, true);
		swiperHowInstance = null;
	}
};

// why swiper
let swiperWhyInstance = null;

const initWhySwiper = ({ windowWidth }) => {
	const isMobile = windowWidth < 992;
	const swiperSelector = ".js-why-swiper";

	if (isMobile && !swiperWhyInstance) {
		swiperWhyInstance = new Swiper(swiperSelector, {
			slidesPerView: 1,
			spaceBetween: 40,
			loop: true,
			navigation: {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev",
			},
			breakpoints: {
				768: {
					spaceBetween: 40,
					slidesPerView: 2,
				},
			},
		});
	}

	if (!isMobile && swiperWhyInstance) {
		swiperWhyInstance.destroy(true, true);
		swiperWhyInstance = null;
	}
};

// technologies swiper
let swiperTechnologiesInstance = null;

const initTechnologiesSwiper = ({ windowWidth }) => {
	const isMobile = windowWidth < 992;
	const swiperSelector = ".js-technologies-swiper";

	if (isMobile && !swiperTechnologiesInstance) {
		swiperTechnologiesInstance = new Swiper(swiperSelector, {
			slidesPerView: 1,
			spaceBetween: 40,
			loop: true,
			navigation: {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev",
			},
			breakpoints: {
				768: {
					spaceBetween: 40,
					slidesPerView: 2,
				},
			},
		});
	}

	if (!isMobile && swiperTechnologiesInstance) {
		swiperTechnologiesInstance.destroy(true, true);
		swiperTechnologiesInstance = null;
	}
};

// contact swiper
let swiperConractInstance = null;

const initContactSwiper = ({ windowWidth }) => {
	const isMobile = windowWidth < 992;
	const swiperSelector = ".js-contact-swiper";

	if (isMobile && !swiperConractInstance) {
		swiperConractInstance = new Swiper(swiperSelector, {
			slidesPerView: 1,
			spaceBetween: 40,
			loop: true,
			navigation: {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev",
			},
		});
	}

	if (!isMobile && swiperConractInstance) {
		swiperConractInstance.destroy(true, true);
		swiperConractInstance = null;
	}
};

// join form
const validateForm = ({ form }) => {
	if (!form) return;

	form.addEventListener("submit", (event) => {
		event.preventDefault();
		let isValid = true;

		const inputs = form.querySelectorAll("input, textarea");

		inputs.forEach((input) => {
			const wrapper = input.closest(".form");
			wrapper.classList.remove("form--error");

			const value = input.value.trim();
			const type = input.type;

			if (type === "text" && /^\d+$/.test(value)) {
				wrapper.classList.add("form--error");
				isValid = false;
			}

			if (type === "tel" && (!/^[\d\s()+-]+$/.test(value) || !/\d/.test(value))) {
				wrapper.classList.add("form--error");
				isValid = false;
			}

			if (!value) {
				wrapper.classList.add("form--error");
				isValid = false;
			}
		});

		if (isValid) {
			form.reset();
			form.classList.add("join__form--success");

			setTimeout(() => {
				form.classList.remove("join__form--success");
			}, 3000);
		}
	});
};

const initFormValidation = () => {
	const SELECTORS = {
		form: ".js-join-form",
	};

	const form = document.querySelector(SELECTORS.form);

	validateForm({ form });
};

const main = () => {
	handleAnchorLinks();
	resize(initContactSwiper, { debounceTime: 50 });
	resize(initHowSwiper, { debounceTime: 50 });
	resize(initTechnologiesSwiper, { debounceTime: 50 });
	resize(initWhySwiper, { debounceTime: 50 });
	initBurger();
	initFormValidation();
};

window.onload = () => {
	main();
};
