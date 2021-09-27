window.addEventListener('DOMContentLoaded', (event) => { 
    const name = document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    name.addEventListener('input', function() { 
       if(name.value.length == 0) {
           textError.textContent = "";
           return;
       }
       try {
           (new EmployeepayrollData()).name = name.value;;
           textError.textContent = "";
       } 
       catch(e) {
           textError.textContent = e;
       }
    });

    const salary = document.querySelector('#salary');
    const output = document.querySelector('.salary-output');
    output.textContent = salary.value;
    salary.addEventListener('input', function() { 
        output.textContent = salary.value;
    });
});

const save = () => {
    try {
        let employeepayrollData = createEmployeePayroll();
        createAndUpdateStorage(employeepayrollData);
    }
    catch(e) {
        return;
    }
}
function createAndUpdateStorage(employeepayrollData){
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrolllist"));

    if(employeePayrollList != undefined) {
        employeePayrollList.push(employeepayrollData);
    } else {
        employeePayrollList = [employeepayrollData];
    }
    alert(employeePayrollList.toString());
    localStorage.setItem("EmployeePayrolllist", JSON.stringify(employeePayrollList))
}

const createEmployeePayroll = () => {
    let employeepayrollData = new EmployeepayrollData();
    try {
        employeepayrollData.name = getInputValueById('#name');
    }
    catch(e) {
        setTextValue('.text-error', e);
        throw e;
    }
    employeepayrollData.profilePic = getSelectedValues('[name=profile]').pop();
    employeepayrollData.gender = getSelectedValues('[name=gender]').pop();
    employeepayrollData.department = getSelectedValues('[name=department]');
    employeepayrollData.salary = getInputValueById('[#salary]');
    employeepayrollData.note = getInputValueById('#notes');
    let date = getInputValueById('#day')+" "+getInputValueById('#month')+" "+ getInputValueById('#year');
    employeepayrollData.date = Date.parse(date);
    alert(employeepayrollData.toString());
    return employeepayrollData;
}

const getSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    let selItems = [];
    allItems.forEach(item => {
        if(item.checked) selItems.push(item.value);
    });
    return selItems;
}

const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}