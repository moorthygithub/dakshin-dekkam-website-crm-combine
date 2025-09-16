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

const eventData = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  datasets: [
    {
      label: "Events",
      data: [5, 3, 6, 4, 8, 2, 7, 9, 4, 6, 3, 5],
      backgroundColor: "rgba(37, 99, 235, 0.7)",
      borderRadius: 6,
    },
    {
      label: "Members",
      data: [50, 40, 60, 55, 80, 30, 70, 95, 60, 65, 45, 55],
      backgroundColor: "rgba(16, 185, 129, 0.7)",
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
      text: "Events & Members Trend (Monthly)",
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
      ticks: {
        stepSize: 5,
      },
    },
  },
};

export default function EventChart() {
  return <Bar data={eventData} options={options} />;
}
