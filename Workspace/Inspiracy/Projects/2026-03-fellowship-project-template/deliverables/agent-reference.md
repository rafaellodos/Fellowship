# AGENT ACCESS REFERENCE

## OVERVIEW

This document provides guidance on which agents should have access to different types of projects and tasks within the Fellowship of the Raf system.

## THE FELLOWSHIP AGENTS

### Gandalf (Orchestrator)
**Role:** Master coordinator and orchestrator
**Mandate:** Route tasks to appropriate agents, maintain system coherence
**Access:** All workspaces and projects
**Skills:** All skills available

### Rick (Business Development)
**Role:** Business growth and client acquisition
**Mandate:** Business strategy, client relationships, revenue growth
**Primary Workspaces:** AvenoirTech, Inspiracy
**Skills:** crm_read_write, email_drafting_send, web_search

### Harvey (Strategy)
**Role:** Strategic analysis and planning
**Mandate:** Business strategy, competitive analysis, long-term planning
**Primary Workspaces:** AvenoirTech, Inspiracy, ThoughtExperiment
**Skills:** structured_reflection, web_search, document_generation

### Chinaski (Content)
**Role:** Content creation and writing
**Mandate:** Writing, editing, content development
**Primary Workspaces:** ThoughtExperiment, Rafael
**Skills:** document_generation, web_search

### Archer (Operations)
**Role:** Operations and project management
**Mandate:** Process optimization, project execution, efficiency
**Primary Workspaces:** AvenoirTech, Inspiracy, Labs
**Skills:** document_generation, structured_reflection

### Mr. Robot (Technical)
**Role:** Technical development and implementation
**Mandate:** Code execution, technical infrastructure, AI systems
**Primary Workspaces:** Labs, AvenoirTech
**Skills:** code_execution, web_search, document_generation

### Socrates (Analysis)
**Role:** Deep analysis and research
**Mandate:** Research, analysis, critical thinking
**Primary Workspaces:** Inspiracy, Labs, Rafael
**Skills:** web_search, structured_reflection, document_generation

### Morty (Experimentation)
**Role:** Testing and experimentation
**Mandate:** Experiment design, testing, iteration
**Primary Workspaces:** Labs
**Skills:** code_execution, web_search, document_generation

### Meeseeks (Tasks)
**Role:** Quick task execution
**Mandate:** Simple, well-defined tasks
**Primary Workspaces:** All
**Skills:** document_generation, web_search

### Merry (Support)
**Role:** Support and assistance
**Mandate:** Helping with routine tasks, documentation
**Primary Workspaces:** All
**Skills:** document_generation, web_search

### Pippin (Research)
**Role:** Research and information gathering
**Mandate:** Quick research, fact-checking, information synthesis
**Primary Workspaces:** All
**Skills:** web_search, document_generation

## WORKSPACE-SPECIFIC AGENT ACCESS

### Rafael (Personal Workspace)
**Primary Agents:** Gandalf, Chinaski, Socrates, Meeseeks, Merry, Pippin
**Use Cases:**
- Personal writing and projects: Chinaski
- Personal planning and reflection: Socrates
- Quick tasks: Meeseeks, Merry, Pippin
- All coordination: Gandalf

### AvenoirTech (Business Workspace)
**Primary Agents:** Gandalf, Rick, Harvey, Archer, Mr. Robot
**Use Cases:**
- Client acquisition and business development: Rick
- Strategic planning: Harvey
- Project operations: Archer
- Technical implementation: Mr. Robot
- All coordination: Gandalf

### Inspiracy (Consulting Workspace)
**Primary Agents:** Gandalf, Rick, Harvey, Socrates, Archer
**Use Cases:**
- Client relationships: Rick
- Strategic consulting: Harvey
- Deep analysis: Socrates
- Project management: Archer
- All coordination: Gandalf

### ThoughtExperiment (Content Workspace)
**Primary Agents:** Gandalf, Chinaski, Harvey, Archer
**Use Cases:**
- Content creation: Chinaski
- Content strategy: Harvey
- Production operations: Archer
- All coordination: Gandalf

### Labs (Technical Workspace)
**Primary Agents:** Gandalf, Mr. Robot, Morty, Socrates
**Use Cases:**
- Technical development: Mr. Robot
- Experimentation: Morty
- Technical analysis: Socrates
- All coordination: Gandalf

## PROJECT TYPE AGENT ASSIGNMENT

