import isMobileObject from "ismobilejs";

const userAgent = window.navigator.userAgent;
const isMobileUserAgentPhone = isMobileObject(userAgent).phone;
const isMobileUserAgentTablet = isMobileObject(userAgent).tablet;

function isPhone() {
    return isMobileUserAgentPhone || window.innerWidth < 768;
}

function isTablet() {
    return isMobileUserAgentTablet;
}

function isDesktop() {
    return !isPhone() && !isTablet();
}

export {isPhone, isTablet, isDesktop};

