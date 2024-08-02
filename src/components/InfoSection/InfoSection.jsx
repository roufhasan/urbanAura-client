const InfoSection = ({ title, details }) => {
  return (
    <div>
      <p className="rounded bg-[#fdf1d1] px-4 py-2 font-semibold">{title}</p>
      <div className="overflow-x-auto">
        <table className="table">
          <tbody className="divide-y">
            {details.map((specInfo, index) => (
              <tr key={index} className="text-base">
                <td className="w-48 text-[#666] sm:w-52">{specInfo.key}</td>
                <td>{specInfo.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InfoSection;
