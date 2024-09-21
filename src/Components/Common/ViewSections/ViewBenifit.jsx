const ViewBenifit = ({ value }) => {
  if (!value?.length) return null;
  return (
    <div>
      {value.map((item, index) => {
        return (
          <div className="mt-2 flex gap-2" key={index}>
            <span className="font-bold text-green-500">
              ✓
            </span>
            <div>{item.value}</div>
          </div>
        );
      })}
    </div>
  );
};

export default ViewBenifit;
