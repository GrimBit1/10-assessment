# Business Success Scorecard - React App

A professional business assessment questionnaire built with React and Vite, featuring a 10-question scorecard with lead capture and results reporting.

## Features

- **Interactive Questionnaire**: 10 business assessment questions across key categories
- **Rating System**: 1-6 scale from "Very weak" to "World-class"
- **Progress Tracking**: Visual progress bar showing completion status
- **Lead Capture Form**: Collects user information before showing results
- **Detailed Results**: Comprehensive report with scores, strengths, and improvement areas
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Smooth Animations**: Professional transitions and hover effects

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Questionnaire.jsx      # Main questionnaire component
│   ├── Questionnaire.css       # Questionnaire styles
│   ├── LeadCaptureForm.jsx    # Lead capture form
│   ├── LeadCaptureForm.css    # Lead form styles
│   ├── ResultsReport.jsx      # Results display
│   └── ResultsReport.css      # Results styles
├── data/
│   └── questions.js           # Question data
├── App.jsx                    # Main application component
├── App.css                    # App styles
├── main.jsx                   # Application entry point
└── index.css                  # Global styles
```

## Customization

### Adding/Modifying Questions

Edit `src/data/questions.js` to add or modify questions:

```javascript
{
  id: 11,
  category: 'YOUR CATEGORY',
  question: 'Your question here?',
}
```

### Styling

- Global styles: `src/index.css`
- Component-specific styles: Individual CSS files in `src/components/`

### Branding

Update the logo and colors in the component files:
- Logo: Search for "logo" classes in CSS files
- Primary color: `#1e3a8a` (dark blue)
- Accent color: `#ef4444` (red)

## Technologies Used

- **React 18**: UI library
- **Vite**: Build tool and dev server
- **CSS3**: Styling with animations and transitions

## License

MIT License - feel free to use this for your projects!