### Client Projects (AvenoirTech, Inspiracy)
**Core Team:** Gandalf, Rick, Harvey, Archer
**Support:** Socrates (analysis), Mr. Robot (technical if needed)
**Workflow:**
1. Rick: Client acquisition and relationship
2. Harvey: Strategic planning
3. Archer: Project execution
4. Gandalf: Coordination

### Internal Projects (All Workspaces)
**Core Team:** Gandalf + workspace-specific agents
**Support:** Meeseeks, Merry, Pippin for quick tasks
**Workflow:**
1. Gandalf: Task routing
2. Primary agent: Execution
3. Support agents: As needed

### Technical Projects (Labs, AvenoirTech)
**Core Team:** Gandalf, Mr. Robot, Morty
**Support:** Socrates (analysis)
**Workflow:**
1. Mr. Robot: Technical implementation
2. Morty: Testing and iteration
3. Socrates: Analysis
4. Gandalf: Coordination

### Content Projects (ThoughtExperiment, Rafael)
**Core Team:** Gandalf, Chinaski, Harvey
**Support:** Pippin (research)
**Workflow:**
1. Harvey: Content strategy
2. Chinaski: Content creation
3. Pippin: Research support
4. Gandalf: Coordination

## SKILL-AGENT MAPPING

### Web Search
**Primary:** Pippin, Socrates
**Secondary:** All agents
**Use:** Research, fact-checking, information gathering

### Document Generation
**Primary:** Chinaski, Meeseeks, Merry
**Secondary:** All agents
**Use:** Writing, documentation, content creation

### Structured Reflection
**Primary:** Socrates, Harvey
**Secondary:** Gandalf
**Use:** Analysis, planning, strategic thinking

### CRM Read/Write
**Primary:** Rick
**Secondary:** Archer
**Use:** Client management, relationship tracking

### Email Drafting/Send
**Primary:** Rick, Archer
**Secondary:** Meeseeks
**Use:** Client communications, outreach

### Code Execution
**Primary:** Mr. Robot, Morty
**Secondary:** None
**Use:** Technical implementation, testing

### Voice Transcription
**Primary:** Merry, Pippin
**Secondary:** All agents
**Use:** Meeting notes, voice memo processing

### Calendar Scheduling
**Primary:** Archer, Meeseeks
**Secondary:** Merry
**Use:** Meeting scheduling, time management

### Image Visual Analysis
**Primary:** Pippin, Socrates
**Secondary:** Chinaski
**Use:** Visual content analysis, research

## HOW TO ASSIGN AGENTS

### Step 1: Identify Project Type
- Client project? Internal project? Technical? Content?

### Step 2: Identify Primary Workspace
- Which workspace does this project belong to?

### Step 3: Select Core Agents
- Use workspace-specific agent recommendations
- Include Gandalf for all projects

### Step 4: Identify Skills Needed
- What skills are required for this project?
- Which agents have those skills?

### Step 5: Document Agent Access
- Add agent access to project context.md
- Specify which agents and their roles

### Step 6: Route Through Gandalf
- All agent communication routes through Gandalf
- Gandalf coordinates and delegates tasks

## EXAMPLE AGENT ASSIGNMENTS

### Example 1: AvenoirTech Client Project
**Project:** 2026-03-avenir-voice-agent-pilot
**Agents:** Gandalf, Rick, Harvey, Archer, Mr. Robot
**Roles:**
- Gandalf: Coordination
- Rick: Client relationship
- Harvey: Strategy
- Archer: Operations
- Mr. Robot: Technical implementation

### Example 2: Rafael Personal Writing
**Project:** 2026-03-personal-essay-series
**Agents:** Gandalf, Chinaski, Socrates
**Roles:**
- Gandalf: Coordination
- Chinaski: Writing
- Socrates: Analysis and reflection

### Example 3: Labs AI Experiment
**Project:** 2026-03-ai-model-testing
**Agents:** Gandalf, Mr. Robot, Morty, Socrates
**Roles:**
- Gandalf: Coordination
- Mr. Robot: Technical implementation
- Morty: Experimentation
- Socrates: Analysis

## AGENT COMMUNICATION PROTOCOL

1. **All communication routes through Gandalf**
2. **Agents do not speak directly to each other**
3. **Gandalf delegates and coordinates**
4. **User communicates with Gandalf**
5. **Gandalf routes to appropriate agents**

For full operational protocol, see `/core/fellowship.md`

## LAST UPDATED
2026-03-22
