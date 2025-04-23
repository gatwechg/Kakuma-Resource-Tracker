// This file contains the JavaScript code for the Kakuma Resource Tracker application.
// It handles the functionality for adding resources, filtering the resource list, and managing user interactions.

document.addEventListener('DOMContentLoaded', () => {
    const resourceForm = document.getElementById('resourceForm');
    const resourcesList = document.getElementById('resourcesList');
    const counter = document.getElementById('counter');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchInput = document.querySelector('.search-input');

    let resources = [];

    resourceForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const resourceName = document.getElementById('resourceName').value;
        const resourceType = document.getElementById('resourceType').value;
        const resourceLocation = document.getElementById('resourceLocation').value;

        if (resourceName && resourceType && resourceLocation) {
            const resource = {
                name: resourceName,
                type: resourceType,
                location: resourceLocation
            };
            resources.push(resource);
            updateResourcesList();
            resourceForm.reset();
        } else {
            // Handle error messages
            if (!resourceName) document.getElementById('nameError').textContent = 'Resource name is required.';
            if (!resourceType) document.getElementById('typeError').textContent = 'Resource type is required.';
            if (!resourceLocation) document.getElementById('locationError').textContent = 'Location is required.';
        }
    });

    function updateResourcesList(filter = 'all', search = '') {
        resourcesList.innerHTML = '';
        const filteredResources = resources.filter(resource => {
            const matchesFilter = filter === 'all' || resource.type === filter;
            const matchesSearch = resource.name.toLowerCase().includes(search.toLowerCase());
            return matchesFilter && matchesSearch;
        });

        filteredResources.forEach(resource => {
            const resourceItem = document.createElement('div');
            resourceItem.className = 'resource-item';
            resourceItem.innerHTML = `<strong>${resource.name}</strong> (${resource.type}) - ${resource.location}`;
            resourcesList.appendChild(resourceItem);
        });

        counter.textContent = resources.length;
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const filter = button.getAttribute('data-filter');
            updateResourcesList(filter, searchInput.value);
        });
    });

    searchInput.addEventListener('input', () => {
        const search = searchInput.value;
        const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
        updateResourcesList(activeFilter, search);
    });
});