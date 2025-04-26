document.addEventListener("DOMContentLoaded", () => {
  // Set active link in navbar
  function setActive(link) {
    const links = document.querySelectorAll("nav ul li a");
    links.forEach((el) => el.classList.remove("selected"));
    link.classList.add("selected");
  }

  // Add click event listeners to all navbar links
  const navLinks = document.querySelectorAll("nav ul li a");
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault(); // Prevent default link behavior
      const target = link.getAttribute("href"); // Get the target section ID
      window.location.hash = target; // Update the URL hash
      setActive(link); // Set the clicked link as active
    });
  });

  // Set initial active link based on URL hash
  function setInitialActiveLink() {
    const hash = window.location.hash;
    const link = document.querySelector(`nav ul li a[href="${hash}"]`);
    if (link) {
      setActive(link);
    }
  }

  // Call the function to set the initial active link
  setInitialActiveLink();

  // Typing Animation
  const words = ["good", "awesome", "great"];
  let currentIndex = 0;
  const typingText = document.getElementById("typing-text");

  function typeText(word, callback) {
    let charIndex = 0;
    const typingInterval = setInterval(() => {
      if (charIndex < word.length) {
        typingText.textContent += word[charIndex];
        charIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => deleteText(callback), 1000); // Wait 1 second before deleting
      }
    }, 100); // Typing speed (100ms per character)
  }

  function deleteText(callback) {
    const text = typingText.textContent;
    let charIndex = text.length;
    const deletingInterval = setInterval(() => {
      if (charIndex > 0) {
        typingText.textContent = text.substring(0, charIndex - 1);
        charIndex--;
      } else {
        clearInterval(deletingInterval);
        callback(); // Move to the next word
      }
    }, 50); // Deleting speed (50ms per character)
  }

  function startTypingAnimation() {
    typeText(words[currentIndex], () => {
      currentIndex = (currentIndex + 1) % words.length; // Move to the next word
      startTypingAnimation(); // Repeat the animation
    });
  }

  // Start the typing animation
  if (typingText) {
    startTypingAnimation();
  }
});
