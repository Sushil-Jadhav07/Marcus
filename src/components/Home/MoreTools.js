const MoreTools = () => {
  const tools = [
    { name: "Community", icon: "" },
    { name: "Trading Journal", icon: "" },
    { name: "FII-DII Data", icon: "" },
    { name: "Games", icon: "" },
    { name: "Watch list", icon: "" },
    { name: "Calendar", icon: "" },
  ]

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-white dark:text-black text-xl font-semibold">More Tools</h2>
      <div className="grid grid-cols-2 gap-4">
        {tools.map((tool, index) => (
          <div
            key={index}
            className="relative h-24 w-full flex flex-col justify-start items-start p-2 rounded-2xl border-t-2 border-r-2 border-b-2 border-l-2 border-t-white/40 border-r-white/40 border-b-blue-500/40 border-l-blue-500/40 bg-white dark:bg-black"
          >
            <div className="text-2xl ">{tool.icon}</div>
            <h3 className="text-black dark:text-white text-sm font-medium">{tool.name}</h3>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MoreTools
