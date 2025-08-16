class EventsManager {
    constructor() {
        /**
         * Ajouter les évenements ici
         * Format champs 'date':  YYYY-MM-DD
         * Format champs 'status': 'Passé'|'Annulé'|'Prévu'
         * 
         * L'ordre n'as pas d'importance
         */
        this.events = [
            { date: '2025-07-25', status: 'Passé' },
            { date: '2025-08-01', status: 'Annulé' },
            { date: '2025-08-08', status: 'Passé' },
            { date: '2025-08-15', status: 'Passé' },
            { date: '2025-08-22', status: 'Prévu' }
        ];

        this.now = this.#generateNow();
        this.parsedEventsWithComputedDate = this.#generateLocalDateFieldFromConvenientDate();
    }

    #generateLocalDateFieldFromConvenientDate() {
        return this.events.map(event => ({
            ...event,
            dateObj: this.parseLocalDate(event.date)
        }));
    }
    #generateNow() {
        // Après midi et une minute (12h01) on considère l'évènement au statut "passé"
        return new Date().setHours(12, 1, 0, 0);
    }

    parseLocalDate(dateString) {
        const [year, month, day] = dateString.split('-').map(Number);
        return new Date(year, month - 1, day);
    }

    getPastEvents() {
        return this.parsedEventsWithComputedDate
            .filter(e => e.dateObj < this.now)
            .sort((a, b) => b.dateObj - a.dateObj)
            .slice(0, 3);
    }

    getUpcomingEvents() {
        return this.parsedEventsWithComputedDate
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