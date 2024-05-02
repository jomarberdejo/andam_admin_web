import { fetchReports } from "@/common/fetchReports";

export function RecentReports() {
  const { reportData } = fetchReports();

  const recentRep = reportData?.slice(0, 6);

  return (
    <div className="space-y-8">
      {recentRep?.map((report) => (
        <div
          key={report.id}
          className="grid grid-cols-2 gap-2 items-center border-b-2 pb-2"
        >
          <div className="ml-4 space-y-2">
            <p className="text-sm font-medium leading-none">
              {report.location}
            </p>
            <p className="text-sm text-muted-foreground">{report.agency}</p>
          </div>
          <div className="ml-auto font-medium">{report.reportedAt}</div>
        </div>
      ))}
    </div>
  );
}
