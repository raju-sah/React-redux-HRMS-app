import ToggleButton from "../../app/components/form/ToggleButton";
function View(user) {
  return (
    <>
    <div className="flex align-middle mb-3 mt-3 me-3">
    <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20 relative me-3">
  <span className="inline-block w-2 h-2 mr-1 bg-green-500 rounded-full"></span>
  Active
</span>

    <span className=" ms-3 uppercase ">Created At</span>
    <span className=" ms-3 uppercase ">Updated At</span>

</div>
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="col-span-1">
        <span className="text-sm font-bold col-span-2 text-gray-700 uppercase">First Name</span>
          <span className="text-sm font-bold text-gray-700 ml-3 uppercase">: {user?.firstName}</span>
        </div>
        <span className="text-sm font-bold text-gray-700 ml-3 uppercase">Last Name</span>
          
    </div>
</>
  )
}

export default View
