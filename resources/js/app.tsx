import { createInertiaApp } from '@inertiajs/react';
import i18next from 'i18next';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import '../css/app.css';
import { initializeTheme } from './lib/hooks/use-appearance';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode on load...
initializeTheme();

window.history.pushState = new Proxy(window.history.pushState, {
    apply: (target, thisArg, argArray) => {
        // eslint-disable-next-line
        const result = target.apply(thisArg, argArray as any);
        const event = new CustomEvent('state-change');
        window.dispatchEvent(event);
        return result;
    },
});

//Localization
i18next.init({
    lng: 'lv',
    debug: false,
    resources: {
        lv: {
            translation: {
                show: 'Skatīt',
                destroy: 'Dzēst',
                edit: 'Rediģēt',
                create: 'Izveidot',
                list: 'Visi',
                archive: 'Arhivēt',
                archived: 'Arhivētie',
                active: 'Aktīvie',
                ambulanceCalls: 'Ātrās palīdzības izsaukumi',
                diagnoses: 'Diagnozes',
                measurements: 'Mērījumi',
                medications: 'Izsniegtie medikamenti',
                notes: 'Dienas ieraksti',
                writeNote: 'Izveidot dienas ierakstu',
                baseData: 'Pamatdati',
                trust: 'Pievienot uzticamajām ierīcēm',
                untrust: 'Noņemt no uzticamajām ierīcēm',
                activate: 'Aktivizēt',
                deactivate: 'Deaktivizēt',
                promoteNurse: 'Atbild par medikamentiem',
                demoteNurse: 'Neatbild par medikamentiem',
                alter: 'Iemiesoties',
                alterReset: 'Admina skats',
                write: 'Rakstīt',
                forceEdit: 'Rediģēt ar spēku',
                supply: 'Pievedums',
                structures: 'Struktūrvienības',
                profile: 'Profils',
                settings: 'Iestatījumi',
                logout: 'Iziet',
                login: 'Pieslēgties',
                join: 'Pievienoties',
                register: 'Registrēties',
                submit: 'Iesniegt',
                cancel: 'Atmest',
                clients: 'Klienti',
                employees: 'Darbinieki',
                invitations: 'Ielūgumi',
                trustedDevices: 'Uzticamās ierīces',
            },
        },
    },
});
