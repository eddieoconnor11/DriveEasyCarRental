// IMAGE SLIDER ON HOME PAGE
const sliderImage = document.getElementById("sliderImage");

if (sliderImage) {
  const sliderImages = [
    "images/sedan.jpg",
    "images/suv.jpg",
    "images/luxury.jpg"
  ];

  let currentImage = 0;

  setInterval(() => {
    currentImage = (currentImage + 1) % sliderImages.length;
    sliderImage.src = sliderImages[currentImage];
  }, 3000);
}

// WEATHER API USING OPEN-METEO (NO API KEY NEEDED)
const weatherBox = document.getElementById("weatherBox");

if (weatherBox) {
  const url = "https://api.open-meteo.com/v1/forecast?latitude=53.3498&longitude=-6.2603&current=temperature_2m,wind_speed_10m,weather_code";

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const temp = data.current.temperature_2m;
      const wind = data.current.wind_speed_10m;
      const code = data.current.weather_code;

      let condition = "Clear";
      if (code >= 1 && code <= 3) condition = "Partly cloudy";
      if (code >= 45 && code <= 48) condition = "Foggy";
      if (code >= 51 && code <= 67) condition = "Rainy";
      if (code >= 71 && code <= 77) condition = "Snow";
      if (code >= 80 && code <= 99) condition = "Storm / showers";

      weatherBox.innerHTML = `
        <h3>Dublin Driving Weather</h3>
        <p><strong>Temperature:</strong> ${temp}°C</p>
        <p><strong>Wind Speed:</strong> ${wind} km/h</p>
        <p><strong>Condition:</strong> ${condition}</p>
        <p class="small-text">Live weather helps customers plan safer and more comfortable trips.</p>
      `;
    })
    .catch(() => {
      weatherBox.innerHTML = "<p>Weather information could not be loaded right now.</p>";
    });
}

// BOOKING FORM VALIDATION + PRICE CALCULATOR
const bookingForm = document.getElementById("bookingForm");

if (bookingForm) {
  bookingForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const pickupDate = document.getElementById("pickupDate").value;
    const returnDate = document.getElementById("returnDate").value;
    const carType = document.getElementById("carType").value;
    const license = document.getElementById("license").value.trim();
    const terms = document.getElementById("terms").checked;
    const formMessage = document.getElementById("formMessage");

    if (!fullName || !email || !phone || !pickupDate || !returnDate || !carType || !license || !terms) {
      formMessage.textContent = "Please complete all fields and accept the terms.";
      formMessage.style.color = "red";
      return;
    }

    if (new Date(returnDate) <= new Date(pickupDate)) {
      formMessage.textContent = "Return date must be after the pickup date.";
      formMessage.style.color = "red";
      return;
    }

    formMessage.textContent = "Booking submitted successfully!";
    formMessage.style.color = "green";
    bookingForm.reset();

    const totalPrice = document.getElementById("totalPrice");
    if (totalPrice) {
      totalPrice.textContent = "";
    }
  });
}

function calculatePrice() {
  const pickupDate = document.getElementById("pickupDate").value;
  const returnDate = document.getElementById("returnDate").value;
  const carType = document.getElementById("carType").value;
  const gps = document.getElementById("gps").checked;
  const seat = document.getElementById("seat").checked;
  const insurance = document.getElementById("insurance").checked;
  const totalPrice = document.getElementById("totalPrice");

  if (!pickupDate || !returnDate || !carType) {
    totalPrice.textContent = "Select dates and car type to calculate price.";
    totalPrice.style.color = "#222";
    return;
  }

  const pickup = new Date(pickupDate);
  const dropoff = new Date(returnDate);
  const days = Math.ceil((dropoff - pickup) / (1000 * 60 * 60 * 24));

  if (days <= 0) {
    totalPrice.textContent = "Please enter valid dates.";
    totalPrice.style.color = "red";
    return;
  }

  let dailyRate = 0;

  if (carType === "Economy") dailyRate = 45;
  if (carType === "SUV") dailyRate = 75;
  if (carType === "Luxury") dailyRate = 120;

  let extras = 0;
  if (gps) extras += 5 * days;
  if (seat) extras += 4 * days;
  if (insurance) extras += 15 * days;

  const total = dailyRate * days + extras;

  totalPrice.textContent = `Estimated total for ${days} day(s): €${total}`;
  totalPrice.style.color = "green";
}

// ACCORDION
const accordionButtons = document.querySelectorAll(".accordion-btn");

accordionButtons.forEach(button => {
  button.addEventListener("click", () => {
    const content = button.nextElementSibling;

    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
});

// FILTER CARS
const filterType = document.getElementById("filterType");
const filterPrice = document.getElementById("filterPrice");
const carCards = document.querySelectorAll(".car-card");

function filterCars() {
  if (!filterType || !filterPrice) return;

  const selectedType = filterType.value;
  const selectedPrice = filterPrice.value;

  carCards.forEach(card => {
    const type = card.dataset.type;
    const price = parseInt(card.dataset.price);

    let typeMatch = selectedType === "All" || type === selectedType;
    let priceMatch = true;

    if (selectedPrice === "under50") {
      priceMatch = price < 50;
    } else if (selectedPrice === "50to100") {
      priceMatch = price >= 50 && price <= 100;
    } else if (selectedPrice === "over100") {
      priceMatch = price > 100;
    }

    if (typeMatch && priceMatch) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

if (filterType) {
  filterType.addEventListener("change", filterCars);
}
if (filterPrice) {
  filterPrice.addEventListener("change", filterCars);
}

// CONTACT FORM
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("contactName").value.trim();
    const email = document.getElementById("contactEmail").value.trim();
    const message = document.getElementById("contactMessage").value.trim();
    const contactOutput = document.getElementById("contactOutput");

    if (!name || !email || !message) {
      contactOutput.textContent = "Please fill in all contact form fields.";
      contactOutput.style.color = "red";
      return;
    }

    contactOutput.textContent = "Thank you. Your message has been sent successfully.";
    contactOutput.style.color = "green";
    contactForm.reset();
  });
}