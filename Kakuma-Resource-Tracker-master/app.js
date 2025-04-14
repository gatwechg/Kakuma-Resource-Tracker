//thi section demonstrate how to grap DOM Elements for manipulation//
const form = document.getElementById("resource-form");
const resourceList = document.getElementById("resource-list");
const counter=document.getElementById("counter");
const searchInput = document.querySelector(".search-input");
const filterButton = document.querySelectorAll(".filter-btn");
// this section demonstrates how to handle state management in javaScript//
let resources =JSON.parse(localStorage.getItem("resources"));
let currentFilter = "All";
let searchTerm = "";
// thissection demonstrates how we should initialize our javaScript application//
function init() {
  if (!resources) {
    resources = [];
  }
  renderResources(resources);
  bindEvent();
  updateCounter();
}

//in this section we demonstrate how to bind events in Js//
function bindEvent() {
  form.addEventListener("submit", handleformSubmit);
  searchInput.addEventListener("input", handleSearch);
  resourceList.addEventListener("click", handleResourceClick);
  filterButton.forEach((btn) => {
    btn.addEventListener("click", handleFilter);
  });
}
//this section demonstrates how to handle in Js//
function handleformSubmit(event) {
    event.preventDefault();
    const formData = new FormData(form);
    const resource = {
        id: Date.now().toString,
        dateAdded: new Date().toLocaleDateString(),
        name: formData.get("resourceName"),
        type: formData.get("resourceType"),
        quantity: formData.get("quantity"),
        location: formData.get("resourceLocation"),
    };
    if(validatefor(resource)){
        addResource(resource);
        form.rest()
        clearError();
    }
}
// implementation form validation in Js//
function validatefor(resource) {
    let isValid = true;
    if(!resource.type) {
        showError('typeErro', 'resources',"Please enter a resource location is require.");
        isValid = false;
    }
    return isValid;
}
function showError(ElementId, message) {
    const errorElement = document.getElementById(ElementId);
    errorElement.textContent = message;
}
function clearError() {
    document.querySelectorAll(".error-message").forEach((el) => {
        el.textContent = "";
    });
}
// adding handle implementation in Js//