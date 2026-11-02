# Capstone Project: Documentation & Submission Guide

## Overview

For your capstone, you will submit a **GitHub repository** that contains your working project *and* its documentation. The documentation is written in **Markdown** files that live next to your code. Your repository will also double as a portfolio piece you can show in interviews.

Your documentation files together form your **project report**. They are numbered **05 to 18**, following the sections of the final report, and at the end they are combined into a single PDF. Sections 1 to 4 of the report (Title Page, College Certificate, Acknowledgement, and Index) are generated separately, so **you do not write them**.

> **Reference example:** a complete sample repository is available at **https://github.com/FCAIT-PG/Capstone-Sample**. Look at it before you start writing. It shows the level of detail expected.

---

## 1. What you submit

A GitHub repository containing your **project code** and the **documentation files** described below. Your repository's commit history is visible to evaluators. Commit regularly as you work rather than uploading everything at the end.

---

## 2. Required repository structure

```
project-root/
├── README.md
├── docs/
│   ├── 05-INTRODUCTION.md
│   ├── 06-PROJECT-DEFINITION.md
│   ├── 07-PROJECT-PROFILE.md
│   ├── 08-TOOLS-AND-TECHNOLOGY.md
│   ├── 09-FEASIBILITY-STUDY.md
│   ├── 10-MODULES-OF-THE-SYSTEM.md
│   ├── 11-FEATURES-OF-THE-SYSTEM.md
│   ├── 12-USERS-OF-THE-SYSTEM.md
│   ├── 13-ARCHITECTURE-DIAGRAM.md
│   ├── 14-UML-DIAGRAMS.md
│   ├── 15-DATABASE-DESIGN.md
│   ├── 16-GUI-DESIGN.md
│   ├── 17-MIS-REPORTS-DESIGN.md
│   ├── 18-CONCLUSION.md
│   ├── openapi.yaml       (your API specification)
│   ├── diagrams/          (diagram images)
│   ├── screens/           (screenshots and mock screen images)
│   └── Certificate.pdf
├── backend/
├── ml/                    (only if your project involves an AI/ML model)
│   ├── notebooks/
│   ├── src/
│   ├── data/
│   └── models/
└── frontend/
    ├── web/
    └── mobile/
```

**Use exactly these file names and numbers.** The numbers decide the order in which the files are combined into the final report, so do not rename, renumber, merge, or split them.

### Code folders

- **`backend/`**: server-side code, including your API and database logic.
- **`frontend/web/`**: your web client.
- **`frontend/mobile/`**: your mobile app.
- **`ml/`**: *(only for projects that train or use their own model)* training and experimentation code: notebooks, scripts, small data samples or download scripts, and model files (or links to them).

Include only the folders your project actually has. For example, a project with a backend and a web client has `backend/` and `frontend/web/`; one with only a mobile app has just `frontend/mobile/`. Each part should include its own dependency/config file (such as `package.json` or `requirements.txt`) so it can be installed and run on its own.

Keep training and serving separate: `ml/` holds the offline work of training and evaluating a model, while the code that loads the trained model and serves predictions through your API lives in `backend/`. A pure ML project with no app would have just `ml/` and `docs/`. If your project calls an existing LLM API instead of training a model, keep your prompts in the repository (for example in `backend/prompts/`).

**If a document genuinely does not apply to your project** (for example, you have no database or no API), consult your project guide before deciding to exclude it.

---

## 3. What each document must contain

Every documentation file starts with a top-level heading that carries its section number and title, for example `# 13. Architecture Diagram`. Number your subsections to match (`13.1`, `13.2`, and so on). This is what keeps the combined report in order.

### `README.md`
The front door of your project. It is not part of the numbered report. It must include:
- What the project is, in 2 to 3 sentences
- The tech stack
- **Setup and run instructions** that actually work, covering every part of your project (backend, web, and/or mobile)

**Test it:** clone your repository into a fresh folder and follow your own README from scratch. An evaluator should be able to get the project running in about 5 minutes without asking you anything.

### `05-INTRODUCTION.md`
- Background: the real-world context and why the problem matters
- Purpose of the project
- A short overview of the system and its types of users
- The intended audience of the document
- A table showing how the rest of the document is organised

