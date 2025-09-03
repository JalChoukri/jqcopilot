# J'arrive Québec CV Copilot

A modern, bilingual React web application designed to help newcomers optimize their CVs for the Quebec job market using AI-powered insights and recommendations.

## Features

- **Bilingual Interface**: Full French/English support with easy language switching
- **Modern Design**: Clean, professional UI using Quebec blue as the primary color
- **File Upload**: Drag-and-drop CV upload supporting PDF and DOCX formats
- **AI Analysis**: Three main analysis features:
  - Job Recommendations: AI-suggested job titles based on CV content
  - CV Insights: Quantification opportunities and improvement suggestions
  - CV Enhancer: Interactive CV editing with AI-powered suggestions
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## Technology Stack

- **React 19** with TypeScript
- **Tailwind CSS** for styling
- **Inter Font** for modern typography
- **Quebec Blue** (#1E3A8A) as the primary brand color

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd jarrive-quebec-cv-copilot
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Project Structure

```
src/
├── components/
│   ├── NavigationBar.tsx      # Top navigation with language switcher
│   ├── LandingPage.tsx        # Initial landing page with file upload
│   └── Dashboard.tsx          # Main dashboard with CV analysis
├── App.tsx                    # Main application component
├── index.tsx                  # Application entry point
└── index.css                  # Global styles and Tailwind imports
```

## Key Components

### NavigationBar
- Persistent top navigation
- Language switcher (FR/EN)
- Login and Sign Up buttons
- Quebec blue branding

### LandingPage
- Hero section with compelling headline
- Drag-and-drop file upload area
- File type validation (.pdf, .docx)
- Analyze button (disabled until file selected)

### Dashboard
- Two-column layout (CV Editor + AI Analysis)
- Three-tab interface for different analysis types
- Interactive CV text selection
- Mock AI recommendations and insights

## Design Principles

- **Trustworthy**: Professional design that inspires confidence
- **Welcoming**: Clean, modern interface for newcomers
- **Bilingual**: Seamless French/English experience
- **Accessible**: Responsive design for all devices
- **Quebec-focused**: Uses Quebec blue and local context

## Future Enhancements

- Real file parsing and CV analysis
- Integration with actual AI services
- User authentication and profile management
- Export functionality for improved CVs
- Job board integration
- Progress tracking and analytics

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
