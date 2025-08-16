const manager = new EventsManager();

createEventSection = (title, items) => {
    const section = document.createElement('section');
    const heading = document.createElement('h3');
    heading.textContent = title;
    section.appendChild(heading);

    const list = document.createElement('ul');
    list.className = 'event-list';

    items.forEach(({ dateObj, status }) => {
        const item = document.createElement('li');
        item.textContent = `${manager.formatDate(dateObj)} – ${status}`;
        item.className = `event ${status.toLowerCase()}`;
        list.appendChild(item);
    });

    section.appendChild(list);
    return section;
}

const container = document.getElementById('event-container');
container.appendChild(createEventSection('Derniers événements', manager.getPastEvents()));
container.appendChild(createEventSection('À venir', manager.getUpcomingEvents()));
