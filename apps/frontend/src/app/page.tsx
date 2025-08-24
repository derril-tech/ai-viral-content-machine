import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            Viral Content Machine
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            AI-powered platform that turns your briefs into complete viral campaign kits. 
            Generate angles, copy, assets, hashtags, and schedules in minutes.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/dashboard">
              <Button size="lg" className="text-lg px-8 py-3">
                Get Started
              </Button>
            </Link>
            <Link href="/campaigns">
              <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                View Campaigns
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Smart Angle Generation</h3>
            <p className="text-gray-600">
              AI analyzes trends and generates 10+ viral angles with hooks and rationale.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Multi-Platform Copy</h3>
            <p className="text-gray-600">
              Generate A/B copy variants optimized for TikTok, Instagram, YouTube, and more.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Complete Campaign Kits</h3>
            <p className="text-gray-600">
              Export ready-to-publish content with schedules, hashtags, and assets.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
