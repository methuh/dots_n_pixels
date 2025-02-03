document.addEventListener('DOMContentLoaded', function() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
           const filter = btn.dataset.filter;
            projectItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = '';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 0);} else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';}, 300);}});});});const modal = document.getElementById('projectModal');const viewProjectBtns = document.querySelectorAll('.view-project-btn');const closeModal = document.querySelector('.close-modal'); const projectsData = {
        1: {
            title: "Modern Brand Identity",
            client: "Tech Startup XYZ",
            services: "Branding, Print Design, Digital Assets",
            year: "2024",
            description: "A complete brand transformation project that helped this tech startup establish a strong market presence.",
            images: ["./bag_cup.jpg", "project1-2.jpg", "project1-3.jpg"],
            results: [
                "200% increase in brand recognition",
                "150% increase in social media engagement",
                "50+ unique design assets created"
            ]
        },}; viewProjectBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const projectId = btn.dataset.project;
            const project = projectsData[projectId];

            if (project) {
                populateModal(project);
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }}); });closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });function populateModal(project) {
        const modalBody = modal.querySelector('.modal-body');
        modalBody.innerHTML = `
            <div class="project-gallery">
                ${project.images.map(img => `
                    <img src="assets/images/Branding/maquete_cup_branding/${img}" alt="${project.title}">
                `).join('')}
            </div>
            <div class="project-details">
                <h2>${project.title}</h2>
                <div class="project-info">
                    <div class="info-item">
                        <h4>Client</h4>
                        <p>${project.client}</p>
                    </div>
                    <div class="info-item">
                        <h4>Services</h4>
                        <p>${project.services}</p>
                    </div>
                    <div class="info-item">
                        <h4>Year</h4>
                        <p>${project.year}</p>
                    </div>
                </div>
                <div class="project-description">
                    <h4>Project Overview</h4>
                    <p>${project.description}</p>
                </div>
                <div class="project-results">
                    <h4>Results</h4>
                    <ul>
                        ${project.results.map(result => `
                            <li>${result}</li>
                        `).join('')}
                    </ul>
                </div>
            </div>
        `;
}const animateOnScroll = () => {
        const elements = document.querySelectorAll('.project-item, .story-card');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.classList.add('animate');
            }});};window.addEventListener('scroll', animateOnScroll);animateOnScroll(); 
}); 