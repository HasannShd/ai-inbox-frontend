Features
    Paste-area + Analyze button (calls /api/ai/extract on the backend)

    Editable ticket form: contact, channel, language, intent, priority, entities

    Read-only original message + editable reply draft

    Save ticket (POST /api/tickets) and view tickets list (GET /api/tickets)

    Filters by status / priority / language; quick search

    Arabic support: dir="auto" on text fields, Arabic-capable font, RTL friendly

    Friendly error toasts when AI/Network is down

Tech Stack

    React (Vite), React Router

    Vanilla CSS (custom dark theme)

    Fetch API for HTTP

Backend running locally at http://localhost:3000

TO RUN THE CODE 
    GIT CLONE https://github.com/HasannShd/ai-inbox-frontend
    cd ai-inbox-frontend
    npm install to download all the packages

    Create an .env file and add this
        VITE_API_URL=http://localhost:3000

    npm run dev

once the app working
    you can paste a message and click analyze 
    a reply draft from the ai appears also 
    you can edit any field as needed and save the ticket 
    after saving you can go check it in the tickets page 

    screenshots
 [compose](src/assets/compose.png)
 [ticketlist](src/assets/tickets-list.png)
 [edit](src/assets/edit.png)
 [update](src/assets/update.png)