# 🚀 Escape Velocity

A web app that serves as a simplified Tsiolkovsky equation calculator. The user is provided with a list of material and fuel choices to choose from. They make selections and input the dimensions of their desired rocket. Once the form has been submitted from the Vercel frontend, the backend Render API makes the calculations and returns whether or not the rocket would achieve escape velocity from Earth.

🔗 **Live Demo:** https://escape-velocity-alpha.vercel.app

📂 Backend: Flask (Render)  
💻 Frontend: Next.js (Vercel)

---

## Features

- Styled background and display
- Render backend API
- Success/failure .gif/image display
- Loading display

---

## Technologies Used

- Python 3
- Next.js
- Render
- Vercel
- `math`, `jsonify`, `request`, `Image`, `useEffect`, and `useState` modules
- `Flask`, `flask_cors`, `react`

---

## Getting Started

### Prerequisites

- Python 3.x installed
- Required Python packages (install with pip)
- Next.js installed

```bash
pip install -r requirements.txt
```

---

## Running the App

Through the website primarily: https://escape-velocity-alpha.vercel.app

Locally:
```bash
npm run dev
```

Run the above command while within the frontend folder. Click the link that appears in the terminal to access app locally.

---

## Project Structure

```bash
escape_velocity/
├── README.md
├── backend.py
├── frontend/
  └── src/app
    ├── layout.js
    └── page.js
├── requirements.txt
└── render.yaml

```

---

## Future Improvements

- More complex calculations and environmental considerations (wind, drag, launch altitude, etc.)
- Small UI changes
- UX changes involving site visuals 

---

## Why I Built This

I thought this would be a fun project that can be used to quickly find what kind of rocket you could build that would be able to escape the pull of Earth's gravity! What sparked the idea was thinking back to early schooling making rockets with liter bottles and Mentos. This made me wonder if we could have used a calculator that could help with planning and materials/fuel selection.

---

## 📝 General Notes

This app is not 100% accurate and there are some key details to note: 
- The fuel tank volume increases exponentially compared to dry rocket volume (x^1.75)
- In theory, this will lead to any rocket big enough being able to reach escape velocity
- Factors such as drag, wind, aerodynamics, multi-staged rocket propulsion, air temperature, etc. are not considered here
- This app is intended to be a very basic calculator used for fun ideas and very general estimations of possible rockets

---

## License

This project is open source and free to use.

---

## Feedback or Ideas?

Feel free to open an issue or reach out with suggestions!