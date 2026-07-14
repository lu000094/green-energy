// Greenwatt page interactions

const solutionButtons = document.querySelectorAll(".button-group .selector");
const contentCard = document.getElementById("dynamic-content");

const solutions = {
  solar: {
    title: "Rooftop solar with less upfront pressure",
    image: "./img/rooftop-solar.jpg",
    alt: "Solar panels on a house roof",
    text:
      "Rooftop solar is usually the first thing people think about when they hear “green energy,” but the full cost can still be a problem. A lease, payment plan, or power-purchase agreement can make it easier to start because the household does not always have to pay for the whole system at once. For people who can buy their own system, rebates, tax credits, and net-metering programs may help lower the long-term cost."
  },

  community: {
    title: "Community energy without owning panels",
    image: "./img/community-energy.jpg",
    alt: "Wind turbines in an open landscape",
    text:
      "Community energy can be useful for people who rent, live in apartments, or have roofs that are not a good fit for solar panels. Instead of installing equipment at home, customers subscribe to a shared solar or wind project and receive credits on their regular electricity bill. This can make clean energy more accessible without a large upfront cost."
  },

  efficiency: {
    title: "Efficiency first",
    image: "./img/heat-pump.jpg",
    alt: "Heat pump installed outside a home",
    text:
      "For many households, the cheapest energy is the energy they do not need to use. Better insulation, draft sealing, LED lighting, and efficient heating or cooling equipment can reduce monthly bills before adding any renewable energy system. These upgrades can also make a future solar system smaller and more affordable."
  }
};

function showSolution(name) {
  const item = solutions[name];

  if (!item || !contentCard) {
    return;
  }

  contentCard.innerHTML = `
    <h3>${item.title}</h3>
    <img src="${item.image}" alt="${item.alt}">
    <p>${item.text}</p>
  `;

  contentCard.style.animation = "none";
  contentCard.offsetHeight;
  contentCard.style.animation = "";
}

solutionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    solutionButtons.forEach((item) => {
      item.classList.remove("is-active");
    });

    button.classList.add("is-active");
    showSolution(button.value);
  });
});

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function runCounter(number) {
  const finalNumber = Number(number.textContent.replace(/[^\d]/g, ""));

  if (!finalNumber || reduceMotion) {
    number.textContent = finalNumber;
    return;
  }

  const duration = 1200;
  const startTime = performance.now();

  function updateCount(currentTime) {
    const progress = Math.min((currentTime - startTime) / duration, 1);
    const currentNumber = Math.round(finalNumber * progress);

    number.textContent = currentNumber;

    if (progress < 1) {
      requestAnimationFrame(updateCount);
    }
  }

  number.textContent = "0";
  requestAnimationFrame(updateCount);
}

const observerOptions = {
  threshold: 0.35
};

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      if (entry.target.classList.contains("count")) {
        runCounter(entry.target);
      } else {
        entry.target.classList.add("is-visible");
      }

      observer.unobserve(entry.target);
    });
  }, observerOptions);

  document.querySelectorAll(".count").forEach((number) => {
    observer.observe(number);
  });

  document.querySelectorAll(".reveal").forEach((section) => {
    observer.observe(section);
  });
} else {
  document.querySelectorAll(".reveal").forEach((section) => {
    section.classList.add("is-visible");
  });
}
