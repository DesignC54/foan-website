"use client";

// Figma: Button / Theme (4044:96). Shows a sun in Dark mode and a moon in Light mode.
// The icon swap is pure CSS (light: variant), so nothing flashes on first paint;
// the choice is saved to localStorage and applied before paint by ThemeScript.

export const THEME_KEY = "foan-theme";

export function ThemeToggle({ device }: { device: "desktop" | "mobile" }) {
  function toggle() {
    const root = document.documentElement;
    const next = root.dataset.theme === "light" ? "dark" : "light";
    root.dataset.theme = next;
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      /* storage blocked: the theme still switches for this visit */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Switch between dark and light mode"
      className={`border-subtle text-primary hover:border-default grid size-12 shrink-0 cursor-pointer place-items-center rounded-full border transition-colors ${
        device === "desktop" ? "bg-surface-raised" : "bg-surface"
      }`}
    >
      <span
        className="icon light:hidden size-5"
        style={
          { "--icon": "url(/images/site/icon-sun.svg)" } as React.CSSProperties
        }
      />
      <span
        className="icon light:inline-block hidden size-5"
        style={
          { "--icon": "url(/images/site/icon-moon.svg)" } as React.CSSProperties
        }
      />
    </button>
  );
}

/** Inline script for <head>: applies the saved theme before the first paint. */
export function ThemeScript() {
  const code = `try{var t=localStorage.getItem("${THEME_KEY}");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
