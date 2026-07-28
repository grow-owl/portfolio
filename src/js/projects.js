import projectsData from '../data/projects.json';

export function renderProjects() {
    const container = document.getElementById('projects-container');
    if (!container) return;

    let html = '';

    projectsData.forEach(project => {
        const imagePlaceholderHtml = `
            <div class="absolute inset-0 flex items-center justify-center text-zinc-500 font-bold uppercase tracking-widest text-sm">
                Image Placeholder
            </div>
        `;
        
        const imageHtml = project.image 
            ? `<img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover relative z-10" />`
            : `<img src="" alt="" class="w-full h-full object-cover hidden relative z-10" />`;

        html += `
            <div class="brutal-border bg-white flex flex-col group transition-all hover:shadow-[8px_8px_0px_0px_rgba(24,24,27,1)] hover:-translate-y-1">
                <a href="${project.link}" target="_blank" rel="noopener noreferrer" class="block w-full aspect-[16/9] bg-zinc-200 border-b-2 border-zinc-900 relative overflow-hidden group-hover:opacity-90 transition-opacity cursor-pointer">
                    ${imageHtml}
                    ${imagePlaceholderHtml}
                </a>
                <div class="p-6 md:p-8 flex flex-col flex-grow">
                    <h3 class="font-display text-2xl md:text-3xl font-extrabold mb-4 tracking-tighter">${project.title}</h3>
                    <p class="text-lg font-medium text-zinc-600 mb-8 flex-grow">
                        ${project.description}
                    </p>
                    <div class="mt-auto">
                        <a class="inline-flex items-center gap-2 font-bold text-sm uppercase tracking-widest hover:text-red-500 transition-colors group/link"
                            href="${project.link}" target="_blank" rel="noopener noreferrer">
                            View Live Site <i class="w-4 h-4 group-hover/link:translate-x-1 transition-transform" data-lucide="arrow-right"></i>
                        </a>
                    </div>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}
