🚀 AlgoVisualizer

A modern, interactive web application for understanding Data Structures and Algorithms through real-time visualizations. This project helps learners explore how sorting, searching, graph traversal, and other algorithms work step-by-step with clean animations and intuitive controls.

🔍 Overview

AlgoVisualizer is built to make algorithm learning simple, visual, and engaging. Instead of reading long code samples or imagining how an algorithm behaves internally, this tool shows the entire process visually with real-time updates, animation, and performance stats.

It is ideal for:

Students learning DSA

Developers brushing up fundamentals

Anyone preparing for coding interviews

Visual learners who prefer interactive explanations

✨ Features
🎨 Modern UI

Clean & responsive design

Smooth animations

Dark-mode optimized interface

📊 Data Input System

Enter data manually

Upload JSON / CSV / TXT files

Built-in sample datasets

Automatic input validation

🧠 Algorithm Visualizations

Each algorithm runs with:

Step-by-step transitions

Highlights for comparisons/swaps

Adjustable execution speed

Real-time stats (iterations, comparisons, swaps, etc.)

📝 Code Viewer

View algorithm implementation

Language tabs (Python, C++, Java)

Copy-ready, clean, readable code

📸 Export Tools

Capture snapshots (PNG/JPEG)

Export complete runs as GIF / video

Useful for teaching, documentation, and presentations

🎓 Learning Tools

Mini-explanations

Time/space complexity details

Short learning notes

🔍 Supported Visualizations
🔵 Sorting Algorithms

Bubble Sort

Insertion Sort

Selection Sort

Merge Sort

Quick Sort

Bucket Sort

Radix Sort

🔍 Searching Algorithms

Linear Search

Binary Search

Jump Search

Exponential Search

🌿 Data Structures

Stack

Queue

Linked List

Binary Tree

Binary Search Tree

🕸️ Graph Algorithms

BFS

DFS

Dijkstra

🛠️ Tech Stack
Frontend

React 18

Vite

Framer Motion

React Router

Lucide Icons

CSS3

Utilities

HTML2Canvas (screenshots)

GIF.js (GIF export)

RecordRTC (video recording)

Deployment

Vercel

⚙️ Installation
1️⃣ Clone the Project
git clone https://github.com/YOUR_USERNAME/Codelens.git
cd Codelens

2️⃣ Install Dependencies
npm install

3️⃣ Run Development Server
npm run dev


Open in browser:
http://localhost:5173

📁 Project Structure (Simplified)
src/
 ├── algorithms/     # Sorting, searching, graph algorithms
 ├── components/     # Reusable UI components
 ├── pages/          # Main pages
 ├── contexts/       # Theme and global contexts
 ├── services/       # Helper logic & utilities
 ├── styles/         # CSS styling
 ├── main.jsx        # Entry point
 └── App.jsx         # Root component

🎯 Usage
🔢 Sorting

Enter array values

Choose the sorting algorithm

Adjust speed

Click Start to visualize

🔍 Searching

Provide sorted array

Select searching method

Enter the target element

🌐 Graph Algorithms

Create nodes & edges

Choose algorithm

Watch traversal or shortest-path execution

🛠️ Build for Production
npm run build
npm run preview

🧩 Troubleshooting
❌ Node version errors
npm cache clean --force
rm -rf node_modules
npm install --legacy-peer-deps

❌ Port issues
npm run dev -- --port 3000

📌 Future Improvements (Personal Roadmap)

Add Ternary Search

Add Heap Sort, Shell Sort

Add weighted graph visualizations

Add user accounts for saving progress

Add dashboard with individualized metrics

📜 License

This project is created for personal use.
You are free to modify or extend it as needed.

⭐ Show Support

If you like this project, consider giving it a star ⭐ on GitHub!

If you want, I can also:
✅ Add a logo section
✅ Add GIF previews
✅ Add badges (React, Vite, JavaScript, etc.)
✅ Add a cleaner short version
Just tell me what style you want!

