const events = [
    { date: '2025-07-25', status: 'Passé' },
    { date: '2025-08-01', status: 'Annulé' },
    { date: '2025-08-08', status: 'Passé' },
    { date: '2025-08-15', status: 'Passé' },
    { date: '2025-08-22', status: 'Prévu' }
];

const now = new Date();
now.setHours(0, 0, 0, 0);

const parsedEvents = events.map(event => ({
    ...event,
    dateObj: parseLocalDate(event.date)
}));

function parseLocalDate(dateString) {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
}

const pastEvents = parsedEvents
    .filter(e => e.dateObj < now)
    .sort((a, b) => b.dateObj - a.dateObj)
    .slice(0, 2);

const upcomingEvents = parsedEvents
    .filter(e => e.dateObj >= now)
    .sort((a, b) => a.dateObj - b.dateObj)
    .slice(0, 3);

const formatDate = date =>
    new Intl.DateTimeFormat('fr-CA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'America/Toronto'
    }).format(date);

function createEventSection(title, items) {
    const section = document.createElement('section');
    const heading = document.createElement('h3');
    heading.textContent = title;
    section.appendChild(heading);

    const list = document.createElement('ul');
    list.className = 'event-list';

    items.forEach(({ dateObj, status }) => {
        const item = document.createElement('li');
        item.textContent = `${formatDate(dateObj)} – ${status}`;
        item.className = `event ${status.toLowerCase()}`;
        list.appendChild(item);
    });

    section.appendChild(list);
    return section;
}

const container = document.getElementById('event-container');
container.appendChild(createEventSection('Derniers événements', pastEvents));
container.appendChild(createEventSection('À venir', upcomingEvents));
