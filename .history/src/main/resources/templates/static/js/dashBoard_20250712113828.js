import { mockEmployees } from './data.js';

const viewContainer = document.getElementById('dashboardView');
const searchInput = document.getElementById('search');
const filterBtn = document.getElementById('filter-btn');
const filterComponent = document.getElementById('filter-container');
const footerContainer = document.getElementById('footer');
const addFrame = document.getElementById('addFormView');
const nav = document.getElementById('nav');

const firstNameInput = document.getElementById('firstName');
const departmentInput = document.getElementById('Department');
const roleInput = document.getElementById('role');
const applyBtn = document.getElementById('apply-btn');
const resetBtn = document.getElementById('reset-btn');

const sortComponent = document.getElementById('sort');
const showComponent = document.getElementById('show');

sortComponent.addEventListener('change', () => {
  const selectedOption = sortComponent.value;
  currentEmployees.sort((a, b) => {
    if (selectedOption === 'name') {
      return a.firstName.toLowerCase().localeCompare(b.firstName.toLowerCase());
    } else if (selectedOption === 'email') {
      return a.email.toLowerCase().localeCompare(b.email);
    } else if (selectedOption === 'department') {
      return a.department.localeCompare(b.department);
    } else if (selectedOption === 'role') {
      return a.role.localeCompare(b.role);
    }
  });
  renderDashboard(currentEmployees);
})

showComponent.addEventListener('change', () => {
  const selectedOption = showComponent.value;
  const filteredEmployees = currentEmployees.slice(0, selectedOption);
  renderDashboard(filteredEmployees);
})

applyBtn.addEventListener('click', () => {
  const filteredEmployees = currentEmployees.filter(employee => employee.firstName === firstNameInput.value && employee.department === departmentInput.value && employee.role === roleInput.value);
  renderDashboard(filteredEmployees);
});

resetBtn.addEventListener('click', () => {
  firstNameInput.value = '';
  departmentInput.value = '';
  roleInput.value = '';
  renderDashboard(currentEmployees);
})


filterBtn.addEventListener('click',() => {
  console.log('clicked');
  filterComponent.classList.toggle('width-100');
  viewContainer.classList.toggle('width-100');
  footerContainer.classList.toggle('width-100');
  addFrame.classList.toggle('width-100');
  nav.classList.toggle('width-100');
  filterComponent.classList.toggle('hide');

})


searchInput.addEventListener('input', () => {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredEmployees = currentEmployees.filter(employee => employee.firstName.toLowerCase().includes(searchTerm) || employee.email.toLowerCase().includes(searchTerm));
  renderDashboard(filteredEmployees);
});

function deleteEmployee(id) {
  currentEmployees = currentEmployees.filter(employee => employee.id !== id);
  localStorage.setItem('employees', JSON.stringify(currentEmployees));
  renderDashboard(currentEmployees);
}


function editEmployee(id) {
  console.log("Editing employee ID:", id);
  const userData = currentEmployees.find(employee => employee.id === id);
  
  localStorage.setItem('editEmployeeData', JSON.stringify(userData));
  window.location.href = "AddEmploye.html";
}



if (!localStorage.getItem('employees')) {
  localStorage.setItem('employees', JSON.stringify(mockEmployees));
}

let currentEmployees = JSON.parse(localStorage.getItem('employees'));

window.deleteEmployee = deleteEmployee;
window.editEmployee = editEmployee;

function renderDashboard(employees) {
  const employeeCards = employees.map(employee => `
    <div class="employee-card" data-id="${employee.id}">
      <h3>${employee.firstName} ${employee.lastName}</h3>
      <p><strong>Email:</strong> ${employee.email}</p>
      <p><strong>Department:</strong> ${employee.department}</p>
      <p><strong>Role:</strong> ${employee.role}</p>
      <div class="card-button-container">
        <button id="edit-btn" data-id="${employee.id}" onclick="editEmployee(${employee.id})">Edit</button>
        <button id="delete-btn" data-id="${employee.id}" onclick="deleteEmployee(${employee.id})">Delete</button>
      </div>
    </div>
  `).join('');

  viewContainer.innerHTML = employeeCards;
}

renderDashboard(currentEmployees);


