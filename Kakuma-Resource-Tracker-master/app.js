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