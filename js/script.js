let headerIcon = document.getElementById("header-icon"),
  headerNav = document.getElementById("header-nav");

headerIcon.addEventListener("click", showNav);

function showNav() {
  headerNav.classList.toggle("active");
}

let insurance = document.getElementById("insurance");

insurance.addEventListener("change", changeInsurance);
let insuranceType = "";
function changeInsurance() {
  insuranceType = this.options[this.selectedIndex].text;

  if (this.value == "one" || this.value == "four") {
    document.getElementById("one").style.display = "flex";
  } else {
    document.getElementById("one").style.display = "none";
  }
  if (this.value == "two") {
    document.getElementById("two").style.display = "flex";
  } else {
    document.getElementById("two").style.display = "none";
  }
  if (this.value == "three") {
    document.getElementById("three").style.display = "flex";
  } else {
    document.getElementById("three").style.display = "none";
  }
  if (this.value == "five") {
    document.getElementById("four").style.display = "flex";
    document.getElementById("five").style.display = "flex";
  } else {
    document.getElementById("four").style.display = "none";
    document.getElementById("five").style.display = "none";
  }
  e.target.value = done ? insuranceType : "";
}
let done = false;
let sendData = document.getElementById("send"),
  nameInput = document.getElementById("name");

let nameValue = "";
nameInput.addEventListener("change", (e) => {
  nameValue = e.target.value;
});

let phone = "";
document.getElementById("phone").addEventListener("change", (e) => {
  phone = e.target.value;
});

let email = "";
document.getElementById("email").addEventListener("change", (e) => {
  email = e.target.value;
});

let address = "";
document.getElementById("address").addEventListener("change", (e) => {
  address = e.target.value;
});
let jobTitle = "";
document.getElementById("jobTitle").addEventListener("change", (e) => {
  jobTitle = e.target.value;
});

let numberOfEmployees = "";
document.getElementById("numberOfEmployees").addEventListener("change", (e) => {
  numberOfEmployees = e.target.value;
});

let numberOfVehicles = "";
document.getElementById("numberOfVehicles").addEventListener("change", (e) => {
  numberOfVehicles = e.target.value;
});

let propertyValue = "";
document.getElementById("propertyValue").addEventListener("change", (e) => {
  propertyValue = e.target.value;
});

let projectValue = "";
document.getElementById("projectValue").addEventListener("change", (e) => {
  projectValue = e.target.value;
});

let projectType = "";
document.getElementById("projectType").addEventListener("change", (e) => {
  projectType = e.target.value;
});
const api = "/server/server.php/api/contact";

function earthData() {
  document.getElementById("projectType").value = "";
  document.getElementById("projectValue").value = "";
  document.getElementById("propertyValue").value = "";
  document.getElementById("numberOfVehicles").value = "";
  document.getElementById("numberOfEmployees").value = "";
  document.getElementById("jobTitle").value = "";
  document.getElementById("address").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("name").value = "";
}
sendData.onclick = async () => {
  if (
    nameValue.length == 0 ||
    phone.length == 0 ||
    email.length == 0 ||
    address.length == 0 ||
    jobTitle.length == 0 ||
    insuranceType.length == 0
  ) {
    let faild = document.getElementById("faild");
    faild.classList.add("show");

    setTimeout(function () {
      faild.classList.remove("show");
    }, 3000);
  } else {
    let data = {
      name: nameValue,
      phone,
      email,
      address,
      job_title: jobTitle,
      insurance_type: insuranceType,
      employee_count: numberOfEmployees,
      vehicles_count: numberOfVehicles,
      assets_value: propertyValue,
      project_value: projectValue,
      project_type: projectType,
    };
    const rawResponse = await fetch(api, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const content = await rawResponse.json();
    let success = document.getElementById("success");
    success.classList.add("show");
    earthData();
    data = {};
    setTimeout(function () {
      success.classList.remove("show");
      window.location.reload();
    }, 3000);
  }
};
