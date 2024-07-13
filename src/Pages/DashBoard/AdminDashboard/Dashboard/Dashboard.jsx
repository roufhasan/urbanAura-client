import { AiOutlineStock } from "react-icons/ai";
import { IoCubeSharp } from "react-icons/io5";
import { MdPoll } from "react-icons/md";
import { TfiReceipt } from "react-icons/tfi";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const Dashboard = () => {
  const Bardata = [
    {
      name: "Jan",
      Investement: 4000,
      Profit: 2400,
      Loss: 2400,
    },
    {
      name: "Feb",
      Investement: 3000,
      Profit: 1398,
      Loss: 2210,
    },
    {
      name: "Mar",
      Investement: 2000,
      Profit: 9800,
      Loss: 2290,
    },
    {
      name: "Apr",
      Investement: 2780,
      Profit: 3908,
      Loss: 2000,
    },
    {
      name: "May",
      Investement: 1890,
      Profit: 4800,
      Loss: 2181,
    },
    {
      name: "Jun",
      Investement: 2390,
      Profit: 3800,
      Loss: 2500,
    },
    {
      name: "Jul",
      Investement: 3490,
      Profit: 4300,
      Loss: 2100,
    },
    {
      name: "Aug",
      Investement: 2361,
      Profit: 2300,
      Loss: 3500,
    },
    {
      name: "Sep",
      Investement: 2000,
      Profit: 9800,
      Loss: 2290,
    },
    {
      name: "Oct",
      Investement: 2780,
      Profit: 3908,
      Loss: 2000,
    },
    {
      name: "Nov",
      Investement: 3490,
      Profit: 4300,
      Loss: 2100,
    },
    {
      name: "Dec",
      Investement: 2361,
      Profit: 2300,
      Loss: 3500,
    },
  ];

  const pieData = [
    { name: "Chair", value: 800 },
    { name: "Bed", value: 450 },
    { name: "Lamp", value: 243 },
    { name: "Table", value: 362 },
  ];

  const pieColors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <section className="h-full w-full bg-[#f3f4fa]">
      {/* cards container */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 flex justify-between gap-2 bg-white p-8 shadow-sm lg:col-span-4">
          <div>
            <IoCubeSharp size={40} color="#ff5630" />
            <p className="mt-6 text-sm text-gray-400">Since Last Month</p>
          </div>
          <div>
            <p className="mb-2 text-sm text-gray-400">Total Orders</p>
            <h3 className="text-[27px] font-medium">1350</h3>
          </div>
        </div>
        <div className="col-span-12 flex justify-between gap-2 bg-white p-8 shadow-sm lg:col-span-4">
          <div>
            <TfiReceipt size={40} color="#b88e2f" />
            <p className="mt-6 text-sm text-gray-400">Since Last Month</p>
          </div>
          <div>
            <p className="mb-2 text-sm text-gray-400">Total Cost</p>
            <h3 className="text-[27px] font-medium">$24,358</h3>
          </div>
        </div>
        <div className="col-span-12 flex justify-between gap-2 bg-white p-8 shadow-sm lg:col-span-4">
          <div>
            <MdPoll size={40} color="#36b37e" />
            <p className="mt-6 text-sm text-gray-400">Since Last Month</p>
          </div>
          <div>
            <p className="mb-2 text-sm text-gray-400">Total Sales</p>
            <h3 className="text-[27px] font-medium">$52,365</h3>
          </div>
        </div>
      </div>

      <div className="max-h-[calc(100vh-5 00px)] grid h-full w-full grid-cols-12 gap-6 lg:max-h-[calc(100vh-300px)]">
        {/* Bar Chart */}
        <div className="col-span-12 mt-6 h-full max-h-[calc(100vh-500px)] w-full bg-white p-4 lg:col-span-8 lg:max-h-[calc(100vh-300px)]">
          <p className="mb-2 text-sm">Total Growth</p>
          <h4 className="mb-8 flex items-center gap-1 text-xl font-semibold">
            <AiOutlineStock size={22} className="text-green-400" />
            $2,324
          </h4>
          {/* Bar Chart */}
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={300}
              data={Bardata}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeWidth="0.5" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Investement" stackId="a" fill="#cea8ff" />
              <Bar dataKey="Profit" stackId="a" fill="#8426ff" />
              <Bar dataKey="Loss" fill="#79cbfc" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="col-span-12 mt-6 h-full max-h-[calc(100vh-400px)] w-full bg-white p-4 lg:col-span-4 lg:max-h-[calc(100vh-300px)]">
          <p className="mb-8 text-sm">Top Sales:</p>
          <div className="flex h-full w-full items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart width={500} height={300}>
                <Pie
                  data={pieData}
                  cx={120}
                  cy={200}
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={pieColors[index % pieColors.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
