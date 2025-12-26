import { reactive } from 'vue';

// Initial Mock Data from your HTML
const initialDrills = [
    { id: 1, title: "Phishing Email Identification", description: "Identify phishing emails.", category: "phishing", difficulty: "beginner", duration: 30, date: "2024-01-20", maxScore: 100, scenario: "Identify 4 phishing emails.", createdBy: "Naqash Aouf" },
    { id: 2, title: "Network Intrusion Response", description: "Respond to network attacks.", category: "network", difficulty: "intermediate", duration: 45, date: "2024-01-22", maxScore: 100, scenario: "DDoS mitigation strategies.", createdBy: "Naqash Aouf" },
    { id: 3, title: "Password Security Audit", description: "Audit password policies.", category: "incident", difficulty: "beginner", duration: 25, date: "2024-01-25", maxScore: 100, scenario: "Review weak passwords.", createdBy: "Naqash Aouf" },
    { id: 4, title: "Social Engineering Defense", description: "Defend against social engineering.", category: "social", difficulty: "intermediate", duration: 40, date: "2024-01-28", maxScore: 100, scenario: "Handle phone scams.", createdBy: "Naqash Aouf" }
];

const studentsList = [
  { name: 'Naqash Aouf', email: 'student@example.com', role: 'student', joined: '2024-01-15', cohort: 'A' },
  { name: 'Laila Khan', email: 'laila@example.com', role: 'student', joined: '2024-02-10', cohort: 'A' },
  { name: 'Omar Aziz', email: 'omar@example.com', role: 'student', joined: '2024-03-02', cohort: 'B' },
  { name: 'Sana Mir', email: 'sana@example.com', role: 'student', joined: '2024-03-15', cohort: 'B' },
  { name: 'Jamal Carter', email: 'jamal@example.com', role: 'student', joined: '2024-04-01', cohort: 'C' },
  { name: 'Priya Singh', email: 'priya@example.com', role: 'student', joined: '2024-04-12', cohort: 'C' },
  { name: 'Chen Li', email: 'chen@example.com', role: 'student', joined: '2024-04-18', cohort: 'C' },
  { name: 'Carlos Ruiz', email: 'carlos@example.com', role: 'student', joined: '2024-05-05', cohort: 'D' }
];

const initialResults = [
  { drillId: 1, student: 'Naqash Aouf', score: 85, maxScore: 100, date: '2024-01-21', feedback: 'Good identification', status: 'completed' },
  { drillId: 2, student: 'Naqash Aouf', score: 72, maxScore: 100, date: '2024-01-23', feedback: 'Needs improvement', status: 'completed' },
  // additional Naqash attempts for better chart demo
  { drillId: 3, student: 'Naqash Aouf', score: 71, maxScore: 100, date: '2024-02-04', feedback: 'Okay, Work Hard', status: 'completed' },
  { drillId: 1, student: 'Naqash Aouf', score: 92, maxScore: 100, date: '2024-02-18', feedback: 'Excellent', status: 'completed' },
  { drillId: 4, student: 'Naqash Aouf', score: 66, maxScore: 100, date: '2024-03-02', feedback: 'Needs practice', status: 'completed' },
  { drillId: 2, student: 'Naqash Aouf', score: 74, maxScore: 100, date: '2024-03-14', feedback: 'Improving', status: 'completed' },
  { drillId: 3, student: 'Naqash Aouf', score: 88, maxScore: 100, date: '2024-03-28', feedback: 'Good job', status: 'completed' },
  { drillId: 1, student: 'Naqash Aouf', score: 95, maxScore: 100, date: '2024-04-10', feedback: 'Excellent progress', status: 'completed' },

  { drillId: 1, student: 'Laila Khan', score: 90, maxScore: 100, date: '2024-02-01', feedback: 'Excellent', status: 'completed' },
  { drillId: 1, student: 'Omar Aziz', score: 78, maxScore: 100, date: '2024-02-05', feedback: 'Review phishing section', status: 'completed' },
  { drillId: 3, student: 'Sana Mir', score: 82, maxScore: 100, date: '2024-02-10', feedback: 'Solid work', status: 'completed' },
  { drillId: 4, student: 'Jamal Carter', score: 88, maxScore: 100, date: '2024-02-12', feedback: 'Nice analysis', status: 'completed' },
  { drillId: 2, student: 'Priya Singh', score: 95, maxScore: 100, date: '2024-02-14', feedback: 'Great', status: 'completed' },
  { drillId: 3, student: 'Chen Li', score: 76, maxScore: 100, date: '2024-02-16', feedback: 'Could improve', status: 'completed' },
  { drillId: 4, student: 'Carlos Ruiz', score: 69, maxScore: 100, date: '2024-02-18', feedback: 'Needs more practice', status: 'completed' },
  { drillId: 1, student: 'Laila Khan', score: 88, maxScore: 100, date: '2024-02-20', feedback: 'Consistent', status: 'completed' },
  { drillId: 2, student: 'Omar Aziz', score: 81, maxScore: 100, date: '2024-03-01', feedback: 'Good progress', status: 'completed' }
];

export const store = reactive({
    currentUser: JSON.parse(localStorage.getItem('cyberdrill_user')) || null,
    drills: initialDrills,
    myResults: initialResults,
    students: studentsList,

    // Sidebar visibility (hidden by default)
    sidebarOpen: false,

    toggleSidebar() {
        this.sidebarOpen = !this.sidebarOpen;
    },

    closeSidebar() {
        this.sidebarOpen = false;
    },

    openSidebar() {
        this.sidebarOpen = true;
    },

    login(email, password) {
        // Simple mock login
        if(email === 'student@example.com' && password === 'password123') {
            this.currentUser = { name: 'Naqash Aouf', email, role: 'student', joined: '2024-01-15' };
            localStorage.setItem('cyberdrill_user', JSON.stringify(this.currentUser));
            return true;
        }
        if(email === 'trainer@example.com' && password === 'password123') {
            this.currentUser = { name: 'Naqash Aouf', email, role: 'trainer', joined: '2024-01-10' };
            localStorage.setItem('cyberdrill_user', JSON.stringify(this.currentUser));
            return true;
        }
        return false;
    },

    logout() {
        this.currentUser = null;
        localStorage.removeItem('cyberdrill_user');
    },

    addDrill(drill) {
        this.drills.unshift({ ...drill, id: this.drills.length + 1 });
    },

    addResult(result) {
        this.myResults.unshift(result);
    }
});

// Normalize stored user names if they match the known emails
const stored = JSON.parse(localStorage.getItem('cyberdrill_user')) || null;
if (stored && (stored.email === 'student@example.com' || stored.email === 'trainer@example.com')) {
  stored.name = 'Naqash Aouf';
  localStorage.setItem('cyberdrill_user', JSON.stringify(stored));
  if (store.currentUser && store.currentUser.email === stored.email) {
    store.currentUser.name = stored.name;
  }
}