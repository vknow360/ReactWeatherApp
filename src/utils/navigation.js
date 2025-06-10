export const navigateTo = (screen) => {
    window.location.href = screen === "home" ? "/" : `/${screen}`;
};

export const handleLogoutAndRedirect = async (logoutFn) => {
    try {
        await logoutFn();
        window.location.href = "/";
    } catch (error) {
        console.error("Failed to log out:", error);
    }
};
