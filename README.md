# Golf Swingle Frontend

A daily golf swing guessing game built with React and Vite. Test your golf knowledge by identifying professional golfers from their swing videos!

## 🏌️ Features

-   **Daily Puzzle**: New professional golfer to guess each day
-   **3 Difficulty Modes**:
    -   **Hard**: Silhouette only (6 guesses)
    -   **Normal**: 3 guesses with silhouette, then 3 with blurred face
    -   **Easy**: Blurred face only (6 guesses)
-   **Progressive Video Reveal**: Videos reveal more detail as you guess
-   **Stat Comparison**: Compare Age, Country, Year Turned Pro, Education, and PGA Status
-   **User Statistics**: Track your wins, streaks, and guess distribution
-   **Autocomplete Search**: Quickly find golfers with intelligent search
-   **Local Storage**: Game state persists between sessions
-   **Responsive Design**: Works seamlessly on desktop and mobile

## 🚀 Getting Started

### Prerequisites

-   Node.js 16+ and npm

### Installation

1. **Clone the repository**:

    ```bash
    git clone <your-repo-url>
    cd golf-swingle-frontend
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Environment Setup**:

    - Copy `.env.example` to `.env.local`:
        ```bash
        cp .env.example .env.local
        ```
    - Update the following values in `.env.local`:
        - `VITE_API_GET_DAILY_PUZZLE`: Your Lambda function URL for getting daily puzzles
        - `VITE_API_SUBMIT_GUESS`: Your Lambda function URL for submitting guesses
        - `VITE_GOLFERS_JSON_URL`: S3 URL to your golfers.json file
        - `VITE_VIDEO_BASE_URL`: S3 base URL for video files

4. **Run development server**:

    ```bash
    npm run dev
    ```

    The app will be available at `http://localhost:5173`

5. **Build for production**:

    ```bash
    npm run build
    ```

6. **Preview production build**:
    ```bash
    npm run preview
    ```

## 📁 Project Structure

```
golf-swingle-frontend/
├── public/                    # Static assets
├── src/
│   ├── components/           # React components
│   │   ├── ErrorMessage.jsx
│   │   ├── GameOverModal.jsx
│   │   ├── GolferAutocomplete.jsx
│   │   ├── GuessHistory.jsx
│   │   ├── Header.jsx
│   │   ├── LoadingSpinner.jsx
│   │   ├── StatCell.jsx
│   │   ├── StatsModal.jsx
│   │   └── VideoPlayer.jsx
│   ├── hooks/                # Custom React hooks
│   │   ├── useAuth.js        # User authentication/ID
│   │   ├── useDailyPuzzle.js # Fetch daily puzzle
│   │   ├── useGameState.js   # Game state management
│   │   ├── useGolfers.js     # Load golfer data
│   │   └── useLocalStorage.js # Local storage wrapper
│   ├── services/             # API and business logic
│   │   ├── api.js            # Backend API calls
│   │   ├── gameLogic.js      # Game rules and logic
│   │   └── storage.js        # Local storage operations
│   ├── utils/                # Helper functions
│   │   ├── comparison.js     # Stat comparison logic
│   │   ├── constants.js      # Game constants/config
│   │   └── helpers.js        # Utility functions
│   ├── styles/               # CSS modules
│   │   ├── variables.css     # CSS custom properties
│   │   ├── components.css    # Component styles
│   │   └── index.css         # Global styles
│   ├── config.js             # Environment config
│   ├── App.jsx               # Main app component
│   └── main.jsx              # Entry point
├── .env.example              # Environment variables template
├── .gitignore                # Git ignore rules
├── index.html                # HTML entry point
├── package.json              # Dependencies and scripts
├── vite.config.js            # Vite configuration
└── README.md                 # This file
```

## 🎮 How to Play

1. Watch the golf swing video
2. Type a golfer's name in the search box
3. Compare the stats with color-coded feedback:
    - 🟢 **Green**: Correct match
    - 🟡 **Yellow with ↑**: Target value is higher
    - 🟡 **Yellow with ↓**: Target value is lower
    - ⚫ **Gray**: Wrong value
4. Keep guessing until you find the right golfer!
5. After the game, view the original video

## 🖼️ Logo Customization

**TODO**: Replace the placeholder logo

1. Create or get your logo image
2. Save it as `public/logo.png` (or `favicon.ico` for browser tab icon)
3. Update the `<h1 className="logo">` in `src/components/Header.jsx` to use an `<img>` tag if needed:
    ```jsx
    <img src="/logo.png" alt="Golf Swingle" className="logo-img" />
    ```

## 🎨 Customizationservices:

### Lambda Functions

-   **Get Daily Puzzle**: Fetches today's golfer and puzzle configuration
-   **Submit Guess**: Records user guesses and updates statistics

### S3 Storage

-   **Golfers Data**: JSON file containing golfer information and stats
-   **Video Files**: Golf swing videos at different reveal levels

### Environment Variables

All backend URLs must be configured in `.env.local`:

```bash
VITE_API_GET_DAILY_PUZZLE=<your-lambda-url>
VITE_API_SUBMIT_GUESS=<your-lambda-url>
VITE_GOLFERS_JSON_URL=<your-s3-url>
VITE_VIDEO_BASE_URL=<your-s3-url>
```

**Important**: Never commit `.env.local` - it's already in `.gitignore`

````css
:root {
	--accent-primary: #2ea043; /* Main accent color (green) */
	--bg-primary: #0f1419; /* Main background */
	--text-primary: #e6edf3; /* Main text color */
	/* ... */
}
```�️ Security

-   **Environment Variables**: All sensitive URLs are stored in `.env.local` (not committed)
-   **No Hardcoded Secrets**: No API keys or credentials in source code
-   **CORS Configuration**: Ensure your AWS resources have proper CORS settings
-   **Public Access**: S3 resources (videos, golfers.json) must be publicly readable

## 🧪 Tech Stack

-   **Framework**: React 18
-   **Build Tool**: Vite 5
-   **Styling**: CSS Modules with CSS Custom Properties
-   **Backend**: AWS Lambda + S3
-   **State Management**: React Hooks + Local Storage

## 📝 License

MIT

## 🤝 Contributing

Contributions welcome! Feel free to open issues or submit pull requests.

---

Built with ⛳ by golf enthusiasts, for golf enthusiasts
export const MODE_CONFIG = {
	[GAME_MODES.HARD]: {
		maxGuesses: 6,
		videoLevels: [1, 1, 1, 1, 1, 1], // All level 1 (silhouette)
		// ...
	},
	// ...
};
````

## 📡 Backend Integration

The app connects to AWS Lambda functions for:

-   **Get Daily Puzzle**: Fetches today's golfer
-   **Submit Guess**: Records guesses and updates stats

Backend URLs are configured in `.env.local`.

## 🔧 Troubleshooting

### Videos not loading

-   Check that video URLs in S3 are publicly accessible
-   Verify CORS is configured on your S3 bucket
-   Check browser console for errors

### Golfers not loading

-   Verify `VITE_GOLFERS_JSON_URL` is correct
-   Check S3 bucket CORS configuration
-   Ensure `golfers.json` is publicly readable

### API errors

-   Verify Lambda function URLs in `.env.local`
-   Check Lambda function logs in CloudWatch
-   Ensure CORS is configured on Lambda function URLs


### Todo

- Change the comparison to only make close answers orange
- Create an unlimited mode that will allow users to go to past puzzles
- Look into adding more golfers possibly even women and youtube golfers.
- Create function that will show user data from the backend
- Add authorization and profiles
- 
