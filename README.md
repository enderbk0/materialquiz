# MaterialQuiz

MaterialQuiz is a free, open-source, browser-only ABCD quiz app. Load a local JSON quiz file, answer multiple-choice questions, submit the quiz, and review correct answers and explanations.

No account, backend, database, quiz editor, or file upload is required. Quiz files are read and processed entirely in your browser.

## Features

- Load a quiz from a local `.json` file using a file picker or drag-and-drop
- Answer questions with options A, B, C, and D
- Navigate between questions and change answers before submitting
- Skip questions; skipped questions are counted as unanswered
- Confirm before submitting when questions remain unanswered
- View score, percentage, correct/incorrect/unanswered counts, and review explanations
- Restart the same quiz or load another JSON file
- Light, dark, and system themes with saved preference
- Vietnamese interface
- Responsive layout for desktop, tablet, and mobile
- GitHub Pages deployment workflow

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## GitHub Pages

The repository includes `.github/workflows/deploy-pages.yml`. Enable GitHub Pages with **GitHub Actions** as the source; pushes to `main` will build and deploy the site.

The app uses `base: "/materialquiz/"`, so its GitHub Pages URL is:

```text
https://enderbk0.github.io/materialquiz/
```

## Quiz JSON schema

```json
{
  "title": "Bài kiểm tra Tin học",
  "description": "Kiểm tra kiến thức cơ bản",
  "questions": [
    {
      "id": "q1",
      "question": "CPU là viết tắt của cụm từ nào?",
      "options": {
        "A": "Central Processing Unit",
        "B": "Computer Personal Unit",
        "C": "Central Program Utility",
        "D": "Control Processing User"
      },
      "correctAnswer": "A",
      "explanation": "CPU là viết tắt của Central Processing Unit."
    }
  ]
}
```

### Rules

- `title`: required, non-empty string.
- `description`: optional string.
- `questions`: required, non-empty array.
- `id`: required, unique string.
- `question`: required, non-empty string.
- `options`: exactly `A`, `B`, `C`, and `D`; every value must be a non-empty string.
- `correctAnswer`: required and must be `A`, `B`, `C`, or `D`.
- `explanation`: optional string.

A sample quiz is available at `public/sample-quiz.json`.

## Privacy

MaterialQuiz does not upload quiz files, answers, scores, or personal information to a server. All processing happens locally in the browser.

## License and notices

This project is licensed under the MIT License. See `LICENSE` and `NOTICE` for third-party attribution.

MaterialQuiz is not affiliated with, endorsed by, or sponsored by Google. Material Design and Material Symbols are trademarks of Google LLC.
