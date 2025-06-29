# Memora To-Do App

This project is a submission for the take-home task for the React Native Developer Intern role at Memora. It is a full-featured to-do list application built with React Native and Expo, incorporating all required features as well as several bonus enhancements to showcase a modern, user-centric development approach.

---

![MemoraTodoApp](https://img.shields.io/badge/just%20the%20message-8A2BE2)

## ✨ Features

### Core Requirements
- **Task Management:** Create, edit, and delete tasks with ease.
- **Completion Toggle:** Mark tasks as complete with a satisfying visual change.
- **Data Persistence:** Your tasks are saved locally using `AsyncStorage` and will be there when you reopen the app.
- **Per-Task Notifications:** Schedule a unique reminder for each individual task, an upgrade from a single daily reminder for enhanced usability.

### Bonus Features Implemented
- **Polished UI/UX:** Built with **React Native Paper (Material Design 3)** for a clean, modern, and professional user interface.
- **Dark Mode:** A beautiful, theme-aware dark mode that respects user preferences and system settings.
- **Fluid Animations:** Smooth, spring-based animations for adding tasks and fade animations for deleting them, creating a responsive feel.
- **Intuitive Gestures:** Swipe-to-delete functionality on each task item for a fast and modern user experience.
- **Progress Tracking:** A visual progress bar that gives users a sense of accomplishment as they complete their tasks.

---

## 🛠️ Built With

A collection of modern, industry-standard libraries was used to build this application, focusing on maintainability and a great developer experience.

| Technology | Description |
| :--- | :--- |
| **React Native** | A framework for building native apps using React. |
| **Expo** | A framework and platform for universal React applications, used to streamline development. |
| **TypeScript** | A strongly typed superset of JavaScript that enhances code quality and readability. |
| **React Navigation** | The standard library for handling routing and navigation between screens. |
| **React Native Paper** | A high-quality, themeable component library based on Google's Material Design 3. |
| **React Context API** | Used for lightweight, global state management to handle tasks and themes. |
| **React Native Gesture Handler** | Provides performant, native-driven touch and gesture handling for features like swipe-to-delete. |

![React Native](https://img.shields.io/badge/React%20Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React Navigation](https://img.shields.io/badge/React%20Navigation-A123D5?style=for-the-badge)

---

## 📸 Screenshots & Demo

### Light Mode
| Main Screen | Add Task Modal | Edit Task Screen |
| :---: | :---: | :---: |
| *[![Image 29-06-25 at 10 59 PM](https://github.com/user-attachments/assets/171d14ac-6754-4b21-baf8-672066b30346)]* | *[![Image 29-06-25 at 11 28 PM](https://github.com/user-attachments/assets/ae3f3a62-3397-4f09-8e0b-da665dd881a2)]* | *[![Image 29-06-25 at 11 30 PM](https://github.com/user-attachments/assets/25ced21a-8a60-4b2d-a163-ac3c10a66060)]* |

### Dark Mode & Gestures
| Dark Mode | Demo Video |
| :---: | :---: |
| *[![Image 29-06-25 at 10 59 PM (1)](https://github.com/user-attachments/assets/fbd5329d-bc94-473d-8ced-b3b927fe5a55)]* | *[

https://github.com/user-attachments/assets/32750669-3c2f-47fc-9972-962e87ac2080

]*



https://github.com/user-attachments/assets/ac8b0a1a-300c-48b8-bc83-3a3face20a4c


]* |

---

## 🚀 Setup & Installation

To run this project locally, please follow these steps:

1.  **Prerequisites:**
    * Node.js (LTS version recommended)
    * Git
    * Expo Go app on your iOS or Android device.

2.  **Clone the repository:**
    ```bash
    git clone [(https://github.com/mazid79/MemoraTodoApp.git)](https://github.com/YOUR_USERNAME/MemoraTodoApp.git)
    cd MemoraTodoApp
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Run the application:**
    ```bash
    npx expo start
    ```
    This will open a Metro Bundler window in your browser. Scan the QR code with the Expo Go app on your phone to launch the project.

---

## Approach & Design Choices

My approach was to build not just a functional app, but a scalable and maintainable one that demonstrates modern React Native best practices.

* **Component-Based Architecture:** The UI is broken down into logical, reusable components (`TodoItem`, `TodoListScreen`, etc.). This keeps the code organized, clean, and easy to debug.
* **Centralized State Management (Context API):** I used React's built-in Context API to create a global state manager (`TasksContext`). This "brain" holds the list of tasks, the current theme, and all the business logic for adding, editing, and deleting tasks. This avoids "prop drilling" and provides a single source of truth for the application's data.
* **Immutability:** All state updates are performed immutably by creating new arrays or objects (using spread syntax, `.map`, and `.filter`) rather than modifying the existing state directly. This is a core principle in React that ensures predictable state changes and efficient re-renders.

### Justification of Libraries

* **React Native Paper:** I chose this library to provide a high-quality, professional Material Design UI system out of the box. It saved significant time on styling and, more importantly, came with built-in support for dynamic theming, which made implementing Dark Mode incredibly efficient.
* **React Navigation:** This is the standard and most robust library for handling screen navigation in React Native.
* **`@react-native-community/datetimepicker`:** This library provides the native date and time picker UI for both iOS and Android, ensuring a familiar and platform-consistent user experience.
* **`react-native-gesture-handler`:** Selected for the "swipe-to-delete" feature. It provides powerful and performant gesture handling that runs on the native UI thread, ensuring smooth interactions even if the JavaScript thread is busy.

### Challenges Faced & Technical Limitations

A key challenge was a persistent TypeScript error related to the `expo-notifications` library's trigger format. Despite the notification scheduling logic functioning perfectly in the running application, the library's type definitions appeared to be mismatched with its runtime behavior, causing a static type-checking error.

After trying several documented formats, I concluded this was a dependency-related type definition issue rather than a runtime bug. To meet the project deadline with a fully functional app, I made the pragmatic decision to use a `@ts-ignore` comment to suppress the erroneous type error, documenting the issue clearly in the code. This demonstrates an ability to diagnose and work around tooling issues to deliver a working product.

### Future Improvements

If I had more time, I would focus on these key areas:

1.  **Backend Integration (Firestore):** Replace `AsyncStorage` with Google's Firestore. This would enable real-time data synchronization across multiple devices for a single user.
2.  **Advanced Filtering & Sorting:** Add UI controls on the main screen to allow users to sort tasks by due date or filter to see only completed or incomplete tasks.
3.  **Comprehensive Testing:** Implement unit tests for the business logic in `TasksContext` using Jest and React Native Testing Library to ensure the application is robust and reliable.
4.  **Refactor for Performance:** For the `FlatList`, I would wrap the `TodoItem` component in `React.memo` to prevent unnecessary re-renders, which would significantly improve performance on very long lists.

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
