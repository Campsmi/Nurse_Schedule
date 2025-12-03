type Nurse = {
  id: number;
  name: string;
};

type Shift = {
  id: number;
  nurseName: string;
  date: string;
  shift: "Day" | "Evening" | "Night";
};

type TradeRequest = {
  id: number;
  fromNurse: string;
  toNurse: string;
  shiftDate: string;
  shiftType: string;
  status: "pending" | "approved" | "rejected";
};

const mockNurses: Nurse[] = [
  { id: 1, name: "Alice Johnson" },
  { id: 2, name: "Bob Smith" },
  { id: 3, name: "Carla Santos" },
];

const mockShifts: Shift[] = [
  { id: 1, nurseName: "Alice Johnson", date: "2025-12-10", shift: "Day" },
  { id: 2, nurseName: "Bob Smith", date: "2025-12-10", shift: "Night" },
  { id: 3, nurseName: "Carla Santos", date: "2025-12-11", shift: "Evening" },
];

const mockTrades: TradeRequest[] = [
  {
    id: 1,
    fromNurse: "Alice Johnson",
    toNurse: "Bob Smith",
    shiftDate: "2025-12-12",
    shiftType: "Night",
    status: "pending",
  },
  {
    id: 2,
    fromNurse: "Carla Santos",
    toNurse: "Alice Johnson",
    shiftDate: "2025-12-13",
    shiftType: "Day",
    status: "approved",
  },
];

export default function HomePage() {
  const totalNurses = mockNurses.length;
  const shiftsToday = mockShifts.filter(
    (s) => s.date === "2025-12-10" // just example
  ).length;
  const pendingTrades = mockTrades.filter((t) => t.status === "pending").length;

  return (
    <div className="space-y-6">

      {/* Summary cards */}
      <section className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl bg-white border border-slate-200 p-6 shadow-sm">
          <p className="text-base font-medium text-slate-500">Total nurses</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">
            {totalNurses}
          </p>
          <p className="mt-1 text-base text-slate-500">
            Active nurses in your department
          </p>
        </div>

        <div className="rounded-xl bg-white border border-slate-200 p-6 shadow-sm">
          <p className="text-base font-medium text-slate-500">Shifts today</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">
            {shiftsToday}
          </p>
          <p className="mt-1 text-base text-slate-500">
            Assigned shifts for today
          </p>
        </div>

        <div className="rounded-xl bg-white border border-slate-200 p-6 shadow-sm">
          <p className="text-base font-medium text-slate-500">Pending trades</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">
            {pendingTrades}
          </p>
          <p className="mt-1 text-base text-slate-500">
            Waiting for your approval
          </p>
        </div>
      </section>

      {/* Two columns: upcoming shifts + trade requests */}
      <section className="grid gap-6 lg:grid-cols-2">
        {/* Upcoming shifts */}
        <div className="rounded-xl bg-white border border-slate-200 p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-slate-900">
              Upcoming shifts
            </h3>
            <a
              href="/shifts"
              className="text-sm text-blue-600 hover:underline"
            >
              View all
            </a>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-base">
              <thead>
                <tr className="border-b bg-slate-50">
                  <th className="py-2 pr-4 text-left font-medium text-slate-600">
                    Nurse
                  </th>
                  <th className="py-2 px-4 text-left font-medium text-slate-600">
                    Date
                  </th>
                  <th className="py-2 px-4 text-left font-medium text-slate-600">
                    Shift
                  </th>
                </tr>
              </thead>
              <tbody>
                {mockShifts.map((shift) => (
                  <tr key={shift.id} className="border-b last:border-0">
                    <td className="py-2 pr-4 text-slate-800">
                      {shift.nurseName}
                    </td>
                    <td className="py-2 px-4 text-slate-700">{shift.date}</td>
                    <td className="py-2 px-4">
                      <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-base text-slate-700">
                        {shift.shift}
                      </span>
                    </td>
                  </tr>
                ))}

                {mockShifts.length === 0 && (
                  <tr>
                    <td
                      colSpan={3}
                      className="py-4 text-center text-base text-slate-400"
                    >
                      No upcoming shifts.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Shift trades */}
        <div className="rounded-xl bg-white border border-slate-200 p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-slate-900">
              Shift trade requests
            </h3>
            <a
              href="/trades"
              className="text-sm text-blue-600 hover:underline"
            >
              Manage trades
            </a>
          </div>

          <ul className="space-y-3">
            {mockTrades.map((trade) => (
              <li
                key={trade.id}
                className="flex items-start justify-between rounded-lg border border-slate-200 px-3 py-2"
              >
                <div>
                  <p className="text-base text-slate-800">
                    {trade.fromNurse} → {trade.toNurse}
                  </p>
                  <p className="text-sm text-slate-500">
                    {trade.shiftDate} · {trade.shiftType} shift
                  </p>
                </div>
                <span
                  className={
                    "ml-3 inline-flex items-center rounded-full px-2 py-0.5 text-sm " +
                    (trade.status === "pending"
                      ? "bg-amber-100 text-amber-700"
                      : trade.status === "approved"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-rose-100 text-rose-700")
                  }
                >
                  {trade.status}
                </span>
              </li>
            ))}

            {mockTrades.length === 0 && (
              <li className="text-sm text-slate-400">
                No trade requests at the moment.
              </li>
            )}
          </ul>
        </div>
      </section>
    </div>
  );
}