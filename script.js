const vehicles = [
  {
    id: 1,
    make: 'Toyota',
    model: 'Harrier',
    year: 2021,
    price: 4500000,
    mileage: 45000,
    fuel: 'Petrol',
    transmission: 'Automatic',
    category: 'SUV',
    body: 'SUV',
    colour: 'Silver',
    location: 'Nairobi',
    status: 'Available',
    description: 'A well-maintained 2021 Toyota Harrier with a comfortable cabin, reverse camera, alloy wheels, and modern safety features for daily driving and family trips.',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 2,
    make: 'Mazda',
    model: 'CX-5',
    year: 2020,
    price: 3200000,
    mileage: 56000,
    fuel: 'Petrol',
    transmission: 'Automatic',
    category: 'SUV',
    body: 'SUV',
    colour: 'White',
    location: 'Mombasa',
    status: 'Available',
    description: 'This Mazda CX-5 offers refined driving, excellent fuel efficiency, and a premium feel with full safety features and a smooth automatic transmission.',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 3,
    make: 'Toyota',
    model: 'Prado',
    year: 2022,
    price: 8500000,
    mileage: 31000,
    fuel: 'Diesel',
    transmission: 'Automatic',
    category: 'SUV',
    body: 'SUV',
    colour: 'Black',
    location: 'Nakuru',
    status: 'Available',
    description: 'The Toyota Prado combines rugged capability with a luxurious cabin, making it ideal for adventure and family travel with powerful diesel performance.',
    image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 4,
    make: 'Mercedes-Benz',
    model: 'C-Class',
    year: 2023,
    price: 9800000,
    mileage: 20000,
    fuel: 'Petrol',
    transmission: 'Automatic',
    category: 'Sedan',
    body: 'Sedan',
    colour: 'Blue',
    location: 'Nairobi',
    status: 'Reserved',
    description: 'A modern executive sedan with premium styling, leather interior, adaptive cruise control, and a silent ride designed for comfort and prestige.',
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 5,
    make: 'BMW',
    model: 'X5',
    year: 2024,
    price: 10800000,
    mileage: 12000,
    fuel: 'Hybrid',
    transmission: 'Automatic',
    category: 'SUV',
    body: 'SUV',
    colour: 'Grey',
    location: 'Kisumu',
    status: 'Available',
    description: 'The BMW X5 delivers performance, luxury, and commanding presence with a hybrid powertrain, polished interior, and advanced safety systems.',
    image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 6,
    make: 'Honda',
    model: 'Civic',
    year: 2021,
    price: 2600000,
    mileage: 78000,
    fuel: 'Petrol',
    transmission: 'Manual',
    category: 'Sedan',
    body: 'Sedan',
    colour: 'Red',
    location: 'Nakuru',
    status: 'Sold',
    description: 'This Honda Civic is efficient, reliable, and affordable, making it a perfect option for city driving and everyday commuting.',
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&q=80'
  }
];

const featuredGrid = document.getElementById('featuredGrid');
const inventoryGrid = document.getElementById('inventoryGrid');
const heroSearch = document.getElementById('heroSearch');
const modal = document.getElementById('vehicleModal');
const closeModalBtn = document.getElementById('closeModal');

function formatPrice(value) {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    maximumFractionDigits: 0
  }).format(value);
}

function toStatusClass(status) {
  return status.toLowerCase().replace(/\s+/g, '-');
}

function renderFeatured() {
  featuredGrid.innerHTML = vehicles.slice(0, 3).map(vehicle => `
    <article class="car-card">
      <img src="${vehicle.image}" alt="${vehicle.make} ${vehicle.model}" />
      <div class="car-body">
        <div class="car-meta">
          <span class="car-make">${vehicle.make}</span>
          <span class="car-status status-${toStatusClass(vehicle.status)}">${vehicle.status}</span>
        </div>
        <h3 class="car-title">${vehicle.make} ${vehicle.model}</h3>
        <div class="car-specs">
          <span>${vehicle.year}</span>
          <span>•</span>
          <span>${vehicle.transmission}</span>
          <span>•</span>
          <span>${vehicle.fuel}</span>
        </div>
        <div class="car-bottom">
          <div class="price">${formatPrice(vehicle.price)}</div>
          <button class="card-button" type="button" data-id="${vehicle.id}">View Details</button>
        </div>
      </div>
    </article>
  `).join('');
}

