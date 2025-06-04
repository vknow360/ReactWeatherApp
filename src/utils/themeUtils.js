export const applyDefaultTheme = () => {
    const root = document.documentElement;

    root.style.setProperty("--color-bg-primary", "#162438");
    root.style.setProperty("--color-bg-secondary", "#202b3b");
    root.style.setProperty("--color-bg-tertiary", "#263142");
    root.style.setProperty("--color-border", "#243447");
    root.style.setProperty("--color-text-primary", "#ffffff");
    root.style.setProperty("--color-text-secondary", "#e2e8f0");
    root.style.setProperty("--color-text-tertiary", "#94a3b8");
    root.style.setProperty("--color-accent", "#22d3ee");
    root.style.setProperty("--color-accent-hover", "#06b6d4");
    root.style.setProperty("--color-accent-light", "#164e63");
    root.style.setProperty(
        "--color-card-shadow",
        "0 4px 6px rgba(0, 0, 0, 0.25)"
    );
    root.style.setProperty("--color-input-bg", "#1a2535");
    root.style.setProperty("--color-bg-hover", "#2a3546");
};
