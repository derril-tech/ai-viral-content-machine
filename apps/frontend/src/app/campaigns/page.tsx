import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function CampaignsPage() {
  const campaigns = [
    {
      id: '1',
      name: 'Summer Product Launch',
      brief: 'Launch campaign for our new summer product line',
      status: 'researching',
      platforms: ['tiktok', 'instagram'],
      createdAt: '2024-08-24T10:00:00Z',
    },
    {
      id: '2',
      name: 'Brand Awareness Campaign',
      brief: 'Increase brand visibility and engagement',
      status: 'ready',
      platforms: ['tiktok', 'instagram', 'youtube'],
      createdAt: '2024-08-23T15:30:00Z',
    },
    {
      id: '3',
      name: 'Holiday Special',
      brief: 'Promote holiday season special offers',
      status: 'drafting',
      platforms: ['instagram', 'twitter'],
      createdAt: '2024-08-22T09:15:00Z',
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'researching':
        return 'bg-blue-100 text-blue-800'
      case 'ready':
        return 'bg-green-100 text-green-800'
      case 'drafting':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Campaigns</h1>
        <Link href="/campaigns/new">
          <Button>Create Campaign</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((campaign) => (
          <Card key={campaign.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{campaign.name}</CardTitle>
                <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(campaign.status)}`}>
                  {campaign.status}
                </span>
              </div>
              <CardDescription className="line-clamp-2">
                {campaign.brief}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <div className="text-sm font-medium text-gray-500 mb-1">Platforms</div>
                  <div className="flex gap-1">
                    {campaign.platforms.map((platform) => (
                      <span
                        key={platform}
                        className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                      >
                        {platform}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  Created {new Date(campaign.createdAt).toLocaleDateString()}
                </div>
                <div className="flex gap-2">
                  <Link href={`/campaigns/${campaign.id}`} className="flex-1">
                    <Button variant="outline" className="w-full">
                      View Details
                    </Button>
                  </Link>
                  <Link href={`/campaigns/${campaign.id}/edit`}>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
