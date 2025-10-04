# HackerView

HackerView is a modern, open-source web application built with **Next.js** and **TypeScript**.  
It serves as an enhanced **Hacker News clone**, offering feeds for top and new stories, story details, and AI-powered insights that analyze discussions to suggest relevant resources.

## Tech Stack

- Framework: Next.js (App Router)
- Language: TypeScript
- UI: React
- Styling: Tailwind CSS
- Components: ShadCN UI
- Icons: Lucide React
- AI Layer: LLM-based Comment Analysis
- State Management: React Hooks & Context API
- Data Source: Official Hacker News API

## Project Structure

src
├── ai/ # LLM comment analysis configuration & logic
├── app/ # Next.js App Router: routes, pages, and layouts
├── components/ # Reusable React components
├── hooks/ # Custom React hooks
├── lib/ # Utility functions, API clients, and types
└── ...

## Getting Started

### Prerequisites

- Node.js v18 or later
- npm or pnpm

### Installation

```bash
git clone https://github.com/your-username/hackerview.git
cd hackerview
npm install
Run Development Server
npm run dev
Open your browser and navigate to:
http://localhost:3000
Available Scripts
npm run dev – Start development server
npm run build – Build for production
npm run start – Start production server
npm run lint – Lint codebase
Features
Top and New Stories Feeds
Story details view with author, date, and link
AI-powered comment analysis for related sources
Static authentication pages (non-functional)
Responsive and minimal UI
Contribution Guidelines
Use functional React components and Hooks
Follow TypeScript best practices
Use ShadCN UI and Tailwind CSS for styling
Keep UI responsive and accessible
Implement new AI logic under src/ai/
License
MIT License
Copyright (c) 2025 HackerView

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
