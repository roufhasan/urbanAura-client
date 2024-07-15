import { Helmet } from "react-helmet";
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
import { bardata, pieColors, pieData } from "../../../../assets/data/chartData";

const Dashboard = () => {
  return (
    <section className="h-full w-full bg-[#f3f4fa] px-[4%] pt-7 md:px-5">
      {/* Change page title */}
      <Helmet>
        <title>Dashboard - UrbanAura Furniture</title>
      </Helmet>
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

      {/* Charts container */}
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
              data={bardata}
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
              <Bar dataKey="Investement" stackId="a" fill="#0088fe" />
              <Bar dataKey="Profit" stackId="a" fill="#36b37e" />
              <Bar dataKey="Loss" fill="#ff5630" />
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