You said:
remvoe deployment part and relate stuff i have not deloyed it
ChatGPT said:

Sure bhai — main deployment ka pura section hata deta hoon + jo bhi deployment-related lines the unhe clean kar diya hai.
Yeh fully updated, clean, personal-use README ready hai.

🚀 AlgoVisualizer

A modern, interactive web application for understanding Data Structures and Algorithms through real-time visualizations. This project helps learners explore how sorting, searching, graph traversal, and other algorithms work step-by-step with clean animations and intuitive controls.

🔍 Overview

AlgoVisualizer is built to make algorithm learning simple, visual, and engaging. Instead of reading long code samples or imagining how an algorithm behaves internally, this tool shows the entire process visually with real-time updates and animations.

It is ideal for:

Students learning DSA

Developers brushing up core concepts

Learners preparing for coding interviews

Anyone who prefers learning through visuals

✨ Features
🎨 Modern UI

Clean, responsive design

Smooth transitions and animations

Minimal and distraction-free layout

📊 Data Input System

Manual data entry

Upload JSON / CSV / TXT files

Pre-built sample datasets

Automatic input validation

🧠 Algorithm Visualizations

Each algorithm includes:

Step-by-step animation

Highlights on comparisons/swaps

Adjustable speed controls

Real-time stats (iterations, comparisons, swaps)

📝 Code Viewer

Toggle between Python / Java / C++

Clean, structured, readable implementations

Copy-ready code blocks

📸 Export Tools

Capture visual states as PNG/JPEG

Export algorithm runs as GIF or video

Great for notes, tutorials, and documentation

🎓 Learning Tools

Short concepts & notes

Complexity analysis

Internal working explained visually

🔍 Supported Visualizations
🔵 Sorting Algorithms

Bubble Sort

Insertion Sort

Selection Sort

Merge Sort

Quick Sort

Bucket Sort

Radix Sort

🔍 Searching Algorithms

Linear Search

Binary Search

Jump Search

Exponential Search

🌿 Data Structures

Stack

Queue

Linked List

Binary Tree

Binary Search Tree

🕸️ Graph Algorithms

BFS

DFS

Dijkstra

🛠️ Tech Stack
Frontend

React 18

Vite

Framer Motion

React Router

Lucide Icons

CSS3

Utilities

HTML2Canvas (screenshots)

GIF.js (GIF export)

RecordRTC (video recording)

⚙️ Installation
1️⃣ Clone the Project
git clone https://github.com/YOUR_USERNAME/Codelens.git
cd Codelens

2️⃣ Install Dependencies
npm install

3️⃣ Run Development Server
npm run dev


Open in browser:
http://localhost:5173
 (or whatever port Vite selects)

📁 Project Structure (Simplified)
src/
 ├── algorithms/     # Sorting, searching, graph algorithms
 ├── components/     # Reusable UI components
 ├── pages/          # Page-level components
 ├── contexts/       # Theme and global states
 ├── services/       # Helper functions
 ├── styles/         # CSS styling
 ├── utils/          # Utility helpers
 ├── main.jsx        # Entry point
 └── App.jsx         # Root component

🎯 Usage
🔢 Sorting

Enter any array

Choose algorithm

Set speed

Press Start to visualize

🔍 Searching

Enter sorted values

Pick algorithm

Provide target number

Visualize step-by-step search

🌐 Graph Algorithms

Create nodes & edges

Choose traversal (BFS/DFS) or pathfinding

Watch how the algorithm processes the graph

🧩 Troubleshooting
❌ Node errors
npm cache clean --force
rm -rf node_modules
npm install --legacy-peer-deps

❌ Port not available
npm run dev -- --port 3000

📌 Future Enhancements

Add Heap Sort, Shell Sort

Add interactive graph editor

Add user workspace for saving datasets

Add timeline scrubbing for animations

⭐ Show Support

If you found this project helpful, feel free to star ⭐ it!