### `06-PROJECT-DEFINITION.md`
- **Problem statement**
- **Objectives**, as a numbered list (you will refer back to these in the Conclusion)
- **Scope:** what is in scope and what is deliberately out of scope
- Assumptions and constraints
- Deliverables

### `07-PROJECT-PROFILE.md`
A table of the key facts about the project: title, type, domain, platform, team members, guide, coordinator, department, institution, academic year, duration, technology stack, repository link, and live demo link (if deployed).

### `08-TOOLS-AND-TECHNOLOGY.md`
- The **technology stack, with justification** for each major choice. Why this framework, language, database, or platform instead of the alternatives?
- Development tools (editor, version control, testing tools, diagramming tools)
- Hardware and software requirements, for developers and for end users
- The **deployment environment:** where and how the project is deployed (with a live link if it is deployed), the environment variables required (names only, never values), the steps to deploy it from scratch, and for a mobile app how it is built and distributed (for example an APK file or an Expo link). If the project is not deployed, describe how it *would* be deployed.

### `09-FEASIBILITY-STUDY.md`
Whether the project can realistically be built and is worth building:
- Technical feasibility
- Economic feasibility
- Operational feasibility
- Schedule feasibility (a phase-by-phase timeline)
- Legal and ethical feasibility (for example data licences and personal data)
- Risks and how you plan to reduce them
- An overall conclusion

### `10-MODULES-OF-THE-SYSTEM.md`
- A table listing every module of the system
- **API conventions:** base URL, how authentication works, and the error format. Link your OpenAPI file (`docs/openapi.yaml`) or equivalent structured specification. If your project does not expose an API, explain how the components communicate instead.
- For each module: its purpose, its users, the tables it uses, its key functions, and a table of its API endpoints (method, path, description, and who can call it)
- Example requests and responses for the most important endpoints

**If your project involves an AI/ML model**, describe it as a module here, including:
- **Dataset:** source and licence, size, features, how you preprocessed it, class balance, and any privacy concerns
- **Model choice, with justification:** why this algorithm or architecture, and what alternatives you tried or considered
- **Training setup:** how the data was split, key hyperparameters, and how to retrain the model
- **Evaluation:** metrics appropriate to your problem (not just accuracy), a comparison against a simple baseline, and a look at where the model makes mistakes
- **Reproducibility:** pinned library versions and fixed random seeds, so your results can be re-run. Notebooks should run from top to bottom with key results visible.
- How the model is integrated into the rest of the system

If your project calls an existing LLM or AI API instead of training a model, keep this part short: which model or API you use and why, where your prompts are kept, and how you checked the quality of its outputs.

### `11-FEATURES-OF-THE-SYSTEM.md`
- Features for each type of user (for example customer, seller, admin)
- Platform-wide features that are not tied to one user
- **Security features:** how you handle authentication and authorisation, input validation, data protection, and secrets (passwords, API keys). If your project involves AI/ML, also cover model inputs, personal data in training data, and (for LLM projects) prompt injection.
- Known security gaps. It is fine, and good, to admit these.

### `12-USERS-OF-THE-SYSTEM.md`
- Each user role and what they do
- A **permissions matrix** showing which role can do which action
- The technical skill expected of each user and how they typically use the system

### `13-ARCHITECTURE-DIAGRAM.md`
- The **architecture diagram** of the whole system, with a short description of each component
- If your project involves AI/ML: a diagram of the ML pipeline, from data to the prediction shown to the user
- The **major design decisions and why you made them.** Write each as a short decision record: *the decision, the reasoning, and the trade-off you accepted.* (See the sample for examples.) This is where evaluators look for evidence that you *thought* about your design, not just built it. If your project has an AI/ML model, also record where the model runs (bundled in the backend or as a separate service) and whether predictions are real-time or batch.

### `14-UML-DIAGRAMS.md`
- **Class diagram:** required only if your system is object oriented. Show the core domain classes, not every helper class. If it does not apply, write a short paragraph explaining why.
- **Use case diagram:** all actors and the major things each can do
- **Sequence diagrams:** for your most critical or complex flows (for example login or checkout). Not one per endpoint.
- **Activity diagram:** for your most complex business workflow, showing real decisions and branches

