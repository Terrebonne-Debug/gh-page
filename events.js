class EventsManager {
    constructor() {
        this.events = [
            { date: '2025-07-25', status: 'Passé' },
            { date: '2025-08-01', status: 'Annulé' },
            { date: '2025-08-08', status: 'Passé' },
            { date: '2025-08-15', status: 'Passé' },
            { date: '2025-08-22', status: 'Prévu' }
        ];

        this.now = new Date().setHours(12, 1, 0, 0);
        this.parsedEvents = this.events.map(event => ({
            ...event,
            dateObj: this.parseLocalDate(event.date)
        }));
    }

    parseLocalDate(dateString) {
        const [year, month, day] = dateString.split('-').map(Number);
        return new Date(year, month - 1, day);
    }

    getPastEvents() {
        return this.parsedEvents
            .filter(e => e.dateObj < this.now)
            .sort((a, b) => b.dateObj - a.dateObj)
            .slice(0, 3);
    }

    getUpcomingEvents() {
        return this.parsedEvents
            .filter(e => e.dateObj >= this.now)
            .sort((a, b) => a.dateObj - b.dateObj)
            .slice(0, 3);
    }

    formatDate(date) {
        return new Intl.DateTimeFormat('fr-CA', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZone: 'America/Toronto'
        }).format(date);
    }
}

window.EventsManager = EventsManager;