function getFilteredVehicles() {
  const make = document.getElementById('filterMake').value;
  const model = document.getElementById('filterModel').value;
  const category = document.getElementById('filterCategory').value;
  const fuel = document.getElementById('filterFuel').value;
  const transmission = document.getElementById('filterTransmission').value;
  const location = document.getElementById('filterLocation').value;

  return vehicles.filter(vehicle => {
    const matchesMake = !make || vehicle.make === make;
    const matchesModel = !model || vehicle.model === model;
    const matchesCategory = !category || vehicle.category === category;
    const matchesFuel = !fuel || vehicle.fuel === fuel;
    const matchesTransmission = !transmission || vehicle.transmission === transmission;
    const matchesLocation = !location || vehicle.location === location;
    return matchesMake && matchesModel && matchesCategory && matchesFuel && matchesTransmission && matchesLocation;
  });
}

function renderInventory() {
  const filtered = getFilteredVehicles();
  inventoryGrid.innerHTML = filtered.map(vehicle => `
    <article class="car-card">
      <img src="${vehicle.image}" alt="${vehicle.make} ${vehicle.model}" />
      <div class="car-body">
        <div class="car-meta">
          <span class="car-make">${vehicle.make}</span>
          <span class="car-status status-${toStatusClass(vehicle.status)}">${vehicle.status}</span>
        </div>
        <h3 class="car-title">${vehicle.model}</h3>
        <div class="car-specs">
          <span>${vehicle.year}</span>
          <span>•</span>
          <span>${vehicle.transmission}</span>
          <span>•</span>
          <span>${vehicle.fuel}</span>
        </div>
        <div class="muted-text">${vehicle.mileage.toLocaleString()} km</div>
        <div class="car-bottom" style="margin-top: 14px;">
          <div class="price">${formatPrice(vehicle.price)}</div>
          <button class="card-button" type="button" data-id="${vehicle.id}">View Details</button>
        </div>
      </div>
    </article>
  `).join('');

  if (!filtered.length) {
    inventoryGrid.innerHTML = '<div style="grid-column: 1 / -1; padding: 28px; background: #f7f9fb; border: 1px solid var(--border); border-radius: 16px; text-align: center;">No vehicles match your current filters.</div>';
  }
}

function openVehicleModal(id) {
  const vehicle = vehicles.find(item => item.id === Number(id));
  if (!vehicle) return;

  document.getElementById('modalTitle').textContent = `${vehicle.make} ${vehicle.model}`;
  document.getElementById('modalName').textContent = `${vehicle.make} ${vehicle.model}`;
  document.getElementById('modalMake').textContent = vehicle.make;
  document.getElementById('modalStatus').textContent = vehicle.status;
  document.getElementById('modalStatus').className = `car-status status-${toStatusClass(vehicle.status)}`;
  document.getElementById('modalPrice').textContent = formatPrice(vehicle.price);
  document.getElementById('modalDescription').textContent = vehicle.description;
  document.getElementById('modalImage').src = vehicle.image;
  document.getElementById('modalImage').alt = `${vehicle.make} ${vehicle.model}`;

  document.getElementById('metaYear').textContent = vehicle.year;
  document.getElementById('metaMileage').textContent = `${vehicle.mileage.toLocaleString()} km`;
  document.getElementById('metaFuel').textContent = vehicle.fuel;
  document.getElementById('metaTransmission').textContent = vehicle.transmission;
  document.getElementById('metaBody').textContent = vehicle.body;
  document.getElementById('metaColor').textContent = vehicle.colour;

  modal.classList.add('active');
}

function closeModal() {
  modal.classList.remove('active');
}

document.addEventListener('click', function (event) {
  const detailButton = event.target.closest('[data-id]');
  if (detailButton) {
    openVehicleModal(detailButton.dataset.id);
  }
});

closeModalBtn.addEventListener('click', closeModal);
modal.addEventListener('click', function (event) {
  if (event.target === modal) closeModal();
});

