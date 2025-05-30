document.addEventListener("DOMContentLoaded", function () {
  // Smooth scrolling for navbar links
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href.startsWith("#")) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
          });
        }
      }
    });
  });

  // Update current year in footer
  const currentYearSpan = document.getElementById("currentYear");
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // Count-up animation for tokenomics (simple version)
  const countUpElements = document.querySelectorAll(".count-up");
  countUpElements.forEach((el) => {
    const targetCount = parseInt(el.getAttribute("data-count"), 10);
    let currentCount = 0;
    const increment = Math.ceil(targetCount / 100); // Adjust speed by changing divisor

    function updateCountAnimation() { // Renamed to avoid potential global scope collision
      currentCount += increment;
      if (currentCount < targetCount) {
        el.textContent = currentCount.toLocaleString() + " $SHITKICKER"; // Or format as needed
        requestAnimationFrame(updateCountAnimation);
      } else {
        el.textContent = targetCount.toLocaleString() + " $SHITKICKER";
      }
    }

    let observerForCount = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            updateCountAnimation();
            observerForCount.unobserve(el); // Stop observing once animation starts
          }
        });
      },
      { threshold: 0.1 }
    ); // Trigger when 10% visible
    observerForCount.observe(el);
  });

  // Scroll Animation Trigger (using Intersection Observer)
  const animatedElements = document.querySelectorAll(".animate-on-scroll");
  if ("IntersectionObserver" in window) {
    const scrollObserver = new IntersectionObserver( // Changed variable name for clarity
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible"); // Reverted to is-visible for CSS compatibility
            // Optional: unobserve after animation to save resources
            // observer.unobserve(entry.target);
          } else {
            // Optional: remove class to re-animate if scrolling up past it
            // entry.target.classList.remove('is-visible');
          }
        });
      },
      { threshold: 0.1 }
    ); // Trigger when 10% of the element is visible

    animatedElements.forEach((el) => {
      scrollObserver.observe(el);
    });
  } else {
    // Fallback for older browsers (simply make them visible)
    animatedElements.forEach((el) => {
      el.classList.add("is-visible"); // Reverted to is-visible
    });
  }

  // Navbar shrink/style on scroll
  const navbar = document.querySelector(".navbar-custom");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // --- Fortune Kicker Card - Unique Button Actions ---
  const fallingEmojis = ["🤠", "👢", "💩", "💥", "💰", "🌵", "🐴", "🌟"]; // Add more as you like!

  const btnStomp = document.getElementById("btnStomp");
  const btnEcho = document.getElementById("btnEcho");
  const btnCompass = document.getElementById("btnCompass");

  // Action for "See What We Stepped In" - Falling Emojis
  if (btnStomp) {
    btnStomp.addEventListener("click", function() {
        const numberOfItems = Math.floor(Math.random() * 5) + 3; // Create 3 to 7 items

        for (let i = 0; i < numberOfItems; i++) {
            const item = document.createElement("span");
            item.classList.add("falling-item");
            const randomEmoji = fallingEmojis[Math.floor(Math.random() * fallingEmojis.length)];
            item.innerHTML = randomEmoji;
            const randomX = Math.random() * (window.innerWidth - 60) + 30;
            item.style.left = `${randomX}px`;
            const randomDelay = Math.random() * 0.5;
            item.style.animationDelay = `${randomDelay}s`;
            document.body.appendChild(item);
            setTimeout(() => {
                if (item.parentNode) {
                    item.parentNode.removeChild(item);
                }
            }, 3000 + (randomDelay * 1000) + 100);
        }
    });
  }

  // Action for "Hear the Echo" - Play Sound
  if (btnEcho) {
    btnEcho.addEventListener("click", function() {
        // IMPORTANT: You need to have a sound file (e.g., weird_echo.mp3)
        // in a suitable path (e.g., 'media/sounds/weird_echo.mp3')
        const soundPath = "media/audio/laughing_sound.wav"; // <<< REPLACE THIS
        
        // Check if a sound is already playing to prevent overlap, or manage it differently
        if (typeof this.audioPlayer === 'undefined' || this.audioPlayer.paused) {
            this.audioPlayer = new Audio(soundPath);
            this.audioPlayer.play().catch(error => {
                console.warn("Could not play sound. User interaction might be needed or file path is incorrect.", error);
                // You could alert the user or log this more visibly if needed.
                // For example, if the path is wrong, it will fail.
                // Browsers also have autoplay policies that might block sound without prior user interaction on the page.
            });
        } else {
            // Optionally, stop and replay, or just ignore if already playing
            // this.audioPlayer.currentTime = 0;
            // this.audioPlayer.play();
            console.log("Sound is already playing.");
        }
    });
  }

  // Action for "Check the Compass" - Show Compass
  if (btnCompass) {
    btnCompass.addEventListener("click", function() {
        let compass = document.getElementById("dynamicCompass");
        if (!compass) {
            compass = document.createElement("div");
            compass.id = "dynamicCompass";
            compass.classList.add("compass-popup");

            const needle = document.createElement("div");
            needle.classList.add("compass-needle");
            
            const northMarker = document.createElement("span");
            northMarker.classList.add("north-marker");
            northMarker.textContent = "N";

            const southMarker = document.createElement("span");
            southMarker.classList.add("south-marker");
            southMarker.textContent = "S";

            const eastMarker = document.createElement("span");
            eastMarker.classList.add("east-marker");
            eastMarker.textContent = "E";

            const westMarker = document.createElement("span");
            westMarker.classList.add("west-marker");
            westMarker.textContent = "W";

            compass.appendChild(northMarker);
            compass.appendChild(southMarker);
            compass.appendChild(eastMarker);
            compass.appendChild(westMarker);
            compass.appendChild(needle);
            document.body.appendChild(compass);
        }

        // Show compass
        // Random rotation for the needle for fun, or set to 0 for North
        const randomRotation = Math.floor(Math.random() * 360);
        const needleElement = compass.querySelector(".compass-needle");
        if (needleElement) {
            needleElement.style.transform = `rotate(${randomRotation}deg)`;
        }
        
        // Needs a slight delay to allow CSS transition to work from opacity 0
        setTimeout(() => {
            compass.classList.add("visible");
        }, 10); 

        // Hide compass after a few seconds
        setTimeout(() => {
            compass.classList.remove("visible");
            // Optionally remove from DOM if you don't want to reuse:
            // if (compass.parentNode) compass.parentNode.removeChild(compass);
        }, 3000); // Visible for 3 seconds
    });
  }
  // The copyToClipboard function is called directly from the HTML's onclick attribute,
  // so no specific event listener setup for a button with ID "copyContractBtn" is needed here
  // unless you change the HTML structure.
});

