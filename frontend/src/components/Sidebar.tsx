export function Sidebar() {

  return (
    <>
  <div class="w-64 bg-slate-100 h-full flex flex-col p-4 justify-between">
      <div class="bg-black w-48 h-14"></div>
        <div class="h-full my-10 flex flex-col">
          <div>
            <p class="font-bold">Tasks</p>
            <div class="ml-4">
              <p>Personal</p>
              <p>Work</p>
              <svg class="w-4 mt-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
            </svg>
          </div>

          <div>
            <p class="font-bold mt-6">Calendar</p>
          </div>

        </div>
        </div>
        <div class="flex items-center gap-3">
          <div class="h-10 w-10 rounded-full bg-black"></div>
          Neo Xander Kirbis
        </div>
  </div>
</>
  )
}