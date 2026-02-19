import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

function ProfitChart() {
  const data = {
    labels: ["January", "February", "March"],
    datasets: [
      {
        label: "Investment",
        data: [20000, 15000, 15000],
        backgroundColor: "#ef4444",
      },
      {
        label: "Income",
        data: [30000, 25000, 20000],
        backgroundColor: "#22c55e",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow mt-6 h-[400px]">
      <h2 className="text-lg font-semibold mb-4 text-green-700">
        Monthly Profit Analysis
      </h2>
      <Bar data={data} options={options} />
    </div>
  );
}

export default ProfitChart;
