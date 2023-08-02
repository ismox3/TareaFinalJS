document.getElementById('carForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission

  // Get input values
  var carName = document.getElementById('carName').value;
  var lastMaintenanceDate = document.getElementById('lastMaintenanceDate').value;
  var maintenanceInterval = parseInt(document.getElementById('maintenanceInterval').value);

  // Create car object
  var car = {
    name: carName,
    lastMaintenanceDate: lastMaintenanceDate,
    maintenanceInterval: maintenanceInterval
  };

  // Get existing car list from localStorage or initialize an empty array
  var carList = JSON.parse(localStorage.getItem('carList')) || [];

  // Add new car to the list
  carList.push(car);

  // Save updated car list to localStorage
  localStorage.setItem('carList', JSON.stringify(carList));

  // Clear the form inputs
  document.getElementById('carForm').reset();

  // Update the car list display
  updateCarList();
});

function updateCarList() {
  var carList = JSON.parse(localStorage.getItem('carList'));

  // Clear previous car list
  document.getElementById('carList').innerHTML = '';

  if (carList && carList.length > 0) {
    carList.forEach(function(car, index) {
      // Calculate next maintenance date
      var lastMaintenanceDate = new Date(car.lastMaintenanceDate);
      var nextMaintenanceDate = new Date(lastMaintenanceDate.getTime() + car.maintenanceInterval * 24 * 60 * 60 * 1000);
      var daysRemaining = Math.floor((nextMaintenanceDate - Date.now()) / (24 * 60 * 60 * 1000));

      // Create car list item
      var carItem = document.createElement('div');
      carItem.innerHTML = '<div class="child" style="width: 100%"><strong>' + car.name + '</strong> - Ultimo mantenimiento: ' + car.lastMaintenanceDate + ' - Siguiente mantenimiento en ' + daysRemaining + ' dias </div>';
      document.getElementById('carList').appendChild(carItem);
    });
  }
}

// Initial update of car list on page load
updateCarList();