function copyToClipboard(text, buttonElement) {
  if (!navigator.clipboard) {
    // Fallback for older browsers or insecure contexts (e.g., http)
    try {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      // Prevent visual disruption
      textArea.style.position = "fixed";
      textArea.style.top = "-9999px";
      textArea.style.left = "-9999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);

      console.log("Fallback: Copying to clipboard was successful!");
      if (buttonElement) {
        const originalText = buttonElement.innerHTML;
        const originalDisabled = buttonElement.disabled;
        buttonElement.innerHTML = '<i class="fas fa-check"></i> Copied!';
        buttonElement.disabled = true;
        setTimeout(function () {
          buttonElement.innerHTML = originalText;
          buttonElement.disabled = originalDisabled;
        }, 2000);
      }
    } catch (err) {
      console.error("Fallback: Oops, unable to copy", err);
      if (buttonElement) {
        alert("Failed to copy. Please copy manually:\n" + text);
      } else {
        alert("Failed to copy. Please copy manually.");
      }
    }
    return;
  }

  navigator.clipboard.writeText(text).then(
    function () {
      console.log("Async: Copying to clipboard was successful!");
      if (buttonElement) {
        const originalText = buttonElement.innerHTML;
        const originalDisabled = buttonElement.disabled;
        buttonElement.innerHTML = '<i class="fas fa-check"></i> Copied!';
        buttonElement.disabled = true;
        setTimeout(function () {
          buttonElement.innerHTML = originalText;
          buttonElement.disabled = originalDisabled;
        }, 2000);
      }
    },
    function (err) {
      console.error("Async: Could not copy text: ", err);
      if (buttonElement) {
        alert("Failed to copy. Please copy manually:\n" + text);
      } else {
        alert("Failed to copy. Please copy manually.");
      }
    }
  );
}