heroSearch.addEventListener('submit', function (event) {
  event.preventDefault();
  const make = document.getElementById('makeFilter').value;
  const model = document.getElementById('modelFilter').value;
  const minPrice = Number(document.getElementById('minPrice').value || 0);
  const maxPrice = Number(document.getElementById('maxPrice').value || Number.MAX_SAFE_INTEGER);
  const year = Number(document.getElementById('yearFilter').value || 0);
  const transmission = document.getElementById('transmissionFilter').value;

  document.getElementById('filterMake').value = make;
  document.getElementById('filterModel').value = model;
  document.getElementById('filterTransmission').value = transmission;

  const results = vehicles.filter(vehicle => {
    const matchMake = !make || vehicle.make === make;
    const matchModel = !model || vehicle.model === model;
    const matchPrice = vehicle.price >= minPrice && vehicle.price <= maxPrice;
    const matchYear = !year || vehicle.year >= year;
    const matchTransmission = !transmission || vehicle.transmission === transmission;
    return matchMake && matchModel && matchPrice && matchYear && matchTransmission;
  });

  const grid = document.getElementById('inventoryGrid');
  grid.innerHTML = results.length ? results.map(vehicle => `
    <article class="car-card">
      <img src="${vehicle.image}" alt="${vehicle.make} ${vehicle.model}" />
      <div class="car-body">
        <div class="car-meta">
          <span class="car-make">${vehicle.make}</span>
          <span class="car-status status-${toStatusClass(vehicle.status)}">${vehicle.status}</span>
        </div>
        <h3 class="car-title">${vehicle.model}</h3>
        <div class="car-specs">
          <span>${vehicle.year}</span>
          <span>•</span>
          <span>${vehicle.transmission}</span>
          <span>•</span>
          <span>${vehicle.fuel}</span>
        </div>
        <div class="muted-text">${vehicle.mileage.toLocaleString()} km</div>
        <div class="car-bottom" style="margin-top: 14px;">
          <div class="price">${formatPrice(vehicle.price)}</div>
          <button class="card-button" type="button" data-id="${vehicle.id}">View Details</button>
        </div>
      </div>
    </article>
  `).join('') : '<div style="grid-column: 1 / -1; padding: 28px; background: #f7f9fb; border: 1px solid var(--border); border-radius: 16px; text-align: center;">No vehicles match your search filters.</div>';

  document.getElementById('inventory').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

['filterMake', 'filterModel', 'filterCategory', 'filterFuel', 'filterTransmission', 'filterLocation'].forEach(id => {
  document.getElementById(id).addEventListener('change', renderInventory);
});

document.getElementById('contactForm').addEventListener('submit', function (event) {
  event.preventDefault();
  const name = document.getElementById('fullName').value;
  alert(`Thank you, ${name}. Your inquiry has been submitted and our sales team will contact you shortly.`);
  event.target.reset();
});

document.getElementById('vehicleAdminForm').addEventListener('submit', function (event) {
  event.preventDefault();
  alert('Vehicle published successfully and will appear on the public website.');
  event.target.reset();
});

document.getElementById('calculateFinance').addEventListener('click', function () {
  const price = Number(document.getElementById('vehiclePrice').value || 0);
  const deposit = Number(document.getElementById('depositAmount').value || 0);
  const months = Number(document.getElementById('loanMonths').value || 48);
  const rate = Number(document.getElementById('interestRate').value || 0);
  const loanAmount = Math.max(price - deposit, 0);
  const monthlyRate = (rate / 100) / 12;
  const payment = monthlyRate > 0
    ? (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months))
    : loanAmount / months;

  document.getElementById('financeResult').innerHTML = `
    <strong>Loan Amount:</strong> ${formatPrice(loanAmount)}<br />
    <strong>Estimated monthly repayment:</strong> ${formatPrice(payment)}
  `;
});

document.getElementById('resetFilters').addEventListener('click', function () {
  ['filterMake', 'filterModel', 'filterCategory', 'filterFuel', 'filterTransmission', 'filterLocation'].forEach(id => {
    document.getElementById(id).value = '';
  });
  renderInventory();
});

renderFeatured();
renderInventory();
