(() => {
  const header = document.getElementById("site-header");
  const year = document.getElementById("year");
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const barsRoot = document.querySelector("[data-bars]");
  if (barsRoot && "IntersectionObserver" in window) {
    const fills = barsRoot.querySelectorAll(".bar-fill");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          fills.forEach((el) => {
            const width = el.getAttribute("data-width") || "0";
            el.style.width = `${width}%`;
          });
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(barsRoot);
  } else {
    document.querySelectorAll(".bar-fill").forEach((el) => {
      el.style.width = `${el.getAttribute("data-width") || 0}%`;
    });
  }

  if (form && status) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      status.className = "form-status";
      status.textContent = "Sending…";

      const fullName = /** @type {HTMLInputElement} */ (form.elements.namedItem("full_name"));
      const phone = /** @type {HTMLInputElement} */ (form.elements.namedItem("phone_number"));

      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            full_name: fullName?.value ?? "",
            phone_number: phone?.value ?? "",
          }),
        });
        const data = await res.json();
        if (!res.ok || !data.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        status.className = "form-status is-ok";
        status.textContent = data.message || "Thanks — we received your message.";
        form.reset();
      } catch (err) {
        status.className = "form-status is-error";
        status.textContent = err instanceof Error ? err.message : "Request failed";
      }
    });
  }
})();
