import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Link href="/campaigns/new">
          <Button>Create Campaign</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Active Campaigns</CardTitle>
            <CardDescription>Campaigns currently in progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ready to Export</CardTitle>
            <CardDescription>Campaigns ready for publishing</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Exports</CardTitle>
            <CardDescription>Campaigns exported this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Campaigns</CardTitle>
            <CardDescription>Your latest campaign activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 border rounded">
                <div>
                  <div className="font-medium">Summer Product Launch</div>
                  <div className="text-sm text-gray-500">Created 2 hours ago</div>
                </div>
                <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">Researching</span>
              </div>
              <div className="flex justify-between items-center p-3 border rounded">
                <div>
                  <div className="font-medium">Brand Awareness Campaign</div>
                  <div className="text-sm text-gray-500">Created 1 day ago</div>
                </div>
                <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">Ready</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Link href="/campaigns/new">
                <Button className="w-full justify-start" variant="outline">
                  Create New Campaign
                </Button>
              </Link>
              <Link href="/campaigns">
                <Button className="w-full justify-start" variant="outline">
                  View All Campaigns
                </Button>
              </Link>
              <Link href="/analytics">
                <Button className="w-full justify-start" variant="outline">
                  View Analytics
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
