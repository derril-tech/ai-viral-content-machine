'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'

const platforms = [
  { id: 'tiktok', label: 'TikTok' },
  { id: 'instagram', label: 'Instagram' },
  { id: 'youtube', label: 'YouTube' },
  { id: 'twitter', label: 'Twitter' },
  { id: 'linkedin', label: 'LinkedIn' },
]

export default function NewCampaignPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    brief: '',
    platforms: [] as string[],
    targetAudience: '',
    tone: '',
    goals: '',
    constraints: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Mock API call
    console.log('Creating campaign:', formData)
    
    // Redirect to campaigns list
    router.push('/campaigns')
  }

  const handlePlatformChange = (platformId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      platforms: checked 
        ? [...prev.platforms, platformId]
        : prev.platforms.filter(p => p !== platformId)
    }))
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Create New Campaign</h1>
        <p className="text-gray-600 mt-2">
          Set up your campaign brief and let AI generate viral content for you.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Campaign Details</CardTitle>
            <CardDescription>
              Provide the basic information for your campaign
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="name">Campaign Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., Summer Product Launch"
                required
              />
            </div>

            <div>
              <Label htmlFor="brief">Campaign Brief</Label>
              <Textarea
                id="brief"
                value={formData.brief}
                onChange={(e) => setFormData(prev => ({ ...prev, brief: e.target.value }))}
                placeholder="Describe your campaign goals, target audience, and key messaging..."
                rows={4}
                required
              />
            </div>

            <div>
              <Label>Target Platforms</Label>
              <div className="grid grid-cols-2 gap-3 mt-2">
                {platforms.map((platform) => (
                  <div key={platform.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={platform.id}
                      checked={formData.platforms.includes(platform.id)}
                      onCheckedChange={(checked) => 
                        handlePlatformChange(platform.id, checked as boolean)
                      }
                    />
                    <Label htmlFor={platform.id} className="text-sm">
                      {platform.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="targetAudience">Target Audience</Label>
              <Input
                id="targetAudience"
                value={formData.targetAudience}
                onChange={(e) => setFormData(prev => ({ ...prev, targetAudience: e.target.value }))}
                placeholder="e.g., Gen Z, 18-24, interested in fashion"
              />
            </div>

            <div>
              <Label htmlFor="tone">Brand Tone</Label>
              <Input
                id="tone"
                value={formData.tone}
                onChange={(e) => setFormData(prev => ({ ...prev, tone: e.target.value }))}
                placeholder="e.g., Casual, humorous, authentic"
              />
            </div>

            <div>
              <Label htmlFor="goals">Campaign Goals</Label>
              <Textarea
                id="goals"
                value={formData.goals}
                onChange={(e) => setFormData(prev => ({ ...prev, goals: e.target.value }))}
                placeholder="What do you want to achieve with this campaign?"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="constraints">Constraints & Guidelines</Label>
              <Textarea
                id="constraints"
                value={formData.constraints}
                onChange={(e) => setFormData(prev => ({ ...prev, constraints: e.target.value }))}
                placeholder="Any specific requirements, banned words, or guidelines..."
                rows={3}
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" className="flex-1">
                Create Campaign
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => router.back()}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}
