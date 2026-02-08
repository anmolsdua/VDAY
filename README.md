# VDAY

# Project Context: Veranca Quote Generato]

## 1. Project Overview

*   **Goal**: To build a Valentines day gift website for my girlfriend. This will be a very cute UI, in which it will have a button that says "generate a quote". I have a list of quotes that my girlfriend says, and I want it to cycle through those in random order, and basically show the quotes. Extra points if you can make it say those words out loud. I want it to be a modern responsive UI as well. Feel free to add moving hearts and animations etc. 
*   **Target Audience**: My girlfriend. Again I want this UI to be very cute and valentines day themed. So think hearts, pink red, just overall cute. 
*   **Key Technologies**: 
    *   Serverless if possible. I want this to be a very simple project.f JS all the way. no DB neeeded. If I can deploy it directly in github pages even better.
*   **Links**:
    *   [[Project Repository URL](link-to-repo)](https://github.com/anmolsdua/VDAY)
    *   [Live Site URL](link-to-site)
    *   [Design System Docs](link-to-design-docs)

## 2. Rules and Conventions (`.windsurfrules` content)

*   **Code Style**: [E.g., Adhere strictly to ESLint and Prettier configurations. Do not ignore warnings.]
*   **Libraries/Frameworks**: [E.g., Use `fetch` for all HTTP requests; do not use `axios`.]
*   **Architecture**: [E.g., All components must be functional; avoid class components.]
*   **Testing**: [E.g., Implement unit tests for all new features using Jest.]
*   **Documentation**: [E.g., All public functions must have JSDoc comments.]

## 3. Current State & Roadmap

*   **Current Status**: [A brief summary of where the project is right now. E.g., Authentication flow is complete, working on the product listing page.]
*   **File Tree Snapshot**: 
    ```
    .
    ├── .windsurf/rules/project-rules.md
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   └── utils/
    ├── package.json
    └── README.md
    ```
*   **Next Steps/Priorities**:
    1.  [Task 1, e.g., Complete the `ProductCard` component in `src/components/`.]
    2.  [Task 2, e.g., Implement the API endpoint for fetching products.]
    3.  [Task 3]

## 4. Key Memories & Decisions

This section records important decisions made during development that the AI should remember across sessions.

*   *Decision*: We decided to use CSS modules instead of styled-components for all styling to keep the build simple.
*   *Memory*: The database connection string is stored in a `.env` file and should not be hardcoded.

---
**Instruction for AI**: Review the provided markdown file to comprehensively understand the application's present condition, rules, and planned future development. Indicate you have completed this with the statement "I understand."
