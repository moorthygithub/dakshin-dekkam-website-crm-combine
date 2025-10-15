// import {
//   BarElement,
//   CategoryScale,
//   Chart as ChartJS,
//   Legend,
//   LinearScale,
//   Title,
//   Tooltip,
// } from "chart.js";
// import { Bar } from "react-chartjs-2";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const eventData = {
//   labels: [
//     "Jan",
//     "Feb",
//     "Mar",
//     "Apr",
//     "May",
//     "Jun",
//     "Jul",
//     "Aug",
//     "Sep",
//     "Oct",
//     "Nov",
//     "Dec",
//   ],
//   datasets: [
//     {
//       label: "Events",
//       data: [5, 3, 6, 4, 8, 2, 7, 9, 4, 6, 3, 5],
//       backgroundColor: "rgba(37, 99, 235, 0.7)",
//       borderRadius: 6,
//     },
//     {
//       label: "Members",
//       data: [50, 40, 60, 55, 80, 30, 70, 95, 60, 65, 45, 55],
//       backgroundColor: "rgba(16, 185, 129, 0.7)",
//       borderRadius: 6,
//     },
//   ],
// };

// const options = {
//   responsive: true,
//   maintainAspectRatio: false,
//   plugins: {
//     legend: {
//       position: "top",
//     },
//     title: {
//       display: true,
//       text: "Events & Members Trend (Monthly)",
//     },
//   },
//   scales: {
//     x: {
//       grid: {
//         display: false,
//       },
//     },
//     y: {
//       grid: {
//         display: false,
//       },
//       ticks: {
//         stepSize: 5,
//       },
//     },
//   },
// };

// export default function EventChart() {
//   return <Bar data={eventData} options={options} />;
// }
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const branches = [
  { id: 10, branch_name: "Alleppey", members: 120 },
  { id: 12, branch_name: "Badagara", members: 90 },
  { id: 1, branch_name: "Bagalkot", members: 150 },
  { id: 2, branch_name: "Bangalore", members: 250 },
  { id: 3, branch_name: "Bellari", members: 80 },
  { id: 4, branch_name: "Bijapur", members: 60 },
  { id: 11, branch_name: "Calicut", members: 110 },
  { id: 14, branch_name: "Chennai", members: 200 },
  { id: 13, branch_name: "Cochin", members: 130 },
  { id: 15, branch_name: "Coimbatore", members: 180 },
  { id: 5, branch_name: "Dhavangere", members: 70 },
  { id: 6, branch_name: "Gadag", members: 65 },
  { id: 16, branch_name: "Guntur", members: 140 },
  { id: 7, branch_name: "Hubli", members: 160 },
  { id: 17, branch_name: "Hyderabad", members: 220 },
  { id: 8, branch_name: "Raichur", members: 50 },
  { id: 18, branch_name: "Salem", members: 100 },
  { id: 9, branch_name: "Sirsi", members: 55 },
  { id: 19, branch_name: "Tirupur", members: 95 },
];

const branchLabels = branches.map((b) => b.branch_name);
const branchMembers = branches.map((b) => b.members);

const branchData = {
  labels: branchLabels,
  datasets: [
    {
      label: "Members",
      data: branchMembers,
      backgroundColor: "rgba(37, 99, 235, 0.7)",
      borderRadius: 6,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Members per Branch",
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        display: false,
      },
      beginAtZero: true,
      ticks: {
        stepSize: 50, // adjust based on your data
      },
    },
  },
};

export default function EventChart() {
  return <Bar data={branchData} options={options} />;
}
