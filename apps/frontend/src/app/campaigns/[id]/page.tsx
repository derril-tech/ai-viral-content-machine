'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'

export default function CampaignDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState('brief')

  // Mock campaign data
  const campaign = {
    id: params.id,
    name: 'Summer Product Launch',
    brief: 'Launch campaign for our new summer product line targeting Gen Z consumers with a focus on sustainability and style.',
    status: 'researching',
    platforms: ['tiktok', 'instagram'],
    targetAudience: 'Gen Z, 18-24, interested in fashion and sustainability',
    tone: 'Casual, humorous, authentic',
    goals: 'Increase brand awareness and drive product sales',
    createdAt: '2024-08-24T10:00:00Z',
  }

  const angles = [
    {
      id: '1',
      title: 'The Unexpected Twist',
      rationale: 'This angle plays on surprise and curiosity, leveraging the human tendency to seek closure and answers.',
      score: 0.85,
    },
    {
      id: '2',
      title: 'Behind the Scenes',
      rationale: 'Authentic, relatable content that builds trust and shows the human side of your brand.',
      score: 0.78,
    },
    {
      id: '3',
      title: 'The Challenge',
      rationale: 'Engaging format that encourages participation and creates a sense of community.',
      score: 0.72,
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
      <div className="mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold">{campaign.name}</h1>
            <p className="text-gray-600 mt-2">Campaign ID: {campaign.id}</p>
          </div>
          <div className="flex gap-2">
            <Badge className={getStatusColor(campaign.status)}>
              {campaign.status}
            </Badge>
            <Button>Start Processing</Button>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="brief">Brief</TabsTrigger>
          <TabsTrigger value="angles">Angles</TabsTrigger>
          <TabsTrigger value="copy">Copy</TabsTrigger>
          <TabsTrigger value="assets">Assets</TabsTrigger>
          <TabsTrigger value="hashtags">Hashtags</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
        </TabsList>

        <TabsContent value="brief" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Brief</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Description</h4>
                <p className="text-gray-600">{campaign.brief}</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Target Audience</h4>
                <p className="text-gray-600">{campaign.targetAudience}</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Tone</h4>
                <p className="text-gray-600">{campaign.tone}</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Goals</h4>
                <p className="text-gray-600">{campaign.goals}</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Platforms</h4>
                <div className="flex gap-2">
                  {campaign.platforms.map((platform) => (
                    <Badge key={platform} variant="secondary">
                      {platform}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="angles" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Generated Angles</h2>
            <Button>Generate More Angles</Button>
          </div>
          
          <div className="grid gap-4">
            {angles.map((angle) => (
              <Card key={angle.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{angle.title}</CardTitle>
                    <Badge variant="outline">Score: {angle.score}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{angle.rationale}</p>
                  <div className="flex gap-2">
                    <Button size="sm">Select</Button>
                    <Button size="sm" variant="outline">Edit</Button>
                    <Button size="sm" variant="outline">Generate Copy</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="copy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Generated Copy</CardTitle>
              <CardDescription>Copy variants for different platforms</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">No copy generated yet. Select angles to generate copy variants.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assets" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Visual Assets</CardTitle>
              <CardDescription>Generated images and storyboards</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">No assets generated yet. Generate copy first to create visual assets.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hashtags" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Hashtag Strategy</CardTitle>
              <CardDescription>Platform-specific hashtag recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">No hashtags generated yet. Complete copy generation first.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Posting Schedule</CardTitle>
              <CardDescription>Recommended posting times and cadence</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">No schedule generated yet. Complete all previous steps first.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
