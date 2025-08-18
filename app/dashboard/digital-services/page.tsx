import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Globe, Smartphone, Server, Mail, Code, History, Globe2 } from 'lucide-react'

export default function DigitalServicesHome() {
  return (
    <div className="max-w-5xl mx-auto py-10 px-4 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-gray-900">Digital Services</h1>
        <p className="text-lg text-gray-600">Empowering your business with modern web, app, and hosting solutions.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/dashboard/digital-services/development/web-development">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <Globe className="w-7 h-7 text-blue-600" />
                <CardTitle>Web Development</CardTitle>
              </div>
              <CardDescription>Custom websites, e-commerce, and portals built for your brand.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">From landing pages to complex web apps, we deliver responsive, high-performance sites tailored to your needs.</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/digital-services/development/app-development">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <Smartphone className="w-7 h-7 text-green-600" />
                <CardTitle>App Development</CardTitle>
              </div>
              <CardDescription>iOS, Android, and cross-platform mobile solutions.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">We build intuitive, scalable apps to engage your customers and streamline your business.</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/digital-services/hosting/web-hosting">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <Server className="w-7 h-7 text-purple-600" />
                <CardTitle>Web Hosting</CardTitle>
              </div>
              <CardDescription>Fast, secure, and reliable hosting for your sites and apps.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Enjoy peace of mind with managed hosting, daily backups, and 24/7 support.</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/digital-services/hosting/domains">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <Globe2 className="w-7 h-7 text-orange-600" />
                <CardTitle>Domains</CardTitle>
              </div>
              <CardDescription>Domain registration and management made easy.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Secure your brand online with our domain services and DNS management.</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/digital-services/hosting/email">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <Mail className="w-7 h-7 text-pink-600" />
                <CardTitle>Email</CardTitle>
              </div>
              <CardDescription>Professional email solutions for your business.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Get custom email addresses, spam protection, and seamless integration with your workflow.</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/digital-services/hosting/cpanel">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <Code className="w-7 h-7 text-indigo-600" />
                <CardTitle>cPanel</CardTitle>
              </div>
              <CardDescription>Easy website and server management tools.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Take control with cPanel for file management, databases, and more.</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/digital-services/development/projects-history">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <History className="w-7 h-7 text-gray-600" />
                <CardTitle>Projects History</CardTitle>
              </div>
              <CardDescription>See your past and ongoing digital projects.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Track your digital journey and revisit previous work with us.</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}