### `15-DATABASE-DESIGN.md`
- **Justification for your database choice:** relational, non-relational, or a mix, and why
- The **ER diagram** (if your project has a database)
- The **data dictionary:** for every table (or collection), list each column with its type, constraints, and a short description
- Relationships between tables, and indexes where they matter
- Notes on any non-obvious design choices (for example, why you store a value a certain way)

### `16-GUI-DESIGN.md`
Mock screens (wireframes or screenshots) of the main screens for **each type of user**. For every screen include:
- The image
- Who uses it and what it is for
- Its main elements
- **States and validation:** how it looks when data is empty, loading, invalid, or needs confirmation, not only the "happy path"
- The API endpoints it uses

### `17-MIS-REPORTS-DESIGN.md`
Design of the management (MIS) reports your system provides. Start with a catalogue of the reports, then for each one give:
- Its purpose and who uses it
- Input parameters (date range, filters)
- Source tables
- A sample layout of the output (a table with a few illustrative rows)
- Output format (on-screen table, CSV export, and so on)

Also state any rules that apply to all reports (for example which records are counted in revenue).

### `18-CONCLUSION.md`
- **Summary** of what was built
- **Objectives achieved:** a table that goes back through the objectives from section 6 and says where each is covered
- **Testing and quality assurance:** your testing approach (what you tested, how, and why you focused there), the tools used, evidence (coverage numbers, a CI badge, or sample test output), and how to run the tests. You do not need to test everything. Focus on the parts where a bug would hurt most, and say so. If you have a model, keep software tests separate from model evaluation, and point to the model evaluation in section 10.
- **Limitations:** what does not work, is incomplete, or was left out of scope
- **Future scope:** what you would do next with more time
- **Key learnings**

Honest self-assessment is valued. A project with clearly stated limitations is stronger than one that claims to be perfect.

### `docs/Certificate.pdf`
- A project completion certificate will be provided by the guide **AFTER** the submission and evaluation, which must be signed by the guide, the project coordinator, and the head of the department.
- This signed certificate must be committed to the GitHub repository.

---

## 4. Diagrams and images

### Which diagrams you need

| Diagram | Goes in | Notes |
|---|---|---|
| **Architecture diagram** | Section 13 | Visualisation of the whole system |
| **ML pipeline diagram** | Section 13 | Required **only if** your project trains or uses a model |
| **Class diagram** | Section 14 | Required **only if** your system is object oriented |
| **Use case diagram** | Section 14 | All actors and the major things each can do |
| **Sequence diagrams** | Section 14 | For your most critical or complex flows. Not one per endpoint. |
| **Activity diagram** | Section 14 | For your most complex business workflow, showing real decisions and branches |
| **ER diagram** | Section 15 | Required if your project has a database |
| **Mock screens** | Section 16 | The main screens of each type of user |

### All diagrams are images

Because your documents are combined into a PDF, **every diagram and mock screen must be an image file.** Do not use Mermaid or any other text-based diagram code; it will not appear in the PDF.

1. **Draw it in any tool you are comfortable with** (draw.io, Lucidchart, PlantUML, Figma, and so on).
2. **Export it as a PNG** with a white background and a high enough resolution that the text is readable when printed on A4.
3. **Save it in the right folder:** diagrams in `docs/diagrams/`, mock screens in `docs/screens/`. Give files descriptive names, for example `sequence-place-order.png`.
4. **Embed it in the relevant document:**

```markdown
![Use case diagram](diagrams/use-case.png)
```

### Rules for every diagram

1. **Explain it.** Put a short note beneath each diagram saying what it shows and which other section it relates to.
2. **Keep it consistent with your project.** Sequence diagram steps should match endpoints in section 10. ER entities should match your real database schema and your data dictionary. A diagram that disagrees with the code will lose marks.
3. **Keep it readable.** A diagram that fits on one page and explains one thing is better than a huge one nobody can follow.
4. **Commit the image files.** Make sure each image displays correctly on GitHub.

---

## 5. How to write the "why" sections

Several sections ask you to *justify* choices (technology in section 8, design decisions in section 13, database choice in section 15, model choice in section 10). Evaluators are looking for your reasoning, not a description of what you built.

**Weak:** "We used React because it is popular and modern."

