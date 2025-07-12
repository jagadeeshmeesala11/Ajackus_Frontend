const cancelBtn = document.getElementById('delete');
const addBtn = document.getElementById('add');

const firstNameInput = document.getElementById('firstName');
const lastNameInput = document.getElementById('lastName');
const emailInput = document.getElementById('email');
const departmentSelect = document.getElementById('department');
const roleSelect = document.getElementById('role');

const editData = JSON.parse(localStorage.getItem('editEmployeeData'));

if (editData) {
  firstNameInput.value = editData.firstName;
  lastNameInput.value = editData.lastName;
  emailInput.value = editData.email;
  departmentSelect.value = editData.department;
  roleSelect.value = editData.role;
}

cancelBtn.addEventListener('click', () => {
  window.location.href = 'DashBoard.html';
});

addBtn.addEventListener('click', (e) => {
  e.preventDefault();

  const employee = {
    id: editData ? editData.id : Date.now(),
    firstName: firstNameInput.value.trim(),
    lastName: lastNameInput.value.trim(),
    email: emailInput.value.trim(),
    department: departmentSelect.value,
    role: roleSelect.value
  };

  let employees = JSON.parse(localStorage.getItem('employees')) || [];

  if (editData) {
    employees = employees.map(emp => emp.id === editData.id ? employee : emp);
    localStorage.removeItem('editEmployeeData');
  } else {
    employees.push(employee);
  }

  localStorage.setItem('employees', JSON.stringify(employees));

  firstNameInput.value = '';
  lastNameInput.value = '';
  emailInput.value = '';
  departmentSelect.value = '';
  roleSelect.value = '';

  window.location.href = 'DashBoard.html';
});
