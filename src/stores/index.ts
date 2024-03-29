import { defineStore } from "pinia";
import i18n from "@/i18n";
import appSetting from "@/app-setting";

export const useAppStore = defineStore("app", {
    state: () => ({
        isDarkMode: false,
        mainLayout: "app",
        theme: "dark",
        menu: "vertical",
        layout: "full",
        rtlClass: "ltr",
        animation: "",
        navbar: "navbar-sticky",
        locale: "pt",
        sidebar: false,
        activeDropdown: "",
        languageList: [
            { code: "pt", name: "Português" },
            { code: "en", name: "English" },
        ],
        isShowMainLoader: true,
        semidark: false,
    }),

    actions: {
        setUserToken(value: any) {
            localStorage.setItem("user.token", value);
        },
        setUserName(value: any) {
            localStorage.setItem("user.name", value);
        },
        logout() {
            localStorage.removeItem("user.token");
            localStorage.removeItem("user.id");
            localStorage.removeItem("user.name");
            localStorage.removeItem("user.email");
        },

        setMainLayout(payload: any = null) {
            this.mainLayout = payload; //app , auth
        },
        toggleTheme(payload: any = null) {
            payload = payload || this.theme; // light|dark|system
            localStorage.setItem("theme", payload);
            this.theme = payload;

            if (payload == "light") {
                this.isDarkMode = false;
            } else if (payload == "dark") {
                this.isDarkMode = true;
            }

            if (this.isDarkMode) {
                document.querySelector("body")?.classList.add("dark");
            } else {
                document.querySelector("body")?.classList.remove("dark");
            }
        },
        toggleMenu(payload: any = null) {
            payload = payload || this.menu; // vertical, collapsible-vertical, horizontal
            this.sidebar = false; // reset sidebar state
            localStorage.setItem("menu", payload);
            this.menu = payload;
        },
        toggleLayout(payload: any = null) {
            payload = payload || this.layout; // full, boxed-layout
            localStorage.setItem("layout", payload);
            this.layout = payload;
        },
        toggleRTL(payload: any = null) {
            payload = payload || this.rtlClass; // rtl, ltr
            localStorage.setItem("rtlClass", payload);
            this.rtlClass = payload;
            document
                .querySelector("html")
                ?.setAttribute("dir", this.rtlClass || "ltr");
        },
        toggleAnimation(payload: any = null) {
            payload = payload || this.animation; // animate__fadeIn, animate__fadeInDown, animate__fadeInUp, animate__fadeInLeft, animate__fadeInRight, animate__slideInDown, animate__slideInLeft, animate__slideInRight, animate__zoomIn
            payload = payload?.trim();
            localStorage.setItem("animation", payload);
            this.animation = payload;
            appSetting.changeAnimation();
        },
        toggleNavbar(payload: any = null) {
            payload = payload || this.navbar; // navbar-sticky, navbar-floating, navbar-static
            localStorage.setItem("navbar", payload);
            this.navbar = payload;
        },
        toggleSemidark(payload: any = null) {
            payload = payload || false;
            localStorage.setItem("semidark", payload);
            this.semidark = payload;
        },
        toggleLocale(payload: any = null) {
            payload = payload || this.locale;
            i18n.global.locale.value = payload;
            localStorage.setItem("i18n_locale", payload);
            this.locale = payload;
            if (this.locale?.toLowerCase() === "ae") {
                this.toggleRTL("rtl");
            } else {
                this.toggleRTL("ltr");
            }
        },
        toggleSidebar(state: boolean = false) {
            this.sidebar = !this.sidebar;
        },
        toggleMainLoader(state: boolean = false) {
            this.isShowMainLoader = true;
            setTimeout(() => {
                this.isShowMainLoader = false;
            }, 500);
        },
        toggleMobileMenu() {
            if (window.innerWidth < 1024) {
                this.toggleSidebar();
            }
        },
    },
    getters: {
        getUserToken: () => localStorage.getItem("user.token") ? true : false,
        getUserName: () => localStorage.getItem("user.name"),
    },
});