**Strong:** "We used React because our customer, seller, and admin views share many components (tables, forms, product cards), and component reuse reduced duplicated work. We considered plain HTML/JS, but it would have meant rewriting the same UI logic for each role."

A good justification usually mentions **what the alternatives were** and **what you gave up** by choosing this option.

---

## 6. Ground rules

- **Docs must match the code.** If you change the project, update the docs. Evaluators will spot-check the two against each other.
- **Be specific to your project.** Avoid generic text that could describe any project. If you use AI tools to help draft documentation, edit it until it accurately describes *your* system, and make sure you understand everything in it. You may be asked to explain any decision you have written down.
- **Keep the heading format.** Each file starts with its section number and title, and subsections are numbered to match (`13.1`, `13.2`, and so on).
- **Refer to other parts by section number**, for example "see section 13.3", because your files are combined into one PDF. You may add a link as well.
- **Never commit secrets.** No passwords, API keys, or database credentials in the repository. Add `.env` to `.gitignore` and provide a `.env.example` listing the variable names without values.
- **Do not commit large files.** GitHub rejects files over 100 MB, so datasets and model weights usually cannot go in the repository. Provide a download script or a link instead (for example to Hugging Face or Google Drive) and add those paths to `.gitignore`. Small sample datasets are fine.
- **Keep it concise.** Short, clear, specific documents are better than long, padded ones.
- **Commit regularly** with meaningful messages. Your history shows how the project developed.

---

## 7. Common mistakes to avoid

- A README that says "run the project" but does not say how
- Renaming, renumbering, or merging the numbered files
- Diagrams drawn once at the start and never updated to match what was built
- Diagrams pasted as Mermaid or other code instead of image files
- A data dictionary that lists table names but not every column, type, and constraint
- Mock screens that show only the happy path, with no empty, error, or confirmation states
- MIS reports described in words only, with no sample layout
- Describing *what* the system does but never *why* it was designed that way
- Twelve sequence diagrams for trivial flows, and none for the one flow that is actually complicated
- Leaving template text or placeholders in the final documents
- Broken image links because the image file was never committed
- Uploading everything in a single final commit
- Reporting only accuracy for a model, with no baseline to compare against and no look at where it fails
- Trying to commit a dataset or model file that is too large for GitHub

---

## 8. Pre-submission checklist

Go through this before you submit.

**Repository**
- [ ] All required files exist with the exact names and numbers above
- [ ] Code is organised into `backend/` and `frontend/web/` and/or `frontend/mobile/`, as applicable to your project
- [ ] The repository opens correctly for the evaluator (access/visibility is set as instructed)
- [ ] No secrets or `.env` files are committed; `.env.example` is present
- [ ] No large datasets or model files are committed; download instructions are provided instead
- [ ] Commit history shows regular work

**Documentation**
- [ ] README setup instructions work from a fresh clone
- [ ] Every file starts with its numbered heading, and subsections are numbered
- [ ] Introduction, Project Definition, and Project Profile are complete
- [ ] Tools and Technology justifies each major choice and describes deployment
- [ ] Feasibility Study covers all five kinds of feasibility
- [ ] Every module lists its API endpoints, with example requests/responses for the key ones
- [ ] Features include security features and known gaps
- [ ] Users section has a permissions matrix
- [ ] Architecture documents the major decisions, with reasoning and trade-offs
- [ ] Database Design explains the database choice and has a complete data dictionary
- [ ] GUI Design covers the main screens of every user role, including empty, error, and confirmation states
- [ ] MIS Reports Design has a sample layout for every report
- [ ] Conclusion covers objectives, testing, limitations, and future scope
- [ ] If your project uses a model: the model module in section 10 covers the dataset, model choice, evaluation (with a baseline), and reproducibility

**Diagrams**
- [ ] Architecture, use case, sequence, activity, and ER diagrams are present (also class diagram, if object oriented)
- [ ] If your project trains or uses a model: ML pipeline diagram is present
- [ ] Every diagram is an image file (no Mermaid or other code), and the text is readable
- [ ] Every diagram has a short explanation beneath it
- [ ] Diagrams match the actual API and database
- [ ] Image files are committed and display correctly on GitHub

**Final check**
- [ ] Docs match the final state of the code
- [ ] Cross-references use section numbers, and any links between documents work