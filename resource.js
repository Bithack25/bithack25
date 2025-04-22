document.addEventListener('DOMContentLoaded', function() {
    // Resource data with all links from your screenshots
    const resources = [
        {
            title: "O*NET Online",
            description: "Comprehensive database of occupations with detailed information about skills, tasks, and work environments.",
            category: "exploration",
            subcategory: "",
            link: "https://www.onetonline.org/"
        },
        {
            title: "LinkedIn Learning Paths",
            description: "Curated courses to help you develop skills for specific career paths and industries.",
            category: "skills",
            subcategory: "",
            link: "https://www.linkedin.com/learning/"
        },
        {
            title: "Career One Stop",
            description: "Tools to help job seekers, students, and career changers explore careers and related training.",
            category: "planning",
            subcategory: "",
            link: "https://www.careeronestop.org/"
        },
        {
            title: "Coursera Career Certificates",
            description: "Professional certificates designed by industry leaders to prepare you for in-demand jobs.",
            category: "certification",
            subcategory: "",
            link: "https://www.coursera.org/professional-certificates"
        },
        {
            title: "Codecademy",
            description: "Interactive coding courses for tech careers in programming, data science, and web development.",
            category: "technical",
            subcategory: "",
            link: "https://www.codecademy.com/"
        },
        {
            title: "Khan Academy",
            description: "Free courses in math, science, computing, and more to build academic foundations.",
            category: "academic",
            subcategory: "",
            link: "https://www.khanacademy.org/"
        },
        {
            title: "Bureau of Labor Statistics",
            description: "Official data on employment projections, salary information, and job outlook by industry.",
            category: "research",
            subcategory: "",
            link: "https://www.bls.gov/"
        },
        {
            title: "Creative Career Center",
            description: "Resources and guidance for students pursuing careers in creative industries.",
            category: "exploration",
            subcategory: "creative",
            link: "https://www.creativecareers.com/"
        },
        {
            title: "Career Insights by Glassdoor",
            description: "Inside look at companies, salaries, and interview processes shared by employees.",
            category: "company",
            subcategory: "",
            link: "https://www.glassdoor.com/"
        },
        {
            title: "Mindtools Career Skills",
            description: "Articles and tools to develop essential workplace and career management skills.",
            category: "skills",
            subcategory: "soft",
            link: "https://www.mindtools.com/"
        },
        {
            title: "edX Career-Focused Programs",
            description: "University courses and programs designed to advance careers in various fields.",
            category: "academic",
            subcategory: "higher",
            link: "https://www.edx.org/"
        },
        {
            title: "YouTube Career Guides",
            description: "Video series exploring various career paths with insights from professionals.",
            category: "exploration",
            subcategory: "video",
            link: "https://www.youtube.com/"
        }
    ];

    // DOM Elements
    const resourcesGrid = document.getElementById('resourcesGrid');
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const tagsContainer = document.querySelector('.category-tags');
    const searchButton = document.getElementById('searchButton');

    // Function to display unique subcategory tags
    function displayTags() {
        const subcategories = [...new Set(resources.map(resource => resource.subcategory).filter(sub => sub))];
        subcategories.forEach(subcategory => {
            const tag = document.createElement('span');
            tag.className = 'tag';
            tag.textContent = subcategory.charAt(0).toUpperCase() + subcategory.slice(1) + ' Resources';
            tag.dataset.category = subcategory;
            tagsContainer.appendChild(tag);
        });

        // Add event listeners to the newly created tags
        const tags = document.querySelectorAll('.tag');
        tags.forEach(tag => {
            tag.addEventListener('click', function() {
                // Highlight selected tag
                tags.forEach(t => t.classList.remove('active'));
                this.classList.add('active');

                // Reset other filters
                searchInput.value = '';
                categoryFilter.value = 'all';

                // Filter by subcategory
                const subcategory = this.dataset.category;
                const filtered = resources.filter(resource =>
                    resource.subcategory === subcategory
                );
                displayResources(filtered);
            });
        });
    }

    // Display initial tags
    displayTags();

    // Display all resources initially
    displayResources(resources);

    // Search functionality (triggered by the button)
    searchButton.addEventListener('click', filterResources);

    // Filter resources based on search, category, and active tag
    function filterResources() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = categoryFilter.value;
        const activeTag = document.querySelector('.tag.active');
        let filtered = resources;

        // Filter by active tag first, if any
        if (activeTag) {
            const subcategory = activeTag.dataset.category;
            filtered = filtered.filter(resource => resource.subcategory === subcategory);
        }

        // Then filter by search term and category
        filtered = filtered.filter(resource => {
            const matchesSearch = resource.title.toLowerCase().includes(searchTerm) ||
                                 resource.description.toLowerCase().includes(searchTerm);
            const matchesCategory = selectedCategory === 'all' ||
                                     resource.category === selectedCategory ||
                                     resource.subcategory === selectedCategory;
            return matchesSearch && matchesCategory;
        });

        displayResources(filtered);
    }

    // Display resources in the grid
    function displayResources(resourcesToDisplay) {
        resourcesGrid.innerHTML = '';

        if (resourcesToDisplay.length === 0) {
            resourcesGrid.innerHTML = '<p class="no-results">No resources found matching your criteria.</p>';
            return;
        }

        resourcesToDisplay.forEach(resource => {
            const resourceCard = document.createElement('div');
            resourceCard.className = 'resource-card';

            // Determine category label
            let categoryLabel = '';
            switch(resource.category) {
                case 'exploration': categoryLabel = 'Career Exploration'; break;
                case 'skills': categoryLabel = 'Skill Development'; break;
                case 'planning': categoryLabel = 'Career Planning'; break;
                case 'technical': categoryLabel = 'Technical Skills'; break;
                case 'academic': categoryLabel = 'Academic Learning'; break;
                case 'certification': categoryLabel = 'Certification'; break;
                case 'research': categoryLabel = 'Career Research'; break;
                case 'company': categoryLabel = 'Company Research'; break;
            }

            // Add subcategory if exists and is not already the main category
            if (resource.subcategory && resource.category !== resource.subcategory) {
                const subLabel = resource.subcategory.charAt(0).toUpperCase() + resource.subcategory.slice(1);
                if (categoryLabel) {
                    categoryLabel += ` (${subLabel})`;
                } else {
                    categoryLabel = subLabel + ' Resources';
                }
            }

            resourceCard.innerHTML = `
                <h3>${resource.title}</h3>
                <p>${resource.description}</p>
                <span class="resource-category">${categoryLabel}</span>
                <a href="${resource.link}" target="_blank" class="btn resource-btn">Access Resource</a>
            `;
            resourcesGrid.appendChild(resourceCard);
        });
    }

    // Optional: Trigger search on Enter key press in the search input
    searchInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            filterResources();
        }
    });
});
const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
const sidebar = document.querySelector('.sidebar');
const overlay = document.querySelector('.overlay');

mobileNavToggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    overlay.classList.toggle('active');
});

overlay.addEventListener('click', () => {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
});