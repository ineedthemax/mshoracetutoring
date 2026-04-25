import { mockGroupClasses } from "@/lib/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Users, Video } from "lucide-react";

export default function GroupsPage() {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Group Classes</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your small group sessions and enrollments.</p>
        </div>
        <Button><Plus className="w-4 h-4 mr-2" /> New Class</Button>
      </div>

      <div className="grid grid-cols-2 gap-5">
        {mockGroupClasses.map((g) => (
          <Card key={g.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900">{g.title}</h3>
                  <p className="text-sm text-gray-500 mt-0.5">{g.subject} · {g.grade}</p>
                </div>
                <Badge variant={g.status === "full" ? "destructive" : "success"}>
                  {g.status === "full" ? "Full" : "Open"}
                </Badge>
              </div>

              <p className="text-sm text-gray-600 mb-4">{g.description}</p>

              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <span>📅 {g.date} at {g.time}</span>
                <span>⏱ {g.duration}min</span>
                <span>💵 ${g.price}/student</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-400" />
                  <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-violet-500 rounded-full"
                      style={{ width: `${(g.enrolled / g.capacity) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-700">{g.enrolled}/{g.capacity} enrolled</span>
                </div>
                <a href={g.zoomUrl} target="_blank" rel="noreferrer">
                  <Button size="sm" variant="outline">
                    <Video className="w-3 h-3 mr-1" /> Zoom Link
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
